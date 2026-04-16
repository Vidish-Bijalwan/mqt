const fs = require('fs');
const content = fs.readFileSync('src/data/packages.ts', 'utf8');

const regex = /{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?destination:\s*"([^"]+)"[\s\S]*?duration:\s*"([^"]+)"[\s\S]*?(?:price:\s*\{[^}]*inr:\s*(\d+))?[\s\S]*?}/g;

const packages = [];
let match;
while ((match = regex.exec(content)) !== null) {
  const dur = parseInt(match[4]) || 5; 
  const p = parseInt(match[5]) || 35000;
  // Try finding category
  const catMatch = match[0].match(/categories:\s*\[\s*"([^"]+)"/);
  const cat = catMatch ? catMatch[1] : "leisure";
  
  if (match[1] && match[2] && match[3]) {
    packages.push({
      id: match[1],
      name: match[2],
      destination: match[3],
      category: cat,
      duration_days: dur,
      budget_inr: p
    });
  }
}

fs.writeFileSync('ml_backend/packages.json', JSON.stringify(packages, null, 2));
console.log(`Generated ml_backend/packages.json with ${packages.length} entries.`);
