import fs from 'fs';
import path from 'path';

const states = [
  { id: "an", name: "Andaman and Nicobar Islands", slug: "andaman-and-nicobar-islands", type: "Union Territory", region: "Islands & Union Territories", capital: "Port Blair", colorHex: "#0077b6" },
  { id: "ap", name: "Andhra Pradesh", slug: "andhra-pradesh", type: "State", region: "South India", capital: "Amaravati", colorHex: "#d90429" },
  { id: "ar", name: "Arunachal Pradesh", slug: "arunachal-pradesh", type: "State", region: "North East India", capital: "Itanagar", colorHex: "#023e8a" },
  { id: "as", name: "Assam", slug: "assam", type: "State", region: "North East India", capital: "Dispur", colorHex: "#2a9d8f" },
  { id: "br", name: "Bihar", slug: "bihar", type: "State", region: "East India", capital: "Patna", colorHex: "#e76f51" },
  { id: "ch", name: "Chandigarh", slug: "chandigarh", type: "Union Territory", region: "North India", capital: "Chandigarh", colorHex: "#264653" },
  { id: "ct", name: "Chhattisgarh", slug: "chhattisgarh", type: "State", region: "Central India", capital: "Raipur", colorHex: "#f4a261" },
  { id: "dn", name: "Dadra and Nagar Haveli and Daman and Diu", slug: "dadra-nagar-haveli-daman-diu", type: "Union Territory", region: "West India", capital: "Daman", colorHex: "#1d3557" },
  { id: "dl", name: "Delhi", slug: "delhi", type: "Union Territory", region: "North India", capital: "New Delhi", colorHex: "#e63946" },
  { id: "ga", name: "Goa", slug: "goa", type: "State", region: "West India", capital: "Panaji", colorHex: "#ffd166" },
  { id: "gj", name: "Gujarat", slug: "gujarat", type: "State", region: "West India", capital: "Gandhinagar", colorHex: "#f4a261" },
  { id: "hr", name: "Haryana", slug: "haryana", type: "State", region: "North India", capital: "Chandigarh", colorHex: "#2a9d8f" },
  { id: "hp", name: "Himachal Pradesh", slug: "himachal-pradesh", type: "State", region: "North India", capital: "Shimla", colorHex: "#264653" },
  { id: "jk", name: "Jammu and Kashmir", slug: "jammu-and-kashmir", type: "Union Territory", region: "North India", capital: "Srinagar", colorHex: "#023e8a" },
  { id: "jh", name: "Jharkhand", slug: "jharkhand", type: "State", region: "East India", capital: "Ranchi", colorHex: "#e76f51" },
  { id: "ka", name: "Karnataka", slug: "karnataka", type: "State", region: "South India", capital: "Bengaluru", colorHex: "#d90429" },
  { id: "kl", name: "Kerala", slug: "kerala", type: "State", region: "South India", capital: "Thiruvananthapuram", colorHex: "#2a9d8f" },
  { id: "la", name: "Ladakh", slug: "ladakh", type: "Union Territory", region: "North India", capital: "Leh", colorHex: "#1d3557" },
  { id: "ld", name: "Lakshadweep", slug: "lakshadweep", type: "Union Territory", region: "Islands & Union Territories", capital: "Kavaratti", colorHex: "#0077b6" },
  { id: "mp", name: "Madhya Pradesh", slug: "madhya-pradesh", type: "State", region: "Central India", capital: "Bhopal", colorHex: "#e76f51" },
  { id: "mh", name: "Maharashtra", slug: "maharashtra", type: "State", region: "West India", capital: "Mumbai", colorHex: "#f4a261" },
  { id: "mn", name: "Manipur", slug: "manipur", type: "State", region: "North East India", capital: "Imphal", colorHex: "#e63946" },
  { id: "ml", name: "Meghalaya", slug: "meghalaya", type: "State", region: "North East India", capital: "Shillong", colorHex: "#2a9d8f" },
  { id: "mz", name: "Mizoram", slug: "mizoram", type: "State", region: "North East India", capital: "Aizawl", colorHex: "#023e8a" },
  { id: "nl", name: "Nagaland", slug: "nagaland", type: "State", region: "North East India", capital: "Kohima", colorHex: "#d90429" },
  { id: "or", name: "Odisha", slug: "odisha", type: "State", region: "East India", capital: "Bhubaneswar", colorHex: "#f4a261" },
  { id: "py", name: "Puducherry", slug: "puducherry", type: "Union Territory", region: "South India", capital: "Puducherry", colorHex: "#1d3557" },
  { id: "pb", name: "Punjab", slug: "punjab", type: "State", region: "North India", capital: "Chandigarh", colorHex: "#264653" },
  { id: "rj", name: "Rajasthan", slug: "rajasthan", type: "State", region: "North India", capital: "Jaipur", colorHex: "#ffd166" },
  { id: "sk", name: "Sikkim", slug: "sikkim", type: "State", region: "North East India", capital: "Gangtok", colorHex: "#0077b6" },
  { id: "tn", name: "Tamil Nadu", slug: "tamil-nadu", type: "State", region: "South India", capital: "Chennai", colorHex: "#e63946" },
  { id: "tg", name: "Telangana", slug: "telangana", type: "State", region: "South India", capital: "Hyderabad", colorHex: "#f4a261" },
  { id: "tr", name: "Tripura", slug: "tripura", type: "State", region: "North East India", capital: "Agartala", colorHex: "#d90429" },
  { id: "up", name: "Uttar Pradesh", slug: "uttar-pradesh", type: "State", region: "North India", capital: "Lucknow", colorHex: "#e76f51" },
  { id: "ut", name: "Uttarakhand", slug: "uttarakhand", type: "State", region: "North India", capital: "Dehradun", colorHex: "#2a9d8f" },
  { id: "wb", name: "West Bengal", slug: "west-bengal", type: "State", region: "East India", capital: "Kolkata", colorHex: "#023e8a" }
];

