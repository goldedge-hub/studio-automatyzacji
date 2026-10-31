import { chromium } from 'playwright';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage();
for (const [path,name] of [['/audyt/','m-audyt-path2'],['/wdrozenia/','m-wdrozenia-path'],['/dla-agencji/','m-agencje-path']]){
  await p.goto('http://localhost:4337'+path,{waitUntil:'networkidle'});
  await p.evaluate(()=>document.querySelector('.path')?.scrollIntoView({block:'start'}));
  await p.evaluate(()=>window.scrollBy(0,-90));
  await p.waitForTimeout(500);
  await p.screenshot({path:`C:/Users/sfajr/Documents/StudioAutomation/screens/2026-10-31/${name}.png`});
}
console.log('ok'); await b.close();
