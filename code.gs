/**
 * OmniPost Pro - Professional Version (CRUD)
 */
const SPREADSHEET_ID = "1NgDZ6fzz30wH9pElVwoSepkkkPd73mmccl2WRCIyZ7A";

function getSecrets() {
  const props = PropertiesService.getScriptProperties();
  return { blogId: props.getProperty("BLOG_ID") };
}

/**
 * Setup Function - Initialize sheets and headers.
 */
function setupSystem(blogId) {
  const ss = getSS();
  const props = PropertiesService.getScriptProperties();
  if (blogId) props.setProperty("BLOG_ID", blogId);

  // Setup Users
  let userSheet = ss.getSheetByName("Users") || ss.insertSheet("Users");
  if (userSheet.getLastRow() === 0) {
    userSheet.appendRow(["Timestamp", "Nama", "Alamat", "WhatsApp", "Password"]);
    userSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#d9ead3");
  }

  // Setup Posts (Added Status & Labels column)
  let postSheet = ss.getSheetByName("Posts") || ss.insertSheet("Posts");
  if (postSheet.getLastRow() === 0) {
    postSheet.appendRow(["Timestamp", "JSON-ID", "Post-ID", "Title", "Price", "Location", "Description", "Blog URL", "Password", "Alt Text", "Photo-Data", "Status", "Labels"]);
    postSheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#cfe2f3");
  }
  Logger.log("Setup Selesai!");
}

function getSS() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") return SpreadsheetApp.openById(SPREADSHEET_ID);
  try { return SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { throw new Error("ID Spreadsheet belum diatur."); }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    // Auth Validation (for all actions except register/login)
    if (!['register', 'login'].includes(action)) {
       if (!findUserByPassword(data.password)) return jsonResponse({ success: false, message: "Unauthorized: Akses ditolak." });
    }

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);
    if (action === 'getPosts') return handleGetPosts(data);
    if (action === 'createPost') return handleCreatePost(data);
    if (action === 'updatePost') return handleUpdatePost(data);
    if (action === 'deletePost') return handleDeletePost(data);
    if (action === 'generateAI') return handleGenerateAI(data);

    return jsonResponse({ success: false, message: "Invalid action" });
  } catch (err) { return jsonResponse({ success: false, message: err.toString() }); }
}

/**
 * AI Gemini Integration with Key Rotation
 */
function getGeminiKey() {
  const props = PropertiesService.getScriptProperties();
  const keysStr = props.getProperty("GEMINI_API_KEYS") || "";
  const keys = keysStr.split(",").map(k => k.trim()).filter(k => k !== "");
  if (keys.length === 0) return null;

  let currentIndex = parseInt(props.getProperty("CURRENT_KEY_INDEX") || "0");
  if (currentIndex >= keys.length) currentIndex = 0;

  return { key: keys[currentIndex], index: currentIndex, total: keys.length };
}

function rotateGeminiKey() {
  const props = PropertiesService.getScriptProperties();
  const keysStr = props.getProperty("GEMINI_API_KEYS") || "";
  const keys = keysStr.split(",").map(k => k.trim()).filter(k => k !== "");
  if (keys.length <= 1) return;

  let nextIndex = parseInt(props.getProperty("CURRENT_KEY_INDEX") || "0") + 1;
  if (nextIndex >= keys.length) nextIndex = 0;
  props.setProperty("CURRENT_KEY_INDEX", nextIndex.toString());
}

function callGemini(prompt) {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    const keyData = getGeminiKey();
    if (!keyData) throw new Error("API Key Gemini belum diatur di Script Properties (GEMINI_API_KEYS).");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyData.key}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    const resText = response.getContentText();

    if (code === 200) {
      const json = JSON.parse(resText);
      return json.candidates[0].content.parts[0].text;
    } else if (code === 429) {
      Logger.log(`Key index ${keyData.index} limit reached (429). Rotating...`);
      rotateGeminiKey();
      attempts++;
    } else {
      throw new Error(`Gemini API Error (${code}): ${resText}`);
    }
  }
  throw new Error("Semua API Key Gemini telah mencapai limit. Silakan coba lagi nanti.");
}

function handleGenerateAI(data) {
  const prompt = `Buatkan deskripsi jualan produk yang menarik dan SEO friendly untuk Blogger.
  Data Produk:
  - Judul: ${data.title}
  - Harga: ${data.price}
  - Lokasi: ${data.location}

  Format jawaban harus JSON valid dengan key:
  - description: (Gunakan HTML sederhana seperti <p>, <b>, <ul> untuk list fitur)
  - labels: (Berupa array string label SEO, contoh ["Elektronik", "Bekas Murah"])
  - alt_text: (Deskripsi gambar singkat untuk SEO)

  Pastikan deskripsi persuasif tapi tetap profesional.`;

  try {
    const aiResponse = callGemini(prompt);
    // Extract JSON from response if Gemini wraps it in markdown
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI tidak memberikan format JSON yang valid.");
    const result = JSON.parse(jsonMatch[0]);
    return jsonResponse({ success: true, ...result });
  } catch (e) {
    return jsonResponse({ success: false, message: "AI Error: " + e.message });
  }
}

function handleRegister(data) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Users") || ss.insertSheet("Users");
  sheet.appendRow([new Date(), data.name, data.address, data.whatsapp, data.password]);
  return jsonResponse({ success: true });
}

