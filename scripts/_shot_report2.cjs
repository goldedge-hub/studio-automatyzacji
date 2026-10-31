const { chromium } = require('C:/Users/sfajr/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1180, height: 1200 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4337/przykladowy-raport/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const handle = (await page.$('.report-doc')) || (await page.$('article')) || (await page.$('main'));
  if (!handle) { console.log('brak kontenera'); process.exit(1); }
  const box = await handle.boundingBox();
  const clip = {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(box.width, 1180 - box.x),
    height: 1180,
  };
  console.log('clip', JSON.stringify(clip));
  await page.screenshot({ path: 'public/img/raport-strona-1.png', clip, fullPage: true });
  console.log('saved');
  await browser.close();
})();
