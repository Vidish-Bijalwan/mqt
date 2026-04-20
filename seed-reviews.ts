import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: users } = await supabase.auth.admin.listUsers();
  const profileId = users.users[0]?.id;
  if (!profileId) {
    console.log("No users found to attach review to");
    return;
  }
  
  const { data: pkg } = await supabase.from('packages').select('id').limit(1).single();
  const packageId = pkg?.id;

  if (packageId) {
    const { error: revErr } = await supabase.from('reviews').insert({
      profile_id: profileId,
      package_id: packageId,
      rating: 5,
      content: "This is an amazing trip, everything was perfect!",
      status: "pending",
      title: "Great experience",
      is_verified_booking: true
    });
    console.log("Seeded review for package:", revErr);
  }

  const { data: dest } = await supabase.from('destinations').select('id').limit(1).single();
  const destId = dest?.id;
  
  if (destId) {
    const { error: revErr2 } = await supabase.from('reviews').insert({
      profile_id: profileId,
      destination_id: destId,
      rating: 4,
      content: "Loved the scenery, but the travel was a bit long.",
      status: "approved",
      title: "Good overall",
      is_verified_booking: false
    });
    console.log("Seeded review for destination:", revErr2);
  }
}
run();
