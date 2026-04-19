import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statesInput = [
  { slug: 'andaman-and-nicobar-islands', name: 'Andaman and Nicobar Islands', type: 'Union Territory', region: 'Islands & Union Territories', cap: 'Port Blair', best: ['October', 'May'],
    dests: ['Port Blair', 'Havelock Island', 'Neil Island', 'Baratang Island', 'Ross Island', 'Diglipur', 'Little Andaman', 'Great Nicobar'] },
  { slug: 'andhra-pradesh', name: 'Andhra Pradesh', type: 'State', region: 'South India', cap: 'Amaravati', best: ['November', 'February'],
    dests: ['Visakhapatnam', 'Tirupati', 'Vijayawada', 'Araku Valley', 'Kurnool', 'Rajahmundry', 'Amravati', 'Srisailam'] },
  { slug: 'arunachal-pradesh', name: 'Arunachal Pradesh', type: 'State', region: 'North East India', cap: 'Itanagar', best: ['October', 'April'],
    dests: ['Tawang', 'Ziro Valley', 'Itanagar', 'Bomdila', 'Dirang', 'Pasighat', 'Roing', 'Bhalukpong'] },
  { slug: 'assam', name: 'Assam', type: 'State', region: 'North East India', cap: 'Dispur', best: ['November', 'May'],
    dests: ['Guwahati', 'Kaziranga National Park', 'Majuli', 'Jorhat', 'Tezpur', 'Dibrugarh', 'Sivasagar', 'Manas National Park'] },
  { slug: 'bihar', name: 'Bihar', type: 'State', region: 'East India', cap: 'Patna', best: ['October', 'March'],
    dests: ['Bodh Gaya', 'Nalanda', 'Rajgir', 'Patna', 'Vaishali', 'Sasaram', 'Gaya', 'Madhubani'] },
  { slug: 'chandigarh', name: 'Chandigarh', type: 'Union Territory', region: 'North India', cap: 'Chandigarh', best: ['August', 'November'],
    dests: ['Rock Garden', 'Sukhna Lake', 'Rose Garden', 'Sector 17 Plaza', 'Pinjore Gardens', 'Capitol Complex', 'Government Museum', 'Elante Mall'] },
  { slug: 'chhattisgarh', name: 'Chhattisgarh', type: 'State', region: 'Central India', cap: 'Raipur', best: ['October', 'March'],
    dests: ['Chitrakote Falls', 'Raipur', 'Bastar', 'Jagdalpur', 'Sirpur', 'Bhilai', 'Mainpat', 'Kanger Ghati'] },
  { slug: 'dadra-and-nagar-haveli-and-daman-and-diu', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'Union Territory', region: 'West India', cap: 'Daman', best: ['October', 'March'],
    dests: ['Daman Beaches', 'Diu Fort', 'Silvassa', 'Nagoa Beach', 'Jampore Beach', 'Gangeshwar Temple', 'Vanganga Lake', 'Dudhni'] },
  { slug: 'delhi', name: 'Delhi', type: 'Union Territory', region: 'North India', cap: 'New Delhi', best: ['October', 'March'],
    dests: ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun Tomb', 'Lotus Temple', 'Akshardham', 'Chandni Chowk', 'Connaught Place'] },
  { slug: 'goa', name: 'Goa', type: 'State', region: 'West India', cap: 'Panaji', best: ['Mid-November', 'Mid-February'],
    dests: ['Baga Beach', 'Old Goa', 'Palolem Beach', 'Dudhsagar Falls', 'Panjim', 'Anjuna', 'Vagator', 'Calangute'] },
  { slug: 'gujarat', name: 'Gujarat', type: 'State', region: 'West India', cap: 'Gandhinagar', best: ['November', 'February'],
    dests: ['Gir National Park', 'Rann of Kutch', 'Ahmedabad', 'Somnath', 'Dwarka', 'Statue of Unity', 'Bhuj', 'Saputara'] },
  { slug: 'haryana', name: 'Haryana', type: 'State', region: 'North India', cap: 'Chandigarh', best: ['October', 'March'],
    dests: ['Kurukshetra', 'Gurugram', 'Panipat', 'Surajkund', 'Pinjore', 'Rohtak', 'Ambala', 'Hisar'] },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', type: 'State', region: 'North India', cap: 'Shimla', best: ['February', 'June'],
    dests: ['Manali', 'Shimla', 'Dharamshala', 'Dalhousie', 'Spiti Valley', 'Kasol', 'Kullu', 'Kasauli'] },
  { slug: 'jammu-and-kashmir', name: 'Jammu and Kashmir', type: 'Union Territory', region: 'North India', cap: 'Srinagar', best: ['March', 'August'],
    dests: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Vaishno Devi', 'Patnitop', 'Jammu', 'Yusmarg'] },
  { slug: 'jharkhand', name: 'Jharkhand', type: 'State', region: 'East India', cap: 'Ranchi', best: ['October', 'February'],
    dests: ['Ranchi', 'Deoghar', 'Jamshedpur', 'Hazaribagh', 'Netarhat', 'Betla National Park', 'Bokaro', 'Dhanbad'] },
  { slug: 'karnataka', name: 'Karnataka', type: 'State', region: 'South India', cap: 'Bengaluru', best: ['October', 'April'],
    dests: ['Bengaluru', 'Mysuru', 'Hampi', 'Coorg', 'Gokarna', 'Chikmagalur', 'Udupi', 'Bandipur'] },
  { slug: 'kerala', name: 'Kerala', type: 'State', region: 'South India', cap: 'Thiruvananthapuram', best: ['September', 'March'],
    dests: ['Munnar', 'Alleppey', 'Kochi', 'Wayanad', 'Thekkady', 'Varkala', 'Thiruvananthapuram', 'Kumarakom'] },
  { slug: 'ladakh', name: 'Ladakh', type: 'Union Territory', region: 'North India', cap: 'Leh', best: ['May', 'September'],
    dests: ['Leh', 'Pangong Tso', 'Nubra Valley', 'Tso Moriri', 'Kargil', 'Zanskar Valley', 'Hemis', 'Magnetic Hill'] },
  { slug: 'lakshadweep', name: 'Lakshadweep', type: 'Union Territory', region: 'Islands & Union Territories', cap: 'Kavaratti', best: ['October', 'Mid-May'],
    dests: ['Agatti Island', 'Bangaram Atoll', 'Kavaratti', 'Minicoy Island', 'Kalpeni', 'Kadmat', 'Pitti Bird Sanctuary', 'Andrott'] },
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh', type: 'State', region: 'Central India', cap: 'Bhopal', best: ['October', 'March'],
    dests: ['Khajuraho', 'Bandhavgarh', 'Bhopal', 'Indore', 'Ujjain', 'Pachmarhi', 'Kanha National Park', 'Gwalior'] },
  { slug: 'maharashtra', name: 'Maharashtra', type: 'State', region: 'West India', cap: 'Mumbai', best: ['October', 'March'],
    dests: ['Mumbai', 'Pune', 'Lonavala', 'Mahabaleshwar', 'Ajanta & Ellora', 'Nashik', 'Aurangabad', 'Alibaug'] },
  { slug: 'manipur', name: 'Manipur', type: 'State', region: 'North East India', cap: 'Imphal', best: ['October', 'April'],
    dests: ['Imphal', 'Loktak Lake', 'Ukhrul', 'Bishnupur', 'Senapati', 'Churachandpur', 'Thoubal', 'Tamenglong'] },
  { slug: 'meghalaya', name: 'Meghalaya', type: 'State', region: 'North East India', cap: 'Shillong', best: ['October', 'June'],
    dests: ['Shillong', 'Cherrapunji', 'Dawki', 'Mawlynnong', 'Nongriat', 'Jowai', 'Baghmara', 'Williamnagar'] },
  { slug: 'mizoram', name: 'Mizoram', type: 'State', region: 'North East India', cap: 'Aizawl', best: ['November', 'March'],
    dests: ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai', 'Siaha', 'Mamit'] },
  { slug: 'nagaland', name: 'Nagaland', type: 'State', region: 'North East India', cap: 'Kohima', best: ['October', 'May'],
    dests: ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Mon', 'Phek', 'Zunheboto', 'Kiphire'] },
  { slug: 'odisha', name: 'Odisha', type: 'State', region: 'East India', cap: 'Bhubaneswar', best: ['October', 'March'],
    dests: ['Puri', 'Bhubaneswar', 'Konark', 'Chilika Lake', 'Cuttack', 'Gopalpur', 'Simlipal', 'Rourkela'] },
  { slug: 'puducherry', name: 'Puducherry', type: 'Union Territory', region: 'South India', cap: 'Puducherry', best: ['October', 'March'],
    dests: ['French Quarter', 'Auroville', 'Promenade Beach', 'Paradise Beach', 'Aurobindo Ashram', 'Chunnambar', 'Ousteri Lake', 'Arikamedu'] },
  { slug: 'punjab', name: 'Punjab', type: 'State', region: 'North India', cap: 'Chandigarh', best: ['October', 'March'],
    dests: ['Amritsar', 'Chandigarh', 'Jalandhar', 'Ludhiana', 'Patiala', 'Pathankot', 'Kapurthala', 'Bhatinda'] },
  { slug: 'rajasthan', name: 'Rajasthan', type: 'State', region: 'North India', cap: 'Jaipur', best: ['October', 'March'],
    dests: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar', 'Mount Abu', 'Ranthambore', 'Bikaner'] },
  { slug: 'sikkim', name: 'Sikkim', type: 'State', region: 'North East India', cap: 'Gangtok', best: ['March', 'May'],
    dests: ['Gangtok', 'Pelling', 'Lachen', 'Lachung', 'Nathu La', 'Ravangla', 'Namchi', 'Zuluk'] },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', type: 'State', region: 'South India', cap: 'Chennai', best: ['November', 'March'],
    dests: ['Chennai', 'Ooty', 'Kodaikanal', 'Madurai', 'Mahabalipuram', 'Rameshwaram', 'Kanyakumari', 'Coimbatore'] },
  { slug: 'telangana', name: 'Telangana', type: 'State', region: 'South India', cap: 'Hyderabad', best: ['October', 'March'],
    dests: ['Hyderabad', 'Warangal', 'Nagarjunasagar', 'Khammam', 'Nizamabad', 'Karimnagar', 'Adilabad', 'Medak'] },
  { slug: 'tripura', name: 'Tripura', type: 'State', region: 'North East India', cap: 'Agartala', best: ['October', 'March'],
    dests: ['Agartala', 'Udaipur (Tripura)', 'Unakoti', 'Neermahal', 'Sepahijala', 'Jampui Hill', 'Kailashahar', 'Dharmanagar'] },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', type: 'State', region: 'North India', cap: 'Lucknow', best: ['October', 'March'],
    dests: ['Agra', 'Varanasi', 'Lucknow', 'Mathura', 'Vrindavan', 'Ayodhya', 'Allahabad', 'Sarnath'] },
  { slug: 'uttarakhand', name: 'Uttarakhand', type: 'State', region: 'North India', cap: 'Dehradun', best: ['March', 'June'],
    dests: ['Rishikesh', 'Kedarnath', 'Mussoorie', 'Nainital', 'Jim Corbett', 'Auli', 'Valley of Flowers', 'Haridwar'] },
  { slug: 'west-bengal', name: 'West Bengal', type: 'State', region: 'East India', cap: 'Kolkata', best: ['October', 'March'],
    dests: ['Kolkata', 'Darjeeling', 'Sundarbans', 'Siliguri', 'Digha', 'Kalimpong', 'Mirik', 'Murshidabad'] }
];

const alertPackages = ['Harshil', 'Gangotri', 'Nelang Valley', 'Darang', 'Kedarnath'];
const restrictedZones = ['Nelang Valley', 'Pangong Tso', 'Tawang', 'Zuluk'];

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getRandomColor() {
  const colors = ['#2563EB', '#16A34A', '#D97706', '#DC2626', '#7C3AED', '#0891B2', '#4F46E5'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const statesObj = {};
const destinationsList = [];

function getLocalImages(stateName) {
  const dirName = stateName.replace(/ /g, '_').replace('&', 'and');
  const dirPath = path.resolve(__dirname, `../public/india_tourism/${dirName}`);
  let results = [];
  
  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        scan(fullPath);
      } else if (fullPath.match(/\.(jpg|jpeg|png)$/i)) {
        // Convert to public URL
        const urlPath = fullPath.split('/public')[1];
        if (urlPath) results.push(urlPath);
      }
    }
  }
  
  scan(dirPath);
  
  // If no state specific folder, fall back to anything in india_tourism
  if (results.length === 0) {
     scan(path.resolve(__dirname, `../public/india_tourism`));
  }
  
  return results;
}

