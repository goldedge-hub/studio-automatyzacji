// Weryfikacja poprawiek audytu na lokalnym preview (Astro, port 4329).
// Uruchomienie: node scripts/verify-fixes.mjs [katalog-wynikow]
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire('/home/box/.local/lib/node_modules/@playwright/test/');
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:4329';
const OUT = process.env.OUT_DIR || path.resolve('audit-fixes');
const SHOTS = path.join(OUT, 'after');
fs.mkdirSync(SHOTS, { recursive: true });

const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const u = new URL(m[1]);
  return u.pathname;
});
for (const extra of ['/404/', '/cennik/', '/o-mnie/']) if (!paths.includes(extra)) paths.push(extra);

const failed = [];
const results = { base: BASE, pages: {}, form: {}, mobile: {}, shots: [], priceSet: {}, summary: {} };
const note = (msg) => { failed.push(msg); console.log('FAIL', msg); };

const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox'] });

async function newPage(context) {
  const page = await context.newPage();
  const consoleErrors = [];
  const blocked = [];
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const url = m.location()?.url || '';
    if (url.includes('radarnieruchomosci.com')) { blocked.push(m.text()); return; }
    consoleErrors.push(`${m.text()} @ ${url}`);
  });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => {
    if (r.url().includes('radarnieruchomosci.com')) blocked.push(r.url());
  });
  await page.route('**/*radarnieruchomosci.com/**', (route) => route.abort());
  return { page, consoleErrors, blocked };
}

const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'pl-PL' });
const { page, consoleErrors, blocked } = await newPage(context);

// ---------- strony: status, konsola, linki, canonical, copy, ceny ----------
for (const p of paths) {
  const url = BASE + p;
  let status = null;
  const errStart = consoleErrors.length;
  if (p === '/cennik/') {
    const resp = await context.request.get(url);
    status = resp.status();
    const html = await resp.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || null;
    const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] || null;
    const issues = [];
    if (status !== 200) issues.push(`status ${status}`);
    if (!canonical?.endsWith('/ile-kosztuje/')) issues.push(`canonical ${canonical}`);
    if (!/noindex/i.test(robots || '')) issues.push('brak noindex');
    results.pages[p] = { status, canonical, robots, issues, responsePhrases: [], rozmowy: [], badCta: [], blockedRequests: 0 };
    if (issues.length) note(`${p}: ${issues.join('; ')}`);
    console.log('PAGE', p, status, issues.length ? 'FAIL' : 'ok');
    continue;
  }
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    status = resp?.status() ?? null;
  } catch (e) {
    note(`${p}: nawigacja ${e.message.split('\n')[0]}`);
  }
  const pageConsole = consoleErrors.slice(errStart);
  const info = await page.evaluate(() => {
    const canonical = document.querySelector('link[rel=canonical]')?.getAttribute('href') || null;
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content') || null;
    const robots = document.querySelector('meta[name=robots]')?.getAttribute('content') || null;
    const text = document.body.innerText;
    const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter(Boolean);
    const ctas = [...document.querySelectorAll('a,button,summary')]
      .map((el) => (el.innerText || el.textContent || '').trim())
      .filter(Boolean);
    const resp = [...text.matchAll(/[^.\n]*odpowi[a-ząćęłńóśźż]*[^.\n]*/gi)].map((m) => m[0].replace(/\s+/g, ' ').trim()).slice(0, 12);
    const rozm = [...text.matchAll(/.{0,45}rozmow.{0,45}/gi)].map((m) => m[0].replace(/\s+/g, ' ').trim()).slice(0, 10);
    return { canonical, ogUrl, robots, text, links, ctas, resp, rozm };
  });

  const pageIssues = [];
  if (status !== 200) pageIssues.push(`status ${status}`);
  if (pageConsole.length) pageIssues.push(`console ${pageConsole.length}: ${pageConsole.slice(0,2).join(' | ')}`);

  if (p === '/404/') {
    if (info.canonical) pageIssues.push(`canonical na 404: ${info.canonical}`);
    if (info.ogUrl) pageIssues.push(`og:url na 404: ${info.ogUrl}`);
    if (!/noindex/i.test(info.robots || '')) pageIssues.push('brak noindex na 404');
  } else {
    if (!info.canonical?.endsWith('/')) pageIssues.push(`canonical bez /: ${info.canonical}`);
  }

  if (/\[EST\]/.test(info.text)) pageIssues.push('[EST] w treści');
  const four = info.text.match(/\b\d{4} zł/g);
  if (four) pageIssues.push(`liczby bez separatora: ${[...new Set(four)].join(', ')}`);

  const badLinks = [...new Set(info.links.filter((raw) => {
    if (!raw.startsWith('/') || raw.startsWith('//')) return false;
    let u;
    try { u = new URL(raw, BASE + p); } catch { return false; }
    if (u.pathname === '/') return false;
    if (/\.[a-z0-9]+$/i.test(u.pathname)) return false;
    return !u.pathname.endsWith('/');
  }))];
  if (badLinks.length) pageIssues.push(`linki bez /: ${badLinks.slice(0, 6).join(', ')}`);

  const badCta = info.ctas.filter((t) => /Umów|rozmow|Cal\.com|kalendarz/i.test(t));
  if (badCta.length) pageIssues.push(`CTA werbalne: ${badCta.slice(0, 4).join(' | ')}`);

  results.pages[p] = {
    status,
    canonical: info.canonical,
    ogUrl: info.ogUrl,
    robots: info.robots,
    issues: pageIssues,
    responsePhrases: [...new Set(info.resp)].slice(0, 8),
    rozmowy: info.rozm,
    badCta,
    blockedRequests: blocked.length,
  };
  if (pageIssues.length) note(`${p}: ${pageIssues.join('; ')}`);
  console.log('PAGE', p, status, pageIssues.length ? 'FAIL' : 'ok', 'resp:', [...new Set(info.resp)].slice(0,2).join(' || '));
}

