import fs from 'fs';
import * as d3 from 'd3-geo';

const geojsonData = JSON.parse(fs.readFileSync('uttarakhand.json', 'utf8'));

// Create a projection fitting the bounding box of 1000x1000
const projection = d3.geoMercator().fitSize([1000, 1000], geojsonData);
const pathGenerator = d3.geoPath().projection(projection);

const svgPathString = pathGenerator(geojsonData);

fs.writeFileSync('uttarakhand_svg_path.txt', svgPathString);
console.log("Path generated!");
