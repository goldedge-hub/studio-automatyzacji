import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const axeSource = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const paths = ['/', '/audyt/', '/ile-kosztuje/', '/wdrozenia/', '/case-studies/', '/oferty/', '/produkty/', '/checklista/', '/kontakt/', '/poradnik/', '/przykladowy-raport/', '/opieka/', '/integracje/', '/branze/', '/dla-agencji/', '/o-studiu/', '/zaufanie/', '/regulamin/'];

const browser = await chromium.launch();
const results = [];
for (const width of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width, height: 1000 } });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto('http://localhost:4337' + p, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      });
      return r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        sample: v.nodes[0]?.target?.join(' ')?.slice(0, 80),
      }));
    });
    for (const v of res) results.push({ width, p, ...v });
  }
  await ctx.close();
}
await browser.close();

const byId = new Map();
for (const r of results) {
  const k = r.id + '|' + r.impact;
  if (!byId.has(k)) byId.set(k, { ...r, pages: new Set() });
  byId.get(k).pages.add(r.p);
}
console.log('naruszenia:', results.length, 'unikalne typy:', byId.size);
[...byId.values()].sort((a, b) => b.nodes - a.nodes).slice(0, 20).forEach((v) => {
  console.log(`${v.impact} | ${v.id} | nodes=${v.nodes} | ${v.sample} | pages=${[...v.pages].slice(0, 4).join(',')}`);
});
