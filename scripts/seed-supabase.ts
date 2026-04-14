import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { tourPackages } from "../src/data/packages";
import { destinationsData } from "../src/data/destinations";
import { indiaStates } from "../src/data/india-states";
import { blogPosts } from "../src/data/blog";
import { allTestimonials } from "../src/data/testimonials";

// Load ENV since this runs outside Vite
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// WARNING: Since this is a seed script, standard project setups use SERVICE_ROLE_KEY to bypass RLS.
// BUT since we assume the user will briefly disable RLS to seed or we just provide the instruction format, 
// we will attempt it with the public key. For true seeding, the user should provide the Service Role key.
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Starting data seed process...");

  // 1. Seed States & UTs (Skipped, table doesn't exist)
  /*
  console.log("Seeding States & UTs...");
  for (const state of indiaStates) {
    const { error } = await supabase.from('states_uts').upsert({
      slug: state.slug,
      name: state.name,
      type: state.type,
      region_id: state.region.toLowerCase(), // Dummy relational binding
      image_url: state.image || "",
      intro_overview: state.shortDescription || "",
      capital: "Unknown", // Required in DB but omitted in some mock data
      active: true,
      featured: true,
      short_description: state.shortDescription || ""
    }, { onConflict: 'slug' });

    if (error) console.error(`Error inserting State ${state.slug}:`, error.message);
  }
  */

  // 2. Seed Destinations
  console.log("Seeding Destinations...");
  for (const dest of destinationsData) {
    const { error } = await supabase.from('destinations').upsert({
      slug: dest.slug,
      name: dest.name,
      state: dest.state,
      country: dest.country,
      image_url: dest.imageUrl || "",
      hero_image_url: dest.heroImageUrl || "",
      tagline: dest.tagline || "",
      best_season: dest.bestSeason || "",
      ideal_duration: dest.idealDuration || "",
      difficulty: dest.difficulty || "Easy",
      popularity_score: dest.popularityScore || 0,
      active: true,
      featured: dest.featured || false,
    }, { onConflict: 'slug' });

    if (error) console.error(`Error inserting Destination ${dest.slug}:`, error.message);
  }

  // 3. Seed Packages
  console.log("Seeding Packages...");
  for (const pkg of tourPackages) {
    const { error } = await supabase.from('packages').upsert({
      slug: pkg.slug,
      title: pkg.title,
      destination: pkg.destination,
      state: pkg.state,
      country: pkg.country,
      type: pkg.type,
      duration_nights: pkg.duration.nights,
      duration_days: pkg.duration.days,
      rating: pkg.rating,
      reviews_count: pkg.reviewsCount,
      image_url: String(pkg.image) || "", // Because of Vite asset import mocking
      popularity_score: pkg.popularityScore || 0,
      active: true,
      featured: pkg.featured || false,
    }, { onConflict: 'slug' });

    if (error) console.error(`Error inserting Package ${pkg.slug}:`, error.message);
  }

  // 4. Seed Blog Posts
  console.log("Seeding Blog Posts...");
  for (const post of blogPosts) {
    const { error } = await supabase.from('blog_posts').upsert({
      slug: post.slug,
      title: post.title,
      category: post.category,
      image_url: String(post.image) || "",
      excerpt: post.excerpt,
      author: post.author || "Admin",
      published: true,
      read_time: "5 min",
    }, { onConflict: 'slug' });

    if (error) console.error(`Error inserting Blog Post ${post.slug}:`, error.message);
  }

  // 5. Seed Testimonials
  console.log("Seeding Testimonials...");
  for (const review of allTestimonials) {
    const { error } = await supabase.from('testimonials').upsert({
      name: review.name,
      location: review.location,
      tour: review.tour,
      destination: review.destination,
      rating: review.rating,
      text: review.text,
      initials: review.initials,
      avatar_url: review.avatar || "",
      active: true,
      featured: true,
    }); // No canonical slug so we just insert

    if (error) console.error(`Error inserting Testimonial from ${review.name}:`, error.message);
  }

  console.log("Database seed complete!");
}

seedData().catch(console.error);