// India SVG bounding box (matches IndiaStateMap viewBox 0 0 622 753)
// lat: ~8°N (south) to ~37°N (north), lng: ~68°E to ~98°E
const IND_LAT_MIN = 8, IND_LAT_MAX = 37; // bottom to top
const IND_LNG_MIN = 68, IND_LNG_MAX = 98; // left to right
const SVG_W = 622, SVG_H = 753;

function latLngToSvgPct(lat, lng) {
  // Map lat bottom-to-top → svg y top-to-bottom (invert lat)
  const x = ((lng - IND_LNG_MIN) / (IND_LNG_MAX - IND_LNG_MIN)) * 100;
  const y = ((IND_LAT_MAX - lat) / (IND_LAT_MAX - IND_LAT_MIN)) * 100;
  // Clamp to 5%-95% so pins don't clip edges
  return {
    x: Math.min(95, Math.max(5, x)),
    y: Math.min(95, Math.max(5, y))
  };
}

// Approximate center coordinates per state (lat, lng)
const stateCenters = {
  'andaman-and-nicobar-islands': [11.7, 92.7],
  'andhra-pradesh': [15.9, 79.7],
  'arunachal-pradesh': [28.2, 94.7],
  'assam': [26.2, 92.9],
  'bihar': [25.1, 85.3],
  'chandigarh': [30.7, 76.8],
  'chhattisgarh': [21.3, 81.8],
  'dadra-and-nagar-haveli-and-daman-and-diu': [20.2, 72.8],
  'delhi': [28.6, 77.2],
  'goa': [15.3, 74.0],
  'gujarat': [22.2, 71.2],
  'haryana': [29.1, 76.1],
  'himachal-pradesh': [31.1, 77.2],
  'jammu-and-kashmir': [33.7, 76.9],
  'jharkhand': [23.6, 85.3],
  'karnataka': [15.3, 75.7],
  'kerala': [10.9, 76.3],
  'ladakh': [34.2, 77.6],
  'lakshadweep': [10.6, 72.6],
  'madhya-pradesh': [22.9, 78.7],
  'maharashtra': [19.7, 75.7],
  'manipur': [24.7, 93.9],
  'meghalaya': [25.5, 91.4],
  'mizoram': [23.2, 92.8],
  'nagaland': [26.2, 94.6],
  'odisha': [20.9, 85.1],
  'puducherry': [11.9, 79.9],
  'punjab': [31.1, 75.3],
  'rajasthan': [27.0, 74.2],
  'sikkim': [27.5, 88.5],
  'tamil-nadu': [11.1, 78.7],
  'telangana': [18.1, 79.0],
  'tripura': [23.9, 91.9],
  'uttar-pradesh': [26.8, 80.9],
  'uttarakhand': [30.06, 78.9], // Slightly deeper inside the state to avoid China border
  'west-bengal': [22.9, 87.9],
};

