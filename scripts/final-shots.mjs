import { chromium } from 'playwright';
const base='http://127.0.0.1:4341';
const out='C:/Users/sfajr/Projects/studio-automatyzacji/out/final';
import fs from 'node:fs'; fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();
const c=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await c.newPage();
for(const [path,name,full] of [['/','home-fold',false],['/','home-full',true],['/wdrozenia','wdrozenia-full',true],['/ile-kosztuje','cennik-full',true],['/case-studies','realizacje-full',true],['/audyt','audyt-full',true]]){
  await p.goto(base+path,{waitUntil:'networkidle'});
  await p.evaluate(async()=>{const s=window.innerHeight*0.8;for(let y=0;y<document.body.scrollHeight;y+=s){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}window.scrollTo(0,0);});
  await p.waitForTimeout(600);
  await p.screenshot({path:`${out}/${name}.png`, fullPage: full});
}
const m=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
const pm=await m.newPage();
await pm.goto(base+'/',{waitUntil:'networkidle'}); await pm.waitForTimeout(500);
await pm.screenshot({path:out+'/home-mobile-fold.png'});
await pm.screenshot({path:out+'/home-mobile-full.png',fullPage:true});
await pm.goto(base+'/kontakt',{waitUntil:'networkidle'}); await pm.waitForTimeout(400);
await pm.screenshot({path:out+'/kontakt-mobile.png'});
await b.close();
console.log('done');
