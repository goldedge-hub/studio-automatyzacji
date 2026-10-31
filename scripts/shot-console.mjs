import { chromium } from 'playwright';
import fs from 'fs';
const out='C:/Users/sfajr/Documents/StudioAutomation/screens/console/'; fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();
const d=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const m=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const dp=await d.newPage(), mp=await m.newPage();
for (const [p,n] of [['/','home'],['/audyt/','audyt'],['/ile-kosztuje/','cennik'],['/poradnik/jak-policzyc-czy-automatyzacja-sie-zwraca/','art']]){
  await dp.goto('http://localhost:4337'+p,{waitUntil:'networkidle'}); await dp.waitForTimeout(700);
  await dp.screenshot({path:out+'d-'+n+'.png'});
  await mp.goto('http://localhost:4337'+p,{waitUntil:'networkidle'}); await mp.waitForTimeout(500);
  await mp.screenshot({path:out+'m-'+n+'.png'});
}
console.log('shots ok'); await b.close();
