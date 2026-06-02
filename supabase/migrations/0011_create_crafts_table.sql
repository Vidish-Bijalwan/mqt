-- Create Indian Crafts table
CREATE TABLE IF NOT EXISTS public.crafts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  craft_id text UNIQUE NOT NULL,
  name text NOT NULL,
  state text NOT NULL,
  city text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  color_hex text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.crafts ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access for crafts" 
  ON public.crafts FOR SELECT 
  USING (true);

-- Allow admin full access
CREATE POLICY "Allow admin full access for crafts" 
  ON public.crafts FOR ALL 
  USING (
    auth.role() = 'authenticated' 
    AND (
      auth.jwt() ->> 'email' IN (
        'admin@myquicktrippers.com',
        'zerosirus@gmail.com',
        'contact@myquicktrippers.com'
      )
    )
  );