const standardCategories = ["Adventure", "Spiritual", "Heritage", "Nature", "Wildlife", "Hill Station", "Beach", "Desert", "Cityscape"];
const standardSeasons = ["Spring", "Summer", "Monsoon", "Autumn", "Winter", "Year-round"];

function getRandomDestinations(stateSlug, stateName, count=8) {
  const dests = [];
  for (let i = 1; i <= count; i++) {
    const dName = `${stateName} Destination ${i}`;
    const dSlug = `${stateSlug}-dest-${i}`;
    dests.push({
      id: `${stateSlug}-d${i}`,
      stateSlug: stateSlug,
      name: dName,
      slug: dSlug,
      image: `/assets/images/destinations/${stateSlug}-${dSlug}-hero.webp`,
      gallery: [
        `/assets/images/destinations/${stateSlug}-${dSlug}-gallery-1.webp`,
        `/assets/images/destinations/${stateSlug}-${dSlug}-gallery-2.webp`
      ],
      colorHex: "#0F172A",
      shortDescription: `Explore the wonders of ${dName}, a jewel in ${stateName}.`,
      fullDescription: `A comprehensive journey through the beautiful ${dName}, featuring distinct culture, pristine nature, and historic landmarks. Discover the best of ${stateName} here.`,
      categories: [standardCategories[i % standardCategories.length], standardCategories[(i+1) % standardCategories.length]],
      budget: i % 2 === 0 ? "Mid-Range" : "Budget",
      bestSeasons: [standardSeasons[i % 3], standardSeasons[4]],
      highlights: ["Local Cuisine", "Historic Monuments", "Scenic Views"],
      coordinates: { lat: 20.0 + (i * 0.1), lng: 77.0 + (i * 0.1) },
      seo: {
        title: `${dName} Tourism | Visit ${stateName}`,
        description: `Plan your trip to ${dName}, ${stateName}. Find best places to visit, things to do, and travel guides.`,
        keywords: [dName.toLowerCase(), stateName.toLowerCase(), "tourism", "india travel"]
      }
    });
  }
  return dests;
}

function runProcess() {
  const statesTsHeader = `import { StateModel, DestinationModel } from "../types/models";\n`;

  let stateObjs = [];
  let destObjs = [];
  
  for (const s of states) {
    const stateDests = getRandomDestinations(s.slug, s.name, 8);
    const destSlugs = stateDests.map(d => `"${d.slug}"`).join(", ");
    
    const stateStr = `{
    id: "${s.id}",
    name: "${s.name}",
    slug: "${s.slug}",
    type: "${s.type}",
    region: "${s.region}",
    image: "/assets/images/destinations/${s.slug}-hero.webp",
    colorHex: "${s.colorHex}",
    shortDescription: "Experience the unique culture and landscapes of ${s.name}.",
    introOverview: "${s.name} offers a phenomenal mix of natural beauty, ancient heritage, and vibrant culture. Whether you seek adventure or peace, this region welcomes you.",
    quickFacts: {
      bestSeason: ["Winter", "Spring"],
      capital: "${s.capital}",
      language: ["Hindi", "English", "Local Dialect"],
      topPlacesCount: 8
    },
    famousDestinations: [${destSlugs}],
    seo: {
      title: "${s.name} Tourism | MyQuickTrippers",
      description: "Complete travel guide for ${s.name}. Discover top destinations, culture, and tour packages.",
      keywords: ["${s.name.toLowerCase()}", "india", "tourism", "travel guide"]
    }
  }`;
  stateObjs.push(stateStr);
  
  for (const d of stateDests) {
    destObjs.push(JSON.stringify(d, null, 4));
  }
  }

  const statesOut = `${statesTsHeader}\nexport const indiaStates: StateModel[] = [\n${stateObjs.join(',\n')}\n];\n`;
  const destsOut = `${statesTsHeader}\nexport const destinations: DestinationModel[] = [\n${destObjs.join(',\n')}\n];\n`;

  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'india-states.ts'), statesOut);
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'destinations.ts'), destsOut);
  
  console.log('[SUCCESS] Data generation complete. Wrote india-states.ts and destinations.ts with 36 states and 288 destinations.');
}

runProcess();
