import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, packages(title), destinations(name), profiles(full_name, email)');
  console.log("REVIEWS", error, data);
}
run();
