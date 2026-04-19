const fs = require('fs');
const path = require('path');
const https = require('https');

const FILE_PATH = path.join(__dirname, 'src', 'data', 'festivals.ts');
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const festivals = [
  "Holi",
  "Diwali",
  "Pushkar_Fair",
  "Kumbh_Mela",
  "Durga_Puja",
  "Ganesh_Chaturthi",
  "Onam",
  "Mysore_Dasara",
  "Rann_Utsav",
  "Hornbill_Festival",
  "Hemis_Festival",
  "Thrissur_Pooram"
];

const nameMap = {
  "Pushkar_Fair": "Pushkar Camel Fair",
  "Mysore_Dasara": "Mysuru Dasara",
  "Rann_Utsav": "Rann Utsav"
};

async function getWikiImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=1200`;
    https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId] && pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch(e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  for (const title of festivals) {
    const img = await getWikiImage(title);
    if (img) {
      const displayName = nameMap[title] || title.replace(/_/g, ' ');
      console.log(`Found image for ${displayName}: ${img}`);
      const regex = new RegExp(`name:\\s*["']${displayName}["'][\\s\\S]*?image:\\s*["'][^"']+["']`, 'g');
      content = content.replace(regex, (match) => {
        return match.replace(/image:\s*["'][^"']+["']/, `image: "${img}"`);
      });
    } else {
      console.log(`No image for ${title}`);
    }
  }
  fs.writeFileSync(FILE_PATH, content, 'utf-8');
  console.log("Updated festivals.ts with actual Wikipedia images!");
}

run();
