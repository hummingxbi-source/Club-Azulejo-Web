import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../src/assets/images');

async function listImages() {
  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  console.log('| Image | Width x Height | Size (KB) |');
  console.log('|---|---|---|');
  
  let totalSize = 0;
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    totalSize += stats.size;
    
    try {
      const metadata = await sharp(filePath).metadata();
      console.log(`| ${file} | ${metadata.width}x${metadata.height} | ${sizeKB} |`);
    } catch (err) {
      console.log(`| ${file} | Error reading dimensions | ${sizeKB} |`);
    }
  }
  
  console.log(`\nTotal Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

listImages();
