/**
 * Generuje public/og.png (1200x630) z aktualnych cen w src/data/pricing.ts.
 * Uruchamiany jako "prebuild", więc obraz nie może się zestarzeć względem cennika.
 *
 * Użycie:
 *   node scripts/og.mjs            -> public/og.png
 *   node scripts/og.mjs out.png    -> dodatkowy podgląd (public/og.png zostaje zapisany)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pricingPath = resolve(root, 'src/data/pricing.ts');

const PAPER = '#f4f0e6';
const INK = '#191a16';
const MUTED = '#56574e';
const LINE = '#cfc7b4';
const ACCENT = '#8a5410';

/** Format jak w pricing.ts: zwykła spacja jako separator tysięcy. */
const zl = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;

/**
 * Czyta PRICES bez kompilatora TS. Szuka wyłącznie obiektu PRICES,
 * żeby nie złapać przypadkowej liczby z innego miejsca pliku.
 */
async function readPrices() {
  const source = await readFile(pricingPath, 'utf8');
  const block = source.match(/export\s+const\s+PRICES\s*=\s*\{([\s\S]*?)\}\s*as\s+const/);
  if (!block) {
    throw new Error(`Nie znaleziono obiektu PRICES w ${pricingPath}`);
  }
  const pick = (key) => {
    const match = block[1].match(new RegExp(`\\b${key}\\s*:\\s*([0-9][0-9_]*)`));
    if (!match) {
      throw new Error(`Nie znaleziono liczby "${key}" w PRICES (${pricingPath})`);
    }
    const value = Number(match[1].replace(/_/g, ''));
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`Nieprawidłowa cena "${key}" w PRICES: ${match[1]}`);
    }
    return value;
  };
  return { audit: pick('audit'), start: pick('start') };
}

const prices = await readPrices();
const audit = zl(prices.audit);
const start = zl(prices.start);

const fontDir = resolve(root, 'node_modules/@fontsource/sora/files');
const font = (file) => readFile(resolve(fontDir, file));

const [latin400, latinExt400, latin600, latinExt600] = await Promise.all([
  font('sora-latin-400-normal.woff'),
  font('sora-latin-ext-400-normal.woff'),
  font('sora-latin-600-normal.woff'),
  font('sora-latin-ext-600-normal.woff'),
]);

const labelStyle = {
  fontFamily: 'Sora, Sora Ext',
  fontSize: 11.5,
  fontWeight: 400,
  letterSpacing: '1.4px',
  color: MUTED,
};

const h = (type, props, ...children) => ({
  type,
  props: {
    ...(props || {}),
    ...(children.length
      ? { children: children.length === 1 ? children[0] : children }
      : {}),
  },
});

const PriceLine = (label, price, suffix) =>
  h(
    'div',
    { style: { display: 'flex', fontSize: 21, lineHeight: 1.55, color: INK } },
    h('span', { style: { paddingRight: 5 } }, label),
    h('span', { style: { fontWeight: 600 } }, `${price} netto`),
    h('span', null, suffix),
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
      padding: '54px 64px 44px',
      fontFamily: 'Sora, Sora Ext',
      boxSizing: 'border-box',
    },
  },
  h(
    'div',
    { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
    h('div', { style: labelStyle }, 'STUDIO AUTOMATYZACJI'),
    h('div', { style: labelStyle }, 'AUDYT / WDROZENIA / OPIEKA'),
  ),
  h('div', { style: { height: 1, marginTop: 17, backgroundColor: INK, opacity: 0.5 } }),
  h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 80,
        fontSize: 86,
        fontWeight: 600,
        lineHeight: 1.04,
        letterSpacing: '-4px',
      },
    },
    h('div', null, 'Automatyzacja,'),
    h('div', null, 'którą najpierw'),
    h('div', null, 'policzymy.'),
  ),
  h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', marginTop: 'auto' } },
    h('div', { style: { height: 1, backgroundColor: LINE, marginBottom: 25 } }),
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' } },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column' } },
        PriceLine('Audyt', audit, ', odliczany od wdrożenia.'),
        PriceLine('Wdrożenia od', start, '. Stała cena, kod u klienta.'),
      ),
      h(
        'div',
        {
          style: {
            fontFamily: 'Sora, Sora Ext',
            fontSize: 13,
            letterSpacing: '0.6px',
            color: ACCENT,
            paddingBottom: 6,
          },
        },
        'studioautomatyzacji.pl',
      ),
    ),
  ),
);

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Sora', data: latin400, weight: 400, style: 'normal' },
    { name: 'Sora', data: latin600, weight: 600, style: 'normal' },
    { name: 'Sora Ext', data: latinExt400, weight: 400, style: 'normal' },
    { name: 'Sora Ext', data: latinExt600, weight: 600, style: 'normal' },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

const out = resolve(root, 'public/og.png');
await writeFile(out, png);
console.log(`og.png: ${out} (1200x630, audyt ${audit}, start ${start})`);

const preview = process.argv[2];
if (preview) {
  const previewPath = resolve(preview);
  await mkdir(dirname(previewPath), { recursive: true });
  await writeFile(previewPath, png);
  console.log(`podgląd: ${previewPath}`);
}
