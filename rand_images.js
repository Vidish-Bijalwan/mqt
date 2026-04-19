const fs = require('fs');
const glob = require('glob'); // npm array

const allFiles = fs.readdirSync('src/data/').filter(f => f.endsWith('.ts') && f !== 'stateImagesMap.ts');
console.log('Files to process:', allFiles);
