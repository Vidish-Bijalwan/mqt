import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load Environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Mising VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

console.log("-----------------------------------------");
console.log("Testing Supabase Database Connection");
console.log("URL:", supabaseUrl);
console.log("-----------------------------------------");

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("1. Contacting Supabase...");
    // Just try to fetch from any table with limit 1
    const { data, error, status } = await supabase.from("destinations").select("id").limit(1);

    if (error) {
      if (error.code === '42P01') {
        // Table doesn't exist yet but connection works
        console.log("✅ Connection SUCCESS!");
        console.log("⚠️ Database exists, but the 'destinations' table does not exist yet.");
        console.log("   Make sure to deploy the schema in supabase/migrations/0000_initial_schema.sql via the dashboard.");
        process.exit(0);
      }
      
      console.error("❌ Query generated an error:", error.message);
      console.error("Full error detail:", error);
      process.exit(1);
    }
    
    console.log(`✅ Connection SUCCESS!`);
    console.log(`📡 Reached the database and found the 'destinations' table!`);
    
  } catch (err) {
    console.error("❌ Connection failed with a network or environment error.");
    console.error(err);
    process.exit(1);
  }
}

testConnection();
