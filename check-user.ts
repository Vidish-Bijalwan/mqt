import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data } = await supabase.auth.admin.listUsers();
  console.log(data.users.map(u => ({ email: u.email, meta: u.raw_user_meta_data })));
}
run();
