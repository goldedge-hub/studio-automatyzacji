import { chromium } from 'playwright';
const B='http://127.0.0.1:4334';
const OUT='C:/Users/sfajr/Documents/StudioAutomation/screens/v3';
const b=await chromium.launch();
for (const vp of [{n:'d',w:1440,h:900},{n:'m',w:390,h:844}]) {
  const c=await b.newContext({viewport:{width:vp.w,height:vp.h}});
  const p=await c.newPage();
  await p.goto(B+'/',{waitUntil:'networkidle'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}window.scrollTo(0,0);});
  await p.waitForTimeout(600);
  for (const [sel,name] of [['.bento','bento'],['.kpi-band','kpi'],['.registry','registry'],['.hero','hero'],['.marquee','marquee']]) {
    const el=p.locator(sel).first();
    if(await el.count()) await el.screenshot({path:`${OUT}/${vp.n}-${name}.png`});
  }
  await c.close();
}
await b.close(); console.log('shots ok');
