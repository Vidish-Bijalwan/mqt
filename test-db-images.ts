import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function run() {
  const { data: pkgs } = await supabase.from('packages').select('title, image_url, cover_image, slug');
  console.log("Packages:", pkgs?.slice(0, 3));
  
  const { data: dests } = await supabase.from('destinations').select('name, image_url, cover_image, slug');
  console.log("Destinations:", dests?.slice(0, 3));
}
run();
