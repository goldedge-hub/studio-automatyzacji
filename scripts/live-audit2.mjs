import { chromium } from 'playwright';
const B='http://localhost:4337';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const p=await ctx.newPage();
const state=async()=>p.evaluate(()=>{const b=document.querySelector('[data-mobile-cta]');if(!b)return 'none';const cs=getComputedStyle(b);return {hidden:b.hidden,display:cs.display,h:Math.round(b.getBoundingClientRect().height)}});
await p.goto(B+'/',{waitUntil:'networkidle'});
const top=await state();
await p.evaluate(()=>window.scrollTo(0,900)); await p.waitForTimeout(600); const mid=await state();
await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await p.waitForTimeout(700); const foot=await state();
await p.goto(B+'/kontakt/',{waitUntil:'networkidle'}); const kontakt=await state();
// real tap-target offenders (not inline links in prose)
await p.goto(B+'/',{waitUntil:'networkidle'});
const off=await p.evaluate(()=>{
  const els=[...document.querySelectorAll('a,button,input,select,textarea,summary,[role=button]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0});
  const small=els.filter(e=>{const r=e.getBoundingClientRect();return r.height<44||r.width<44});
  return small.map(e=>{const r=e.getBoundingClientRect();const inline=e.closest('p,li,figcaption,td')&&getComputedStyle(e).display.includes('inline');
    return {t:(e.textContent||e.getAttribute('aria-label')||e.tagName).trim().slice(0,28),tag:e.tagName,cls:(e.className||'').toString().slice(0,24),w:Math.round(r.width),h:Math.round(r.height),inline};});
});
console.log(JSON.stringify({top,mid,foot,kontakt,offenders:off},null,1));
await b.close();
