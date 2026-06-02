/* eslint-disable no-console */
import fs from "fs";
import path from "path";

const rootDir = path.resolve(process.cwd());
const inputPath = path.join(rootDir, "Discover India Packages.txt");
const outputPath = path.join(rootDir, "src/data/itineraries.ts");

const raw = fs.readFileSync(inputPath, "utf8");

const cutoffIndex = raw.search(/Our preferred Hotels|Booking Process & Terms|Booking Process/i);
const trimmed = cutoffIndex > -1 ? raw.slice(0, cutoffIndex) : raw;

const text = trimmed
  .replace(/\r/g, " ")
  .replace(/\n+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const regionRegex = /\b(NORTH INDIA|EAST INDIA|CENTRAL INDIA|WEST INDIA|SOUTH INDIA)\b/g;
const regionMatches = [...text.matchAll(regionRegex)].map(match => ({
  region: match[1],
  index: match.index ?? 0,
}));

const regionLabels = {
  "NORTH INDIA": "North India",
  "EAST INDIA": "East India",
  "CENTRAL INDIA": "Central India",
  "WEST INDIA": "West India",
  "SOUTH INDIA": "South India",
};

const headerRegex = /([A-Z][A-Za-z0-9&(),'.-]+(?:\s+[A-Za-z0-9&(),'.-]+)*)\s+([A-Za-z0-9&\/().,\- ]+?)\s+(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days/gi;
const headerMatches = [...text.matchAll(headerRegex)].map((match, idx) => ({
  match,
  index: match.index ?? 0,
  nextIndex: 0,
  idx,
}));

for (let i = 0; i < headerMatches.length; i += 1) {
  headerMatches[i].nextIndex = i + 1 < headerMatches.length
    ? headerMatches[i + 1].index
    : text.length;
}

const TYPO_FIXES = [
  { from: /\bSringar\b/gi, to: "Srinagar" },
  { from: /\bGuwhati\b/gi, to: "Guwahati" },
  { from: /\bRagjir\b/gi, to: "Rajgir" },
  { from: /\bBhubaneshwar\b/gi, to: "Bhubaneswar" },
  { from: /\bLakshwadeep\b/gi, to: "Lakshadweep" },
];

const DEFAULT_INCLUSIONS = [
  "Accommodation on single/twin/triple sharing",
  "Daily breakfast as per itinerary",
  "Transportation by AC vehicle",
  "Driver allowance, parking, tolls, and taxes",
];

const DEFAULT_EXCLUSIONS = [
  "Lunch and dinner unless specified",
  "Guide services and entrance fees",
  "Flight/train tickets",
  "Anything not mentioned in inclusions",
];

const THEME_KEYWORDS = [
  { tag: "Heritage", match: /heritage|palace|fort|temple|monastery|museum|historic/i },
  { tag: "Spiritual", match: /yatra|temple|darshan|aarti|jyotirling|spiritual|pilgrim|ashram|gurdwara|gurudwara/i },
  { tag: "Wildlife", match: /wildlife|national park|safari|tiger|rhino|elephant/i },
  { tag: "Hill Station", match: /hill station|valley|hills|mountain|pass|peak|meadow|snow|glacier/i },
  { tag: "Beach", match: /beach|island|coast|sea|bay|backwater/i },
  { tag: "Honeymoon", match: /honeymoon|romantic|couple/i },
  { tag: "Adventure", match: /trek|rafting|ski|paragliding|expedition|camp|ride/i },
  { tag: "Cruise", match: /cruise|houseboat|ship|ferry/i },
  { tag: "Family", match: /family/i },
  { tag: "Culture", match: /culture|craft|festival|market|bazaar|heritage/i },
];

const HIGHLIGHT_KEYWORDS = [
  { label: "Taj Mahal", match: /taj mahal/i },
  { label: "Agra Fort", match: /agra fort/i },
  { label: "Amber Fort", match: /amber fort/i },
  { label: "Hawa Mahal", match: /hawa mahal/i },
  { label: "Jaigarh Fort", match: /jaigarh fort/i },
  { label: "Fatehpur Sikri", match: /fatehpur sikri/i },
  { label: "Dal Lake", match: /dal lake/i },
  { label: "Mughal Gardens", match: /mughal gardens|nishat bagh|shalimar bagh/i },
  { label: "Gulmarg Gondola", match: /gondola|cable car/i },
  { label: "Pangong Lake", match: /pangong lake/i },
  { label: "Nubra Valley", match: /nubra valley/i },
  { label: "Golden Temple", match: /golden temple/i },
  { label: "Wagah Border", match: /wagah border/i },
  { label: "Khajuraho Temples", match: /khajuraho/i },
  { label: "Ajanta Caves", match: /ajanta/i },
  { label: "Ellora Caves", match: /ellora/i },
  { label: "Kaziranga National Park", match: /kaziranga/i },
  { label: "Konark Sun Temple", match: /konark/i },
  { label: "Jagannath Temple", match: /jagannath/i },
  { label: "Chilika Lake", match: /chilika/i },
  { label: "Goa Beaches", match: /goa/i },
  { label: "Munnar", match: /munnar/i },
  { label: "Hampi", match: /hampi/i },
  { label: "Mysore Palace", match: /mysore|maharaja palace/i },
  { label: "Ooty", match: /ooty/i },
  { label: "Auroville", match: /auroville/i },
  { label: "Rohtang Pass", match: /rohtang/i },
  { label: "Vaishno Devi", match: /vaishno devi/i },
  { label: "Kedarnath", match: /kedarnath/i },
  { label: "Badrinath", match: /badrinath/i },
];

function fixTypos(value) {
  let updated = value;
  for (const rule of TYPO_FIXES) {
    updated = updated.replace(rule.from, rule.to);
  }
  return updated;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function findRegion(index) {
  const candidate = regionMatches
    .filter((entry) => entry.index <= index)
    .sort((a, b) => b.index - a.index)[0];
  if (!candidate) return "India";
  return regionLabels[candidate.region] || candidate.region;
}

function cleanPackageName(name) {
  let cleaned = name.replace(/Skyway International Travels/gi, "").trim();
  cleaned = cleaned.replace(/^\d+\s+/, "");
  cleaned = cleaned.replace(/\s{2,}/g, " ");
  return fixTypos(cleaned);
}

function splitPlaces(rawPlaces) {
  if (!rawPlaces) return [];
  const normalized = fixTypos(rawPlaces)
    .replace(/\s+-\s+/g, " / ")
    .replace(/\s+to\s+/gi, " / ")
    .replace(/\s+&\s+/g, " / ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return normalized
    .split(/\s*\/\s*/)
    .map((item) => item.replace(/\(.*?\)/g, "").trim())
    .filter(Boolean);
}

function extractDayTitle(text) {
  const trimmed = text.trim();
  const routeMatch = trimmed.match(/^([A-Za-z0-9,.()'&\- ]+?)(?:\s+Meet|\s+Arrive|\s+Breakfast|\s+Morning|\s+Early|\s+Pickup|\s+Pick up|\s+Check|\s+Proceed|\.|$)/i);
  if (routeMatch && routeMatch[1]) {
    const candidate = routeMatch[1].trim();
    if (candidate.length > 3) {
      return fixTypos(candidate.replace(/\s{2,}/g, " "));
    }
  }
  const firstSentence = trimmed.split(".")[0];
  return fixTypos(firstSentence.slice(0, 60));
}

function parseDays(chunk) {
  const cutoffIndex = chunk.search(/PRICING|Includes:/i);
  const daySection = cutoffIndex > -1 ? chunk.slice(0, cutoffIndex) : chunk;
  const fixedDatesRemoved = daySection.replace(/Fixed Departures:[^]*$/i, "");

  const dayRegex = /Day\s*0?(\d+)\s*[:\-]/gi;
  const dayMatches = [...fixedDatesRemoved.matchAll(dayRegex)];
  if (dayMatches.length === 0) return [];

  const days = [];
  for (let i = 0; i < dayMatches.length; i += 1) {
    const current = dayMatches[i];
    const start = (current.index ?? 0) + current[0].length;
    const end = i + 1 < dayMatches.length ? (dayMatches[i + 1].index ?? fixedDatesRemoved.length) : fixedDatesRemoved.length;
    const rawText = fixedDatesRemoved.slice(start, end).trim();
    if (!rawText) continue;
    const title = extractDayTitle(rawText);
    let description = fixTypos(rawText);
    if (title && description.toLowerCase().startsWith(title.toLowerCase())) {
      description = description.slice(title.length).trim();
    }
    description = description.replace(/^[-–:]+/, "").trim();

    days.push({
      day: Number(current[1]),
      title: title || `Day ${current[1]}`,
      description,
    });
  }
  return days;
}

function parseInclusionsExclusions(chunk) {
  const includesMatch = chunk.match(/Includes:\s*(.*?)(Excludes:|$)/i);
  const excludesMatch = chunk.match(/Excludes:\s*(.*?)(\d+%\s*Service tax|Service tax|$)/i);

  const splitBullets = (textBlock) => {
    if (!textBlock) return [];
    return textBlock
      .split("•")
      .map((item) => item.replace(/\s{2,}/g, " ").trim())
      .filter(Boolean);
  };

  const inclusions = splitBullets(includesMatch?.[1]);
  const exclusions = splitBullets(excludesMatch?.[1]);

  return {
    inclusions: inclusions.length ? inclusions.map(fixTypos) : DEFAULT_INCLUSIONS,
    exclusions: exclusions.length ? exclusions.map(fixTypos) : DEFAULT_EXCLUSIONS,
  };
}

function parsePricing(chunk) {
  const pricingMatch = chunk.match(/PRICING[^]*?(Includes:|Excludes:)/i);
  const pricingSection = pricingMatch ? pricingMatch[0] : "";
  const numbers = (pricingSection.match(/\b\d{4,6}\b/g) || [])
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));

  const filtered = numbers.filter((value) => value >= 5000);
  const startingPrice = filtered.length ? Math.min(...filtered) : null;

  return { startingPrice };
}

function deriveTags(text) {
  const tags = new Set();
  for (const rule of THEME_KEYWORDS) {
    if (rule.match.test(text)) {
      tags.add(rule.tag);
    }
  }
  if (tags.size === 0) tags.add("Culture");
  return Array.from(tags);
}

function deriveHighlights(text) {
  const highlights = new Set();
  for (const rule of HIGHLIGHT_KEYWORDS) {
    if (rule.match.test(text)) {
      highlights.add(rule.label);
    }
  }
  return Array.from(highlights).slice(0, 8);
}

const itineraries = [];

for (const entry of headerMatches) {
  const [_, rawName, rawPlaces, nightsRaw, daysRaw] = entry.match;
  const chunk = text.slice(entry.index, entry.nextIndex);
  const hasDay = /Day\s*0?1\s*[:\-]/i.test(chunk);
  if (!hasDay) continue;

  const packageName = cleanPackageName(rawName);
  const nights = Number(nightsRaw);
  const days = Number(daysRaw);

  const dayWiseItinerary = parseDays(chunk);
  const placesFromHeader = splitPlaces(rawPlaces);
  const placesFromDays = dayWiseItinerary
    .flatMap((day) => splitPlaces(day.title))
    .filter(Boolean);

  const placesCovered = [...new Set([...(placesFromHeader || []), ...(placesFromDays || [])])]
    .filter(Boolean)
    .slice(0, 12);

  const startingPoint = placesCovered[0] || "";
  const endingPoint = placesCovered[placesCovered.length - 1] || "";

  const region = findRegion(entry.index);
  const duration = `${nights} Nights / ${days} Days`;

  const { inclusions, exclusions } = parseInclusionsExclusions(chunk);
  const pricing = parsePricing(chunk);

  const searchableText = `${packageName} ${rawPlaces} ${chunk}`;
  const categoryTags = deriveTags(searchableText);
  const highlights = deriveHighlights(searchableText);

  const shortDescription = placesCovered.length
    ? `Explore ${placesCovered.slice(0, 4).join(", ")} on a ${days}-day route across ${region}.`
    : `A ${days}-day itinerary across ${region} with curated highlights.`;

  const slug = slugify(packageName);
  const seoTitle = `${packageName} Itinerary | ${days} Days India Tour | My Quick Trippers`;
  const seoDescription = `Explore the ${packageName} itinerary covering ${placesCovered.join(", ") || "India"}. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers.`;

  itineraries.push({
    id: slug,
    slug,
    packageName: fixTypos(packageName),
    region,
    duration,
    nights,
    days,
    placesCovered,
    startingPoint,
    endingPoint,
    shortDescription: fixTypos(shortDescription),
    dayWiseItinerary,
    pricing,
    inclusions,
    exclusions,
    highlights,
    categoryTags,
    image: "",
    seoTitle,
    seoDescription,
  });
}

if (itineraries.length === 0) {
  console.warn("No itineraries parsed. Check parsing rules.");
}

const output = `/* eslint-disable */\n// Auto-generated from Discover India Packages.txt\n// Run: node scripts/parse-itineraries.js\n\nexport interface ItineraryDay {\n  day: number;\n  title: string;\n  description: string;\n}\n\nexport interface ItineraryPricing {\n  startingPrice: number | null;\n}\n\nexport interface ItineraryRecord {\n  id: string;\n  slug: string;\n  packageName: string;\n  region: string;\n  duration: string;\n  nights: number;\n  days: number;\n  placesCovered: string[];\n  startingPoint: string;\n  endingPoint: string;\n  shortDescription: string;\n  dayWiseItinerary: ItineraryDay[];\n  pricing: ItineraryPricing;\n  inclusions: string[];\n  exclusions: string[];\n  highlights: string[];\n  categoryTags: string[];\n  image: string;\n  seoTitle: string;\n  seoDescription: string;\n}\n\nexport const itineraries: ItineraryRecord[] = ${JSON.stringify(itineraries, null, 2)};\n`;

fs.writeFileSync(outputPath, output, "utf8");
console.log(`Generated ${itineraries.length} itineraries -> ${outputPath}`);
