import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE = process.env.BASE_URL || 'http://localhost:4337';
const only = process.argv[2] || '';
const checks = [];
const check = (name, fn) => checks.push({ name, fn });

check('case', async (page) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const rows = page.locator('details.case-row');
  assert.equal(await rows.count(), 3, 'expected 3 case rows');
  const first = rows.first();
  assert.equal(await first.locator('.case-panel').isVisible(), false, 'panel must start closed');
  await first.locator('summary').click();
  assert.equal(await first.evaluate((el) => el.open), true, 'details must open');
  assert.equal(await first.locator('.case-panel').isVisible(), true, 'panel must be visible');
  const text = await first.locator('.case-panel').innerText();
  assert.ok(text.includes('PRZED'), 'panel must include before label');
  assert.ok(text.includes('PO\n'), 'panel must include after label');
  assert.deepEqual(
    await first.locator('.case-label').allTextContents(),
    ['Przed', 'Po'],
    'before/after labels must be explicit',
  );
});

check('protocol', async (page) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const section = page.locator('section.protocol');
  assert.equal(await page.locator('.protocol-rail span').count(), 4, 'rail segments missing');
  await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(150);
  const progress = Number(await section.getAttribute('data-progress'));
  assert.ok(progress > 0 && progress <= 1, `protocol progress=${progress}`);
  const active = Number(await section.getAttribute('data-active'));
  assert.ok(Number.isInteger(active) && active >= 0 && active <= 3, `active=${active}`);
  assert.equal(
    await page.locator('.protocol-rail span.is-filled').count(),
    active + 1,
    'filled segments must end at active step',
  );
  assert.equal(await page.locator('.protocol-item.is-active').count(), 1, 'exactly one active step');
});

check('calculator', async (page) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const before = await page.locator('#calc-save').innerText();
  assert.notEqual(before, '—', 'calculator must render a value');
  const bar = page.locator('#calc-paybar');
  assert.equal(await bar.count(), 1, 'payback bar missing');
  assert.match(await bar.evaluate((el) => el.style.width), /%$/, 'bar must have width');
  await page.evaluate(() => {
    const el = document.getElementById('calc-hours');
    el.value = '30';
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.waitForTimeout(100);
  const after = await page.locator('#calc-save').innerText();
  assert.notEqual(after, before, 'changing hours must change savings');
  assert.match(await bar.evaluate((el) => el.style.width), /%$/, 'bar must stay set');
  assert.match(await page.locator('#calc-verdict').innerText(), /zwrot|mies/i);
});

check('flow', async (page) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const flow = page.locator('#flow');
  assert.equal(await flow.count(), 1, 'flow section missing');
  assert.equal(await flow.locator('.flow-step').count(), 4, 'expected 4 flow steps');
  const text = await flow.innerText();
  for (const word of ['Sklep', 'BaseLinker', 'ERP', 'Raport']) {
    assert.ok(text.includes(word), `flow copy missing ${word}`);
  }
  const animation = await flow.locator('.flow-step').first().evaluate(
    (el) => getComputedStyle(el, '::after').animationName,
  );
  assert.notEqual(animation, 'none', 'flow connector should animate');
});

check('flow-reduced', async (_page, browser) => {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const animation = await page.locator('#flow .flow-step').first().evaluate(
    (el) => getComputedStyle(el, '::after').animationName,
  );
  assert.equal(animation, 'none', 'reduced motion must stop connector');
  await ctx.close();
});

check('layout', async (page) => {
  for (const width of [320, 390, 414]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    assert.ok(m.sw <= m.cw + 1, `${width}px overflow: ${m.sw}/${m.cw}`);
  }
});

const browser = await chromium.launch();
let failed = 0;
for (const item of checks) {
  if (only && item.name !== only) continue;
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    await item.fn(page, browser);
    console.log('PASS', item.name);
  } catch (error) {
    failed += 1;
    console.error('FAIL', item.name);
    console.error(error.message);
  } finally {
    await ctx.close();
  }
}
await browser.close();
if (failed) process.exit(1);
console.log(`ALL ${checks.length} CHECKS PASSED`);
