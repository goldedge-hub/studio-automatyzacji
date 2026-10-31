import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4337/', { waitUntil: 'networkidle' });

const tabs = [];
for (let i = 0; i < 14; i++) {
  await page.keyboard.press('Tab');
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 32),
      outlineWidth: cs.outlineWidth,
      outlineStyle: cs.outlineStyle,
      visibleBox: el.getBoundingClientRect().width > 0,
    };
  });
  tabs.push(info);
}
console.log('TAB:', JSON.stringify(tabs.map((t) => `${t.tag}:${t.text}|${t.outlineStyle}/${t.outlineWidth}`), null, 0));

// klawiatura: otwarcie menu mobilnego
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await mob.newPage();
await mp.goto('http://localhost:4337/', { waitUntil: 'networkidle' });
await mp.keyboard.press('Tab');
const opened = await mp.evaluate(() => {
  const s = document.querySelector('.menu summary');
  s.focus();
  s.click();
  return document.querySelector('.menu')?.hasAttribute('open');
});
console.log('menu po kliknięciu z klawiatury:', opened);

// zoom 200% (skala tekstu) — czy layout się nie rozpada
for (const w of [1440, 390]) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 } });
  const p2 = await c.newPage();
  await p2.goto('http://localhost:4337/', { waitUntil: 'networkidle' });
  const res = await p2.evaluate(() => {
    document.documentElement.style.fontSize = '32px'; // 200% bazy 16px
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      scrollW: document.documentElement.scrollWidth,
      inner: window.innerWidth,
    };
  });
  console.log(`zoom-200 @${w}:`, JSON.stringify(res));
  await c.close();
}
await browser.close();
