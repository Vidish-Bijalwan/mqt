import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { craftsData } from "../src/data/crafts";

// Load ENV since this runs outside Vite
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedCrafts() {
  console.log("Starting Crafts seed process...");

  for (const craft of craftsData) {
    const { error } = await supabase.from('crafts').upsert({
      craft_id: craft.id,
      name: craft.name,
      state: craft.state,
      city: craft.city,
      description: craft.description,
      image: String(craft.image),
      color_hex: craft.colorHex
    }, { onConflict: 'craft_id' });

    if (error) {
      console.error(`Error inserting Craft ${craft.id}:`, error.message);
    } else {
      console.log(`Inserted ${craft.id}`);
    }
  }

  console.log(`Finished seeding ${craftsData.length} crafts!`);
}

seedCrafts().catch(console.error);
