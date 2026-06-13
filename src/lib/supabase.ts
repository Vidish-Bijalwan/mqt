import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

export interface DbRegion extends Record<string, unknown> {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbStateUT extends Record<string, unknown> {
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

export interface DbDestination extends Record<string, unknown> {
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

export interface DbDestinationItineraryDay extends Record<string, unknown> {
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

export interface DbPackagePublic extends Record<string, unknown> {
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

export interface DbPackageItineraryDay extends Record<string, unknown> {
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

export interface DbTestimonial extends Record<string, unknown> {
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

export interface DbBlogPost extends Record<string, unknown> {
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

export interface DbEnquiryInsert extends Record<string, unknown> {
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

export interface DbEnquiryRow extends DbEnquiryInsert {
  id: string;
  status: string;
  assigned_to: string | null;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

/** Admin `packages` table (includes fields hidden from public view) */
export interface DbPackage extends DbPackagePublic {
  price?: number;
  original_price?: number;
}

export interface DbReview extends Record<string, unknown> {
  id: string;
  package_id?: string | null;
  destination_id?: string | null;
  user_id?: string | null;
  rating: number;
  title?: string | null;
  text?: string | null;
  status?: string;
  helpful_votes?: number;
  created_at?: string;
  updated_at?: string;
}

// ── Itineraries ───────────────────────────────────────────────────────────────
export interface DbItinerary extends Record<string, unknown> {
  id: string;
  slug: string;
  package_name: string;
  region: "North India" | "East India" | "Central India" | "West India" | "South India";
  duration_label: string | null;
  days: number;
  nights: number;
  places_covered: string[];
  starting_point: string | null;
  ending_point: string | null;
  short_description: string | null;
  image_url: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  category_tags: string[];
  starting_price: number | null;
  price_label: string | null;
  price_disclaimer: string | null;
  seo_title: string | null;
  seo_description: string | null;
  active: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbItineraryDay extends Record<string, unknown> {
  id: string;
  itinerary_id: string;
  day_number: number;
  title: string;
  description: string;
  created_at: string;
}

/** Loose row for CMS tables not fully modeled yet */
export type DbJsonRow = Record<string, unknown>;

/** Matches @supabase/postgrest-js GenericRelationship (required on every table) */
export type DbRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type TableDef<
  Row extends Record<string, unknown>,
  Insert extends Record<string, unknown> = Partial<Row>,
  Update extends Record<string, unknown> = Partial<Row>,
> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: DbRelationship[];
};

/** CMS / admin tables with flexible columns */
type CmsTable = TableDef<DbJsonRow, DbJsonRow, DbJsonRow>;

// Full Database type map for typed client usage
export interface Database {
  public: {
    Tables: {
      regions: TableDef<
        DbRegion,
        Omit<DbRegion, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbRegion, "id" | "created_at">>
      >;
      states_uts: TableDef<
        DbStateUT,
        Omit<DbStateUT, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbStateUT, "id" | "created_at">>
      >;
      destinations: TableDef<
        DbDestination,
        Omit<DbDestination, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbDestination, "id" | "created_at">>
      >;
      destination_itinerary_days: TableDef<
        DbDestinationItineraryDay,
        Omit<DbDestinationItineraryDay, "id" | "created_at">,
        Partial<Omit<DbDestinationItineraryDay, "id" | "created_at">>
      >;
      package_itinerary_days: TableDef<
        DbPackageItineraryDay,
        Omit<DbPackageItineraryDay, "id" | "created_at">,
        Partial<Omit<DbPackageItineraryDay, "id" | "created_at">>
      >;
      testimonials: TableDef<
        DbTestimonial,
        Omit<DbTestimonial, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbTestimonial, "id" | "created_at">>
      >;
      blog_posts: TableDef<
        DbBlogPost,
        Omit<DbBlogPost, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbBlogPost, "id" | "created_at">>
      >;
      packages: TableDef<
        DbPackage,
        Omit<DbPackage, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbPackage, "id" | "created_at">>
      >;
      package_categories: CmsTable;
      reviews: TableDef<DbReview, Partial<DbReview>, Partial<DbReview>>;
      enquiries: TableDef<
        DbEnquiryRow,
        DbEnquiryInsert,
        Partial<Omit<DbEnquiryRow, "id" | "created_at">>
      >;
      faqs: CmsTable;
      site_settings: CmsTable;
      homepage_sections: CmsTable;
      travel_routes: CmsTable;
      festivals: CmsTable;
      discovery_vibes: CmsTable;
      domestic_international: CmsTable;
      travel_experiences: CmsTable;
      why_choose_us: CmsTable;
      how_it_works: CmsTable;
      crafts: CmsTable;
      profiles: CmsTable;
      trust_strip: CmsTable;
      newsletter_settings: CmsTable;
      itineraries: TableDef<
        DbItinerary,
        Omit<DbItinerary, "id" | "created_at" | "updated_at">,
        Partial<Omit<DbItinerary, "id" | "created_at">>
      >;
      itinerary_days: TableDef<
        DbItineraryDay,
        Omit<DbItineraryDay, "id" | "created_at">,
        Partial<Omit<DbItineraryDay, "id" | "created_at">>
      >;
    };
    Views: {
      public_packages: {
        Row: DbPackagePublic;
        Relationships: DbRelationship[];
      };
    };
    Functions: Record<string, never>;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton Browser Supabase Client
// ─────────────────────────────────────────────────────────────────────────────
export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true, // required for preserving Admin identity across reloads
    autoRefreshToken: true,
  },
  global: {
    headers: {
      "x-application-name": "myquicktrippers-web",
    },
  },
}) as SupabaseClient<Database>;
