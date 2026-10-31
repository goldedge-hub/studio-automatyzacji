import { chromium } from 'playwright';
const paths=['/','/audyt/','/ile-kosztuje/','/opieka/','/wdrozenia/','/dla-agencji/','/o-studiu/','/kontakt/','/case-studies/','/przykladowy-raport/','/poradnik/','/poradnik/jak-policzyc-czy-automatyzacja-sie-zwraca/','/poradnik/gotowa-integracja-czy-wlasna-warstwa/','/poradnik/ile-kosztuje-integracja-baselinker-allegro/','/branze/','/integracje/','/regulamin/','/polityka-prywatnosci/','/dziekujemy/'];
const widths=[320,360,390,414];
const b=await chromium.launch(); const bad=[];
for(const w of widths){
  const c=await b.newContext({viewport:{width:w,height:800},isMobile:true,hasTouch:true});
  const p=await c.newPage();
  for(const u of paths){
    await p.goto('http://localhost:4337'+u,{waitUntil:'networkidle'});
    const r=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
    if(r.sw>r.cw+1) bad.push({w,u,...r});
  }
  await c.close();
}
console.log('checked',widths.length*paths.length,'overflow:',bad.length); bad.forEach(x=>console.log(x));
await b.close();
