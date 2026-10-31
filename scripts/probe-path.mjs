import { chromium } from 'playwright';
const b=await chromium.launch();
const m=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await m.newPage(); await p.goto('http://localhost:4337/audyt/',{waitUntil:'networkidle'});
const r=await p.evaluate(()=>{
  const steps=[...document.querySelectorAll('.path-step')];
  const rects=steps.map(s=>{const q=s.getBoundingClientRect();return {t:Math.round(q.top+scrollY),l:Math.round(q.left),w:Math.round(q.width),h:Math.round(q.height)}});
  const grid=document.querySelector('.path'); const gs=grid?getComputedStyle(grid):null;
  const num=steps.map(s=>{const n=s.querySelector('.n');const q=n.getBoundingClientRect();return {n:n.textContent.trim(),pos:getComputedStyle(n).position,w:Math.round(q.width),h:Math.round(q.height)}});
  return {gridCols:gs?.gridTemplateColumns,gap:gs?.gap,rects,num};
});
console.log(JSON.stringify(r,null,1));
await p.evaluate(()=>document.querySelector('.path')?.scrollIntoView()); await p.waitForTimeout(400);
await p.screenshot({path:'C:/Users/sfajr/Documents/StudioAutomation/screens/2026-10-31/m-audyt-path.png'});
await b.close();