// ---------- ceny: zestaw z tekstów przed i po ----------
const required = ['623 zł','2 730 zł','6 230 zł','10 500 zł','483 zł','1 750 zł','1 540 zł'];
const before = fs.readdirSync('/workspace/studio/research/competitors-2026-10-21/self/text')
  .filter((f) => f.endsWith('.txt'))
  .map((f) => fs.readFileSync(`/workspace/studio/research/competitors-2026-10-21/self/text/${f}`, 'utf8'))
  .join('\n');
results.priceSet = {
  required: Object.fromEntries(required.map((r) => [r, before.includes(r)])),
  note: 'Ceny bazowe: obecność w tekście przed zmianami i na żywych stronach.',
};

// ceny na żywo — zbierz ze wszystkich stron ponownie (tekst)
const livePrices = new Set();
const livePages = {};
for (const p of paths) {
  if (p === '/cennik/' || p === '/o-mnie/') continue;
  await page.goto(BASE + p, { waitUntil: 'domcontentloaded' });
  const txt = await page.evaluate(() => document.body.innerText);
  livePages[p] = txt;
  for (const m of txt.matchAll(/(\d{1,3}(?:[ \u00a0\u202f]\d{3})+|\d{4,})\s*zł/g)) {
    livePrices.add(m[1].replace(/[ \u00a0\u202f]/g, ' '));
  }
}
const missingPrices = required.filter((r) => !Object.values(livePages).some((t) => t.includes(r)));
if (missingPrices.length) note(`brak cen w serwisie: ${missingPrices.join(', ')}`);
results.priceSet.live = [...livePrices].sort();
results.priceSet.missing = missingPrices;

// ---------- formularz: presety ----------
async function goForm(q) {
  await page.goto(BASE + '/kontakt/' + q, { waitUntil: 'networkidle' });
  await page.waitForSelector('#f-topic');
  return page.evaluate(() => ({
    topic: document.querySelector('#f-topic')?.value,
    plan: document.querySelector('#f-plan')?.value,
    context: document.querySelector('#f-context')?.value,
    infoHidden: document.querySelector('#form-context')?.hidden,
    infoText: document.querySelector('#form-context')?.innerText.replace(/\s+/g, ' ').trim() || '',
  }));
}

const presets = {};
for (const [name, q, expected] of [
  ['audyt', '?temat=audyt', (v) => v.topic === 'audyt'],
  ['start', '?plan=start', (v) => v.topic === 'wdrozenie' && v.plan === 'start' && /Start/.test(v.infoText) && !v.infoHidden],
  ['growth', '?plan=growth', (v) => v.topic === 'wdrozenie' && v.plan === 'growth' && /Growth/.test(v.infoText) && /6 230/.test(v.infoText) && !v.infoHidden],
  ['scale', '?plan=scale', (v) => v.topic === 'wdrozenie' && v.plan === 'scale' && /Scale/.test(v.infoText) && /10 500/.test(v.infoText) && !v.infoHidden],
  ['monitoring-cen', '?temat=monitoring-cen', (v) => v.topic === 'wdrozenie' && v.context === 'monitoring-cen' && /Monitoring cen/.test(v.infoText) && !v.infoHidden],
  ['integracja-zamowien', '?temat=integracja-zamowien', (v) => v.topic === 'wdrozenie' && v.context === 'integracja-zamowien' && /Integracja zamówień/.test(v.infoText)],
  ['raport-operacyjny', '?temat=raport-operacyjny', (v) => v.topic === 'wdrozenie' && v.context === 'raport-operacyjny' && /Raport operacyjny/.test(v.infoText)],
  ['nieznany', '?temat=nieznany', (v) => v.topic === 'mini-diagnoza'],
] ) {
  try {
    const v = await goForm(q);
    const ok = expected(v);
    presets[name] = { ...v, ok };
    if (!ok) note(`preset ${name}: ${JSON.stringify(v)}`);
  } catch (e) { note(`preset ${name}: ${e.message}`); }
}
results.form.presets = presets;

