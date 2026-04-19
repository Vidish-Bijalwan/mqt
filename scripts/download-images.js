import fs from 'fs';
import path from 'path';
import https from 'https';

const CACHE_FILE = path.join(process.cwd(), 'scripts', '.image-cache.json');
const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'tourism', 'raw');

// Ensures target directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Simple cache to prevent redundant fetching
function loadCache() {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  }
  return {};
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// Example queue structure: { url: string, destFileName: string }
async function downloadImage(url, destFileName, cache) {
  if (cache[url]) {
    console.log(`[SKIP] Already fetched: ${destFileName}`);
    return;
  }

  const destPath = path.join(DOWNLOAD_DIR, destFileName);

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle Redirects
        console.log(`[REDIRECT] following ${url}`);
        return resolve(downloadImage(response.headers.location, destFileName, cache));
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url} (Status: ${response.statusCode})`));
      }

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        cache[url] = destPath;
        console.log(`[FETCHED] ${destFileName}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// This script acts as an importable module or runnable function
export async function runDownloadPipeline(imageQueue) {
  const cache = loadCache();
  for (const item of imageQueue) {
    try {
      await downloadImage(item.url, item.destFileName, cache);
    } catch (e) {
      console.error(`[ERROR] Processing ${item.url}:`, e.message);
    }
  }
  saveCache(cache);
}

// CLI Execution Support
if (process.argv[1] === new URL(import.meta.url).pathname) {
  // Example dummy execution if run directly
  console.log("Run from another script. Use runDownloadPipeline(queue)");
}
