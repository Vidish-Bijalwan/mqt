import { supabase } from "@/lib/supabase";
import { tourPackages } from "@/data/packages";
import { destinationsData } from "@/data/destinations";
import { blogPosts } from "@/data/blog";
import { allTestimonials } from "@/data/testimonials";

/** Static seed rows use a looser shape than full DestinationData */
type SeedDestination = Record<string, unknown> & {
  slug: string;
  name: string;
  popularityScore?: number;
  image?: unknown;
  heroImage?: unknown;
};

export async function seedDatabaseFromClient() {
  const errors: string[] = [];
  const seedDestinations = destinationsData as unknown as SeedDestination[];

  // ── 1. Destinations ──────────────────────────────────────────────────────────
  for (const dest of seedDestinations) {
    const difficulty = dest.difficulty as string | undefined;
    const { error } = await supabase.from("destinations").upsert({
      slug: dest.slug,
      name: dest.name,
      tagline: (dest.tagline as string) || "",
      state: (dest.state as string) || "",
      country: (dest.country as string) || "India",
      image_url: typeof dest.image === "string" ? dest.image : "",
      hero_image_url: typeof dest.heroImage === "string" ? dest.heroImage : "",
      altitude: (dest.altitude as string) || null,
      best_season: (dest.bestSeason as string) || "",
      ideal_duration: (dest.idealDuration as string) || "",
      difficulty: (["Easy", "Moderate", "Challenging"].includes(difficulty || "")
        ? difficulty
        : "Easy") as "Easy" | "Moderate" | "Challenging",
      overview: (dest.overview as string[]) || [],
      quick_facts: (dest.quickFacts as unknown[]) || [],
      best_time_to_visit: (dest.bestTimeToVisit as unknown[]) || [],
      highlights: (dest.highlights as unknown[]) || [],
      inclusions: (dest.inclusions as string[]) || [],
      exclusions: (dest.exclusions as string[]) || [],
      travel_tips: (dest.travelTips as string[]) || [],
      faqs: (dest.faqs as unknown[]) || [],
      related_destinations: (dest.relatedDestinations as string[]) || [],
      related_package_slugs: (dest.relatedPackageSlugs as string[]) || [],
      related_blog_slugs: (dest.relatedBlogSlugs as string[]) || [],
      popularity_score: dest.popularityScore || 50,
      trending: Boolean(dest.trending),
      packages_count: (dest.packagesCount as number) || 0,
      active: true,
      featured: (dest.popularityScore || 0) > 80,
    }, { onConflict: "slug" });

    if (error) errors.push(`[Destination:${dest.slug}] ${error.message}`);
  }

  // ── 2. Packages ───────────────────────────────────────────────────────────────
  for (const pkg of tourPackages) {
    // image could be a Vite processed module object, stringify safely
    const imageString = typeof pkg.image === "string" ? pkg.image : "";

    const { error } = await supabase.from("packages").upsert({
      slug: pkg.slug,
      title: pkg.title,
      destination: pkg.destination,
      state: pkg.state,
      country: pkg.country || "India",
      type: pkg.type,
      duration_nights: pkg.duration?.nights || 0,
      duration_days: pkg.duration?.days || 0,
      // price columns are stored but not exposed in public view
      price: pkg.price || 0,
      original_price: pkg.originalPrice || 0,
      rating: pkg.rating || 4.5,
      reviews_count: pkg.reviewsCount || 0,
      image_url: imageString,
      badge: pkg.badge || null,
      includes: pkg.includes || [],
      categories: pkg.categories || [],
      tags: pkg.tags || [],
      highlights: pkg.highlights || [],
      season: pkg.season || "",
      availability: pkg.availability || "Available",
      popularity_score: pkg.popularityScore || 50,
      booking_count: pkg.bookingCount || 0,
      trending: pkg.trending || false,
      featured: pkg.featured || false,
      seats_left: pkg.seatsLeft || null,
      overview: pkg.overview || null,
      itinerary_highlights: pkg.itineraryHighlights || null,
      inclusions: pkg.inclusions || null,
      exclusions: pkg.exclusions || null,
      active: true,
    }, { onConflict: "slug" });

    if (error) errors.push(`[Package:${pkg.slug}] ${error.message}`);
  }

  // ── 3. Blog Posts ─────────────────────────────────────────────────────────────
  for (const post of blogPosts) {
    const imageString = typeof post.image === "string" ? post.image : "";

    const { error } = await supabase.from("blog_posts").upsert({
      slug: post.slug,
      title: post.title,
      meta_description: post.metaDescription || "",
      category: post.category,
      tags: post.tags || [],
      author_name: post.author?.name || "Admin",
      author_role: post.author?.role || "",
      author_initials: post.author?.initials || "",
      date: post.date || "",
      read_time: post.readTime || "5 min",
      excerpt: post.excerpt || "",
      image_url: imageString,
      content: post.content || [],
      related_package_slugs: post.relatedPackageSlugs || [],
      related_destination_slugs: post.relatedDestinationSlugs || [],
      related_blog_slugs: post.relatedBlogSlugs || [],
      featured: post.featured || false,
      published: true,
    }, { onConflict: "slug" });

    if (error) errors.push(`[Blog:${post.slug}] ${error.message}`);
  }

  // ── 4. Testimonials ───────────────────────────────────────────────────────────
  for (const review of allTestimonials) {
    // No unique slug — check name+tour combo to prevent duplicates
    const { data: existing } = await supabase
      .from("testimonials")
      .select("id")
      .eq("name", review.name)
      .eq("tour", review.tour)
      .maybeSingle();

    if (existing) continue; // skip if already seeded

    const { error } = await supabase.from("testimonials").insert({
      name: review.name,
      location: review.location || "",
      tour: review.tour || "",
      destination: review.destination || "",
      date: review.date || "",
      rating: review.rating,
      text: review.text,
      initials: review.initials || review.name.slice(0, 2).toUpperCase(),
      verified: review.verified || false,
      source: review.source || null,
      active: true,
      featured: review.rating >= 5,
    });

    if (error) errors.push(`[Testimonial:${review.name}] ${error.message}`);
  }

  return errors;
}
