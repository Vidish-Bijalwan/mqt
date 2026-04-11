import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// Environment Variables (Vite pattern)
// ─────────────────────────────────────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Fallback strings prevent `@supabase/supabase-js` from crashing the DOM render sequence
// if the production Vercel container misses the env variables during the Vite build step.
const safeUrl = supabaseUrl || "https://missing-url.supabase.co";
const safeKey = supabaseKey || "missing_key";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "🚨 [Supabase] FATAL: Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in environment variables. Database connections will fail globally."
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Database Type Definitions
// These match the Supabase schema exactly (snake_case column names).
// ─────────────────────────────────────────────────────────────────────────────

export interface DbRegion {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbStateUT {
  id: string;
  region_id: string;
  name: string;
  slug: string;
  type: "State" | "Union Territory";
  image_url: string;
  short_description: string;
  intro_overview: string;
  best_season: string;
  travel_themes: string[];
  top_places_count: number;
  capital: string;
  active: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbDestination {
  id: string;
  state_ut_id: string;
  slug: string;
  name: string;
  tagline: string;
  state: string;
  country: string;
  image_url: string;
  hero_image_url: string;
  altitude: string | null;
  best_season: string;
  ideal_duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  overview: string[];
  quick_facts: Array<{ label: string; value: string }>;
  best_time_to_visit: Array<{
    month: string;
    weather: string;
    crowd: "Low" | "Moderate" | "High" | "Very High";
    rating: number;
  }>;
  highlights: Array<{ emoji: string; title: string; desc: string }>;
  inclusions: string[];
  exclusions: string[];
  travel_tips: string[];
  faqs: Array<{ question: string; answer: string }>;
  related_destinations: string[];
  related_package_slugs: string[];
  related_blog_slugs: string[];
  popularity_score: number;
  trending: boolean;
  packages_count: number;
  active: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbDestinationItineraryDay {
  id: string;
  destination_id: string;
  day_number: number;
  title: string;
  description: string;
  activities: string[];
  stay: string;
  meals: string;
  created_at: string;
}

export interface DbPackagePublic {
  // This is the public_packages VIEW — pricing columns are EXCLUDED
  id: string;
  slug: string;
  title: string;
  destination: string;
  state: string;
  country: string;
  type: "domestic" | "international";
  duration_nights: number;
  duration_days: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  badge: string | null;
  includes: string[];
  categories: string[];
  tags: string[];
  highlights: string[];
  season: string;
  availability: string;
  popularity_score: number;
  booking_count: number;
  trending: boolean;
  featured: boolean;
  seats_left: number | null;
  overview: string | null;
  itinerary_highlights: string[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbPackageItineraryDay {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string;
  activities: string[];
  stay: string;
  meals: string;
  created_at: string;
}

export interface DbTestimonial {
  id: string;
  name: string;
  location: string;
  tour: string;
  destination: string;
  date: string;
  rating: number;
  text: string;
  initials: string;
  avatar_url: string | null;
  verified: boolean;
  source: "Google" | "TripAdvisor" | "Direct" | null;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  author_initials: string;
  date: string;
  read_time: string;
  excerpt: string;
  image_url: string;
  content: Array<{
    type: "heading" | "paragraph" | "list" | "tip_box" | "callout";
    content: string;
    items?: string[];
  }>;
  related_package_slugs: string[];
  related_destination_slugs: string[];
  related_blog_slugs: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbEnquiryInsert {
  name: string;
  phone: string;
  email: string;
  destination: string;
  travel_date?: string | null;
  adults?: number;
  children?: number;
  travellers_count?: number;
  tour_type?: string;
  budget_tier?: string;
  hotel_category_preference?: string;
  preferred_contact_method?: string;
  requirements?: string;
  category_slug?: string;
  cta_label?: string;
  source_page?: string;
  source_path?: string;
  source_package_slug?: string;
  source_destination_slug?: string;
  utm_source?: string;
}

// Full Database type map for typed client usage
export interface Database {
  public: {
    Tables: {
      regions: {
        Row: DbRegion;
        Insert: Omit<DbRegion, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbRegion, "id" | "created_at">>;
      };
      states_ut: {
        Row: DbStateUT;
        Insert: Omit<DbStateUT, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbStateUT, "id" | "created_at">>;
      };
      destinations: {
        Row: DbDestination;
        Insert: Omit<DbDestination, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbDestination, "id" | "created_at">>;
      };
      destination_itinerary_days: {
        Row: DbDestinationItineraryDay;
        Insert: Omit<DbDestinationItineraryDay, "id" | "created_at">;
        Update: Partial<Omit<DbDestinationItineraryDay, "id" | "created_at">>;
      };
      package_itinerary_days: {
        Row: DbPackageItineraryDay;
        Insert: Omit<DbPackageItineraryDay, "id" | "created_at">;
        Update: Partial<Omit<DbPackageItineraryDay, "id" | "created_at">>;
      };
      testimonials: {
        Row: DbTestimonial;
        Insert: Omit<DbTestimonial, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbTestimonial, "id" | "created_at">>;
      };
      blog_posts: {
        Row: DbBlogPost;
        Insert: Omit<DbBlogPost, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<DbBlogPost, "id" | "created_at">>;
      };
      enquiries: {
        Row: DbEnquiryInsert & {
          id: string;
          status: string;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: DbEnquiryInsert;
        Update: never; // anon cannot update
      };
    };
    Views: {
      public_packages: {
        Row: DbPackagePublic;
      };
    };
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton Browser Supabase Client
// ─────────────────────────────────────────────────────────────────────────────
export const supabase = createClient<Database>(safeUrl, safeKey, {
  auth: {
    persistSession: true, // required for preserving Admin identity across reloads
    autoRefreshToken: true,
  },
  global: {
    headers: {
      "x-application-name": "myquicktrippers-web",
    },
  },
});
