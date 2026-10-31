const { chromium } = require('C:/Users/sfajr/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4337/przykladowy-raport/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const handle = (await page.$('.report-doc')) || (await page.$('article')) || (await page.$('main'));
  if (!handle) {
    console.log('brak kontenera');
    process.exit(1);
  }
  const box = await handle.boundingBox();
  console.log('box', JSON.stringify(box));
  await handle.screenshot({ path: 'public/img/raport-strona-1.png' });
  console.log('saved');
  await browser.close();
})();