// kliknięcie hero i CTA audytu
async function clickAndCheck(startPath, locatorText) {
  await page.goto(BASE + startPath, { waitUntil: 'networkidle' });
  const link = page.locator('a', { hasText: locatorText }).first();
  await link.click();
  await page.waitForURL(/\/kontakt\/\?temat=audyt/, { timeout: 10000 });
  await page.waitForSelector('#f-topic');
  return { url: page.url(), topic: await page.locator('#f-topic').inputValue() };
}
try {
  const home = await clickAndCheck('/', 'Zamów audyt');
  const audit = await clickAndCheck('/audyt/', 'Zamów audyt');
  results.form.clicks = { home, audit };
  if (home.topic !== 'audyt' || audit.topic !== 'audyt') note('klik CTA nie ustawia audytu');
} catch (e) { note(`klik CTA: ${e.message}`); }

// pusty submit + polskie komunikaty, bez wysyłki
try {
  await goForm('?temat=audyt');
  let posted = 0;
  page.on('request', (r) => { if (r.method() === 'POST' && r.url().includes('radarnieruchomosci.com')) posted++; });
  await page.locator('#contact-form button[type=submit]').click();
  await page.waitForTimeout(400);
  const validation = await page.evaluate(() => {
    const f = (id) => document.getElementById(id);
    const out = {};
    for (const id of ['f-email', 'f-process', 'f-consent']) {
      const el = f(id);
      el.checkValidity();
      out[id] = el.validationMessage;
    }
    return { url: location.href, out };
  });
  results.form.emptySubmit = { ...validation, posted };
  const allPolish = Object.values(validation.out).every((m) => m && !/Please|fill out|required/i.test(m));
  if (!allPolish) note(`komunikaty walidacji: ${JSON.stringify(validation.out)}`);
  if (posted) note('wysłał formularz mimo blokady');
  if (validation.url.includes('/dziekujemy')) note('pusty submit przeszedł na /dziekujemy');
} catch (e) { note(`pusty submit: ${e.message}`); }

// ---------- mobile 390 ----------
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'pl-PL' });
const { page: mp } = await newPage(mobile);
for (const p of paths) {
  if (p === '/cennik/' || p === '/o-mnie/') continue;
  await mp.goto(BASE + p, { waitUntil: 'networkidle' });
  const info = await mp.evaluate(() => {
    const de = document.documentElement;
    const visible = (el) => {
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && el.getBoundingClientRect().width > 0;
    };
    const scrollables = [...document.querySelectorAll('.table-wrap,.flow-figure')]
      .filter((el) => visible(el) && el.scrollWidth > el.clientWidth + 2)
      .map((el) => ({
        tag: el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(/\s+/).filter(Boolean).slice(0,2).join('.'),
        hint: getComputedStyle(el, '::before').content,
        sw: el.scrollWidth,
        cw: el.clientWidth,
      }));
    const faqOpen = [...document.querySelectorAll('.faq details[open]')].length;
    const faqTotal = [...document.querySelectorAll('.faq details')].length;
    return { sw: de.scrollWidth, vw: de.clientWidth, scrollables, faqOpen, faqTotal };
  });
  const issues = [];
  if (info.sw > info.vw + 1) issues.push(`poziomy scroll ${info.sw}>${info.vw}`);
  if (info.scrollables.length && !info.scrollables.every((s) => /przewi/i.test(s.hint))) issues.push(`brak wskazówki: ${JSON.stringify(info.scrollables)}`);
  if (info.faqOpen) issues.push(`otwarte FAQ: ${info.faqOpen}`);
  results.mobile[p] = { ...info, issues };
  if (issues.length) note(`mobile ${p}: ${issues.join('; ')}`);
  console.log('MOBILE', p, 'sw', info.sw, 'vw', info.vw, 'scrollables', info.scrollables.length, 'faq', info.faqTotal, info.faqOpen, issues.length ? 'FAIL' : 'ok');
}

// ---------- zrzuty po ----------
const shots = new Map([
  ['/', 'home'],
  ['/audyt/', 'audyt'],
  ['/ile-kosztuje/', 'ile-kosztuje'],
  ['/kontakt/', 'kontakt'],
]);
for (const [p, slug] of shots) {
  for (const [ctx, suffix] of [[context, 'd'], [mobile, 'm']]) {
    const pg = await ctx.newPage();
    await pg.route('**/*radarnieruchomosci.com/**', (route) => route.abort());
    await pg.goto(BASE + p, { waitUntil: 'networkidle' });
    await pg.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await pg.waitForTimeout(500);
    const file = path.join(SHOTS, `${slug}-${suffix}.jpg`);
    await pg.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 80 });
    results.shots.push(file);
    console.log('SHOT', file);
    await pg.close();
  }
}

results.summary = { failed: failed.length, failedList: failed };
fs.writeFileSync(path.join(OUT, 'test-results.json'), JSON.stringify(results, null, 2));
console.log('\nSUMMARY', failed.length === 0 ? 'ALL GREEN' : `${failed.length} problemów`);
console.log(failed.join('\n'));
await browser.close();
process.exit(failed.length ? 1 : 0);
