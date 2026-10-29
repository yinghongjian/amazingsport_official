import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const output='docs/evidence/stage-3';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results=[];const errors=[];
try {
 for(const width of [1440,1280,768,390,375]) {
  const context=await browser.newContext({viewport:{width,height:width<600?844:960},reducedMotion:'reduce',deviceScaleFactor:1});const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto('http://127.0.0.1:8766/',{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}window.scrollTo(0,0);});
  await page.waitForTimeout(150);
  const check=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,broken:[...document.querySelectorAll('img')].filter(i=>i.checkVisibility()&&(!i.complete||!i.naturalWidth)).map(i=>i.src),anchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.outerHTML),reduced:getComputedStyle(document.documentElement).scrollBehavior}));
  assert.equal(check.h1,1);assert.ok(check.scrollWidth<=width);assert.deepEqual(check.broken,[]);assert.deepEqual(check.anchors,[]);assert.equal(check.reduced,'auto');
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  results.push({...check,axe:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
  if([1440,390].includes(width)) {await page.screenshot({path:`${output}/home-${width}-full.png`,fullPage:true});await page.screenshot({path:`${output}/home-${width}-hero.png`});}
  await page.getByRole('button',{name:'极寒',exact:true}).click();assert.equal(await page.locator('[data-product]:visible').count(),1);assert.match(await page.locator('[data-product]:visible').innerText(),/DER2659-AS/);assert.equal(await page.locator('#selected-product-image').getAttribute('src'),'/images/products/extreme-der2659.webp');if([1440,390].includes(width)){await page.locator('#collections').screenshot({path:`${output}/extreme-${width}.png`,style:'.site-header,.skip-link{visibility:hidden!important}'});}await page.getByRole('button',{name:'云壳系列',exact:true}).click();assert.ok(await page.locator('.empty-state').isVisible());assert.equal(await page.locator('[data-product]:visible').count(),0);await page.locator('[data-filter="family"][data-value=""]').click();
  await page.locator('[data-filter="warmth"][data-value="轻暖"]').click();await page.getByRole('button',{name:'云壳系列',exact:true}).click();assert.equal(await page.locator('[data-product]:visible').count(),1);assert.match(await page.locator('[data-product]:visible').innerText(),/云壳/);assert.equal(await page.locator('#selected-product-image').getAttribute('src'),'/images/products/cloud.webp');assert.match(await page.locator('#selected-product-name').innerText(),/云壳/);
  await page.locator('[data-filter="family"][data-value=""]').click();await page.locator('[data-filter="warmth"][data-value=""]').click();await page.locator('.show-all').click();assert.equal(await page.locator('[data-product]:visible').count(),17);for(const row of await page.locator('[data-product]:visible').all()){const button=row.locator('[data-product-select]');await button.click();assert.equal(await page.locator('#selected-product-image').getAttribute('src'),await button.getAttribute('data-image'));assert.equal(await page.locator('#selected-product-name').innerText(),await row.locator('h3').innerText());}await page.locator('.show-all').click();assert.equal(await page.locator('[data-product]:visible').count(),4);
  await page.locator('[data-product]:visible summary').first().click();assert.ok(await page.locator('[data-product]:visible .source-detail').first().isVisible());
  for(const scene of ['city','snow','family','campus']) {await page.locator(`[data-scene="${scene}"]`).click();assert.ok(await page.locator(`#scene-${scene}`).isVisible());assert.equal(await page.locator('.scene-panel:visible').count(),1);}
  if(width<=800) {
   await page.locator('.menu-toggle').click();assert.ok(await page.locator('#mobile-menu').isVisible());await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('#mobile-menu a').last().evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Tab');assert.equal(await page.locator('.menu-close').evaluate(e=>e===document.activeElement),true);await page.keyboard.press('Escape');assert.ok(!await page.locator('#mobile-menu').isVisible());assert.equal(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement),true);
   await page.locator('.menu-toggle').click();await page.locator('#mobile-menu a[href="#technology"]').click();assert.ok(!await page.locator('#mobile-menu').isVisible());assert.equal(await page.locator('#technology').evaluate(e=>e===document.activeElement),true);
  }
  await context.close();
 }
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto('http://127.0.0.1:8766/');assert.equal(await nojs.locator('h1').count(),1);assert.equal(await nojs.locator('[data-product]:visible').count(),17);await nojs.close();
 const failure=await browser.newPage();await failure.route('**/images/blue-*.webp',r=>r.abort());await failure.goto('http://127.0.0.1:8766/');assert.ok(await failure.locator('.hero .photo-fallback').isVisible());await failure.close();
 assert.deepEqual(errors,[]);
 await writeFile(`${output}/ui-results.json`,JSON.stringify({date:'2026-10-30',environment:'macOS / system Chrome via Playwright / local static build',results,errors,interactions:'PASS: filters, empty state, disclosure, scenes, menu Escape/focus/anchor, no-JS HTML, image error fallback'},null,2));
 const violations=results.flatMap(r=>r.axe);console.log(JSON.stringify({cases:results.length,errors,axeViolations:violations},null,2));assert.equal(violations.length,0);
} finally {await browser.close();}
