#!/usr/bin/env node
/**
 * MQT Festival Image Downloader
 * Downloads 5 free Wikimedia Commons festival images and saves them locally.
 *
 * Usage: node scripts/download-festival-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'festivals');

const IMAGES = [
  {
    name: 'holi.jpg',
    // Wikimedia Commons — free, attribution: various photographers — CC-BY-SA
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Holi_celebration_%281%29.jpg/1280px-Holi_celebration_%281%29.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Playing_Holi.jpg/1280px-Playing_Holi.jpg',
  },
  {
    name: 'diwali.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Diwali_2012_Broadbeach_Gold_Coast_P1130108_%28cropped%29.jpg/1280px-Diwali_2012_Broadbeach_Gold_Coast_P1130108_%28cropped%29.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Diwali_Fireworks.jpg/1280px-Diwali_Fireworks.jpg',
  },
  {
    name: 'kumbh-mela.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/1_kumbh_mela_haridwar_pilgrims_2010.jpg/1280px-1_kumbh_mela_haridwar_pilgrims_2010.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Kumbh_Mela.jpg/1280px-Kumbh_Mela.jpg',
  },
  {
    name: 'hornbill.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hornbill_Festival_Warriors.jpg/1280px-Hornbill_Festival_Warriors.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hornbill_festival_Kohima.jpg/1280px-Hornbill_festival_Kohima.jpg',
  },
  {
    name: 'thrissur-pooram.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Thrissur_Pooram_2013_Paramekkavu_%26_Thiruvambadi_Elephants_edited.jpg/1280px-Thrissur_Pooram_2013_Paramekkavu_%26_Thiruvambadi_Elephants_edited.jpg',
    fallbackUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Thrissur_Pooram_2.jpg/1280px-Thrissur_Pooram_2.jpg',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, { headers: { 'User-Agent': 'MQT-ImageBot/1.0 (myquicktrippers.com)' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    });

    req.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function main() {
  console.log(`\n🎨 MQT Festival Image Downloader\n`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  let passed = 0;
  let failed = 0;

  for (const img of IMAGES) {
    const dest = path.join(OUTPUT_DIR, img.name);

    if (fs.existsSync(dest)) {
      const size = fs.statSync(dest).size;
      if (size > 10000) {
        console.log(`  ✓ SKIP   ${img.name}  (already exists, ${(size / 1024).toFixed(0)} KB)`);
        passed++;
        continue;
      }
    }

    process.stdout.write(`  ↓ DL     ${img.name} ... `);
    try {
      await downloadFile(img.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✓ (${(size / 1024).toFixed(0)} KB)`);
      passed++;
    } catch (e1) {
      process.stdout.write(`FAILED (primary), trying fallback... `);
      try {
        await downloadFile(img.fallbackUrl, dest);
        const size = fs.statSync(dest).size;
        console.log(`✓ fallback (${(size / 1024).toFixed(0)} KB)`);
        passed++;
      } catch (e2) {
        console.log(`✗ BOTH FAILED: ${e2.message}`);
        failed++;
      }
    }
  }

  console.log(`\n📊 Result: ${passed} downloaded, ${failed} failed\n`);

  if (failed > 0) {
    console.log(`⚠  Some images failed. You can retry or manually copy JPGs to:\n   ${OUTPUT_DIR}\n`);
  } else {
    console.log(`✅ All festival images ready!\n`);
    console.log(`💡 To commit:\n   git add public/assets/festivals/\n   git commit -m "feat: add festival images [Wikimedia Commons CC-BY-SA]"\n`);
  }
}

main().catch(console.error);
