#!/usr/bin/env node
/**
 * MQT Content Cannibalization Audit
 * ─────────────────────────────────────────────────────────────────────────
 * Detects which pages are semantically competing for the same keywords.
 * Uses the same 100% free WebAssembly model as SemanticSearch.tsx.
 *
 * USAGE: node scripts/cannibalization-audit.js
 * SETUP: npm install @xenova/transformers (already installed)
 * ─────────────────────────────────────────────────────────────────────────
 */

// ─── YOUR PAGE INVENTORY ─────────────────────────────────────────────────
// Add every public URL you want to audit with a description of what it covers.
// The ML model detects semantic overlap — not just keyword overlap.
const PAGES = [
  // Package Pages
  { url: "/packages/exclusive/harshil-valley-4-day-package",      title: "Harshil Valley Ecosystem Expedition",       desc: "4-day ecological retreat in Harshil Valley, Uttarakhand, Bhagirathi river, Bhotiya culture" },
  { url: "/packages/pilgrimage/kedarnath-helicopter-package",       title: "Kedarnath Helicopter Yatra",                desc: "Kedarnath temple helicopter pilgrimage package, char dham, Shiva, spiritual" },
  { url: "/packages/pilgrimage/char-dham-yatra-deluxe",            title: "Char Dham Yatra Deluxe",                    desc: "Yamunotri Gangotri Kedarnath Badrinath pilgrimage tour Uttarakhand spiritual" },
  { url: "/packages/adventure/ladakh-premium-expedition",           title: "Ladakh Premium Expedition",                 desc: "Ladakh Leh motorcycle bike adventure camping Pangong lake Nubra" },
  { url: "/packages/adventure/ladakh-bike-expedition",              title: "Ladakh Bike Expedition",                    desc: "Ladakh motorcycle road trip high altitude Khardung La Nubra Valley" },
  { url: "/packages/romantic/kashmir-valley-grandeur",              title: "Kashmir Valley Grandeur",                   desc: "Kashmir honeymoon houseboat Dal Lake Gulmarg Pahalgam romantic couple" },
  { url: "/packages/romantic/kashmir-honeymoon-special",            title: "Kashmir Honeymoon Special",                 desc: "Kashmir romantic trip couple shikara Gulmarg Dal Lake honeymoon" },
  { url: "/packages/hills/manali-snow-adventure",                   title: "Manali Snow Adventure",                     desc: "Manali winter snow skiing trekking Solang Valley Himachal adventure" },
  { url: "/packages/hills/spiti-circuit",                           title: "Spiti Valley Circuit",                      desc: "Spiti Valley cold desert road trip Himachal monasteries altitude" },
  { url: "/packages/wellness/kerala-backwaters-ayurveda",           title: "Kerala Backwaters & Ayurveda",              desc: "Kerala houseboat backwaters Alleppey Munnar Ayurveda wellness retreat" },
  { url: "/packages/beaches/goa-beach-break",                       title: "Goa Beach Break",                           desc: "Goa beaches water sports nightlife Portuguese heritage North South Goa" },
  { url: "/packages/beaches/andaman-island-escape",                 title: "Andaman Island Escape",                     desc: "Andaman Nicobar scuba diving snorkeling Havelock Neil Island beach" },
  { url: "/packages/culture/rajasthan-royal-heritage-circuit",      title: "Rajasthan Royal Heritage Circuit",          desc: "Rajasthan fort palace Jaipur Jodhpur Udaipur Jaisalmer desert safari camel" },
  // Destination Pages
  { url: "/destinations/uttarakhand",  title: "Uttarakhand Destinations",  desc: "Uttarakhand tourism Kedarnath Rishikesh Haridwar Mussoorie hill station" },
  { url: "/destinations/jammu-kashmir", title: "J&K Destinations",         desc: "Kashmir Ladakh Leh Srinagar Gulmarg Dal Lake destinations" },
  { url: "/destinations/himachal-pradesh", title: "Himachal Destinations", desc: "Manali Shimla Spiti Dharamshala Kullu Himachal Pradesh mountains" },
];

// ─── Similarity Threshold ────────────────────────────────────────────────
const THRESHOLD = 0.80; // pages above this % similarity are flagged

async function main() {
  const { pipeline } = await import("@xenova/transformers");
  const { default: fs } = await import("fs");

  console.log("🔍 Loading embedding model (Xenova/all-MiniLM-L6-v2)...");
  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  console.log(`📊 Embedding ${PAGES.length} pages...\n`);
  const embedded = [];
  for (const page of PAGES) {
    const out = await embedder(`${page.title}. ${page.desc}`, { pooling: "mean", normalize: true });
    embedded.push({ page, vector: Array.from(out.data) });
    process.stdout.write(".");
  }
  console.log("\n");

  function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]**2; nb += b[i]**2; }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  const issues = [];
  for (let i = 0; i < embedded.length; i++) {
    for (let j = i + 1; j < embedded.length; j++) {
      const sim = cosine(embedded[i].vector, embedded[j].vector);
      if (sim >= THRESHOLD) {
        issues.push({ sim: Math.round(sim * 100), p1: embedded[i].page, p2: embedded[j].page });
      }
    }
  }
  issues.sort((a, b) => b.sim - a.sim);

  // ─── Report ──────────────────────────────────────────────────────────
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  CONTENT CANNIBALIZATION AUDIT — MyQuickTrippers");
  console.log("═══════════════════════════════════════════════════════════\n");

  if (!issues.length) {
    console.log("✅ No cannibalization detected! Your pages are well differentiated.\n");
    return;
  }

  console.log(`⚠️  Found ${issues.length} conflicting page pair(s):\n`);
  for (const [i, { sim, p1, p2 }] of issues.entries()) {
    const level = sim >= 92 ? "🔴 MERGE NOW" : sim >= 86 ? "🟠 DIFFERENTIATE" : "🟡 REVIEW";
    console.log(`${i + 1}. ${level} (${sim}% semantic similarity)`);
    console.log(`   A: ${p1.url}`);
    console.log(`      "${p1.title}"`);
    console.log(`   B: ${p2.url}`);
    console.log(`      "${p2.title}"`);
    if (sim >= 92)      console.log(`   FIX: Keep whichever has more traffic. Add rel="canonical" on the other page pointing to the winner.`);
    else if (sim >= 86) console.log(`   FIX: Add a clearly unique angle to each page. Merge if neither has significant organic traffic.`);
    else                console.log(`   FIX: Minor overlap — ensure distinct descriptions and meta titles.`);
    console.log();
  }

  const summary = {
    high: issues.filter(x => x.sim >= 92).length,
    medium: issues.filter(x => x.sim >= 86 && x.sim < 92).length,
    low: issues.filter(x => x.sim < 86).length,
  };

  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  🔴 Merge immediately:  ${summary.high}`);
  console.log(`  🟠 Differentiate:      ${summary.medium}`);
  console.log(`  🟡 Minor overlap:      ${summary.low}`);
  console.log(`  Total pages audited:   ${PAGES.length}`);
  console.log("═══════════════════════════════════════════════════════════\n");

  fs.writeFileSync(
    "cannibalization-report.json",
    JSON.stringify({ generatedAt: new Date().toISOString(), summary, issues }, null, 2)
  );
  console.log("📄 Full report saved → cannibalization-report.json");
}

main().catch(console.error);
