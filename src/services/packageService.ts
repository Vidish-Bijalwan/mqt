import { supabase, type DbPackagePublic } from "@/lib/supabase";
import { tourPackages, type TourPackage } from "@/data/packages";
import { resolveImageSource } from "@/lib/storage";
import type { ServiceResponse } from "./enquiryService";

const mapDbToDomain = (row: DbPackagePublic): TourPackage => {
  const fallbackObj = tourPackages.find(p => p.slug === row.slug);
  
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    destination: row.destination,
    state: row.state,
    country: row.country,
    type: row.type,
    duration: { nights: row.duration_nights, days: row.duration_days },
    price: 0, // Safely stripped from DB view
    originalPrice: 0, // Safely stripped from DB view
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
    image: resolveImageSource("package-images", row.image_url, fallbackObj?.image || ""),
    badge: row.badge || undefined,
    includes: row.includes || [],
    categories: row.categories || [],
    tags: row.tags || [],
    highlights: row.highlights || [],
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

    return { data: data.map(mapDbToDomain), error: null };
  } catch (err) {
    console.warn("[PackageService] Falling back to static data", err);
    let fallback = [...tourPackages];
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
