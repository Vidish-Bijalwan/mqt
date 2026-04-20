const fs = require('fs');
const path = require('path');

const rootDir = '/home/zerosirus/Desktop/MQT';
const publicDir = path.join(rootDir, 'public');

// We will read imageMap.ts and extract all paths starting with /
const imageMapContent = fs.readFileSync(path.join(rootDir, 'src/lib/imageMap.ts'), 'utf-8');
const regex = /'(\/(?:tourism|assets|images)\/[^']+)'/g;

let brokenLinks = [];
let checked = 0;
let match;

while ((match = regex.exec(imageMapContent)) !== null) {
  const imgPath = match[1];
  checked++;
  const absolutePath = path.join(publicDir, imgPath);
  if (!fs.existsSync(absolutePath)) {
    brokenLinks.push(imgPath);
  }
}

// Read location-map.json
if (fs.existsSync(path.join(publicDir, 'images/location-map.json'))) {
  const jsonMap = JSON.parse(fs.readFileSync(path.join(publicDir, 'images/location-map.json'), 'utf-8'));
  for (const [slug, links] of Object.entries(jsonMap)) {
    for (const link of links) {
      checked++;
      const absolutePath = path.join(publicDir, link);
      if (!fs.existsSync(absolutePath)) {
        brokenLinks.push(`[location-map] ${link}`);
      }
    }
  }
}

console.log(`\nChecked Total: ${checked} paths within application dictionaries`);
if (brokenLinks.length === 0) {
  console.log("SUCCESS: All referenced images exist on disk.");
} else {
  console.log(`FOUND ${brokenLinks.length} BROKEN LINKS:`);
  brokenLinks.forEach(b => console.log(`  - ${b}`));
}
