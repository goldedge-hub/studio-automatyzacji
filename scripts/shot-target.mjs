import { chromium } from 'playwright';

const base = 'http://localhost:4337/';
const out = 'C:/Users/sfajr/Projects/studio-automatyzacji/out';
const b = await chromium.launch();
for (const vp of [
  { n: 'home-target-d', w: 1440, h: 900 },
  { n: 'home-target-m', w: 390, h: 844 },
  { n: 'home-target-t', w: 834, h: 1000 },
]) {
  const c = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const p = await c.newPage();
  const errors = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await p.goto(base, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/${vp.n}.png`, fullPage: true });
  const info = await p.evaluate(() => {
    const r = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
    };
    const h1 = document.querySelector('h1');
    const cs = h1 ? getComputedStyle(h1) : null;
    return {
      h1: h1?.innerText,
      h1Rect: r('h1'),
      h1Font: cs ? { size: cs.fontSize, lineHeight: cs.lineHeight, family: cs.fontFamily } : null,
      header: r('.site-head'),
      heroTop: r('.hero-top'),
      heroSide: r('.hero-side'),
      figure: r('.hero-figure'),
      marquee: r('.marquee'),
      nav: [...document.querySelectorAll('.nav-desktop a')].map((a) => a.innerText),
      positions: Object.fromEntries(['.hero-kicker','.hero-v4 h1','.hero-lede','.hero-actions','.hero-meta','.hero-side','.hero-figure','.figure-main p','.marquee','.protocol'].map((sel)=>{const el=document.querySelector(sel); if(!el) return [sel,null]; const r=el.getBoundingClientRect(); return [sel,{y:Math.round(r.y),b:Math.round(r.bottom),h:Math.round(r.height)}]})),
      ctaLabels: [...document.querySelectorAll('.hero-actions a')].map(a=>a.innerText),
      headerCta: (()=>{const a=document.querySelector('.nav-cta'); if(!a) return null; const c=getComputedStyle(a); const r=a.getBoundingClientRect(); return {bg:c.backgroundColor,color:c.color,border:c.borderColor,y:Math.round(r.y),h:Math.round(r.height)}})(),
      priceOnPage: document.body.innerText.includes('1 043'),
      scrollW: document.documentElement.scrollWidth,
      bodyW: document.body.clientWidth,
    };
  });
  console.log(vp.n, JSON.stringify(info));
  if (errors.length) console.log(vp.n, 'CONSOLE ERRORS', JSON.stringify(errors));
  await c.close();
}
await b.close();
