// CONFIGURATION
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const BLOG_ID = "YOUR_BLOG_ID";
const GEMINI_API_KEYS = [
  "API_KEY_1",
  "API_KEY_2"
];

/**
 * Main Web App Entry Point
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);
    if (action === 'getPosts') return handleGetPosts(data);
    if (action === 'createPost') return handleCreatePost(data);
    if (action === 'updatePost') return handleUpdatePost(data);

    return jsonResponse({ success: false, message: "Invalid action" });
  } catch (err) {
    return jsonResponse({ success: false, message: err.toString() });
  }
}

function handleRegister(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Users") || ss.insertSheet("Users");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Nama", "Alamat", "WhatsApp", "Password"]);
  }
  sheet.appendRow([new Date(), data.name, data.address, data.whatsapp, data.password]);
  return jsonResponse({ success: true });
}

function handleLogin(data) {
  const user = findUserByPassword(data.password);
  if (user) {
    return jsonResponse({ success: true, name: user.name });
  }
  return jsonResponse({ success: false, message: "Password salah!" });
}

function handleGetPosts(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Posts");
  if (!sheet) return jsonResponse({ success: true, posts: [] });

  const values = sheet.getDataRange().getValues();
  const userPosts = [];
  for (let i = 1; i < values.length; i++) {
    if (values[i][7] == data.password) { // Match by password
      userPosts.push({
        timestamp: values[i][0],
        jsonId: values[i][1],
        title: values[i][2],
        price: values[i][3],
        location: values[i][4],
        seoContent: JSON.parse(values[i][5]),
        blogUrl: values[i][6]
      });
    }
  }
  return jsonResponse({ success: true, posts: userPosts });
}

function handleCreatePost(data) {
  if (!findUserByPassword(data.password)) return jsonResponse({ success: false, message: "Unauthorized" });
  const aiResult = generateSeoContent(data);
  const bloggerRes = postToBlogger(data, aiResult);
  savePostToSpreadsheet(data, aiResult, bloggerRes.url);
  return jsonResponse({ success: true, url: bloggerRes.url });
}

function handleUpdatePost(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Posts");
  if (!sheet) return jsonResponse({ success: false, message: "Sheet not found" });

  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][1] == data.jsonId && values[i][7] == data.password) {
      rowIndex = i + 1;
      break;
    }
  }

  if (rowIndex === -1) return jsonResponse({ success: false, message: "Data tidak ditemukan." });

  // Re-generate AI content if requested or use existing
  const aiResult = data.regenAi ? generateSeoContent(data) : JSON.parse(values[rowIndex-1][5]);

  // Update Blogger (Note: Blogger API update would be complex, here we update Spreadsheet record)
  // In a real scenario, you'd call Blogger.Posts.patch()

  sheet.getRange(rowIndex, 3, 1, 4).setValues([[data.title, data.price, data.location, JSON.stringify(aiResult)]]);
  return jsonResponse({ success: true });
}

function generateSeoContent(data) {
  const prompt = `Buatlah deskripsi jualan SEO friendly dalam Bahasa Indonesia untuk produk berikut:
  Nama Produk: ${data.title}
  Harga: ${data.price}
  Lokasi: ${data.location}
  Deskripsi Dasar: ${data.description}
  Output JSON: { "seo_description": "...", "labels": ["tag1", "tag2"] }`;

  for (const apiKey of GEMINI_API_KEYS) {
    try {
      const res = UrlFetchApp.fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: "POST", contentType: "application/json", payload: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const json = JSON.parse(res.getContentText());
      const rawText = json.candidates[0].content.parts[0].text;
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
    } catch (err) { continue; }
  }
  throw new Error("AI Error or Limit reached.");
}

function postToBlogger(data, aiContent) {
  const imgHtml = data.photoData ? `<div style="text-align: center;"><img alt="${data.alt_text}" src="${data.photoData}" style="max-width: 100%;" /></div><br />` : "";
  const content = `${imgHtml}<p>${aiContent.seo_description}</p><ul><li>Harga: ${data.price}</li><li>Lokasi: ${data.location}</li><li>ID: ${data.jsonId}</li></ul>`;
  return Blogger.Posts.insert({ title: data.title.substring(0, 150), content: content, labels: aiContent.labels }, BLOG_ID);
}

function savePostToSpreadsheet(data, aiContent, blogUrl) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Posts") || ss.insertSheet("Posts");
  if (sheet.getLastRow() === 0) sheet.appendRow(["Timestamp", "JSON-ID", "Title", "Price", "Location", "SEO Content", "Blog URL", "Password"]);
  sheet.appendRow([new Date(), data.jsonId, data.title, data.price, data.location, JSON.stringify(aiContent), blogUrl, data.password]);
}

function findUserByPassword(password) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
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
