import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Test desktop view
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        await page.goto("file:///app/index.html")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="screenshot_desktop.png")
        print("Desktop screenshot captured: screenshot_desktop.png")

        # Test mobile view
        pixel_5 = p.devices['Pixel 5']
        mobile_context = await browser.new_context(**pixel_5)
        mobile_page = await mobile_context.new_page()
        await mobile_page.goto("file:///app/index.html")
        await mobile_page.wait_for_timeout(1000)
        await mobile_page.screenshot(path="screenshot_mobile.png")
        print("Mobile screenshot captured: screenshot_mobile.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())