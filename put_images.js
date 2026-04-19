const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'src', 'data', 'festivals.ts');
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const imageMap = {
  "Holi": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Holi_festival_of_colors.jpg/1200px-Holi_festival_of_colors.jpg",
  "Diwali": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Diwali_Diyas.jpg/1200px-Diwali_Diyas.jpg",
  "Pushkar Camel Fair": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pushkar_Camel_Fair.jpg/1200px-Pushkar_Camel_Fair.jpg",
  "Kumbh Mela": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kumbh_Mela_festival.jpg/1200px-Kumbh_Mela_festival.jpg",
  "Durga Puja": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Durga_Puja_pandal.jpg/1200px-Durga_Puja_pandal.jpg",
  "Ganesh Chaturthi": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ganesh_Chaturthi_Immersion.jpg/1200px-Ganesh_Chaturthi_Immersion.jpg",
  "Onam": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Onam_Snake_Boat_Race.jpg/1200px-Onam_Snake_Boat_Race.jpg",
  "Mysuru Dasara": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mysore_Palace_Illumination.jpg/1200px-Mysore_Palace_Illumination.jpg",
  "Rann Utsav": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rann_of_Kutch_White_Desert.jpg/1200px-Rann_of_Kutch_White_Desert.jpg",
  "Hornbill Festival": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Hornbill_festival_nagaland.jpg/1200px-Hornbill_festival_nagaland.jpg",
  "Hemis Festival": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Hemis_festival.jpg/1200px-Hemis_festival.jpg",
  "Thrissur Pooram": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Thrissur_Pooram_festival.jpg/1200px-Thrissur_Pooram_festival.jpg"
};

for (const [name, url] of Object.entries(imageMap)) {
   const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   // replace directly using a greedy match down to the image property
   const regex = new RegExp(`(name:\\s*["']${escapeRegExp(name)}["'][\\s\\S]*?image:\\s*)["'][^"']+["']`, 'g');
   content = content.replace(regex, `$1"${url}"`);
}

fs.writeFileSync(FILE_PATH, content, 'utf-8');
console.log("Forced injected fixed standard wikipedia paths.");
