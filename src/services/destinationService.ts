import { supabase, type DbDestination, type DbDestinationItineraryDay } from "@/lib/supabase";
import { destinationsData, type DestinationData } from "@/data/destinations";
import { resolveImageSource } from "@/lib/storage";
import type { ServiceResponse } from "./enquiryService";

type DbDestinationWithItinerary = DbDestination & {
  destination_itinerary_days?: DbDestinationItineraryDay[];
};

const mapDbToDomain = (row: DbDestinationWithItinerary): DestinationData => {
  // Sort itinerary days by day_number
  const sortedItinerary = row.destination_itinerary_days 
    ? [...row.destination_itinerary_days].sort((a, b) => a.day_number - b.day_number)
    : [];

  // Locate fallback to pull the local vite asset string if DB string is null
  const fallbackObj = destinationsData.find(d => d.slug === row.slug);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    stateSlug: row.state_ut_id, // See comment in getDestinationBySlug below
    state: row.state,
    country: row.country,
    tagline: row.tagline || "",
    image: resolveImageSource("destination-images", row.image_url, fallbackObj?.image || ""),
    heroImage: resolveImageSource("destination-images", row.hero_image_url, fallbackObj?.heroImage || ""),
    altitude: row.altitude || undefined,
    bestSeason: row.best_season,
    idealDuration: row.ideal_duration,
    difficulty: row.difficulty,
    popularityScore: row.popularity_score,
    trending: row.trending,
    packagesCount: row.packages_count,
    overview: row.overview || [],
    quickFacts: (row.quick_facts as any) || [],
    bestTimeToVisit: (row.best_time_to_visit as any) || [],
    highlights: (row.highlights as any) || [],
    inclusions: row.inclusions || [],
    exclusions: row.exclusions || [],
    travelTips: row.travel_tips || [],
    faqs: (row.faqs as any) || [],
    gallery: [], // Needs separate mapping or static fallback
    relatedDestinations: row.related_destinations || [],
    relatedPackageSlugs: row.related_package_slugs || [],
    relatedBlogSlugs: row.related_blog_slugs || [],
    itinerary: sortedItinerary.map(day => ({
      day: day.day_number,
      title: day.title,
      description: day.description,
      activities: day.activities || [],
      stay: day.stay || "",
      meals: day.meals || "",
    }))
  } as DestinationData; // Hack for stateSlug mapping, we rely mostly on the hook.
};

export async function getDestinations(limit?: number): Promise<ServiceResponse<DestinationData[]>> {
  try {
    let query = supabase
      .from("destinations")
      .select("*, destination_itinerary_days(*)")
      .eq("active", true)
      .order("popularity_score", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    if (!data || data.length === 0) throw new Error("No data found");

    return { data: data.map(mapDbToDomain), error: null };
  } catch (err) {
    console.warn("[DestinationService] Falling back to static data", err);
    let fallback = [...destinationsData];
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}

export async function getDestinationBySlug(slug: string): Promise<ServiceResponse<DestinationData>> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*, destination_itinerary_days(*), states_ut(slug)")
      .eq("active", true)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Not found");
    
    // Fix stateSlug injection from joint table
    const mapped = mapDbToDomain(data);
    mapped.stateSlug = (data as any).states_ut?.slug || mapped.stateSlug;
    
    // Inject static gallery since we didn't model a gallery table yet
    const staticFallback = destinationsData.find(d => d.slug === slug);
    if (staticFallback) {
      mapped.gallery = staticFallback.gallery;
    }

    return { data: mapped, error: null };
  } catch (err) {
    console.warn(`[DestinationService] Falling back to static data for slug: ${slug}`, err);
    const fallback = destinationsData.find((d) => d.slug === slug);
    if (!fallback) return { data: null, error: new Error("Not found in static either") };
    return { data: fallback, error: null };
  }
}
