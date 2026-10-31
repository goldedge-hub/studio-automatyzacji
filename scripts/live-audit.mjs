import { chromium } from 'playwright';
const B='https://www.studioautomatyzacji.pl';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage();
const out={};
for (const path of ['/','/ile-kosztuje/','/audyt/','/dla-agencji/']){
  await p.goto(B+path,{waitUntil:'networkidle'});
  const m=await p.evaluate(()=>{
    const els=[...document.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0});
    const small=els.filter(e=>{const r=e.getBoundingClientRect();return r.height<44||r.width<44});
    const bar=document.querySelector('[data-mobile-cta]');
    return {height:document.documentElement.scrollHeight,inter:els.length,small:small.length,
      smallList:small.slice(0,6).map(e=>(e.textContent||'').trim().slice(0,26)+' '+Math.round(e.getBoundingClientRect().height)),
      imgs:document.images.length,svg:document.querySelectorAll('svg').length,
      overflowX:document.documentElement.scrollWidth>390+1,
      barHiddenAtTop: bar? getComputedStyle(bar).opacity+'/'+getComputedStyle(bar).visibility : 'none'};
  });
  await p.evaluate(()=>window.scrollTo(0,900)); await p.waitForTimeout(500);
  m.barAfterScroll=await p.evaluate(()=>{const b=document.querySelector('[data-mobile-cta]');return b?getComputedStyle(b).opacity+'/'+getComputedStyle(b).visibility:'none'});
  out[path]=m;
}
console.log(JSON.stringify(out,null,1));
await b.close();
