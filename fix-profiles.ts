import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: users } = await supabase.auth.admin.listUsers();
  
  for (const u of users.users) {
      await supabase.from('profiles').upsert({
          id: u.id,
          email: u.email,
          full_name: u.user_metadata?.full_name || 'Admin User'
      });
  }
}
run();
