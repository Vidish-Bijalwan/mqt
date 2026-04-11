-- ─────────────────────────────────────────────────────────
-- Supabase Schema Migration: MyQuickTrippers
-- ─────────────────────────────────────────────────────────

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────
-- 1. states_ut
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.states_ut (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_id UUID, -- Optional foreign key if regions table is extracted later
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

-- ─────────────────────────────────────────────────────────
-- 2. destinations
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_ut_id UUID REFERENCES public.states_ut(id) ON DELETE RESTRICT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    image_url TEXT,
    hero_image_url TEXT,
    altitude TEXT,
    best_season TEXT,
    ideal_duration TEXT,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging')),
    overview TEXT[],
    quick_facts JSONB,
    best_time_to_visit JSONB,
    highlights JSONB,
    inclusions TEXT[],
    exclusions TEXT[],
    travel_tips TEXT[],
    faqs JSONB,
    related_destinations TEXT[],
    related_package_slugs TEXT[],
    related_blog_slugs TEXT[],
    popularity_score SMALLINT DEFAULT 50,
    trending BOOLEAN DEFAULT false,
    packages_count SMALLINT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 3. destination_itinerary_days
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.destination_itinerary_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
    day_number SMALLINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    activities TEXT[],
    stay TEXT,
    meals TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 4. packages
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    destination TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    type TEXT CHECK (type IN ('domestic', 'international')),
    duration_nights SMALLINT,
    duration_days SMALLINT,
    price INTEGER,             -- PROTECTED
    original_price INTEGER,    -- PROTECTED
    rating NUMERIC(3,1),
    reviews_count INTEGER DEFAULT 0,
    image_url TEXT,
    badge TEXT,
    includes TEXT[],
    categories TEXT[],
    tags TEXT[],
    highlights TEXT[],
    season TEXT,
    availability TEXT,
    popularity_score SMALLINT DEFAULT 50,
    booking_count INTEGER DEFAULT 0,
    trending BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    seats_left SMALLINT,
    overview TEXT,
    itinerary_highlights TEXT[],
    inclusions TEXT[],
    exclusions TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 5. package_itinerary_days
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.package_itinerary_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
    day_number SMALLINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    activities TEXT[],
    stay TEXT,
    meals TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 6. testimonials
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    tour TEXT,
    destination TEXT,
    date TEXT,
    rating SMALLINT NOT NULL,
    text TEXT NOT NULL,
    initials TEXT,
    verified BOOLEAN DEFAULT false,
    source TEXT CHECK (source IN ('Google', 'TripAdvisor', 'Direct', NULL)),
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 7. blog_posts
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_description TEXT,
    category TEXT,
    tags TEXT[],
    author_name TEXT,
    author_role TEXT,
    author_initials TEXT,
    date TEXT,
    read_time TEXT,
    excerpt TEXT,
    image_url TEXT,
    content JSONB,
    related_package_slugs TEXT[],
    related_destination_slugs TEXT[],
    related_blog_slugs TEXT[],
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 8. enquiries (Highest Priority Lead Capture)
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    destination TEXT NOT NULL,
    travel_date DATE,
    adults SMALLINT DEFAULT 2,
    children SMALLINT DEFAULT 0,
    travellers_count SMALLINT, -- Derived or explicitly submitted
    tour_type TEXT,
    budget_tier TEXT,
    hotel_category_preference TEXT,
    preferred_contact_method TEXT,
    requirements TEXT,
    category_slug TEXT,
    cta_label TEXT,
    source_page TEXT,
    source_path TEXT,
    source_package_slug TEXT,
    source_destination_slug TEXT,
    utm_source TEXT,
    ip_country TEXT,
    status TEXT DEFAULT 'new',
    assigned_to TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────
-- Row Level Security (RLS) Policies
-- ─────────────────────────────────────────────────────────

ALTER TABLE public.states_ut ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous Read Policies (only active/published records)
CREATE POLICY "Allow public read on active states_ut" ON public.states_ut
    FOR SELECT TO public USING (active = true);

CREATE POLICY "Allow public read on active destinations" ON public.destinations
    FOR SELECT TO public USING (active = true);

CREATE POLICY "Allow public read on destination_itinerary_days" ON public.destination_itinerary_days
    FOR SELECT TO public USING (
        EXISTS (SELECT 1 FROM public.destinations d WHERE d.id = destination_id AND d.active = true)
    );

CREATE POLICY "Allow public read on active packages" ON public.packages
    FOR SELECT TO public USING (active = true);

CREATE POLICY "Allow public read on package_itinerary_days" ON public.package_itinerary_days
    FOR SELECT TO public USING (
        EXISTS (SELECT 1 FROM public.packages p WHERE p.id = package_id AND p.active = true)
    );

CREATE POLICY "Allow public read on active testimonials" ON public.testimonials
    FOR SELECT TO public USING (active = true);

CREATE POLICY "Allow public read on published blog posts" ON public.blog_posts
    FOR SELECT TO public USING (published = true);

-- Enquiries: Insert Only for public, NO SELECT
CREATE POLICY "Allow public insert to enquiries" ON public.enquiries
    FOR INSERT TO public WITH CHECK (true);


-- ─────────────────────────────────────────────────────────
-- Views
-- ─────────────────────────────────────────────────────────
-- Safely exclude price arrays by using a view for package queries.
CREATE VIEW public.public_packages AS
SELECT
    id, slug, title, destination, state, country, type, duration_nights, duration_days,
    rating, reviews_count, image_url, badge, includes, categories, tags, highlights,
    season, availability, popularity_score, booking_count, trending, featured,
    seats_left, overview, itinerary_highlights, inclusions, exclusions, active,
    created_at, updated_at
FROM public.packages
WHERE active = true;


-- ─────────────────────────────────────────────────────────
-- Triggers for updated_at
-- ─────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_states_ut_modtime BEFORE UPDATE ON public.states_ut FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_destinations_modtime BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_packages_modtime BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_modtime BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blog_posts_modtime BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_enquiries_modtime BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
