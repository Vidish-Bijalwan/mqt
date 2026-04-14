-- ─────────────────────────────────────────────────────────
-- Supabase Schema Migration: Admin Access Policies
-- ─────────────────────────────────────────────────────────
-- This migration grants full CRM and CMS access to authenticated
-- admin users, allowing the React Admin Dashboard to function.

-- 1. Enquiries (Leads)
CREATE POLICY "Allow authenticated full access to enquiries" ON public.enquiries
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. States & UTs
CREATE POLICY "Allow authenticated full access to states_ut" ON public.states_ut
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Destinations
CREATE POLICY "Allow authenticated full access to destinations" ON public.destinations
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Destination Routings
CREATE POLICY "Allow authenticated full access to destination_itinerary_days" ON public.destination_itinerary_days
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Packages
CREATE POLICY "Allow authenticated full access to packages" ON public.packages
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Package Routings
CREATE POLICY "Allow authenticated full access to package_itinerary_days" ON public.package_itinerary_days
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Testimonials
CREATE POLICY "Allow authenticated full access to testimonials" ON public.testimonials
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Blog Posts
CREATE POLICY "Allow authenticated full access to blog_posts" ON public.blog_posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
