import { chromium } from 'playwright';

const BASE = process.env.QA_URL || 'http://127.0.0.1:4334';
const OUT = process.env.QA_OUT || 'C:/Users/sfajr/Documents/StudioAutomation/screens/v3';
const pages = ['/', '/wdrozenia/', '/audyt/', '/kontakt/', '/case-studies/', '/o-studiu/', '/opieka/', '/dla-agencji/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1180, height: 820 },
  { name: 'tablet', width: 834, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  for (const path of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    // dociągnij dół, żeby odpalić reveal
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const over = [];
      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > doc.clientWidth + 1.5 && !el.closest('.aurora')) {
          over.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + ' right=' + Math.round(r.right));
        }
      });
      return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, over: over.slice(0, 8) };
    });
    if (metrics.scrollW > metrics.clientW + 1 || metrics.over.length) {
      problems.push({ vp: vp.name, path, ...metrics });
    }

    if (path === '/' || path === '/kontakt/') {
      await page.screenshot({ path: `${OUT}/${vp.name}-${path === '/' ? 'home' : 'kontakt'}.png`, fullPage: path === '/' ? true : false });
    }
  }
  if (errors.length) problems.push({ vp: vp.name, consoleErrors: [...new Set(errors)].slice(0, 5) });
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify({ problems }, null, 2));
