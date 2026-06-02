import fs from 'fs';
import * as d3 from 'd3-geo';

const geojsonData = JSON.parse(fs.readFileSync('uttarakhand.json', 'utf8'));

// 1. Calculate bounding box of the geojson in degrees
const bounds = d3.geoBounds(geojsonData);
const west = bounds[0][0];
const south = bounds[0][1];
const east = bounds[1][0];
const north = bounds[1][1];

// 2. We don't use D3 to draw the path because D3 flips Y and scales.
// Instead we write a custom path generator that just maps (lng, lat) to (x, y) 
// using the exact same math as projectCoordinates in InteractiveVectorMap.tsx:
// x = ((lng - west) / (east - west)) * 100
// y = 100 - (((lat - south) / (north - south)) * 100)

let pathStr = "";

geojsonData.coordinates.forEach(polygon => {
  polygon.forEach(ring => {
    // Simplify ring by keeping 1 in every 5 points to reduce file size (100kb -> 20kb)
    for (let i = 0; i < ring.length; i += 2) {
      const pt = ring[i];
      const lng = pt[0];
      const lat = pt[1];
      
      const x = ((lng - west) / (east - west)) * 100;
      const y = 100 - (((lat - south) / (north - south)) * 100);
      
      const cmd = i === 0 ? 'M' : 'L';
      pathStr += `${cmd}${x.toFixed(2)},${y.toFixed(2)} `;
    }
    pathStr += "Z ";
  });
});

// Now inject this into StateSvgPaths.ts!
let tsFile = fs.readFileSync('src/components/ui/Map/StateSvgPaths.ts', 'utf8');

// Replace the old placeholder path with this new path, and update bounds
const replacement = `
  uttarakhand: {
    slug: "uttarakhand",
    bounds: {
      north: ${north},
      south: ${south},
      east: ${east},
      west: ${west},
    },
    viewBox: "0 0 100 100",
    path: "${pathStr.trim()}",
  }
`;

tsFile = tsFile.replace(/uttarakhand: \{[\s\S]*?\n  \}/, replacement.trim());

fs.writeFileSync('src/components/ui/Map/StateSvgPaths.ts', tsFile);
console.log("Injected exact shape into StateSvgPaths.ts and simplified the path!");
