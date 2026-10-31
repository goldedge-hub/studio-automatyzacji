import { chromium } from 'playwright';
const pages = ['/','/audyt/','/ile-kosztuje/','/wdrozenia/','/opieka/','/case-studies/','/kontakt/','/oferty/','/produkty/','/checklista/','/poradnik/','/przykladowy-raport/','/o-studiu/','/dla-agencji/','/realizacje/'];
const b = await chromium.launch(); const c = await b.newContext({viewport:{width:1440,height:1000}}); const p = await c.newPage();
const rows = new Map();
for (const u of pages) {
  await p.goto('http://localhost:4337'+u,{waitUntil:'networkidle'});
  const found = await p.evaluate(() => {
    const lum=(r,g,b)=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
    const parse=s=>{const m=s.match(/[\d.]+/g);return m?m.map(Number):null};
    const bgOf=el=>{let n=el;while(n){const s=getComputedStyle(n).backgroundColor;const a=parse(s);if(a&&(a.length<4||a[3]>0.5))return s;n=n.parentElement}return 'rgb(255,255,255)'};
    const out=[];
    document.querySelectorAll('*').forEach(el=>{
      if(el.children.length) return;
      const t=(el.textContent||'').trim(); if(!t) return;
      const cs=getComputedStyle(el); if(cs.display==='none'||cs.visibility==='hidden') return;
      const fg=parse(cs.color); const bg=parse(bgOf(el)); if(!fg||!bg) return;
      const L1=lum(fg[0],fg[1],fg[2]), L2=lum(bg[0],bg[1],bg[2]);
      const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
      const size=parseFloat(cs.fontSize); const bold=parseInt(cs.fontWeight)>=600;
      const need=(size>=24||(size>=18.66&&bold))?3:4.5;
      if(ratio<need){
        let path=[],n=el;for(let i=0;i<4&&n;i++){path.push(((n.className||'')+'|'+n.tagName).toString().split(' ')[0]);n=n.parentElement}
        out.push([ratio.toFixed(2), cs.color, bgOf(el), path.join(' < ')]);
      }
    });
    return out;
  });
  for (const [r,fg,bg,path] of found) {
    const k = path.split(' < ').slice(0,2).join(' < ')+' | '+bg;
    if(!rows.has(k)) rows.set(k,{n:0,r,fg,bg});
    rows.get(k).n++;
  }
}
[...rows.entries()].sort((a,b)=>b[1].n-a[1].n).slice(0,20).forEach(([k,v])=>console.log(v.n,'|',v.r,'|',v.fg,'on',v.bg,'|',k));
await b.close();
