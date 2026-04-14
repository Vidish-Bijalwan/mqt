-- ─────────────────────────────────────────────────────────
-- Supabase Schema Migration: Section Management Tables
-- ─────────────────────────────────────────────────────────
-- This migration adds tables for managing all website sections

-- ─────────────────────────────────────────────────────────
-- 1. travel_routes
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.travel_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    duration TEXT,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Challenging')),
    highlights TEXT[],
    itinerary JSONB,
    best_season TEXT,
    starting_point TEXT,
    ending_point TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 2. festivals
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.festivals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    state TEXT,
    month TEXT,
    date_range TEXT,
    significance TEXT,
    traditions TEXT[],
    celebrations TEXT[],
    best_to_visit TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 3. domestic_international_experiences
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.domestic_international_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT CHECK (type IN ('Domestic', 'International')),
    description TEXT,
    image_url TEXT,
    destination TEXT,
    duration TEXT,
    highlights TEXT[],
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 4. travel_experiences
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.travel_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    description TEXT,
    image_url TEXT,
    icon_url TEXT,
    features TEXT[],
    experience_type TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 5. why_choose_us_points
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.why_choose_us_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    features TEXT[],
    sort_order SMALLINT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 6. how_it_works_steps
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.how_it_works_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number SMALLINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    details JSONB,
    sort_order SMALLINT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(step_number)
);

-- ─────────────────────────────────────────────────────────
-- 7. newsletter_settings
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    description TEXT,
    placeholder_text TEXT,
    button_text TEXT,
    background_image_url TEXT,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- Create indexes for better query performance
-- ─────────────────────────────────────────────────────────
CREATE INDEX idx_travel_routes_slug ON public.travel_routes(slug);
CREATE INDEX idx_travel_routes_featured ON public.travel_routes(featured);
CREATE INDEX idx_festivals_slug ON public.festivals(slug);
CREATE INDEX idx_festivals_featured ON public.festivals(featured);
CREATE INDEX idx_domestic_intl_slug ON public.domestic_international_experiences(slug);
CREATE INDEX idx_domestic_intl_type ON public.domestic_international_experiences(type);
CREATE INDEX idx_travel_experiences_slug ON public.travel_experiences(slug);
CREATE INDEX idx_travel_experiences_featured ON public.travel_experiences(featured);

-- ─────────────────────────────────────────────────────────
-- Enable RLS (Row Level Security)
-- ─────────────────────────────────────────────────────────
ALTER TABLE public.travel_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domestic_international_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.how_it_works_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_settings ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────
-- Create default newsletter settings
-- ─────────────────────────────────────────────────────────
INSERT INTO public.newsletter_settings (title, description, placeholder_text, button_text, enabled)
VALUES (
    'Join Our Newsletter',
    'Subscribe to get travel tips, exclusive deals, and inspiration delivered to your inbox.',
    'Enter your email address',
    'Subscribe',
    true
)
ON CONFLICT DO NOTHING;
