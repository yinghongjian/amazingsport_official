const {chromium}=require('/Users/andydexia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'); const path=require('path');
(async()=>{
 const out=__dirname;fs.mkdirSync(path.join(out,'screenshots'),{recursive:true});
 const b=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
 for(const concept of ['a','b','c']){
  for(const width of [1440,390,375,768,1280]){
   const p=await b.newPage({viewport:{width,height:900},deviceScaleFactor:1});const errors=[];p.on('pageerror',e=>errors.push(e.message));
   const response=await p.goto(`http://127.0.0.1:8765/${concept}.html`,{waitUntil:'networkidle'});
   await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
   const checks=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),anchors:[...document.querySelectorAll('a[href^="#"]')].every(a=>!!document.querySelector(a.getAttribute('href'))),font:getComputedStyle(document.querySelector('h1')).fontFamily,heroHeight:document.querySelector('.hero').getBoundingClientRect().bottom}));
   results.push({concept,width,status:response.status(),errors,...checks});
   if(width===1440||width===390){const device=width===1440?'desktop':'mobile';await p.screenshot({path:path.join(out,`screenshots/${concept}-${device}-full.png`),fullPage:true});await p.setViewportSize({width,height:Math.ceil(checks.heroHeight)});await p.waitForTimeout(500);await p.screenshot({path:path.join(out,`screenshots/${concept}-${device}-hero.png`)});}
   await p.close();
  }
 }
 const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:8765/index.html',{waitUntil:'networkidle'});await p.screenshot({path:path.join(out,'screenshots/comparison.png'),fullPage:true});await b.close();
 fs.writeFileSync(path.join(out,'preview-checks.json'),JSON.stringify({date:'2026-10-30',browser:'Google Chrome via Playwright',results},null,2));
 const failed=results.filter(x=>x.status!==200||x.errors.length||x.broken.length||x.scrollWidth>x.width||!x.anchors);console.log(JSON.stringify({cases:results.length,failed,output:path.join(out,'screenshots')},null,2));process.exitCode=failed.length?1:0;
})();
