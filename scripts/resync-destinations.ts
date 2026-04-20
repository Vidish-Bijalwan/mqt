import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { destinationsData } from "../src/data/destinations.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncDestinations() {
  console.log("Found " + destinationsData.length + " destinations in static JSON.");
  
  let successCount = 0;
  let failCount = 0;

  for (const dest of destinationsData) {
    const payload = {
      slug: dest.slug,
      name: dest.name,
      state: dest.stateSlug,
      country: "India",
      image_url: dest.image || "/images/placeholder.svg",
      hero_image_url: dest.heroImage?.url || dest.image || "/images/placeholder.svg",
      tagline: dest.shortDescription || "",
      best_season: dest.bestTimeToVisit || "",
      ideal_duration: "2-3 Days",
      difficulty: "Easy",
      popularity_score: Math.round(dest.rating * 10) || 45,
      active: true,
      featured: true,
    };

    const { error } = await supabase.from('destinations').upsert(payload, { onConflict: 'slug' });
    
    if (error) {
      console.error(`[X] Error inserting ${dest.name}: ${error.message}`);
      failCount++;
    } else {
      successCount++;
    }
  }

  console.log(`Sync Complete: ${successCount} successful, ${failCount} failed.`);
}

syncDestinations().catch(console.error);
