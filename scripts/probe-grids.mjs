import { chromium } from 'playwright';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage();
for (const path of ['/','/audyt/','/ile-kosztuje/','/wdrozenia/','/opieka/','/dla-agencji/','/o-studiu/']){
  await p.goto('http://localhost:4337'+path,{waitUntil:'networkidle'});
  const r=await p.evaluate(()=>{
    const bad=[];
    document.querySelectorAll('[class]').forEach(el=>{
      const cs=getComputedStyle(el);
      if(cs.display==='grid'){
        const cols=cs.gridTemplateColumns.split(' ').filter(x=>x.endsWith('px')).map(parseFloat);
        if(cols.length>1 && Math.min(...cols)<110){
          const r=el.getBoundingClientRect();
          if(r.width>250) bad.push({cls:el.className.toString().slice(0,40),cols:cols.map(Math.round),w:Math.round(r.width)});
        }
      }
      // text overflow: element narrower than its scrollWidth
      if(el.scrollWidth-el.clientWidth>4 && cs.overflowX==='visible' && el.children.length===0 && el.textContent.trim().length>8){
        bad.push({overflow:el.className.toString().slice(0,30),by:el.scrollWidth-el.clientWidth});
      }
    });
    return bad.slice(0,10);
  });
  console.log(path, JSON.stringify(r));
}
await b.close();
