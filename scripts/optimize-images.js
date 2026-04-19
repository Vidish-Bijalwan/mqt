import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const RAW_DIR = path.join(process.cwd(), 'public', 'tourism', 'raw');
const OPTIMIZED_DIR = path.join(process.cwd(), 'src', 'assets', 'images', 'destinations');
const CACHE_FILE = path.join(process.cwd(), 'scripts', '.optimize-cache.json');

if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export async function runOptimizePipeline() {
  const cache = loadCache();
  
  if (!fs.existsSync(RAW_DIR)) {
    console.log("No raw images to optimize.");
    return;
  }

  const files = fs.readdirSync(RAW_DIR);
  
  for (const file of files) {
    if (file.startsWith('.')) continue; // skip hidden

    // Naming standard enforcement: [state-slug]-[destination-slug]-hero.webp
    // Example from raw: a_jpeg_image.jpg -> ensure standardized names are passed into raw folder.
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const targetFile = `${basename}.webp`;
    const targetPath = path.join(OPTIMIZED_DIR, targetFile);
    const sourcePath = path.join(RAW_DIR, file);

    const stat = fs.statSync(sourcePath);
    if (cache[file] && cache[file] === stat.mtimeMs) {
      console.log(`[SKIP] Already optimized: ${targetFile}`);
      continue;
    }

    try {
      await sharp(sourcePath)
        .resize(1200, 800, {
          fit: sharp.fit.cover,
          withoutEnlargement: true
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(targetPath);

      console.log(`[OPTIMIZED] -> ${targetFile}`);
      cache[file] = stat.mtimeMs;
    } catch (e) {
      console.error(`[ERROR] Optimizing ${file}:`, e.message);
    }
  }
  
  saveCache(cache);
}

// Support CLI execution
if (process.argv[1] === new URL(import.meta.url).pathname) {
  runOptimizePipeline().then(() => console.log('Optimization complete.'));
}
