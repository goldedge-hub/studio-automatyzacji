import { chromium } from 'playwright';
const b=await chromium.launch();
const out='C:/Users/sfajr/Documents/StudioAutomation/screens/lab/';
import fs from 'fs'; fs.mkdirSync(out,{recursive:true});
const d=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const dp=await d.newPage();
const m=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const mp=await m.newPage();
for (const v of ['a-konsola','b-studio','c-produkt']){
  await dp.goto('http://localhost:4337/lab/'+v+'.html',{waitUntil:'networkidle'});
  await dp.waitForTimeout(900);
  await dp.screenshot({path:out+'d-'+v+'.png'});
  await mp.goto('http://localhost:4337/lab/'+v+'.html',{waitUntil:'networkidle'});
  await mp.waitForTimeout(700);
  await mp.screenshot({path:out+'m-'+v+'.png'});
  console.log(v,'ok');
}
await b.close();
