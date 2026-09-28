import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalDir = path.join(__dirname, '../src/assets/images-original');
const outputDir = path.join(__dirname, '../src/assets/images');
const gitignorePath = path.join(__dirname, '../.gitignore');

async function optimizeImages() {
  if (!fs.existsSync(originalDir)) {
    // Solo si no se han movido ya
    fs.renameSync(outputDir, originalDir);
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Agrega al gitignore si no está
  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignore.includes('src/assets/images-original/')) {
      fs.appendFileSync(gitignorePath, '\nsrc/assets/images-original/\n');
    }
  }

  const files = fs.readdirSync(originalDir);

  for (const file of files) {
    const inputPath = path.join(originalDir, file);
    const isLogo = file.includes('logo-icon.png');
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    
    // Logo se copia igual
    if (isLogo) {
      fs.copyFileSync(inputPath, path.join(outputDir, file));
      console.log(`Copied ${file}`);
      continue;
    }

    if (!/\.(jpg|jpeg|png)$/i.test(file)) {
      continue;
    }

    let width = null;
    if (basename.includes('hero')) width = 1920;
    else if (basename === 'metodo') width = 1200;
    else if (basename.includes('metodo-pilar')) width = 900;
    else if (basename.includes('instructor')) width = 800;
    else if (basename.includes('galeria')) width = 1000;

    const outputPath = path.join(outputDir, `${basename}.webp`);
    
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outputPath);
      
    console.log(`Optimized ${file} -> ${basename}.webp (Width: ${width})`);
  }
}

optimizeImages().catch(console.error);
