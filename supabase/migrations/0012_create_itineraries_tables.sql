-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 0012: Create itineraries + itinerary_days tables
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Main itineraries table ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.itineraries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  package_name    TEXT NOT NULL,
  region          TEXT NOT NULL CHECK (region IN (
                    'North India', 'East India', 'Central India',
                    'West India', 'South India'
                  )),
  duration_label  TEXT,
  days            SMALLINT NOT NULL DEFAULT 1,
  nights          SMALLINT NOT NULL DEFAULT 0,
  places_covered  TEXT[]   NOT NULL DEFAULT '{}',
  starting_point  TEXT,
  ending_point    TEXT,
  short_description TEXT,
  image_url       TEXT,
  -- arrays stored as pg text[]
  highlights      TEXT[] DEFAULT '{}',
  inclusions      TEXT[] DEFAULT '{}',
  exclusions      TEXT[] DEFAULT '{}',
  category_tags   TEXT[] DEFAULT '{}',
  -- pricing
  starting_price  INTEGER,
  price_label     TEXT,
  price_disclaimer TEXT,
  -- seo
  seo_title       TEXT,
  seo_description TEXT,
  -- admin flags
  active          BOOLEAN NOT NULL DEFAULT false,
  featured        BOOLEAN NOT NULL DEFAULT false,
  sort_order      SMALLINT        DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS itineraries_slug_idx     ON public.itineraries (slug);
CREATE INDEX IF NOT EXISTS itineraries_region_idx   ON public.itineraries (region);
CREATE INDEX IF NOT EXISTS itineraries_active_idx   ON public.itineraries (active);
CREATE INDEX IF NOT EXISTS itineraries_featured_idx ON public.itineraries (featured);

-- ── 2. Day-wise itinerary rows ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.itinerary_days (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id   UUID NOT NULL REFERENCES public.itineraries (id) ON DELETE CASCADE,
  day_number     SMALLINT NOT NULL,
  title          TEXT NOT NULL DEFAULT '',
  description    TEXT NOT NULL DEFAULT '',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (itinerary_id, day_number)
);

CREATE INDEX IF NOT EXISTS itinerary_days_itinerary_idx ON public.itinerary_days (itinerary_id);

-- ── 3. updated_at trigger ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_itineraries_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_itineraries_updated_at ON public.itineraries;
CREATE TRIGGER trg_itineraries_updated_at
  BEFORE UPDATE ON public.itineraries
  FOR EACH ROW EXECUTE FUNCTION public.set_itineraries_updated_at();

-- ── 4. Row Level Security ──────────────────────────────────────────────────────
ALTER TABLE public.itineraries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;

-- Public: read only active itineraries
CREATE POLICY "Public read active itineraries"
  ON public.itineraries FOR SELECT
  USING (active = true);

-- Public: read days for active itineraries only
CREATE POLICY "Public read itinerary_days"
  ON public.itinerary_days FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.itineraries it
      WHERE it.id = itinerary_days.itinerary_id
        AND it.active = true
    )
  );

-- Admin: full access — mirrors the pattern from other tables
CREATE POLICY "Admin full access to itineraries"
  ON public.itineraries FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
    OR (auth.jwt() ->> 'email' IN (
      'myquicktrippers@gmail.com',
      'quantamgaming9@gmail.com',
      'admin@myquicktrippers.com',
      'zerosirus@gmail.com'
    ))
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
    OR (auth.jwt() ->> 'email' IN (
      'myquicktrippers@gmail.com',
      'quantamgaming9@gmail.com',
      'admin@myquicktrippers.com',
      'zerosirus@gmail.com'
    ))
  );

CREATE POLICY "Admin full access to itinerary_days"
  ON public.itinerary_days FOR ALL
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
    OR (auth.jwt() ->> 'email' IN (
      'myquicktrippers@gmail.com',
      'quantamgaming9@gmail.com',
      'admin@myquicktrippers.com',
      'zerosirus@gmail.com'
    ))
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
    OR (auth.jwt() ->> 'email' IN (
      'myquicktrippers@gmail.com',
      'quantamgaming9@gmail.com',
      'admin@myquicktrippers.com',
      'zerosirus@gmail.com'
    ))
  );
