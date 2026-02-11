# OMNI v20.6 (Auto-Pilot) - OmniPost Pro

Professional Sales Post Manager for Blogger with AI-Enhanced SEO and Automation.

## Features
- **Architect Intelligence:** AI-driven market research and content writing with SEO analyzer.
- **Pixel Forge:** Client-side visual asset creation with auto-compression.
- **War Room:** Content multiplier for geo-targeted niche marketing.
- **Atom Bunker:** Parallel automation engine for bulk publishing.
- **Persistence:** Base64 image storage in Google Sheets to prevent data loss.

## Installation & Setup

### 1. Backend (Google Apps Script)
1. Create a new Google Apps Script project at [script.google.com](https://script.google.com).
2. Copy the contents of `code.gs` into the script editor.
3. **Enable Services:** Click the `+` next to Services and add the **Blogger API v3**.
4. **Script Properties:** Go to Project Settings -> Script Properties and add `BLOG_ID`.
5. **Deploy:** Click Deploy -> New Deployment -> Web App.
   - Execute as: Me
   - Who has access: Anyone (to allow the frontend to bridge).
6. Copy the **Web App URL**.

### 2. Frontend (Single Page Application)
1. Open `index.html` in your browser.
2. Click the **Konfigurasi** button (Gear icon).
3. Paste the **Web App URL** into the "Apps Script URL (Bridge)" field.
4. Add your **Gemini API Keys** (one per line).
5. Enter your **Blog ID** and **WhatsApp Number**.
6. Click **SAVE SYSTEM**.

### 3. Google Sheets Integration
- The system automatically creates a `Posts` sheet in the spreadsheet `1NgDZ6fzz30wH9pElVwoSepkkkPd73mmccl2WRCIyZ7A` to log all activities.
- Ensure the account running the script has edit access to this spreadsheet.

## Disclaimer
Always use safe delays (3-5 seconds) in the Atom Bunker to avoid being flagged for spam.
