import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
await mkdir('public/images', {recursive:true});
const sources = {blue:'image46.jpeg',green:'image47.jpeg',dark:'image43.jpeg',violet:'image32.png',back:'image31.png'};
const records=[];
for(const [name,file] of Object.entries(sources)) {
 const input=`design/stage-2/assets/${file}`;
 const meta=await sharp(input).metadata();
 const sizes=[480,960,1600].filter(w=>w<=meta.width);
 for(const width of sizes) await sharp(input).resize({width}).webp({quality:85}).toFile(`public/images/${name}-${width}.webp`);
 records.push({name,source:input,sha256:createHash('sha256').update(await readFile(input)).digest('hex'),width:meta.width,height:meta.height,sizes,edit:'Format conversion and proportional resizing only; CSS detail views are labelled as garment crops.',rights:'Pending publication verification'});
}
await writeFile('src/data/assets.json',JSON.stringify(records,null,2)+'\n');
console.log('Responsive images prepared; originals preserved.');