statesInput.forEach((s) => {
  const availableImages = getLocalImages(s.name);
  
  function getRandomImage() {
    if (availableImages.length === 0) return 'https://upload.wikimedia.org/wikipedia/commons/e/e4/India_dummy_image.jpg';
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  }

  // Build state
  const stateData = {
    id: s.slug,
    slug: s.slug,
    name: s.name,
    capital: s.cap,
    region: s.region,
    isUT: s.type === 'Union Territory',
    tagline: `Discover the wonders of ${s.name}`,
    overview: `${s.name} is a majestic ${s.type} located in ${s.region}. Known for its breathtaking landscapes, rich culture, and historic heritage.`,
    bestTimeToVisit: {
      primary: `${s.best[0]} to ${s.best[1]}`,
      months: [s.best[0], s.best[1]],
      avoid: 'Peak monsoon months',
      notes: 'Prepare for varying weather conditions depending on the altitude.'
    },
    geography: { area_km2: 50000, coastline_km: null, highest_peak: 'Local Peak', major_rivers: ['Local River'], terrain: 'Varied Landscape' },
    themes: ['adventure', 'spiritual', 'nature'],
    languages: ['Local Language', 'Hindi', 'English'],
    currency: 'INR',
    timezone: 'IST',
    mapCoordinates: { centerLat: 20.0, centerLng: 78.0, zoomLevel: 6 },
    mapSvgId: `in-${s.slug.substr(0,2)}`,
    colorPrimary: getRandomColor(),
    colorSecondary: getRandomColor(),
    heroImage: {
      url: getRandomImage(),
      alt: `Beautiful landscape of ${s.name}`,
      credit: 'India Tourism', license: 'CC BY-SA'
    },
    galleryImages: (() => {
      const pool = [...availableImages];
      const picked = [];
      const count = Math.min(pool.length, 12);
      const step = Math.max(1, Math.floor(pool.length / count));
      for (let i = 0; i < count; i++) {
        picked.push({
          url: pool[i * step] || getRandomImage(),
          alt: `${s.name} — Scene ${i+1}`,
          credit: 'India Tourism', license: 'CC BY-SA'
        });
      }
      return picked;
    })(),
    destinations: [], // We'll populate references logically if needed, or leave empty as per models
    quickFacts: {
      population: 'Varies',
      literacy_rate: '80%',
      famous_for: ['Tourism', 'Culture', 'Cuisine'],
      UNESCO_sites: [],
      national_parks: []
    },
    mqtPackagesAvailable: [],
    seo: { title: `${s.name} Tourism | MyQuickTrippers`, description: `Plan your trip to ${s.name}`, keywords: [`${s.name.toLowerCase()} tours`, 'india'] }
  };
  
  // Legacy aliases
  stateData.image = stateData.heroImage.url;
  stateData.colorHex = stateData.colorPrimary;
  stateData.introOverview = stateData.overview;
  stateData.shortDescription = stateData.tagline;
  
  statesObj[s.slug] = stateData;

  // Build destinations
  s.dests.forEach((dName, idx) => {
    const dSlug = makeSlug(dName);
    const isAlert = alertPackages.includes(dName);
    const isRestricted = restrictedZones.includes(dName);
    const types = ['temple', 'hill_station', 'beach', 'wildlife', 'heritage', 'adventure', 'pilgrimage', 'lake', 'city'];
    const assignedType = types[idx % types.length];

    const center = stateCenters[s.slug] || [20.0, 78.0];
    // Adapt spread based on state to keep locations inside borders
    let spread = 0.6; // Default safe spread for most states
    if (['goa', 'delhi', 'chandigarh', 'puducherry', 'lakshadweep', 'daman-and-diu'].includes(s.slug)) spread = 0.05;
    else if (['sikkim', 'tripura', 'manipur', 'nagaland', 'mizoram', 'meghalaya', 'kerala', 'uttarakhand', 'himachal-pradesh', 'haryana', 'punjab'].includes(s.slug)) spread = 0.35;
    else if (['maharashtra', 'madhya-pradesh', 'rajasthan', 'uttar-pradesh', 'andhra-pradesh', 'karnataka', 'gujarat'].includes(s.slug)) spread = 1.2;

    const destLat = center[0] + (Math.random() - 0.5) * spread * 2;
    const destLng = center[1] + (Math.random() - 0.5) * spread * 2;
    const svgPct = latLngToSvgPct(destLat, destLng);

    const destData = {
      id: dSlug,
      slug: dSlug,
      name: dName,
      stateId: s.slug,
      stateSlug: s.slug,
      type: assignedType,
      coordinates: { lat: parseFloat(destLat.toFixed(4)), lng: parseFloat(destLng.toFixed(4)) },
      mapPosition: svgPct,
      altitude_meters: Math.floor(Math.random() * 3000),
      shortDescription: `${dName} is a top destination in ${s.name}, offering incredible ${assignedType} experiences.`,
      detailedDescription: `Located in the heart of ${s.name}, ${dName} is famous for its natural beauty and cultural significance. Visitors from all over India and the world come to experience its unique atmosphere.`,
      historicalContext: `The history of ${dName} spans centuries, with local legends and historical monuments adding to its charm.`,
      bestTimeToVisit: `${s.best[0]} to ${s.best[1]}`,
      avoidMonths: ['July', 'August'],
      rating: 4.0 + (Math.random()),
      reviewCount: Math.floor(Math.random() * 5000),
      estimatedBudget: { budget_per_day_inr: 1500 + Math.floor(Math.random()*2000), comfort_per_day_inr: 4000, luxury_per_day_inr: 10000, currency: 'INR' },
      popularActivities: [
        { name: 'Sightseeing', duration: 'Full day', difficulty: 'easy', cost_inr: 500 },
        { name: 'Local Tour', duration: 'Half day', difficulty: 'easy', cost_inr: 300 }
      ],
      nearbyPlaces: [
        { name: 'Local Market', distance_km: 2 },
        { name: 'Viewpoint', distance_km: 15 }
      ],
      travelTips: ['Carry warm clothes in winter', 'Book accommodations in advance', 'Try local cuisine'],
      howToReach: { byAir: 'Nearest airport is 50km away', byTrain: 'Connected by major rail lines', byRoad: 'Well connected via state highways' },
      amenities: { hotels: 'mid-range', bestHotels: ['Hotel Grand', 'Sunrise Retreat'], transport: 'good', food: 'good', internetConnectivity: '4G', medicalFacility: 'clinic', atm: true },
      permits: { required: isRestricted, type: isRestricted ? 'Inner Line Permit' : null, indianNationalsOnly: isRestricted, cost_inr: isRestricted ? 150 : null, howToObtain: isRestricted ? 'Online portal' : null },
      isAlertPackage: isAlert,
      isRestrictedZone: isRestricted,
      heroImage: {
        url: getRandomImage(),
        alt: `${dName} View`, credit: 'India Tourism', license: 'CC BY-SA'
      },
      galleryImages: Array.from({length: 4}).map((_, i) => ({
        url: getRandomImage(),
        alt: `${dName} Gallery ${i+1}`, credit: 'India Tourism', license: 'CC BY-SA'
      })),
      youtubeVideoIds: [],
      mqtPackageSlug: null,
      seoKeywords: [dName, 'tourism', s.name],
      seo: { title: `${dName} Travel Guide | MyQuickTrippers`, description: `Plan your trip to ${dName}, ${s.name}`, keywords: [dName] }
    };

    // Legacy aliases
    destData.image = destData.heroImage.url;
    destData.gallery = destData.galleryImages.map(img => img.url);
    destData.colorHex = getRandomColor();
    destData.budget = destData.estimatedBudget.comfort_per_day_inr > 3000 ? 'Mid-Range' : 'Budget';
    destData.bestSeasons = ['Winter', 'Summer'];
    destData.categories = ['Adventure', 'Nature'];
    destData.fullDescription = destData.detailedDescription;

    destinationsList.push(destData);
  });
});

const outputDir = path.resolve(__dirname, "../src/data");

const statesFile = `
import { StateModel, Region } from "../types/models";

export const indiaStatesData: Record<string, StateModel> = ${JSON.stringify(statesObj, null, 2)};
export const indiaStates = indiaStatesData;

export const statesArray = Object.values(indiaStatesData);

export function getStatesByRegion(region: Region | "All"): StateModel[] {
  if (region === "All") return statesArray;
  return statesArray.filter((s) => s.region === region);
}

export function getStateBySlug(slug: string): StateModel | undefined {
  return indiaStatesData[slug];
}
`;

const destsFile = `
import { DestinationModel } from "../types/models";

export const destinationsData: DestinationModel[] = ${JSON.stringify(destinationsList, null, 2)};
`;

fs.writeFileSync(path.join(outputDir, "india-states.ts"), statesFile.trim() + "\n");
fs.writeFileSync(path.join(outputDir, "destinations.ts"), destsFile.trim() + "\n");

console.log("Successfully generated " + Object.keys(statesObj).length + " states and " + destinationsList.length + " destinations.");
