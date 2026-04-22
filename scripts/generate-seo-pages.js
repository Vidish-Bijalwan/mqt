#!/usr/bin/env node
/**
 * MQT Programmatic SEO Page Generator
 * ─────────────────────────────────────────────────────────────────────────
 * Generates long-tail landing pages like:
 *   "5-Day Kedarnath Yatra for Senior Citizens in October"
 *   "Ladakh Bike Trip for College Friends in July"
 *
 * USAGE:
 *   GEMINI_API_KEY=your_key node scripts/generate-seo-pages.js
 *
 * Get free key: https://aistudio.google.com (1,500 req/day free)
 *   Then add to GitHub Secrets for CI automation.
 * ─────────────────────────────────────────────────────────────────────────
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "../src/pages/seo");
const SITE_URL = "https://www.myquicktrippers.com";
const RATE_LIMIT_MS = 2500; // Stay within Gemini free tier (1500 req/day)

// ─── MQT Package Manifest ───────────────────────────────────────────────
// These match the slugs in src/data/packages.ts
const PACKAGES = [
  { slug: "kedarnath-helicopter-package", title: "Kedarnath Yatra", destination: "Kedarnath", state: "Uttarakhand", days: 4, price: 0, activities: ["helicopter ride", "temple darshan", "trekking"] },
  { slug: "ladakh-premium-expedition", title: "Ladakh Premium Expedition", destination: "Ladakh", state: "Jammu & Kashmir", days: 8, price: 42000, activities: ["bike ride", "camping", "monastery visit", "pangong lake"] },
  { slug: "kashmir-valley-grandeur", title: "Kashmir Valley Grandeur", destination: "Kashmir", state: "Jammu & Kashmir", days: 6, price: 28999, activities: ["shikara ride", "gondola", "tulip garden", "apple orchard"] },
  { slug: "kerala-backwaters-ayurveda", title: "Kerala Backwaters & Ayurveda", destination: "Kerala", state: "Kerala", days: 7, price: 21999, activities: ["houseboat", "ayurveda", "tea garden"] },
  { slug: "rajasthan-royal-heritage-circuit", title: "Rajasthan Royal Heritage Circuit", destination: "Rajasthan", state: "Rajasthan", days: 9, price: 25000, activities: ["camel safari", "fort tour", "palace hotel", "folk dance"] },
  { slug: "char-dham-yatra-deluxe", title: "Char Dham Yatra Deluxe", destination: "Uttarakhand", state: "Uttarakhand", days: 12, price: 0, activities: ["pilgrimage", "yamunotri", "gangotri", "kedarnath", "badrinath"] },
  { slug: "goa-beach-break", title: "Goa Beach Break", destination: "Goa", state: "Goa", days: 5, price: 12999, activities: ["beach", "water sports", "spice plantation", "portuguese heritage"] },
  { slug: "andaman-island-escape", title: "Andaman Island Escape", destination: "Andaman", state: "Andaman & Nicobar", days: 6, price: 29999, activities: ["scuba diving", "snorkeling", "glass bottom boat", "Ross Island"] },
];

const DEMOGRAPHICS = [
  "senior citizens", "honeymooners", "families with young children",
  "solo female travelers", "college friend groups", "spiritual seekers",
  "adventure enthusiasts", "budget travelers",
];

const MONTHS_PEAK = {
  "Kedarnath":  ["May", "June", "September", "October"],
  "Ladakh":     ["June", "July", "August", "September"],
  "Kashmir":    ["April", "May", "October"],
  "Kerala":     ["October", "November", "December", "January"],
  "Rajasthan":  ["October", "November", "December", "January", "February"],
  "Uttarakhand":["May", "June", "September", "October"],
  "Goa":        ["November", "December", "January", "February", "March"],
  "Andaman":    ["November", "December", "January", "February", "March"],
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildCombinations() {
  const combos = [];
  for (const pkg of PACKAGES) {
    const months = MONTHS_PEAK[pkg.destination] ?? ["October", "December"];
    for (const demo of DEMOGRAPHICS.slice(0, 3)) {
      for (const month of months.slice(0, 2)) {
        const title = `${pkg.days}-Day ${pkg.destination} for ${demo} in ${month}`;
        combos.push({
          pkg,
          demographic: demo,
          month,
          title,
          slug: slugify(`${pkg.destination}-${pkg.days}-day-${demo}-${month}`),
        });
      }
    }
  }
  return combos;
}

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    }
  );
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

function buildPrompt({ pkg, demographic, month, title }) {
  return `
You are a top travel copywriter for MyQuickTrippers.com (based in Meerut, UP — a premium Indian travel agency).

Write an SEO landing page for: "${title}"

Package:
- Destination: ${pkg.destination}, ${pkg.state}
- Duration: ${pkg.days} days
- Price: ${pkg.price > 0 ? `₹${pkg.price.toLocaleString("en-IN")}/person` : "Price on Request"}
- Key activities: ${pkg.activities.join(", ")}

Target audience: ${demographic}
Best travel month: ${month}

Return ONLY valid JSON (no markdown backticks, no commentary):
{
  "metaTitle": "<60 chars, include destination + month",
  "metaDescription": "<155 chars, include price if available",
  "h1": "compelling page heading",
  "intro": "2-sentence introduction for ${demographic}",
  "whyBestMonth": "2 sentences on why ${month} is ideal for this destination",
  "whyIdealFor": "2 sentences on why ${demographic} will love this package",
  "highlights": ["bullet 1", "bullet 2", "bullet 3", "bullet 4"],
  "cta": "one compelling call-to-action sentence"
}
`.trim();
}

function buildComponent({ pkg, slug, title }, content) {
  const price = pkg.price > 0 ? `₹${pkg.price.toLocaleString("en-IN")}/person` : "Price on Request";
  const componentName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("").replace(/[^A-Za-z]/g, "");

  return `// AUTO-GENERATED by scripts/generate-seo-pages.js
// Date: ${new Date().toISOString()}
// Query: ${title}
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

export default function ${componentName}() {
  return (
    <PageLayout>
      <Helmet>
        <title>${content.metaTitle}</title>
        <meta name="description" content="${content.metaDescription}" />
        <link rel="canonical" href="${SITE_URL}/packages/seo/${slug}" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">Home</Link>
          {" → "}
          <Link to="/packages" className="hover:underline">Packages</Link>
          {" → ${title}"}
        </nav>

        <h1 className="text-4xl font-bold text-foreground">${content.h1}</h1>
        <p className="text-lg text-muted-foreground">${content.intro}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h2 className="font-semibold text-primary mb-2">Best in ${(title.match(/in (\w+)$/) || ["", "season"])[1]}</h2>
            <p className="text-sm text-muted-foreground">${content.whyBestMonth}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h2 className="font-semibold text-emerald-700 mb-2">Perfect For You</h2>
            <p className="text-sm text-muted-foreground">${content.whyIdealFor}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Package Highlights</h2>
          <ul className="space-y-2">
            ${content.highlights?.map((h) => `<li className="flex gap-2 items-start"><span className="text-primary mt-0.5">✓</span><span>${h}</span></li>`).join("\n            ")}
          </ul>
        </div>

        <div className="bg-foreground text-background rounded-2xl p-8 text-center space-y-4">
          <p className="text-lg">${content.cta}</p>
          <p className="text-3xl font-bold">${price}</p>
          <Link
            to="/packages/${pkg.slug}"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            View Full Package →
          </Link>
          <p className="text-sm opacity-70">Free itinerary consultation · No booking fees</p>
        </div>
      </div>
    </PageLayout>
  );
}
`;
}

async function main() {
  if (!GEMINI_KEY) {
    console.error("❌  Set GEMINI_API_KEY. Free key at: https://aistudio.google.com");
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const combos = buildCombinations();
  console.log(`📄 Generating up to ${combos.length} long-tail SEO pages...\n`);

  const manifest = [];
  let generated = 0;

  for (const combo of combos) {
    const file = path.join(OUTPUT_DIR, `${combo.slug}.tsx`);
    if (fs.existsSync(file)) {
      console.log(`  ⏭ Skip (exists): ${combo.slug}`);
      manifest.push({ slug: combo.slug, title: combo.title });
      continue;
    }
    try {
      const raw = await callGemini(buildPrompt(combo));
      const clean = raw.replace(/```json|```/g, "").trim();
      const content = JSON.parse(clean);
      fs.writeFileSync(file, buildComponent(combo, content), "utf-8");
      manifest.push({ slug: combo.slug, title: combo.title });
      generated++;
      console.log(`  ✅ ${combo.title}`);
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    } catch (e) {
      console.error(`  ❌ ${combo.slug}: ${e.message}`);
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "seo-routes.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\n✨ Done! ${generated} new pages → src/pages/seo/`);
  console.log("📋 Import seo-routes.json into App.tsx to register routes.");
}

main().catch(console.error);
