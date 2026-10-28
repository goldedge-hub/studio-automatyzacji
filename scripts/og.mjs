/**
 * Generuje public/og.png (1200x630) z aktualnych cen w src/data/pricing.ts.
 * Uruchamiany jako "prebuild", więc obraz nie może się zestarzeć względem cennika.
 *
 * Identyfikacja „Edycja": papier, tusz, vermilion, Instrument Serif + Inter + JetBrains Mono.
 * Użycie:
 *   node scripts/og.mjs            -> public/og.png
 *   node scripts/og.mjs out.png    -> dodatkowy podgląd
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pricingPath = resolve(root, 'src/data/pricing.ts');

const PAPER = '#f5f0e6';
const INK = '#14120d';
const INK2 = '#2b2720';
const MUTED = '#5a5446';
const LINE = '#cfc5ae';
const ACCENT = '#f2704a';
const ACCENT_INK = '#a62c0f';

const zl = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;

async function readPrices() {
  const source = await readFile(pricingPath, 'utf8');
  const block = source.match(/export\s+const\s+PRICES\s*=\s*\{([\s\S]*?)\}\s*as\s+const/);
  if (!block) throw new Error(`Nie znaleziono obiektu PRICES w ${pricingPath}`);
  const pick = (key) => {
    const match = block[1].match(new RegExp(`\\b${key}\\s*:\\s*([0-9][0-9_]*)`));
    if (!match) throw new Error(`Nie znaleziono liczby "${key}" w PRICES (${pricingPath})`);
    const value = Number(match[1].replace(/_/g, ''));
    if (!Number.isFinite(value) || value <= 0) throw new Error(`Nieprawidłowa cena "${key}"`);
    return value;
  };
  return { audit: pick('audit'), start: pick('start'), growth: pick('growth') };
}

const prices = await readPrices();
const audit = zl(prices.audit);
const start = zl(prices.start);
const growth = zl(prices.growth);

/**
 * Fonty do OG: scalone podzbiory latin + latin-ext (pełne polskie znaki).
 * Pliki leżą w repo (src/fonts/og-*.woff), żeby build był powtarzalny także na CI.
 * Regeneracja: python scripts/merge_fonts.py
 */
const read = (file) => readFile(resolve(root, 'src/fonts', file));

const [serif, inter400, inter600, mono500] = await Promise.all([
  read('og-instrument.woff'),
  read('og-inter-400.woff'),
  read('og-inter-600.woff'),
  read('og-jbm-500.woff'),
]);

const mono = (size = 11) => ({
  fontFamily: 'JetBrains Mono',
  fontSize: size,
  fontWeight: 500,
  letterSpacing: '1.6px',
  color: MUTED,
});

const h = (type, props, ...children) => ({
  type,
  props: {
    ...(props || {}),
    ...(children.length ? { children: children.length === 1 ? children[0] : children } : {}),
  },
});

const PriceLine = (label, price, suffix) =>
  h(
    'div',
    { style: { display: 'flex', fontSize: 20, lineHeight: 1.6, color: INK } },
    h('span', { style: { paddingRight: 8, color: INK2 } }, label),
    h('span', { style: { fontWeight: 600 } }, `${price} netto`),
    h('span', { style: { color: MUTED } }, suffix),
  );

const element = h(
  'div',
  {
    style: {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: PAPER,
      color: INK,
      boxSizing: 'border-box',
    },
  },
  h(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: INK,
        padding: '12px 64px',
        fontFamily: 'JetBrains Mono',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '2.2px',
      },
    },
    h('span', { style: { color: PAPER } }, 'STUDIO AUTOMATYZACJI'),
    h('span', { style: { color: '#a9a294' } }, 'AUDYT / WDROZENIA / OPIEKA'),
    h('span', { style: { color: ACCENT } }, 'OLSZTYN / ZDALNIE'),
  ),
  h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '46px 64px 40px',
      },
    },
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      h('div', { style: { ...mono(11), color: ACCENT_INK, marginBottom: 18 } }, '01 — AUTOMATYZACJA PROCESÓW'),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Instrument Serif',
            fontSize: 104,
            lineHeight: 0.98,
            letterSpacing: '-3.5px',
          },
        },
        h('div', null, 'Mniej klikania.'),
        h(
          'div',
          { style: { display: 'flex' } },
          h('span', { style: { color: ACCENT_INK, fontStyle: 'italic', paddingRight: 18 } }, 'Więcej'),
          h('span', null, 'spokoju.'),
        ),
      ),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
          borderTop: `1px solid ${LINE}`,
          paddingTop: 22,
        },
      },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        PriceLine('Audyt', audit, ' — odliczany od wdrożenia.'),
        PriceLine('Wdrożenia od', start, ' — stała cena przed startem.'),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
        h('div', { style: { ...mono(10), color: INK2, border: `1px solid ${INK}`, padding: '6px 10px', marginBottom: 10 } }, `GROWTH ${growth}`),
        h('div', { style: { ...mono(12), color: ACCENT_INK } }, 'studioautomatyzacji.pl'),
      ),
    ),
  ),
);

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter600, weight: 600, style: 'normal' },
    { name: 'JetBrains Mono', data: mono500, weight: 500, style: 'normal' },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

const out = resolve(root, 'public/og.png');
await writeFile(out, png);
console.log(`og.png: ${out} (1200x630, audyt ${audit}, start ${start}, growth ${growth})`);

const preview = process.argv[2];
if (preview) {
  const previewPath = resolve(preview);
  await mkdir(dirname(previewPath), { recursive: true });
  await writeFile(previewPath, png);
  console.log(`podgląd: ${previewPath}`);
}
