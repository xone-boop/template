import { chromium } from 'playwright';

async function testPlaywrightMCP() {
    console.log('🎭 Testing Playwright MCP (Browser Automation)...\n');

    try {
        // Launch headless browser
        console.log('1️⃣  Launching headless browser...');
        const browser = await chromium.launch({ headless: true });
        console.log('   ✅ Browser launched\n');

        // Create new page
        console.log('2️⃣  Creating new page...');
        const page = await browser.newPage();
        console.log('   ✅ Page created\n');

        // Test 1: Navigate to API health endpoint
        console.log('3️⃣  Testing API health endpoint...');
        const response = await page.goto('http://localhost:3001/api/health');
        console.log(`   Status: ${response.status()}`);
        console.log('   ✅ Navigation successful\n');

        // Test 2: Get page content
        console.log('4️⃣  Getting page content...');
        const content = await page.content();
        console.log(`   Content length: ${content.length} bytes`);
        console.log('   ✅ Content retrieved\n');

        // Test 3: Take screenshot
        console.log('5️⃣  Taking screenshot...');
        await page.screenshot({ path: 'test-screenshot.png' });
        console.log('   ✅ Screenshot saved to test-screenshot.png\n');

        // Test 4: Evaluate JavaScript
        console.log('6️⃣  Evaluating JavaScript in page...');
        const result = await page.evaluate(() => {
            const json = JSON.parse(document.body.innerText);
            return json.status;
        });
        console.log(`   Result: ${result}`);
        console.log('   ✅ JavaScript evaluated\n');

        // Test 5: Get response timing
        console.log('7️⃣  Checking response timing...');
        const navigationTiming = await page.evaluate(() => {
            const timing = window.performance.timing;
            return {
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart
            };
        });
        console.log(`   Load time: ${navigationTiming.loadTime}ms`);
        console.log('   ✅ Timing collected\n');        // Close browser
        console.log('8️⃣  Closing browser...');
        await browser.close();
        console.log('   ✅ Browser closed\n');

        console.log('✅ Playwright MCP tests passed!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testPlaywrightMCP();
