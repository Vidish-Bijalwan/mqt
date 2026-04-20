DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

CREATE POLICY "Admin Upload Access" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'email' IN ('myquicktrippers@gmail.com', 'quantamgaming9@gmail.com'))
  )
);

CREATE POLICY "Admin Update Access" ON storage.objects
FOR UPDATE TO authenticated
USING (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'email' IN ('myquicktrippers@gmail.com', 'quantamgaming9@gmail.com'))
  )
);

CREATE POLICY "Admin Delete Access" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id IN ('destination-images', 'package-images', 'blog-images', 'testimonial-images', 'site-assets')
  AND (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'email' IN ('myquicktrippers@gmail.com', 'quantamgaming9@gmail.com'))
  )
);

DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.reviews;

CREATE POLICY "Admins can manage all reviews"
  ON public.reviews
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'email' IN ('myquicktrippers@gmail.com', 'quantamgaming9@gmail.com', 'admin@myquicktrippers.com', 'founders@myquicktrippers.com'))
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') OR 
    (auth.jwt() ->> 'email' IN ('myquicktrippers@gmail.com', 'quantamgaming9@gmail.com', 'admin@myquicktrippers.com', 'founders@myquicktrippers.com'))
  );
