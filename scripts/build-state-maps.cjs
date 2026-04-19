const fs = require('fs');
const path = require('path');
const data = require('../package/index.js');

const locations = data.default.locations;

let tsContent = 'export interface StateLocationData {\n';
tsContent += '  id: string;\n  name: string;\n  path: string;\n}\n\n';
tsContent += 'export const stateLocations: StateLocationData[] = [\n';

for (const loc of locations) {
  tsContent += `  {\n    id: "${loc.id}",\n    name: "${loc.name}",\n    path: "${loc.path}"\n  },\n`;
}
tsContent += '];\n';

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'stateLocations.ts'), tsContent);
console.log('[SUCCESS] stateLocations.ts built.');
