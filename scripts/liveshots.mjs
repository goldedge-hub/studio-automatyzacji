import { chromium } from 'playwright';
const b=await chromium.launch({args:['--host-resolver-rules=MAP studioautomatyzacji.pl 185.199.108.153']});
const OUT='C:/Users/sfajr/Documents/StudioAutomation/screens/v3';
for (const vp of [{n:'live-d',w:1440,h:900,full:true},{n:'live-m',w:390,h:844,full:false}]) {
  const c=await b.newContext({viewport:{width:vp.w,height:vp.h}});
  const p=await c.newPage();
  await p.goto('http://studioautomatyzacji.pl/',{waitUntil:'networkidle',timeout:60000});
  await p.waitForTimeout(1500);
  await p.screenshot({path:`${OUT}/${vp.n}.png`,fullPage:vp.full});
  const fs=await p.evaluate(()=>({sora:document.fonts.check('600 40px Sora'),inter:document.fonts.check('400 16px "Inter Variable"'),h:document.documentElement.scrollHeight,w:document.documentElement.scrollWidth}));
  console.log(vp.n, JSON.stringify(fs));
  await c.close();
}
await b.close();