function handleLogin(data) {
  const user = findUserByPassword(data.password);
  if (user) return jsonResponse({ success: true, name: user.name });
  return jsonResponse({ success: false, message: "Password salah atau belum terdaftar." });
}

function handleGetPosts(data) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Posts");
  if (!sheet) return jsonResponse({ success: true, posts: [] });
  const values = sheet.getDataRange().getValues();
  const userPosts = [];
  for (let i = 1; i < values.length; i++) {
    if (values[i][8] == data.password) {
      userPosts.push({
        timestamp: values[i][0], jsonId: values[i][1], postId: values[i][2],
        title: values[i][3], price: values[i][4], location: values[i][5],
        description: values[i][6], blogUrl: values[i][7],
        altText: values[i][9], photoData: values[i][10], status: values[i][11] || "Aktif",
        labels: values[i][12] ? JSON.parse(values[i][12]) : []
      });
    }
  }
  return jsonResponse({ success: true, posts: userPosts.reverse() }); // Newest first
}

function handleCreatePost(data) {
  const bloggerRes = postToBlogger(data);
  savePostToSpreadsheet(data, bloggerRes);
  return jsonResponse({ success: true, url: bloggerRes.url });
}

function handleUpdatePost(data) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Posts");
  if (!sheet) return jsonResponse({ success: false, message: "Sheet not found" });
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  let existingPostId = "";
  let existingPhotoData = "";
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] == data.jsonId && values[i][8] == data.password) {
      rowIndex = i + 1;
      existingPostId = values[i][2];
      existingPhotoData = values[i][10];
      break;
    }
  }
  if (rowIndex === -1) return jsonResponse({ success: false, message: "Data tidak ditemukan." });
  if (!data.photoData) data.photoData = existingPhotoData;

  const secrets = getSecrets();
  if (existingPostId && secrets.blogId) {
    try {
      const status = data.status || "Aktif";
      const content = constructBloggerContent(data);
      Blogger.Posts.patch({
        title: `[${status}] ${data.title}`.substring(0, 150),
        content: content,
        labels: data.labels || []
      }, secrets.blogId, existingPostId);
    } catch (e) { Logger.log("Blogger update failed: " + e.message); }
  }

  sheet.getRange(rowIndex, 4, 1, 4).setValues([[data.title, data.price, data.location, data.description]]);
  sheet.getRange(rowIndex, 10, 1, 4).setValues([[data.alt_text, data.photoData, data.status, JSON.stringify(data.labels || [])]]);
  return jsonResponse({ success: true });
}

function handleDeletePost(data) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Posts");
  if (!sheet) return jsonResponse({ success: false });
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  let postIdToDelete = "";

  for (let i = 1; i < values.length; i++) {
    if (values[i][1] == data.jsonId && values[i][8] == data.password) {
      rowIndex = i + 1;
      postIdToDelete = values[i][2];
      break;
    }
  }

  if (rowIndex !== -1) {
    // Delete from Blogger
    const secrets = getSecrets();
    if (postIdToDelete && secrets.blogId) {
      try { Blogger.Posts.remove(secrets.blogId, postIdToDelete); } catch (e) {}
    }
    // Delete from SS
    sheet.deleteRow(rowIndex);
    return jsonResponse({ success: true });
  }
  return jsonResponse({ success: false, message: "Data tidak ditemukan." });
}

function constructBloggerContent(data) {
  const status = data.status || "Aktif";
  const badgeColor = status === "Terjual" ? "#ef4444" : "#22c55e";
  const statusBadge = `<div style="display:inline-block; padding:2px 8px; background:${badgeColor}; color:white; border-radius:4px; font-weight:bold; margin-bottom:10px;">${status}</div>`;
  const imgHtml = data.photoData ? `<div style="text-align: center;"><img alt="${data.alt_text}" src="${data.photoData}" style="max-width: 100%; border-radius:8px;" /></div><br />` : "";
  return `${statusBadge}${imgHtml}<p>${data.description}</p><ul><li>Harga: <strong>${data.price}</strong></li><li>Lokasi: ${data.location}</li><li>ID: <code>${data.jsonId}</code></li></ul>`;
}

function postToBlogger(data) {
  const secrets = getSecrets();
  const status = data.status || "Aktif";
  const content = constructBloggerContent(data);
  return Blogger.Posts.insert({
    title: `[${status}] ${data.title}`.substring(0, 150),
    content: content,
    labels: data.labels || []
  }, secrets.blogId);
}

function savePostToSpreadsheet(data, bloggerRes) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Posts") || ss.insertSheet("Posts");
  if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "JSON-ID", "Post-ID", "Title", "Price", "Location", "Description", "Blog URL", "Password", "Alt Text", "Photo-Data", "Status", "Labels"]);
  sheet.appendRow([new Date(), data.jsonId, bloggerRes.id, data.title, data.price, data.location, data.description, bloggerRes.url, data.password, data.alt_text, data.photoData, data.status, JSON.stringify(data.labels || [])]);
}

function findUserByPassword(password) {
  const ss = getSS();
  const sheet = ss.getSheetByName("Users");
  if (!sheet) return null;
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (values[i][4] == password) return { name: values[i][1] };
  }
  return null;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
