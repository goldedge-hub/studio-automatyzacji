import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
const page = await ctx.newPage();

for (const p of ['/case-studies/', '/przykladowy-raport/']) {
  await page.goto('http://localhost:4337' + p, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });
  const out = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    return r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({ target: n.target.join(' '), html: n.html.slice(0, 120) })),
    }));
  });
  console.log(p, JSON.stringify(out, null, 1));
}
await browser.close();
