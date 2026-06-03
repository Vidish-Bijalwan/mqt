#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from static routes + data file slugs.
 * Run: npm run seo:sitemap
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://www.myquicktrippers.com";

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function urlEntry(loc, priority = "0.7", changefreq = "weekly") {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function parseTourPackages(content) {
  const section = content.split("export const tourPackages")[1]?.split(/^export const /m)[0];
  if (!section) return [];
  const entries = [];
  const slugRe = /slug:\s*"([^"]+)"/g;
  const catRe = /categories:\s*\[([^\]]*)\]/g;
  let slugMatch;
  const slugs = [];
  while ((slugMatch = slugRe.exec(section)) !== null) {
    slugs.push(slugMatch[1]);
  }
  let catMatch;
  const categories = [];
  while ((catMatch = catRe.exec(section)) !== null) {
    const cats = [...catMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    categories.push(cats[0] || "all");
  }
  for (let i = 0; i < slugs.length; i++) {
    entries.push({ slug: slugs[i], category: categories[i] || "all" });
  }
  return entries;
}

function parseDestinations(content) {
  const entries = [];
  const re =
    /"slug":\s*"([^"]+)"[\s\S]*?"stateSlug":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    entries.push({ slug: m[1], stateSlug: m[2] });
  }
  return entries;
}

function parseSlugsFromFile(content, field = "slug") {
  const re = new RegExp(`"?${field}"?:\\s*"([^"]+)"`, "g");
  const slugs = new Set();
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.add(m[1]);
  }
  return [...slugs];
}

function parseStateSlugs(content) {
  const re = /"slug":\s*"([a-z0-9-]+)"/g;
  const slugs = new Set();
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.add(m[1]);
  }
  return [...slugs];
}

function parseExperienceCategories(content) {
  const re = /slug:\s*"([^"]+)"/g;
  const slugs = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    slugs.push(m[1]);
  }
  return slugs.slice(0, 12);
}

function main() {
  const urls = new Set();

  const staticPages = [
    ["/", "1.0", "daily"],
    ["/packages", "0.9", "weekly"],
    ["/packages/helicopter", "0.85", "weekly"],
    ["/destinations", "0.9", "weekly"],
    ["/itineraries", "0.85", "weekly"],
    ["/about", "0.7", "monthly"],
    ["/contact", "0.7", "monthly"],
    ["/blog", "0.8", "weekly"],
    ["/crafts", "0.6", "monthly"],
    ["/privacy-policy", "0.3", "yearly"],
    ["/terms-of-service", "0.3", "yearly"],
    ["/cancellation-policy", "0.3", "yearly"],
  ];

  for (const [path, pri, freq] of staticPages) {
    urls.add(urlEntry(`${SITE_URL}${path}`, pri, freq));
  }

  const packagesContent = read("src/data/packages.ts");
  for (const pkg of parseTourPackages(packagesContent)) {
    urls.add(
      urlEntry(
        `${SITE_URL}/packages/${pkg.category}/${pkg.slug}`,
        "0.8",
        "weekly"
      )
    );
  }

  const expContent = read("src/data/experiences.ts");
  for (const cat of parseExperienceCategories(expContent)) {
    urls.add(urlEntry(`${SITE_URL}/packages/${cat}`, "0.75", "weekly"));
  }

  const statesContent = read("src/data/india-states.ts");
  for (const slug of parseStateSlugs(statesContent)) {
    urls.add(urlEntry(`${SITE_URL}/destinations/${slug}`, "0.8", "weekly"));
  }

  const destContent = read("src/data/destinations.ts");
  for (const dest of parseDestinations(destContent)) {
    urls.add(
      urlEntry(
        `${SITE_URL}/destinations/${dest.stateSlug}/${dest.slug}`,
        "0.7",
        "weekly"
      )
    );
  }

  const itinContent = read("src/data/itineraries.ts");
  for (const slug of parseSlugsFromFile(itinContent)) {
    urls.add(urlEntry(`${SITE_URL}/itineraries/${slug}`, "0.75", "weekly"));
  }

  const blogContent = read("src/data/blog.ts");
  for (const slug of parseSlugsFromFile(blogContent)) {
    urls.add(urlEntry(`${SITE_URL}/blog/${slug}`, "0.7", "monthly"));
  }

  const services = [
    "custom-itinerary",
    "hotel-booking",
    "flight-booking",
    "cab-booking",
    "travel-insurance",
  ];
  for (const slug of services) {
    urls.add(urlEntry(`${SITE_URL}/services/${slug}`, "0.6", "monthly"));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].join("\n")}
</urlset>
`;

  if (xml.includes("<loc></loc>") || xml.includes("<url>\n  </url>")) {
    console.error("❌ Sitemap contains empty <url> entries — fix generator before deploying.");
    process.exit(1);
  }

  const outPath = path.join(ROOT, "public/sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  const urlCount = (xml.match(/<loc>/g) || []).length;
  console.log(`✅ Wrote ${urlCount} URLs → public/sitemap.xml`);
}

main();
