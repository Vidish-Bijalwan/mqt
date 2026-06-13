import type { ItineraryDay, ItineraryRecord } from "@/data/itineraries";
import { getDestinationTourismImage } from "@/data/destinationImagesMap";
import { itineraries } from "@/data/itineraries";
import {
  getPublicItineraryBySlug,
  getPublicItineraries,
  type AdminItinerary,
  type AdminItineraryDay,
} from "@/services/itineraryService";

const INC = "/tourism/India_Central/Incredible_India";

const PLACE_IMAGES: Record<string, string> = {
  delhi: `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  agra: `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  jaipur: `${INC}/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg`,
  mussoorie: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  corbett: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  nainital: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  haridwar: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  rishikesh: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  manali: `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  shimla: `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  srinagar: `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  gulmarg: `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  leh: `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
  ladakh: `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
  goa: `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
  kerala: `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  kochi: `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  munnar: `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  varanasi: `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  amritsar: `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  darjeeling: `${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
  andaman: "/tourism/Andaman_Nicobar/Destinations/003_image_govt.jpg",
};

const SLUG_IMAGES: Record<string, string> = {
  "golden-triangle": PLACE_IMAGES.delhi,
  "romantic-uttaranchal": PLACE_IMAGES.mussoorie,
  "best-of-kashmir": PLACE_IMAGES.srinagar,
  "kerala-backwaters": PLACE_IMAGES.kerala,
  "goa-beach-holiday": PLACE_IMAGES.goa,
  "ladakh-expedition": PLACE_IMAGES.leh,
};

/** Map a Supabase row (+ optional days) to the static ItineraryRecord shape. */
export function dbToItineraryRecord(
  row: AdminItinerary,
  days: AdminItineraryDay[] = []
): ItineraryRecord {
  return {
    id: row.slug,
    slug: row.slug,
    packageName: row.package_name,
    region: row.region,
    duration: row.duration_label || `${row.nights} Nights / ${row.days} Days`,
    nights: row.nights,
    days: row.days,
    placesCovered: row.places_covered ?? [],
    startingPoint: row.starting_point ?? "",
    endingPoint: row.ending_point ?? "",
    shortDescription: row.short_description ?? "",
    dayWiseItinerary: days.map((d) => ({
      day: d.day_number,
      title: d.title,
      description: d.description,
    })),
    pricing: {
      startingPrice: row.starting_price,
      priceLabel: row.price_label ?? "",
      priceDisclaimer: row.price_disclaimer ?? "",
    },
    inclusions: row.inclusions ?? [],
    exclusions: row.exclusions ?? [],
    highlights: row.highlights ?? [],
    categoryTags: row.category_tags ?? [],
    image: row.image_url ?? "",
    seoTitle: row.seo_title ?? "",
    seoDescription: row.seo_description ?? "",
  };
}

function resolveItineraryImage(record: ItineraryRecord): string {
  if (record.image) return record.image;
  if (SLUG_IMAGES[record.slug]) return SLUG_IMAGES[record.slug];
  for (const place of record.placesCovered) {
    const key = place.toLowerCase().split(/[,\s/]+/)[0];
    if (PLACE_IMAGES[key]) return PLACE_IMAGES[key];
    const slug = place.toLowerCase().replace(/\s+/g, "-");
    const img = getDestinationTourismImage(slug);
    if (img) return img;
  }
  return PLACE_IMAGES.delhi;
}

function improveDayTitle(day: ItineraryDay, record: ItineraryRecord): string {
  if (day.title && !/^Day\s*\d+:\s*$/i.test(day.title.trim())) {
    return day.title.replace(/^Day\s*0?(\d+)\s*:?\s*/i, "Day $1: ");
  }
  const desc = day.description;
  const routeMatch = desc.match(/^([^/]+)\s*\/\s*([^/]+)/);
  if (routeMatch) {
    return `Day ${day.day}: ${routeMatch[1].trim()} → ${routeMatch[2].trim()}`;
  }
  const place = record.placesCovered[Math.min(day.day - 1, record.placesCovered.length - 1)];
  const verb = desc.toLowerCase().includes("safari")
    ? "Wildlife safari"
    : desc.toLowerCase().includes("sightseeing")
      ? "Local sightseeing"
      : desc.toLowerCase().includes("departure") || desc.toLowerCase().includes("delhi airport")
        ? "Departure"
        : "Travel & explore";
  return `Day ${day.day}: ${verb} — ${place || record.startingPoint}`;
}

function expandShortDescription(record: ItineraryRecord): string {
  const places = record.placesCovered.filter((p) => p !== record.startingPoint).join(", ");
  return (
    `${record.packageName} is a ${record.duration} tour across ${record.region} covering ${places}. ` +
    `Starting from ${record.startingPoint}, the route includes ${record.highlights.slice(0, 4).join(", ")} with hotel stays, breakfast, and private transport on request. ` +
    `Indicative pricing from ${record.pricing.priceLabel}; contact My Quick Trippers for a customised quote and latest seasonal rates.`
  );
}

function expandSeoDescription(record: ItineraryRecord): string {
  const places = record.placesCovered.join(", ");
  return (
    `Book the ${record.packageName} (${record.duration}): ${places}. Day-wise plan, inclusions, exclusions & instant quote — My Quick Trippers ${record.region} specialists.`
  );
}

function enrichRecord(base: ItineraryRecord): ItineraryRecord {
  const image = resolveItineraryImage(base);
  const dayWiseItinerary = base.dayWiseItinerary.map((d) => ({
    ...d,
    title: improveDayTitle(d, base),
    description: (d.description ?? "").replace(/\s+/g, " ").trim(),
  }));

  return {
    ...base,
    image,
    shortDescription:
      base.shortDescription.length < 80 ? expandShortDescription(base) : base.shortDescription,
    seoDescription: base.seoDescription || expandSeoDescription(base),
    dayWiseItinerary,
  };
}

/** Sync enrichment from static data only (legacy). */
export function getEnrichedItinerary(slug: string): ItineraryRecord | undefined {
  const base = itineraries.find((i) => i.slug === slug);
  if (!base) return undefined;
  return enrichRecord(base);
}

/** DB-first enrichment with static fallback. */
export async function getEnrichedItineraryAsync(slug: string): Promise<ItineraryRecord | undefined> {
  const { itinerary, days } = await getPublicItineraryBySlug(slug);
  if (itinerary) {
    return enrichRecord(dbToItineraryRecord(itinerary, days));
  }
  return getEnrichedItinerary(slug);
}

/**
 * Merge published DB itineraries with static ones (DB wins on slug collision).
 * Used by the public listing page.
 */
export async function getMergedItineraries(): Promise<ItineraryRecord[]> {
  const dbRows = await getPublicItineraries();
  const dbSlugs = new Set(dbRows.map((r) => r.slug));

  const dbRecords: ItineraryRecord[] = await Promise.all(
    dbRows.map(async (row) => {
      const { days } = await getPublicItineraryBySlug(row.slug);
      return enrichRecord(dbToItineraryRecord(row, days));
    })
  );

  const staticOnly = itineraries
    .filter((i) => !dbSlugs.has(i.slug))
    .map(enrichRecord);

  return [...dbRecords, ...staticOnly];
}
