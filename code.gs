/**
 * OMNI v20.6 - Backend Engine (Google Apps Script)
 * Professional Sales Post Manager - OmniPost Pro
 */

const CONFIG = {
  // Use Script Property if available, otherwise fallback to the hardcoded primary ID or Active Spreadsheet
  get SPREADSHEET_ID() {
    const props = PropertiesService.getScriptProperties();
    const id = props.getProperty('SPREADSHEET_ID') || '1NgDZ6fzz30wH9pElVwoSepkkkPd73mmccl2WRCIyZ7A';
    try {
      return SpreadsheetApp.openById(id).getId();
    } catch (e) {
      try {
        return SpreadsheetApp.getActiveSpreadsheet().getId();
      } catch (e2) {
        return id; // Fallback to string if both fail
      }
    }
  },
  SHEET_NAME: 'Posts',
  MAX_CELL_CHARS: 50000 // Google Sheets cell limit
};

/**
 * Handle GET requests (Health Check)
 */
function doGet() {
  return ContentService.createTextOutput("OMNI v20.6 Backend Active. System is ready to receive requests.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handle POST requests from frontend (Bridge)
 */
function doPost(e) {
  const response = { status: 'error', message: 'Unknown request' };

  try {
    if (!e.postData || !e.postData.contents) {
      throw new Error('No post data received');
    }

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;

    switch(action) {
      case 'publish':
        response.data = handlePublish(payload);
        response.status = 'success';
        break;

      case 'read':
        response.data = handleRead(payload);
        response.status = 'success';
        break;

      case 'update':
        response.data = handleUpdate(payload);
        response.status = 'success';
        break;

      default:
        throw new Error('Action "' + action + '" not supported');
    }

  } catch (err) {
    response.message = err.toString();
    console.error('Backend Error:', err);
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle publishing to Blogger
 */
function handlePublish(data) {
  const blogId = data.blogId || PropertiesService.getScriptProperties().getProperty('BLOG_ID');
  if (!blogId) throw new Error('BLOG_ID is not configured in Script Properties');

  const post = {
    title: data.title,
    content: data.content,
    labels: data.labels || []
  };

  // Publish to Blogger (Requires Blogger API enabled in Services)
  // Blogger.Posts.insert(post, blogId)
  let result;
  try {
    result = Blogger.Posts.insert(post, blogId);
  } catch (e) {
    throw new Error('Blogger API Error: ' + e.message);
  }

  // Record to Google Sheets
  recordToSheet({
    timestamp: new Date(),
    title: data.title,
    url: result.url,
    blogId: blogId,
    status: 'Aktif',
    labels: post.labels.join(', '),
    imageData: data.image || '' // Persistence for base64 image
  });

  return result;
}

/**
 * Handle reading posts from Sheet
 */
function handleRead(data) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  const headers = values.shift();

  return values.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h.toLowerCase()] = row[i]);
    return obj;
  });
}

/**
 * Handle updating post status or details
 */
function handleUpdate(data) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet not found');

  const values = sheet.getDataRange().getValues();
  const urlIndex = 2; // Assuming URL is the 3rd column

  for (let i = 1; i < values.length; i++) {
    if (values[i][urlIndex] === data.url) {
      // Update Status or other fields
      if (data.status) sheet.getRange(i + 1, 5).setValue(data.status);
      return { success: true };
    }
  }

  throw new Error('Post not found in records');
}

/**
 * Record publication to Google Sheets
 */
function recordToSheet(data) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      // ImageData is hidden or last column for persistence
      sheet.appendRow(['Timestamp', 'Judul', 'URL', 'Blog ID', 'Status', 'Labels', 'ImageData']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f3f3f3');
      sheet.hideColumns(7); // Hide base64 data
    }

    // Ensure imageData doesn't exceed cell limit
    let safeImageData = data.imageData || '';
    if (safeImageData.length > CONFIG.MAX_CELL_CHARS) {
      console.warn('Image data exceeds cell limit, truncating...');
      safeImageData = '[Image Too Large]';
    }

    sheet.appendRow([
      data.timestamp,
      data.title,
      data.url,
      data.blogId,
      data.status,
      data.labels,
      safeImageData
    ]);

  } catch (e) {
    console.error('Failed to record to sheet:', e);
  }
}
