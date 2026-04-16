import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);
const GOOD_URL = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop";
const GOOD_URL2 = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop";

async function run() {
  const { data: pkgs } = await supabase.from('packages').select('id, image_url, cover_image');
  for (const pkg of pkgs || []) {
      const isBad = pkg.image_url?.includes('1600100') || pkg.image_url?.includes('1621') || pkg.image_url?.includes('1609');
      const isBad2 = pkg.cover_image?.includes('1600100') || pkg.cover_image?.includes('1621') || pkg.cover_image?.includes('1609');
      if (isBad || isBad2) {
          const update = {
             ...(isBad ? { image_url: GOOD_URL } : {}),
             ...(isBad2 ? { cover_image: GOOD_URL2 } : {})
          };
          await supabase.from('packages').update(update).eq('id', pkg.id);
          console.log('Fixed pkg ID:', pkg.id);
      }
  }

  const { data: dst } = await supabase.from('destinations').select('id, image_url, cover_image');
  for (const d of dst || []) {
      const isBad = d.image_url?.includes('1600100') || d.image_url?.includes('1621') || d.image_url?.includes('1609');
      const isBad2 = d.cover_image?.includes('1600100') || d.cover_image?.includes('1621') || d.cover_image?.includes('1609');
      if (isBad || isBad2) {
          const update = {
             ...(isBad ? { image_url: GOOD_URL } : {}),
             ...(isBad2 ? { cover_image: GOOD_URL2 } : {})
          };
          await supabase.from('destinations').update(update).eq('id', d.id);
          console.log('Fixed dest ID:', d.id);
      }
  }
}
run();
