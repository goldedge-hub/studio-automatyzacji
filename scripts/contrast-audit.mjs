import { chromium } from 'playwright';
const paths=['/','/audyt/','/ile-kosztuje/','/dla-agencji/','/opieka/','/wdrozenia/','/o-studiu/','/kontakt/','/poradnik/jak-policzyc-czy-automatyzacja-sie-zwraca/','/przykladowy-raport/','/regulamin/','/case-studies/','/oferty/','/oferty/raport-operacyjny-0600/','/oferty/zamowienia-bez-przepisywania/','/produkty/','/produkty/audyt-procesu-diy/','/checklista/'];
const b=await chromium.launch();const c=await b.newContext({viewport:{width:1440,height:1000}});const p=await c.newPage();
const bad=[];
for(const u of paths){
  await p.goto('http://localhost:4337'+u,{waitUntil:'networkidle'});
  const r=await p.evaluate(()=>{
    const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null};
    const lum=([r,g,b])=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
    const ratio=(a,b)=>{const L1=lum(a),L2=lum(b);return (Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05)};
    const bgOf=el=>{let n=el;while(n&&n!==document.documentElement){const cs=getComputedStyle(n);const c=parse(cs.backgroundColor);const a=cs.backgroundColor.match(/rgba?\([^)]*,\s*([\d.]+)\)/);
      if(c&&(!a||parseFloat(a[1])>0.6))return c; n=n.parentElement;} return [8,9,11]};
    const out=[];
    document.querySelectorAll('p,li,span,a,td,th,h1,h2,h3,h4,summary,label,small,time,figcaption,strong,b,dt,dd').forEach(el=>{
      const t=(el.textContent||'').trim(); if(!t||el.children.length>2)return;
      const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)<0.5)return;
      const rect=el.getBoundingClientRect(); if(!rect.width||!rect.height)return;
      const fg=parse(cs.color); if(!fg)return;
      const size=parseFloat(cs.fontSize); const w=parseInt(cs.fontWeight)||400;
      const need=(size>=24||(size>=18.66&&w>=700))?3:4.5;
      const cr=ratio(fg,bgOf(el));
      if(cr<need) out.push({sel:el.tagName.toLowerCase()+'.'+(el.className||'').toString().split(' ')[0],txt:t.slice(0,34),fg:cs.color,bg:'rgb('+bgOf(el).map(Math.round).join(',')+')',size:Math.round(size),cr:+cr.toFixed(2),need});
    });
    return out;
  });
  r.forEach(x=>bad.push({u,...x}));
}
const bySeen=new Map();
for(const x of bad){const k=x.sel+'|'+x.fg+'|'+x.bg+'|'+x.size; if(!bySeen.has(k)||bySeen.get(k).cr>x.cr) bySeen.set(k,x);}
console.log('violations:',bad.length,'unique:',bySeen.size);
[...bySeen.values()].sort((a,b)=>a.cr-b.cr).slice(0,28).forEach(x=>console.log(`${x.cr.toFixed(2)}<${x.need} ${x.sel} ${x.size}px ${x.fg} on ${x.bg} :: ${x.txt}`));
await b.close();
