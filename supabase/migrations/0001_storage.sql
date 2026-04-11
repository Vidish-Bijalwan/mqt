-- ─────────────────────────────────────────────────────────
-- Supabase Storage Schema Migration: MyQuickTrippers
-- ─────────────────────────────────────────────────────────

-- Enable storage if needed (usually handled by Supabase core but good practice)
-- CREATE SCHEMA IF NOT EXISTS storage;

-- 1. Idempotent Bucket Creation with Configurations
-- Note: 'file_size_limit' is in bytes. 5242880 = 5MB.
-- 'allowed_mime_types' ensures only valid images are uploaded.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('destination-images', 'destination-images', true, 5242880, '{"image/webp", "image/jpeg", "image/png"}'),
  ('package-images', 'package-images', true, 5242880, '{"image/webp", "image/jpeg", "image/png"}'),
  ('blog-images', 'blog-images', true, 5242880, '{"image/webp", "image/jpeg", "image/png"}'),
  ('testimonial-images', 'testimonial-images', true, 3145728, '{"image/webp", "image/jpeg", "image/png"}'),
  ('site-assets', 'site-assets', true, 5242880, '{"image/webp", "image/jpeg", "image/png", "image/svg+xml"}')
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Row Level Security Policies for `storage.objects`

-- Ensure RLS is enabled on objects table (usually is by default in Supabase)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Clean out any conflicting existing public policies if script is re-run
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

-- 2A. Public Read Access for website rendering
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT TO public
USING (bucket_id IN (
  'destination-images', 
  'package-images', 
  'blog-images', 
  'testimonial-images', 
  'site-assets'
));

-- 2B. Authenticated Admin Write Operations (Strict RBAC)

CREATE POLICY "Admin Upload Access" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

CREATE POLICY "Admin Update Access" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

CREATE POLICY "Admin Delete Access" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin')
);

-- 3. Database Content Model Updates
-- Added new columns to support the migration strategy where they might have been missing

ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS avatar_url TEXT;
