-- Migration 0008: Alert Packages, Pricing, & Enquiries

-- 1. Add Alert Package columns to existing 'packages' table
ALTER TABLE public.packages
    ADD COLUMN IF NOT EXISTS is_alert_package BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS is_restricted BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS requires_ilp BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS nationals_only BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS duration_days INTEGER,
    ADD COLUMN IF NOT EXISTS altitude_meters INTEGER,
    ADD COLUMN IF NOT EXISTS max_group_size INTEGER,
    ADD COLUMN IF NOT EXISTS price_standard INTEGER,
    ADD COLUMN IF NOT EXISTS price_comfort INTEGER,
    ADD COLUMN IF NOT EXISTS price_premium INTEGER,
    ADD COLUMN IF NOT EXISTS seats_remaining INTEGER,
    ADD COLUMN IF NOT EXISTS season_open_date DATE,
    ADD COLUMN IF NOT EXISTS season_close_date DATE,
    ADD COLUMN IF NOT EXISTS hero_video_youtube_id VARCHAR;

-- 2. Create Enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
    enquiry_type VARCHAR NOT NULL CHECK (enquiry_type IN ('whatsapp', 'call', 'email', 'instagram')),
    visitor_ip VARCHAR,
    user_agent VARCHAR,
    referrer VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Enquiries 
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='enquiries' AND policyname='Allow public insert to enquiries') THEN
    CREATE POLICY "Allow public insert to enquiries" ON public.enquiries FOR INSERT TO public WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='enquiries' AND policyname='Allow authenticated read on enquiries') THEN
    CREATE POLICY "Allow authenticated read on enquiries" ON public.enquiries FOR SELECT TO authenticated USING (true);
  END IF;
END $$;

-- 3. Create Alert Views table
CREATE TABLE IF NOT EXISTS public.alert_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
    view_type VARCHAR NOT NULL CHECK (view_type IN ('banner', 'popup', 'card', 'page')),
    session_id VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Alert Views
ALTER TABLE public.alert_views ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='alert_views' AND policyname='Allow public insert to alert_views') THEN
    CREATE POLICY "Allow public insert to alert_views" ON public.alert_views FOR INSERT TO public WITH CHECK (true);
  END IF;
END $$;
