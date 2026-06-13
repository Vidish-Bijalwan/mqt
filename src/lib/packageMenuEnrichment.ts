import { packageMenuData, type FeaturedPackage } from "@/data/packageMenuData";
import type { PackageContentOverride } from "@/data/packageContentOverrides";

const DEFAULT_INCLUSIONS = [
  "Accommodation on twin sharing with breakfast (category as quoted)",
  "Private vehicle for transfers and sightseeing per itinerary",
  "Driver allowance, fuel, tolls, and parking",
  "MQT trip coordinator on WhatsApp during travel dates",
];

const DEFAULT_EXCLUSIONS = [
  "Lunch, dinner, and beverages unless specified",
  "Monument, safari, activity, and permit entry fees",
  "Travel insurance, flights, trains, and personal expenses",
  "GST and any government taxes on the final invoice",
];

/** Map package slug → parsed itinerary slug when names align */
const ITINERARY_LINKS: Record<string, string> = {
  "golden-triangle-classic": "golden-triangle",
  "royal-rajasthan-family-escape": "rajasthan-tour",
  "rajasthan-heritage-trail": "rajasthan-tour",
  "kerala-family-escape": "kerala-delight",
  "kerala-backwaters-romance": "kerala-package-1",
  "kerala-luxury-escape": "kerala-package-2",
  "goa-family-beach-break": "goa-package-1",
  "goa-beach-escape": "goa-package-2",
  "goa-romantic-escape": "goa-package-2",
  "andaman-family-adventure": "andaman-package-1",
  "andaman-honeymoon-journey": "andaman-package-2",
  "andaman-coral-retreat": "andaman-package-1",
  "kashmir-family-7-nights-8-days": "best-of-kashmir",
  "kashmir-honeymoon-5-nights-6-days": "best-of-kashmir",
  "char-dham-yatra": "chardham-yatra",
  "kedarnath-yatra-5-nights-6-days": "chardham-yatra",
  "varanasi-spiritual-3-nights-4-days": "varanasi-patna",
  "darjeeling-tea-romance": "darjeeling-tour",
  "ooty-coorg-family-journey": "mysore-ooty",
  "manali-family-4-nights-5-days": "himachal-delight",
  "spiti-valley-escape": "scenic-himachal-golden-temple",
  "valley-of-flowers-trek-6-nights-7-days": "valley-of-flower-in-ladakh",
  "pondicherry-weekend-escape": "pondicherry-getaway",
  "tirupati-darshan-trip": "tirupati-package",
  "rameswaram-temple-trail": "karnataka-spiritual-tour",
  "hampi-heritage-trail": "karnataka-heritage-tour-1",
  "jim-corbett-safari": "romantic-uttaranchal",
  "mussoorie-weekend-retreat": "romantic-uttaranchal",
};

function parseDuration(duration: string): { days: number; nights: number } {
  const days = parseInt(duration.match(/(\d+)\s*Days?/i)?.[1] || "3", 10);
  const nights = parseInt(duration.match(/(\d+)\s*Nights?/i)?.[1] || String(Math.max(days - 1, 1)), 10);
  return { days, nights };
}

function buildItineraryLines(f: FeaturedPackage, days: number): string[] {
  const highlights = f.highlights || [];
  const dest = f.destination;
  const lines: string[] = [];

  for (let i = 0; i < days; i++) {
    if (i === 0) {
      lines.push(
        `Day 1: Arrival & transfer to ${dest} — ${highlights[0] || "check-in and local orientation"}`
      );
    } else if (i === days - 1) {
      lines.push(
        `Day ${i + 1}: Checkout from ${dest} — ${highlights[highlights.length - 1] || "departure transfer"}`
      );
    } else {
      const h = highlights[i - 1] || highlights[i % highlights.length] || "guided sightseeing";
      lines.push(`Day ${i + 1}: ${h} — explore ${dest} with private transport`);
    }
  }
  return lines;
}

function buildOverview(f: FeaturedPackage, days: number, nights: number): string {
  const highlightText = (f.highlights || []).join(", ");
  return (
    `${f.title} is a ${days}-day / ${nights}-night journey through ${f.destination}, ${f.state}. ${f.hook}\n\n` +
    `The route highlights ${highlightText}. My Quick Trippers handles hotels, transport, and on-ground coordination so you focus on the experience — whether this is a family holiday, honeymoon, adventure break, or spiritual tour.\n\n` +
    `Best planned ${days <= 4 ? "for long weekends" : "with a week’s leave"}; ask MQT for festival dates, hotel upgrades, or multi-city extensions.`
  );
}

function fromFeatured(f: FeaturedPackage): PackageContentOverride {
  const { days, nights } = parseDuration(f.duration);
  return {
    overview: buildOverview(f, days, nights),
    itineraryHighlights: buildItineraryLines(f, days),
    inclusions: DEFAULT_INCLUSIONS,
    exclusions: DEFAULT_EXCLUSIONS,
    linkedItinerarySlug: ITINERARY_LINKS[f.slug],
  };
}

const menuOverrideCache: Record<string, PackageContentOverride> = {};

function buildCache(): void {
  if (Object.keys(menuOverrideCache).length > 0) return;
  for (const group of packageMenuData) {
    for (const cat of group.categories) {
      for (const f of cat.featuredPackages) {
        menuOverrideCache[f.slug] = fromFeatured(f);
      }
    }
  }
}

export function getMenuPackageOverride(slug: string): PackageContentOverride | undefined {
  buildCache();
  return menuOverrideCache[slug];
}
