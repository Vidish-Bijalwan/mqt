import { supabase, type DbPackagePublic } from "@/lib/supabase";
import { tourPackages, type TourPackage } from "@/data/packages";
import { resolveImageSource } from "@/lib/storage";
import type { ServiceResponse } from "./enquiryService";

const mapDbToDomain = (row: DbPackagePublic): TourPackage => {
  const fallbackObj = tourPackages.find(p => p.slug === row.slug);
  
  // Refinement Check: If the static fallback has our high-fidelity "refined" assets, use them as the primary source.
  const isRefined = fallbackObj?.image?.startsWith("/tourism/refined/") || fallbackObj?.title?.includes("[MQT-V2]");

  return {
    id: row.id,
    title: isRefined ? (fallbackObj?.title || row.title) : row.title,
    slug: row.slug,
    destination: row.destination,
    state: row.state,
    country: row.country,
    type: row.type,
    duration: { nights: row.duration_nights, days: row.duration_days },
    price: fallbackObj?.price || 0, // Fallback to static if DB version is stripped
    originalPrice: fallbackObj?.originalPrice || 0, 
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
    image: isRefined ? (fallbackObj?.image || "") : resolveImageSource("package-images", row.image_url, fallbackObj?.image || ""),
    badge: isRefined ? (fallbackObj?.badge || row.badge) : (row.badge || undefined),
    includes: fallbackObj?.includes?.length ? fallbackObj.includes : (row.includes || []),
    categories: fallbackObj?.categories?.length ? fallbackObj.categories : (row.categories || []),
    tags: fallbackObj?.tags?.length ? fallbackObj.tags : (row.tags || []),
    highlights: fallbackObj?.highlights?.length ? fallbackObj.highlights : (row.highlights || []),
    season: row.season,
    availability: row.availability,
    popularityScore: row.popularity_score,
    bookingCount: row.booking_count,
    trending: row.trending,
    featured: row.featured,
    seatsLeft: row.seats_left || undefined,
    overview: row.overview || undefined,
    itineraryHighlights: row.itinerary_highlights || undefined,
    inclusions: row.inclusions || undefined,
    exclusions: row.exclusions || undefined,
  };
};

export async function getPackages(limit?: number): Promise<ServiceResponse<TourPackage[]>> {
  try {
    let query = supabase
      .from("public_packages") // Always read from safe View
      .select("*")
      .order("popularity_score", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    if (!data || data.length === 0) throw new Error("No data found");

    const dbMapped = data.map(mapDbToDomain);
    
    // Inject any new static/polyfilled packages that haven't been seeded to the DB yet
    const missingStatic = tourPackages.filter(p => !dbMapped.some(db => db.slug === p.slug));
    const merged = [...dbMapped, ...missingStatic].sort((a, b) => b.popularityScore - a.popularityScore);

    return { data: merged, error: null };
  } catch (err) {
    console.warn("[PackageService] Falling back to static data", err);
    let fallback = [...tourPackages].sort((a, b) => b.popularityScore - a.popularityScore);
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}

export async function getPackageBySlug(categorySlug: string, packageSlug: string): Promise<ServiceResponse<TourPackage>> {
  try {
    const { data, error } = await supabase
      .from("public_packages")
      .select("*")
      .eq("slug", packageSlug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Not found");

    return { data: mapDbToDomain(data), error: null };
  } catch (err) {
    console.warn(`[PackageService] Falling back to static data for slug: ${packageSlug}`, err);
    const fallback = tourPackages.find((p) => p.slug === packageSlug && p.categories.includes(categorySlug));
    if (!fallback) {
      // Try again without category
       const fallbackAny = tourPackages.find((p) => p.slug === packageSlug);
       if (!fallbackAny) return { data: null, error: new Error("Not found in static either") };
       return { data: fallbackAny, error: null };
    }
    return { data: fallback, error: null };
  }
}

export async function getSimilarPackages(packageSlug: string, count: number = 3): Promise<TourPackage[]> {
  const result = await getPackages();
  const all = result.data || tourPackages;
  return all.filter((p) => p.slug !== packageSlug).slice(0, count);
}
