import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4337';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

await page.goto(`${BASE}/case-studies/`, { waitUntil: 'networkidle' });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${BASE}/case-studies/`, { waitUntil: 'networkidle' });
const mobileWidth = await mobile.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  bodyW: document.body.clientWidth,
}));
await mobile.close();

const data = await page.evaluate(() => {
  const text = (el) => el?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const anchors = [...document.querySelectorAll('a[href^="#"]')];
  return {
    h1: text(document.querySelector('h1')),
    indexRows: document.querySelectorAll('.study-index-row').length,
    sections: [...document.querySelectorAll('section.study-section[id]')].map((el) => el.id),
    compares: [...document.querySelectorAll('.study-section')].map((el) => ({
      id: el.id,
      labels: [...el.querySelectorAll('.study-label')].map(text),
      notes: el.querySelectorAll('.study-bottom > div').length,
      flowSteps: el.querySelectorAll('.study-flow > li').length,
    })),
    brokenAnchors: anchors
      .map((a) => a.getAttribute('href'))
      .filter((href) => href.length > 1 && !document.querySelector(href)),
    ctas: [...document.querySelectorAll('.study-foot a')].map((a) => a.getAttribute('href')),
    scrollW: document.documentElement.scrollWidth,
    bodyW: document.body.clientWidth,
  };
});

const failures = [];
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures.push(name);
};

check('single h1', /^Case studies\. Co jest faktem\.$/.test(data.h1), data.h1);
check('three index rows', data.indexRows === 3, String(data.indexRows));
check('three study sections', data.sections.length === 3, data.sections.join(', '));
check('three before/after pairs', data.compares.length === 3 && data.compares.every((c) => c.labels.join('|') === 'Przed|Po'), JSON.stringify(data.compares));
check('two evidence blocks per study', data.compares.every((c) => c.notes === 2), JSON.stringify(data.compares.map((c) => c.notes)));
check('four flow steps per study', data.compares.every((c) => c.flowSteps === 4), JSON.stringify(data.compares.map((c) => c.flowSteps)));
check('anchors resolve', data.brokenAnchors.length === 0, data.brokenAnchors.join(', '));
check('six study CTAs', data.ctas.length === 6, String(data.ctas.length));
check('no horizontal overflow', data.scrollW <= data.bodyW + 1, `${data.scrollW}/${data.bodyW}`);
check('no horizontal overflow mobile', mobileWidth.scrollW <= mobileWidth.bodyW + 1, `${mobileWidth.scrollW}/${mobileWidth.bodyW}`);
check('no console errors', errors.length === 0, errors.join(' | '));

await browser.close();
if (failures.length) {
  console.error(`FAILED: ${failures.length}`);
  process.exit(1);
}
console.log('ALL CASE STUDIES CHECKS PASSED');
