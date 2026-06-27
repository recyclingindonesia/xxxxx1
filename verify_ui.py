import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Construct absolute path to the HTML file
    file_path = "file://" + os.path.abspath("omni_router_pro.html")
    page.goto(file_path)
    page.wait_for_timeout(1000)

    # Verify basic elements are visible
    page.wait_for_selector(".sidebar")
    page.wait_for_selector(".main-area")

    # Click settings to show the modal
    page.click("#btnSettings")
    page.wait_for_timeout(1000)

    # Take screenshot of the settings modal
    page.screenshot(path="/home/jules/verification/screenshots/settings_modal.png")

    # Close settings
    page.click("#btnSaveSettings")
    page.wait_for_timeout(500)

    # Test Markdown rendering with a multi-line code block
    # We simulate sending a message by directly manipulating the state since we don't have an API key
    # or we can just mock the UI interaction if possible.
    # Actually, let's just inject a message into the UI for verification.
    page.evaluate("""() => {
        const chat = ensureActiveChat();
        chat.messages.push({
            role: 'assistant',
            content: 'Here is a code block:\\n```javascript\\nfunction hello() {\\n  console.log("world");\\n}\\n```',
            timestamp: Date.now()
        });
        renderMessages(chat);
    }""")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/markdown_test.png")

    # Verify code block exists and has highlighted class
    assert page.locator("pre code.hljs.javascript").is_visible()

    # Toggle theme
    page.click("#btnTheme")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/light_mode.png")

    # Final state
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
