import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getImages(fullPath, fileList);
    } else if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allLocalImages = getImages('india_tourism');
const imageUrls = allLocalImages.map(p => '/tourism/' + p.replace('india_tourism/', ''));

for (let i = imageUrls.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
}

const dataDir = path.join(__dirname, 'src', 'data');
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'stateImagesMap.ts'); 

let imageIndex = 0;
function getNextImage() {
    const img = imageUrls[imageIndex];
    imageIndex = (imageIndex + 1) % imageUrls.length;
    return img;
}

for (const file of dataFiles) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Safer regex using backreference for the matching quotes
    content = content.replace(/(image|src|heroImage|bg_image_url):\s*(["'])\/tourism\/.*?\2/g, (match, prefix, quote) => {
       return `${prefix}: ${quote}${getNextImage()}${quote}`; 
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated images in ${file}`);
}
