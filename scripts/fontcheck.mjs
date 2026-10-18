import { chromium } from 'playwright';
const b=await chromium.launch(); const p=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://127.0.0.1:4334/',{waitUntil:'networkidle'});
const r=await p.evaluate(async()=>{await document.fonts.ready;return{
 h1:getComputedStyle(document.querySelector('h1')).fontFamily,
 sora:document.fonts.check('600 40px Sora'),
 inter:document.fonts.check('400 16px "Inter Variable"'),
 loaded:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).slice(0,6)}});
console.log(JSON.stringify(r,null,1)); await b.close();
