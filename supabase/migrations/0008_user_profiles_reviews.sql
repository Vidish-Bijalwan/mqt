-- ─────────────────────────────────────────────────────────
-- Supabase Schema Migration: User Profiles & Reviews Ecosystem
-- ─────────────────────────────────────────────────────────

-- 1. Profiles Table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger to create profile when auth.user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Map the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ─────────────────────────────────────────────────────────
-- 2. Reviews Table (for Packages & Destinations)
-- ─────────────────────────────────────────────────────────
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT NOT NULL,
    images TEXT[], -- array of image URLs
    is_verified_booking BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Ensure review is attached to either a package or destination, but not both or neither
    CONSTRAINT review_target_check CHECK (
        (package_id IS NOT NULL AND destination_id IS NULL) OR 
        (package_id IS NULL AND destination_id IS NOT NULL)
    ),
    -- Prevent duplicate reviews per user per entity
    CONSTRAINT unique_user_package_review UNIQUE(profile_id, package_id),
    CONSTRAINT unique_user_destination_review UNIQUE(profile_id, destination_id)
);

-- Allow RLS on Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Review Policies
CREATE POLICY "Approved reviews are visible to everyone."
  ON public.reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authenticated users can create reviews."
  ON public.reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = profile_id);

CREATE POLICY "Users can view and update their own pending/approved reviews."
  ON public.reviews FOR UPDATE
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own reviews."
  ON public.reviews FOR DELETE
  USING (auth.uid() = profile_id);

-- Add Admin policies for Reviews (Admin can manage all)
CREATE POLICY "Admins can manage all reviews"
  ON public.reviews
  TO authenticated
  USING (
    (auth.jwt() ->> 'email') IN (
      'admin@myquicktrippers.com',
      'founders@myquicktrippers.com'
    )
  )
  WITH CHECK (
    (auth.jwt() ->> 'email') IN (
      'admin@myquicktrippers.com',
      'founders@myquicktrippers.com'
    )
  );

-- Function to re-calculate package review averages automatically
CREATE OR REPLACE FUNCTION update_package_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.package_id IS NOT NULL THEN
        UPDATE public.packages
        SET 
            rating = (
                SELECT ROUND(AVG(rating)::numeric, 1)
                FROM public.reviews 
                WHERE package_id = NEW.package_id AND status = 'approved'
            ),
            reviews_count = (
                SELECT COUNT(*)
                FROM public.reviews 
                WHERE package_id = NEW.package_id AND status = 'approved'
            )
        WHERE id = NEW.package_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to recalculate ratings for packages when review is updated
CREATE TRIGGER update_package_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE PROCEDURE update_package_rating();
