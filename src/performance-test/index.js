// High-level performance regression test.
// The idea is to test the performance of the whole system.
// Such a test should be resilient to API and archicture changes.
// The test aims to measure the peformance of `chart.data` and `chart.width/height` changes.
// The `width/height` test measures the layout and painting.
// The `data` test additionally measures data processing.
// The first can be subtracted from the second to approximate the cost of data processing.

// Note that we do not expect 60 FPS, in fact the examples are deliberately heavy to have well below 60 FPS
// on modern hardware. We are only interested in performance delta from version to version.

// How to use:
// Bundle the `performance-test-data` and `performance-test-size` examples first
// npm run bundleOneAndWatch -- --env.example=performance-test-data
// npm run bundleOneAndWatch -- --env.example=performance-test-size
// ----- CLOSE ALL APPS (IDEs included) !!! -----
// Then run in terminal:
// node src/performance-test/index.js
// Update results.txt, mentioning CPU, GPU, puppeteer version, OS version, commit hash and date of the test.

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 650,
        height: 650,
        deviceScaleFactor: 2
    });


    await page.goto(`file:${path.join(__dirname, '../../dist/performance-test-data/index.html')}`);
    const dataTestResults = await page.evaluate(async () => {
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const results = window.chartTestResults;
                if (results) {
                    clearInterval(interval);
                    resolve(results);
                }
            }, 100);
        });
    });
    console.log('performance-test-data results:', JSON.stringify(dataTestResults, null, 4));


    await page.goto(`file:${path.join(__dirname, '../../dist/performance-test-size/index.html')}`);
    const sizeTestResults = await page.evaluate(async () => {
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const results = window.chartTestResults;
                if (results) {
                    clearInterval(interval);
                    resolve(results);
                }
            }, 100);
        });
    });
    console.log('performance-test-size results:', JSON.stringify(sizeTestResults, null, 4));


    await browser.close();
})();