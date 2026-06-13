import type { TourPackage } from "@/data/packages";
import { packageContentOverrides } from "@/data/packageContentOverrides";
import { getMenuPackageOverride } from "@/lib/packageMenuEnrichment";
import { getItineraryBySlug, itineraries } from "@/data/itineraries";
import { getDestinationTourismImage } from "@/data/destinationImagesMap";

function slugifyDestination(dest: string): string {
  return dest.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function findLinkedItinerary(pkg: TourPackage, linkedSlug?: string) {
  const slug =
    linkedSlug ||
    packageContentOverrides[pkg.slug]?.linkedItinerarySlug ||
    getMenuPackageOverride(pkg.slug)?.linkedItinerarySlug;
  if (slug) {
    const it = getItineraryBySlug(slug);
    if (it) return it;
  }
  const dest = pkg.destination.toLowerCase();
  return itineraries.find(
    (it) =>
      it.placesCovered.some((p) => p.toLowerCase().includes(dest) || dest.includes(p.toLowerCase())) ||
      it.packageName.toLowerCase().includes(dest)
  );
}

function buildItineraryFromPackage(pkg: TourPackage): string[] {
  const days = pkg.duration?.days || 3;
  const dest = pkg.destination;
  const highlights = pkg.highlights || [];
  const lines: string[] = [];
  for (let i = 0; i < days; i++) {
    if (i === 0) {
      lines.push(
        `Day 1: Arrival in ${dest} — transfer, hotel check-in, and ${highlights[0] || "local orientation walk"}`
      );
    } else if (i === days - 1) {
      lines.push(`Day ${i + 1}: Checkout and departure from ${dest} with en-route sightseeing if time permits`);
    } else {
      const h = highlights[i - 1] || highlights[0] || "guided sightseeing";
      lines.push(`Day ${i + 1}: ${h} — full day in ${dest} with private vehicle and MQT coordinator support`);
    }
  }
  return lines;
}

function generateOverview(pkg: TourPackage): string {
  const days = pkg.duration?.days || 3;
  const nights = pkg.duration?.nights || 2;
  const hook = pkg.highlights?.slice(0, 3).join(", ") || "scenic highlights";
  return (
    `Discover ${pkg.destination}, ${pkg.state} on this ${days}-day / ${nights}-night ${pkg.categories?.[0] || "custom"} package. ` +
    `The route covers ${hook} with comfortable stays, private transport, and planning support from My Quick Trippers. ` +
    `Best travelled during ${pkg.season}. Request a quote for hotel category upgrades, festival dates, or multi-destination extensions.`
  );
}

const DEFAULT_INCLUSIONS = [
  "Accommodation on twin sharing with breakfast (unless stated otherwise)",
  "Private vehicle for transfers and sightseeing per itinerary",
  "Driver allowance, fuel, tolls, and parking",
  "MQT coordination on WhatsApp during the trip",
];

const DEFAULT_EXCLUSIONS = [
  "Lunch, dinner, and beverages unless specified",
  "Monument, safari, ropeway, and activity entry tickets",
  "Travel insurance, porterage, and personal expenses",
  "GST as applicable on final invoice",
];

/** Apply researched copy and linked itinerary data to a package (mutates). */
export function enrichPackage(pkg: TourPackage): TourPackage {
  const handOverride = packageContentOverrides[pkg.slug];
  const menuOverride = getMenuPackageOverride(pkg.slug);
  const override = handOverride
    ? { ...menuOverride, ...handOverride, itineraryHighlights: handOverride.itineraryHighlights ?? menuOverride?.itineraryHighlights }
    : menuOverride;
  const linkedItinerary = findLinkedItinerary(pkg, override?.linkedItinerarySlug);

  if (override?.overview) pkg.overview = override.overview;
  else if (!pkg.overview || pkg.overview.length < 120) pkg.overview = generateOverview(pkg);

  if (handOverride?.itineraryHighlights?.length) {
    pkg.itineraryHighlights = handOverride.itineraryHighlights;
  } else if (override?.itineraryHighlights?.length) {
    pkg.itineraryHighlights = override.itineraryHighlights;
  } else if (linkedItinerary?.dayWiseItinerary?.length) {
    pkg.itineraryHighlights = linkedItinerary.dayWiseItinerary.map((d) => {
      const desc = (d.description ?? "").replace(/\s+/g, " ").trim();
      const short = desc.length > 140 ? `${desc.slice(0, 137)}…` : desc;
      return `Day ${d.day}: ${short}`;
    });
  } else if (!pkg.itineraryHighlights?.length) {
    pkg.itineraryHighlights = buildItineraryFromPackage(pkg);
  }

  if (override?.inclusions?.length) pkg.inclusions = override.inclusions;
  else if (!pkg.inclusions?.length)
    pkg.inclusions = linkedItinerary?.inclusions?.length ? linkedItinerary.inclusions : DEFAULT_INCLUSIONS;

  if (override?.exclusions?.length) pkg.exclusions = override.exclusions;
  else if (!pkg.exclusions?.length)
    pkg.exclusions = linkedItinerary?.exclusions?.length ? linkedItinerary.exclusions : DEFAULT_EXCLUSIONS;

  if (!pkg.image || pkg.image.includes("Andaman")) {
    const destImg = getDestinationTourismImage(slugifyDestination(pkg.destination));
    if (destImg) pkg.image = destImg;
  }

  const highlights = pkg.highlights ?? [];
  if (highlights.length < 3 && linkedItinerary?.highlights?.length) {
    pkg.highlights = [...new Set([...highlights, ...linkedItinerary.highlights])].slice(0, 6);
  } else if (!pkg.highlights?.length) {
    pkg.highlights = highlights;
  }

  return pkg;
}

export function enrichAllPackages(packages: TourPackage[]): void {
  packages.forEach((pkg) => {
    try {
      enrichPackage(pkg);
    } catch (err) {
      console.warn(`[packageEnrichment] Skipped ${pkg.slug}:`, err);
    }
  });
}
