import { blogPosts } from './src/data/blog.ts';
import { craftsData } from './src/data/crafts.ts';
import { destinations } from './src/data/destinations.ts';
import { travelExperiences } from './src/data/experiences.ts';
import { festivals } from './src/data/festivals.ts';
import { statesData } from './src/data/india-states.ts';
import { travelPackages } from './src/data/packages.ts';
import { testimonials } from './src/data/testimonials.ts';

console.log("Blog Posts:", blogPosts.length);
console.log("Crafts:", craftsData.length);
console.log("Destinations:", destinations.length);
console.log("Travel Experiences:", travelExperiences.length);
console.log("Festivals:", festivals.length);
console.log("States:", Object.keys(statesData).length);
console.log("Travel Packages:", travelPackages.length);
console.log("Testimonials:", testimonials.length);
