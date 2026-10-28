
import os
from fontTools.ttLib import TTFont
from fontTools.merge import Merger

base = r'C:/Users/sfajr/Projects/studio-automatyzacji/node_modules/@fontsource'
out  = r'C:/Users/sfajr/Projects/studio-automatyzacji/src/fonts'
jobs = [
 ('og-instrument', 'instrument-serif/files/instrument-serif-latin-400-normal.woff', 'instrument-serif/files/instrument-serif-latin-ext-400-normal.woff'),
 ('og-inter-400', 'inter/files/inter-latin-400-normal.woff', 'inter/files/inter-latin-ext-400-normal.woff'),
 ('og-inter-600', 'inter/files/inter-latin-600-normal.woff', 'inter/files/inter-latin-ext-600-normal.woff'),
 ('og-jbm-500', 'jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff', 'jetbrains-mono/files/jetbrains-mono-latin-ext-500-normal.woff'),
]
tmp = r'C:/Users/sfajr/Projects/studio-automatyzacji/out/_merge'
os.makedirs(tmp, exist_ok=True)
need = [0x119,0x105,0x142,0x144,0xF3,0x15B,0x17A,0x17C,0x41]
for name, a, b in jobs:
    pa, pb = os.path.join(base, a), os.path.join(base, b)
    ta, tb = os.path.join(tmp, name+'-a.ttf'), os.path.join(tmp, name+'-b.ttf')
    fa = TTFont(pa); fa.flavor=None; fa.save(ta)
    fb = TTFont(pb); fb.flavor=None; fb.save(tb)
    try:
        m = Merger().merge([ta, tb])
        out_path = os.path.join(out, name+'.woff')
        m.flavor = 'woff'
        m.save(out_path)
        cm = m.getBestCmap()
        print(name, 'OK', os.path.getsize(out_path), 'glyphs', len(m.getGlyphOrder()), 'covers', all(c in cm for c in need))
    except Exception as e:
        print(name, 'FAIL', type(e).__name__, str(e)[:300])
