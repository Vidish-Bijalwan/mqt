// ─────────────────────────────────────────────────────────────────────────────
// Recommendation Engine — pure functions, no backend
// All sorting is deterministic and based on intelligence fields.
// ─────────────────────────────────────────────────────────────────────────────

import type { TourPackage } from "@/data/packages";
import type { DestinationModel } from "@/types/models";

export type SortOption =
  | "popularity"
  | "price-low"
  | "price-high"
  | "newest"
  | "rating";

// ── Package Recommendations ──────────────────────────────────────────────────

/**
 * Scores a candidate package against a reference package.
 * Higher score = more similar / relevant.
 */
function scorePackageSimilarity(ref: TourPackage, candidate: TourPackage): number {
  if (ref.id === candidate.id) return -1; // exclude self

  let score = 0;

  // Same destination — strong signal
  if (ref.destination === candidate.destination) score += 40;

  // Overlapping categories — medium signal
  const sharedCategories = ref.categories.filter((c) =>
    candidate.categories.includes(c)
  );
  score += sharedCategories.length * 15;

  // Price proximity (within ±30%)
  const priceDiff = Math.abs(ref.price - candidate.price) / ref.price;
  if (priceDiff <= 0.15) score += 20;
  else if (priceDiff <= 0.30) score += 10;

  // Popularity score
  score += (candidate.popularityScore ?? 0) * 0.3;

  return score;
}

/**
 * Returns packages most similar to the given reference package.
 */
export function getSimilarPackages(
  ref: TourPackage,
  all: TourPackage[],
  limit = 3
): TourPackage[] {
  return all
    .map((pkg) => ({ pkg, score: scorePackageSimilarity(ref, pkg) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ pkg }) => pkg);
}

/**
 * Returns top trending packages, sorted by popularityScore.
 */
export function getTrendingPackages(
  all: TourPackage[],
  limit = 4
): TourPackage[] {
  return all
    .filter((pkg) => pkg.trending)
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    .slice(0, limit);
}

/**
 * Returns top packages for a specific destination slug.
 */
export function getTopPackagesForDestination(
  destinationSlug: string,
  all: TourPackage[],
  limit = 3
): TourPackage[] {
  const dest = destinationSlug.replace(/-/g, " ").toLowerCase();
  return all
    .filter((pkg) => pkg.destination.toLowerCase() === dest)
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    .slice(0, limit);
}

/**
 * Returns packages filtered by category.
 */
export function getPackagesByCategory(
  category: string,
  all: TourPackage[]
): TourPackage[] {
  if (category === "all") return all;
  return all.filter((pkg) =>
    pkg.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase())
  );
}

/**
 * Sorts packages by the given sort option.
 */
export function getSortedPackages(
  packages: TourPackage[],
  sortBy: SortOption
): TourPackage[] {
  const copy = [...packages];
  switch (sortBy) {
    case "popularity":
      return copy.sort(
        (a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0)
      );
    case "price-low":
      return copy.sort((a, b) => a.price - b.price);
    case "price-high":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.reverse(); // assumes array order = chronological
    default:
      return copy;
  }
}

// ── Destination Recommendations ──────────────────────────────────────────────

/**
 * Returns related destinations for a given destination, excluding itself.
 */
export function getRelatedDestinations(
  current: DestinationModel,
  all: DestinationModel[],
  limit = 3
): DestinationModel[] {
  // Try to find explicit relations via nearbyPlaces
  const explicitNames = current.nearbyPlaces?.map(np => np.name.toLowerCase()) ?? [];
  const explicit = all
    .filter((d) => explicitNames.includes(d.name.toLowerCase()) && d.slug !== current.slug)
    .slice(0, limit);

  if (explicit.length >= limit) return explicit;

  // Fill remaining sorted by rating & review count proxy
  const remaining = all
    .filter(
      (d) =>
        d.slug !== current.slug && !explicit.find((e) => e.slug === d.slug)
    )
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, limit - explicit.length);

  return [...explicit, ...remaining];
}
