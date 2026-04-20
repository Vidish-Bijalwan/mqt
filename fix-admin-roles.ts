import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  // Update users to have admin role
  const { data: usersData } = await supabase.auth.admin.listUsers();
  for (const u of usersData.users) {
    if (u.email === 'myquicktrippers@gmail.com' || u.email === 'quantamgaming9@gmail.com') {
      await supabase.auth.admin.updateUserById(u.id, {
        user_metadata: { ...u.user_metadata, role: 'admin' }
      });
      console.log(`Updated role for ${u.email}`);
    }
  }
}
run();
