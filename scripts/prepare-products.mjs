import sharp from 'sharp';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const rows=JSON.parse(await readFile('src/data/products.json','utf8'));
const slides=JSON.parse(await readFile('docs/evidence/stage-3/product-mapping/slides.json','utf8'));
await mkdir('public/images/products',{recursive:true});
for(const row of rows){
 const slide=slides.find(s=>s.page===row.imageSlide);
 if(row.sourceType!=='user-supplement'&&!slide?.pictures.some(p=>p.file===row.imageSource))throw new Error(`Unmatched image for ${row.id}`);
 const path=row.sourceType==='user-supplement'?row.sourcePath:`docs/evidence/stage-3/product-mapping/${row.imageSource}`;
 const meta=await sharp(path).metadata();
 row.width=meta.width;row.height=meta.height;row.sha256=createHash('sha256').update(await readFile(path)).digest('hex');
 await sharp(path).resize({width:Math.min(meta.width,1000)}).webp({quality:88}).toFile('public'+row.image);
}
await writeFile('src/data/products.json',JSON.stringify(rows,null,2)+'\n');
console.log(`${rows.length} product image mappings validated against PPT or brand supplement.`);
