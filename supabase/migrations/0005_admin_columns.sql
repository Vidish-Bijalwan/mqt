-- ─────────────────────────────────────────────────────────
-- Migration: Add admin-only columns to packages table
-- Run this in your Supabase SQL Editor
-- ─────────────────────────────────────────────────────────

-- Add admin-specific columns to packages
ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS category_id UUID,
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS duration_label TEXT,
  ADD COLUMN IF NOT EXISTS best_season TEXT,
  ADD COLUMN IF NOT EXISTS group_suitability TEXT,
  ADD COLUMN IF NOT EXISTS hotel_category_hint TEXT,
  ADD COLUMN IF NOT EXISTS customizable BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS internal_base_price INTEGER,
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS sort_order SMALLINT DEFAULT 0;

-- Create package_categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.package_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_name TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.package_categories ENABLE ROW LEVEL SECURITY;

-- Public can read categories
CREATE POLICY IF NOT EXISTS "Allow public read on package_categories" ON public.package_categories
    FOR SELECT TO public USING (active = true);

-- Authenticated users can manage categories
CREATE POLICY IF NOT EXISTS "Allow authenticated full access to package_categories" ON public.package_categories
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert some default categories
INSERT INTO public.package_categories (name, slug, active, sort_order) VALUES
  ('Pilgrimage', 'pilgrimage', true, 0),
  ('Adventure', 'adventure', true, 1),
  ('Honeymoon', 'honeymoon', true, 2),
  ('Family', 'family', true, 3),
  ('Wildlife', 'wildlife', true, 4),
  ('Beach', 'beach', true, 5),
  ('Hill Station', 'hill-station', true, 6),
  ('Heritage', 'heritage', true, 7),
  ('International', 'international', true, 8)
ON CONFLICT (slug) DO NOTHING;

-- Create faqs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    scope TEXT DEFAULT 'general',
    sort_order SMALLINT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read on faqs" ON public.faqs
    FOR SELECT TO public USING (active = true);

CREATE POLICY IF NOT EXISTS "Allow authenticated full access to faqs" ON public.faqs
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create states_uts table if it doesn't exist (required for admin states section)
CREATE TABLE IF NOT EXISTS public.states_uts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_id UUID,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('State', 'Union Territory')),
    image_url TEXT,
    short_description TEXT,
    intro_overview TEXT,
    best_season TEXT,
    travel_themes TEXT[],
    top_places_count SMALLINT DEFAULT 0,
    capital TEXT,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.states_uts ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read on active states_uts" ON public.states_uts
    FOR SELECT TO public USING (active = true);

CREATE POLICY IF NOT EXISTS "Allow authenticated full access to states_uts" ON public.states_uts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Re-create updated public_packages view to not include admin-only pricing
CREATE OR REPLACE VIEW public.public_packages AS
SELECT
    id, slug, title, destination, state, country, type,
    duration_nights, duration_days, duration_label,
    rating, reviews_count, image_url, badge, includes, categories, tags, highlights,
    season, availability, popularity_score, booking_count, trending, featured,
    seats_left, overview, itinerary_highlights, inclusions, exclusions, active,
    best_season, group_suitability, customizable,
    created_at, updated_at
FROM public.packages
WHERE active = true;
