-- ─────────────────────────────────────────────────────────
-- Supabase Schema Migration: Remaining Section Management
-- ─────────────────────────────────────────────────────────
-- This migration adds tables for remaining website sections

DROP TABLE IF EXISTS public.discovery_vibes CASCADE;
DROP TABLE IF EXISTS public.domestic_international CASCADE;
DROP TABLE IF EXISTS public.travel_experiences CASCADE;
DROP TABLE IF EXISTS public.why_choose_us CASCADE;
DROP TABLE IF EXISTS public.how_it_works CASCADE;
DROP TABLE IF EXISTS public.newsletter_settings CASCADE;
DROP TABLE IF EXISTS public.trust_strip CASCADE;

-- ─────────────────────────────────────────────────────────
-- 1. discovery_vibes - Travel vibes/categories for discovery
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.discovery_vibes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    style TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    icon_name TEXT,
    background_image_url TEXT,
    gradient_from TEXT,
    gradient_to TEXT,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discovery_vibes_active ON public.discovery_vibes(active);
CREATE INDEX IF NOT EXISTS idx_discovery_vibes_sort_order ON public.discovery_vibes(sort_order);

-- ─────────────────────────────────────────────────────────
-- 2. domestic_international - Domestic vs International sections
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.domestic_international (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('domestic', 'international')),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    image_url TEXT,
    cta_text TEXT,
    cta_link TEXT,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(type)
);

CREATE INDEX IF NOT EXISTS idx_domestic_international_type ON public.domestic_international(type);

-- ─────────────────────────────────────────────────────────
-- 3. travel_experiences - Curated travel experiences
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.travel_experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon_name TEXT,
    title TEXT NOT NULL,
    location TEXT,
    description TEXT,
    tag TEXT,
    color_gradient_from TEXT,
    color_gradient_to TEXT,
    border_color TEXT,
    planner_hint TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_travel_experiences_active ON public.travel_experiences(active);
CREATE INDEX IF NOT EXISTS idx_travel_experiences_featured ON public.travel_experiences(featured);

