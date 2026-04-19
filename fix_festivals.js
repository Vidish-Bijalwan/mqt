const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'src', 'data', 'festivals.ts');
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const imageMap = {
"Holi": "https://images.unsplash.com/photo-1551886895-ec5c02b6623e?q=80&w=1200&auto=format&fit=crop",
"Diwali": "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1200&auto=format&fit=crop",
"Pushkar Camel Fair": "https://images.unsplash.com/photo-1544365345-cb39157297e6?q=80&w=1200&auto=format&fit=crop",
"Kumbh Mela": "https://images.unsplash.com/photo-1574513831835-deeb528f8045?q=80&w=1200&auto=format&fit=crop",
"Durga Puja": "https://images.unsplash.com/photo-1603525206634-118bdba7e52a?q=80&w=1200&auto=format&fit=crop",
"Ganesh Chaturthi": "https://images.unsplash.com/photo-1567262846436-b6057a6e138a?q=80&w=1200&auto=format&fit=crop",
"Onam": "https://images.unsplash.com/photo-1629809988225-bbedc1fd49a7?q=80&w=1200&auto=format&fit=crop",
"Mysuru Dasara": "https://images.unsplash.com/photo-1600100397608-f010f41cb8ed?q=80&w=1200&auto=format&fit=crop",
"Rann Utsav": "https://images.unsplash.com/photo-1617260555353-84d4364cb0d8?q=80&w=1200&auto=format&fit=crop",
"Hornbill Festival": "https://images.unsplash.com/photo-1596706915354-97cce0ef1fb7?q=80&w=1200&auto=format&fit=crop",
"Hemis Festival": "https://images.unsplash.com/photo-1587825000570-c081e779de09?q=80&w=1200&auto=format&fit=crop",
"Thrissur Pooram": "https://images.unsplash.com/photo-1583098319553-6101ea27c0a8?q=80&w=1200&auto=format&fit=crop"
};

// We will split the file by objects and inject the exact image based on the name.
for (const [name, url] of Object.entries(imageMap)) {
   // find the block with name: "Name"
   const regex = new RegExp(`name:\\s*["']${name}["'][\\s\\S]*?image:\\s*["'][^"']+["']`, 'g');
   content = content.replace(regex, (match) => {
      return match.replace(/image:\s*["'][^"']+["']/, `image: "${url}"`);
   });
}

fs.writeFileSync(FILE_PATH, content, 'utf-8');
console.log("Updated images.");
