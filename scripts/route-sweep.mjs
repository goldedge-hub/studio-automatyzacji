import { chromium } from 'playwright';
import fs from 'node:fs';

const xml = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const base = 'http://localhost:4337';
const browser = await chromium.launch();
const problems = [];
const rows = [];
for (const vp of [
  { n: 'desktop', w: 1440, h: 900 },
  { n: 'mobile', w: 390, h: 844 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  for (const path of paths) {
    errors = [];
    const res = await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 20));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(120);
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      nav: document.querySelectorAll('.nav-desktop a').length,
      title: document.title,
    }));
    const ok = res?.status() === 200 && m.sw <= m.cw + 1 && m.h1 === 1 && errors.length === 0;
    rows.push({ vp: vp.n, path, status: res?.status(), ...m, errors: errors.slice(0, 3), ok });
    if (!ok) problems.push({ vp: vp.n, path, status: res?.status(), ...m, errors: errors.slice(0, 3) });
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync('out/routes-paper.json', JSON.stringify({ paths: paths.length, rows, problems }, null, 2));
console.log(JSON.stringify({ paths: paths.length, checked: rows.length, problems }, null, 2));
