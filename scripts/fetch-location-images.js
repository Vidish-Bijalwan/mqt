#!/usr/bin/env node
/**
 * MQT Location Image Auto-Fetcher
 * ─────────────────────────────────
 * Usage:
 *   PEXELS_API_KEY=your_key node scripts/fetch-location-images.js "Nelang Valley" nelang-valley
 *   PEXELS_API_KEY=your_key node scripts/fetch-location-images.js "Kedarnath Temple" kedarnath
 *
 * Output: Downloads 3 images to public/images/locations/{slug}/
 *         Files are named: {slug}_1.jpg, {slug}_2.jpg, {slug}_3.jpg
 *         Updates public/images/location-map.json automatically.
 *
 * Free Pexels API key: https://www.pexels.com/api/
 */

import { createWriteStream, mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { get } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MAP_PATH = join(ROOT, 'public', 'images', 'location-map.json');

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
if (!PEXELS_API_KEY) {
  console.error('❌ Set PEXELS_API_KEY environment variable first.');
  console.error('   Get a free key at: https://www.pexels.com/api/');
  process.exit(1);
}

const [, , QUERY, SLUG] = process.argv;
if (!QUERY || !SLUG) {
  console.error('❌ Usage: node scripts/fetch-location-images.js "Location Name" location-slug');
  process.exit(1);
}

const OUTPUT_DIR = join(ROOT, 'public', 'images', 'locations', SLUG);
mkdirSync(OUTPUT_DIR, { recursive: true });

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(destPath);
    get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(destPath); });
    }).on('error', reject);
  });
}

function pexelsSearch(query, perPage = 3) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      headers: { Authorization: PEXELS_API_KEY },
    };
    let data = '';
    get(options, (res) => {
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

(async () => {
  console.log(`🔍 Searching Pexels for: "${QUERY} tourism landscape"...`);
  const result = await pexelsSearch(`${QUERY} India tourism`);

  if (!result.photos || result.photos.length === 0) {
    console.error(`❌ No photos found for "${QUERY}"`);
    process.exit(1);
  }

  const paths = [];
  for (let i = 0; i < Math.min(result.photos.length, 3); i++) {
    const photo = result.photos[i];
    const imgUrl = photo.src.large2x;
    const publicPath = `/images/locations/${SLUG}/${SLUG}_${i + 1}.jpg`;
    const destPath = join(ROOT, 'public', publicPath);
    console.log(`  ⬇ Downloading [${i + 1}]: ${photo.photographer} — ${photo.url}`);
    await downloadFile(imgUrl, destPath);
    paths.push(publicPath);
    console.log(`  ✅ Saved: ${publicPath}`);
  }

  // Update location-map.json
  const map = existsSync(MAP_PATH) ? JSON.parse(readFileSync(MAP_PATH, 'utf8')) : {};
  map[SLUG] = paths;
  writeFileSync(MAP_PATH, JSON.stringify(map, null, 2));
  console.log(`\n✅ Updated location-map.json with ${paths.length} images for "${SLUG}".`);
  console.log(`\n📌 Now add to imageMap.ts TOURISM_FALLBACKS:`);
  console.log(`   '${SLUG}': '${paths[0]}',`);
})();
