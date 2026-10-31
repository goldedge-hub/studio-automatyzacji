import { chromium } from 'playwright';
import fs from 'node:fs';

const B = 'http://127.0.0.1:4337';
const OUT = 'C:/Users/sfajr/Documents/StudioAutomation/screens/2026-10-31';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// desktop
{
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await c.newPage();
  const shots = [
    ['/', 'd-home-hero'],
    ['/dla-agencji/', 'd-agencje'],
    ['/audyt/', 'd-audyt'],
    ['/ile-kosztuje/', 'd-cennik'],
    ['/przykladowy-raport/', 'd-raport'],
  ];
  for (const [path, name] of shots) {
    await p.goto(B + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/${name}.png` });
  }
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  const proof = p.locator('.at-proof');
  if (await proof.count()) await proof.first().screenshot({ path: `${OUT}/d-proof-report.png` });
  await c.close();
}

// mobile
{
  const c = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await c.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/m-home-hero.png` });
  await p.evaluate(async () => {
    window.scrollTo({ top: 1500, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 500));
  });
  await p.screenshot({ path: `${OUT}/m-home-sticky.png` });
  await p.goto(B + '/ile-kosztuje/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `${OUT}/m-cennik.png` });
  await p.goto(B + '/dla-agencji/', { waitUntil: 'networkidle' });
  await p.screenshot({ path: `${OUT}/m-agencje.png` });
  await c.close();
}

await browser.close();
console.log(fs.readdirSync(OUT).map((f) => `${f} ${(fs.statSync(`${OUT}/${f}`).size / 1024).toFixed(0)}kB`).join('\n'));
