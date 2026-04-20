import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.storage.listBuckets();
  console.log(data?.map(b => b.name), error);
  
  const result = await supabase.storage.from('site-assets').list();
  console.log('site-assets:', result.data?.map(f => ({ name: f.name, id: f.id})), result.error);
}
run();
