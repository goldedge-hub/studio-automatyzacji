// Generuje favicon.ico (32×32) i apple-touch-icon.png (180×180) z public/favicon.svg.
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const png = (size) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

const icon32 = png(32);
const icon180 = png(180);
writeFileSync(new URL('../public/apple-touch-icon.png', import.meta.url), icon180);

// ICO z osadzonym PNG (32×32, 32 bpp) — format obsługiwany przez przeglądarki.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(icon32.length, 8);
entry.writeUInt32LE(22, 12);
writeFileSync(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, entry, icon32]));
console.log('favicon.ico', icon32.length + 22, 'B; apple-touch-icon.png', icon180.length, 'B');
