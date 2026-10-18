import { chromium } from 'playwright';
const b=await chromium.launch();
for (const vp of [{n:'top-d',w:1440,h:900},{n:'top-m',w:390,h:844},{n:'top-t',w:834,h:1000}]) {
  const c=await b.newContext({viewport:{width:vp.w,height:vp.h}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:4334/',{waitUntil:'networkidle'});
  await p.waitForTimeout(1200);
  await p.screenshot({path:`C:/Users/sfajr/Documents/StudioAutomation/screens/v3/${vp.n}.png`});
  const info=await p.evaluate(()=>{const h=document.querySelector('header.site').getBoundingClientRect();const n=document.querySelector('.nav').getBoundingClientRect();return {headerH:Math.round(h.height),navH:Math.round(n.height),scrollW:document.documentElement.scrollWidth}});
  console.log(vp.n, JSON.stringify(info));
  await c.close();
}
await b.close();
