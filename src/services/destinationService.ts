import { supabase, type DbDestination, type DbDestinationItineraryDay } from "@/lib/supabase";
import { destinationsData } from "@/data/destinations";
import type { DestinationDetail } from "@/types/destination-detail";
import { resolveImageSource } from "@/lib/storage";
import type { ServiceResponse } from "./enquiryService";

type DbDestinationWithItinerary = DbDestination & {
  destination_itinerary_days?: DbDestinationItineraryDay[];
};

function imageFallback(value: unknown): string {
  return typeof value === "string" ? value : "";
}

const mapDbToDomain = (row: DbDestinationWithItinerary): DestinationDetail => {
  const sortedItinerary = row.destination_itinerary_days
    ? [...row.destination_itinerary_days].sort((a, b) => a.day_number - b.day_number)
    : [];

  const fallbackObj = destinationsData.find((d) => d.slug === row.slug);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    stateSlug: row.state_ut_id,
    state: row.state,
    country: row.country,
    tagline: row.tagline || "",
    image: resolveImageSource(
      "destination-images",
      row.image_url,
      imageFallback(fallbackObj?.image)
    ),
    heroImage: resolveImageSource(
      "destination-images",
      row.hero_image_url,
      imageFallback(fallbackObj?.heroImage)
    ),
    altitude: row.altitude || undefined,
    bestSeason: row.best_season,
    idealDuration: row.ideal_duration,
    difficulty: row.difficulty,
    popularityScore: row.popularity_score,
    trending: row.trending,
    packagesCount: row.packages_count,
    overview: row.overview || [],
    quickFacts: (row.quick_facts as DestinationDetail["quickFacts"]) || [],
    bestTimeToVisit: row.best_time_to_visit || [],
    highlights: row.highlights || [],
    inclusions: row.inclusions || [],
    exclusions: row.exclusions || [],
    travelTips: row.travel_tips || [],
    faqs: row.faqs || [],
    gallery: [],
    relatedDestinations: row.related_destinations || [],
    relatedPackageSlugs: row.related_package_slugs || [],
    relatedBlogSlugs: row.related_blog_slugs || [],
    itinerary: sortedItinerary.map((day) => ({
      day: day.day_number,
      title: day.title,
      description: day.description,
      activities: day.activities || [],
      stay: day.stay || "",
      meals: day.meals || "",
    })),
  };
};

export async function getDestinations(limit?: number): Promise<ServiceResponse<DestinationDetail[]>> {
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
    let fallback = destinationsData.map(
      (d) =>
        ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          stateSlug: d.stateSlug,
          image: imageFallback(d.image),
          heroImage: imageFallback(d.heroImage),
          shortDescription: d.shortDescription,
        }) as DestinationDetail
    );
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}

export async function getDestinationBySlug(slug: string): Promise<ServiceResponse<DestinationDetail>> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*, destination_itinerary_days(*), states_uts(slug)")
      .eq("active", true)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Not found");

    const mapped = mapDbToDomain(data);
    const stateSlug = (data as DbDestinationWithItinerary & { states_uts?: { slug: string } }).states_uts
      ?.slug;
    if (stateSlug) mapped.stateSlug = stateSlug;

    const staticFallback = destinationsData.find((d) => d.slug === slug);
    if (staticFallback?.gallery) {
      mapped.gallery = staticFallback.gallery as string[];
    }

    return { data: mapped, error: null };
  } catch (err) {
    console.warn(`[DestinationService] Falling back to static data for slug: ${slug}`, err);
    const fallback = destinationsData.find((d) => d.slug === slug);
    if (!fallback) return { data: null, error: new Error("Not found in static either") };
    return {
      data: {
        id: fallback.id,
        name: fallback.name,
        slug: fallback.slug,
        stateSlug: fallback.stateSlug,
        image: imageFallback(fallback.image),
        heroImage: imageFallback(fallback.heroImage),
        shortDescription: fallback.shortDescription,
        gallery: (fallback.gallery as string[]) || [],
      } as DestinationDetail,
      error: null,
    };
  }
}
