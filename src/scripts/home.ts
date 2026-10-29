const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const closeMenu = (restore = true) => {
 menu?.close();document.body.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');if(restore)toggle?.focus();
};
toggle?.addEventListener('click',()=>{menu?.showModal();document.body.classList.add('menu-open');toggle.setAttribute('aria-expanded','true');menu?.querySelector<HTMLButtonElement>('.menu-close')?.focus();});
menu?.querySelector('.menu-close')?.addEventListener('click',()=>closeMenu());
menu?.addEventListener('cancel',(event)=>{event.preventDefault();closeMenu();});
menu?.addEventListener('keydown',(event)=>{
 if(event.key!=='Tab')return;
 const controls=[...menu.querySelectorAll<HTMLElement>('button, a[href]')];const first=controls[0];const last=controls.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
});
menu?.querySelectorAll<HTMLAnchorElement>('a').forEach(a=>a.addEventListener('click',()=>{closeMenu(false);const target=document.querySelector<HTMLElement>(a.hash);target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});}));
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches&&menu?.open)closeMenu(false);});
const header=document.querySelector('.site-header');
const updateHeader=()=>header?.classList.toggle('scrolled',scrollY>20);
addEventListener('scroll',updateHeader,{passive:true});updateHeader();
const selected:{warmth:string;family:string}={warmth:'',family:''};
let expanded=false;
const rows=[...document.querySelectorAll<HTMLElement>('[data-product]')];
const expand=document.querySelector<HTMLButtonElement>('.show-all');
function selectProduct(row:HTMLElement | undefined){
 const figure=document.querySelector<HTMLElement>('.collection-photo');
 const img=document.querySelector<HTMLImageElement>('#selected-product-image');
 const name=document.querySelector('#selected-product-name');
 const source=document.querySelector('#selected-product-source');
 const empty=figure?.querySelector<HTMLElement>('.selected-empty');
 const photo=figure?.querySelector<HTMLElement>('.photo');
 const caption=figure?.querySelector<HTMLElement>('figcaption');
 if(photo)photo.hidden=!row;if(caption)caption.hidden=!row;if(empty)empty.hidden=!!row;
 document.querySelectorAll<HTMLButtonElement>('[data-product-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.closest('[data-product]')===row)));
 if(!row)return;
 const button=row.querySelector<HTMLButtonElement>('[data-product-select]');if(!button||!img)return;
 img.hidden=false;const fallback=figure?.querySelector<HTMLElement>('.photo-fallback');if(fallback)fallback.hidden=true;
 img.src=button.dataset.image??'';img.alt=button.dataset.name??'';img.width=Number(button.dataset.width);img.height=Number(button.dataset.height);
 if(name)name.textContent=button.dataset.name??'';
 if(source)source.textContent=`${button.dataset.sku||'货号待核对'} · ${button.dataset.source||'来源待核对'}`;
 if(figure)figure.dataset.selectedProduct=row.dataset.id;
}
document.querySelectorAll<HTMLButtonElement>('[data-product-select]').forEach(b=>b.addEventListener('click',()=>selectProduct(b.closest<HTMLElement>('[data-product]')??undefined)));
function filterProducts(){
 const matching=rows.filter(row=>(!selected.warmth||row.dataset.warmth===selected.warmth)&&(!selected.family||row.dataset.family?.split('|').includes(selected.family)));
 rows.forEach(row=>{row.classList.remove('initial-extra');row.hidden=!matching.includes(row)||(!expanded&&matching.indexOf(row)>=4);});
 const status=document.querySelector('.filter-status');if(status)status.textContent=`${[selected.warmth,selected.family].filter(Boolean).join(' / ')||'按产品手卡顺序呈现'} · ${matching.length} 款`;
 const empty=document.querySelector<HTMLElement>('.empty-state');if(empty)empty.hidden=matching.length!==0;
 selectProduct(matching[0]);
 if(expand){expand.hidden=matching.length<=4;expand.setAttribute('aria-expanded',String(expanded));expand.textContent=expanded?'收起款式 −':`展开全部 ${matching.length} 款 ＋`;}
}
document.documentElement.classList.add('js-ready');
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const key=button.dataset.filter as keyof typeof selected;selected[key]=button.dataset.value??'';expanded=false;
 document.querySelectorAll<HTMLButtonElement>(`[data-filter="${key}"]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterProducts();
}));
expand?.addEventListener('click',()=>{expanded=!expanded;filterProducts();});filterProducts();
document.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 document.querySelectorAll<HTMLElement>('.scene-panel').forEach(panel=>{panel.hidden=panel.id!==`scene-${button.dataset.scene}`;});
}));
function imageFailed(img:HTMLImageElement){img.hidden=true;const fallback=img.parentElement?.querySelector<HTMLElement>('.photo-fallback');if(fallback)fallback.hidden=false;}
document.querySelectorAll<HTMLImageElement>('.photo img').forEach(img=>{img.addEventListener('error',()=>imageFailed(img));if(img.complete&&!img.naturalWidth)imageFailed(img);});