-- ─────────────────────────────────────────────────────────
-- 4. why_choose_us - Trust features/selling points
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.why_choose_us (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icon_name TEXT,
    title TEXT NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order SMALLINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_why_choose_us_active ON public.why_choose_us(active);

-- ─────────────────────────────────────────────────────────
-- 5. how_it_works - Process steps
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.how_it_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    step_number SMALLINT NOT NULL,
    emoji TEXT,
    title TEXT NOT NULL,
    description TEXT,
    cta_text TEXT,
    show_cta BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_how_it_works_step_number ON public.how_it_works(step_number);

-- ─────────────────────────────────────────────────────────
-- 6. newsletter_settings - Newsletter configuration
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headline TEXT,
    subheadline TEXT,
    subscriber_count BIGINT DEFAULT 0,
    benefits TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 7. trust_strip - Trust indicators/badges
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.trust_strip (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_text TEXT NOT NULL,
    icon_emoji TEXT,
    order_index SMALLINT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trust_strip_active ON public.trust_strip(active);

-- ─────────────────────────────────────────────────────────
-- Row Level Security (RLS) Policies
-- ─────────────────────────────────────────────────────────

-- discovery_vibes
ALTER TABLE public.discovery_vibes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.discovery_vibes FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.discovery_vibes FOR ALL USING (auth.role() = 'authenticated');

-- domestic_international
ALTER TABLE public.domestic_international ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.domestic_international FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.domestic_international FOR ALL USING (auth.role() = 'authenticated');

-- travel_experiences
ALTER TABLE public.travel_experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.travel_experiences FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.travel_experiences FOR ALL USING (auth.role() = 'authenticated');

-- why_choose_us
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.why_choose_us FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.why_choose_us FOR ALL USING (auth.role() = 'authenticated');

-- how_it_works
ALTER TABLE public.how_it_works ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.how_it_works FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.how_it_works FOR ALL USING (auth.role() = 'authenticated');

-- newsletter_settings
ALTER TABLE public.newsletter_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.newsletter_settings FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.newsletter_settings FOR ALL USING (auth.role() = 'authenticated');

-- trust_strip
ALTER TABLE public.trust_strip ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access to all users" ON public.trust_strip FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users" ON public.trust_strip FOR ALL USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────
-- Insert Default Data
-- ─────────────────────────────────────────────────────────

-- Discovery Vibes
INSERT INTO public.discovery_vibes (style, label, tagline, description, active, sort_order) VALUES
('beach', 'Beach Escape', 'Sun, sand & serenity', 'Goa, Andaman, Lakshadweep — pristine shores await.', true, 0),
('adventure', 'Mountain Adventure', 'Above the clouds', 'Ladakh, Spiti Valley, Kashmir — epic Himalayan journeys.', true, 1),
('heritage', 'Heritage & Culture', 'Stories carved in stone', 'Rajasthan, Varanasi, Hampi — timeless India unfolds.', true, 2),
('pilgrimage', 'Pilgrimage Tours', 'Sacred India awaits', 'Kedarnath, Varanasi, Char Dham — devotion & divinity.', true, 3),
('honeymoon', 'Honeymoon Journeys', 'Romance, reimagined', 'Kashmir, Kerala, Udaipur — where love stories are written.', true, 4);

-- Domestic & International
INSERT INTO public.domestic_international (type, title, subtitle, description, cta_text, cta_link, active, sort_order) VALUES
('domestic', 'Explore Incredible India', '28+ states, 200+ handpicked destinations', NULL, 'Browse Domestic Tours →', '/packages?type=domestic', true, 0),
('international', 'Beyond the Borders', 'Nepal, Bhutan, Sri Lanka, Maldives & more', NULL, 'Browse International Tours →', '/packages?type=international', true, 1);

-- Travel Experiences
INSERT INTO public.travel_experiences (title, location, description, tag, active, sort_order) VALUES
('Varanasi Ganga Aarti', 'Dashashwamedh Ghat, Varanasi', '7 priests, large brass lamps, fire rituals at 7 PM daily. Book a boat ride for front-row views.', 'Most Photographed', true, 0),
('Rajasthan Folk Music', 'Jaisalmer, Jodhpur & Pushkar', 'UNESCO heritage Manganiyar musicians and Kalbeliya snake dancers in black swirling skirts.', 'UNESCO Heritage', true, 1),
('Yoga & Meditation Retreats', 'Rishikesh, Dharamsala & Mysore', '3-day to 1-month programs. Rishikesh International Yoga Festival in March is unmissable.', 'Wellness', true, 2),
('Tea Estate Bungalow Stays', 'Darjeeling, Munnar & Coorg', 'Colonial-era planter bungalows inside working estates — morning plucking walks + factory tour.', 'Luxury', true, 3),
('Tribal Art Workshops', 'Bihar, Maharashtra, Odisha & Chhattisgarh', 'Madhubani, Warli, Pattachitra, Dhokra metal casting — hands-on with master artisans.', 'Cultural', true, 4);

-- Why Choose Us
INSERT INTO public.why_choose_us (icon_name, title, description, active, sort_order) VALUES
('Compass', 'Destination Experts Across India', 'Deep local knowledge of every route, coast, and trail', true, 0),
('Compass', '100% Customised', 'No copy-paste itineraries — every trip built from scratch', true, 1),
('User', 'Expert Trip Advisors', 'Real people, not bots — available Mon–Sat 9AM–7PM', true, 2),
('Shield', 'Safety First', 'Verified hotels, vetted guides, emergency support 24/7', true, 3),
('Wallet', 'Price Transparency', 'No hidden charges — full breakdown before you pay', true, 4),
('Star', 'Rated 4.9/5', '500+ verified reviews from real travellers', true, 5);

-- How It Works
INSERT INTO public.how_it_works (step_number, emoji, title, description, cta_text, show_cta, active) VALUES
(1, '💬', 'Tell Us Your Dream', 'Share your destination, travel style, and dates', NULL, true, true),
(2, '📋', 'We Build Your Itinerary', 'Custom plan crafted by our travel experts within 2 hours', NULL, false, true),
(3, '✅', 'Review & Confirm', 'Approve the plan and pay securely — no upfront payment required', NULL, false, true),
(4, '🏔', 'Journey Begins!', 'Relax — our team handles everything from here', NULL, false, true);

-- Newsletter Settings
INSERT INTO public.newsletter_settings (headline, subheadline, subscriber_count, benefits, active) VALUES
('Get Exclusive Travel Deals & Insider Guides', 'Join 5,000+ travellers who receive our monthly newsletter', 5000, ARRAY['No spam, ever', 'Monthly, not daily', 'Free travel guide on signup'], true);

-- Trust Strip
INSERT INTO public.trust_strip (badge_text, icon_emoji, order_index, active) VALUES
('✅ No spam, ever', '✅', 0, true),
('📧 Monthly, not daily', '📧', 1, true),
('🎁 Free travel guide on signup', '🎁', 2, true);
