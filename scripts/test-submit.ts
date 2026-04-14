import dotenv from "dotenv";
dotenv.config();

// Mock Vite's import.meta.env
globalThis.import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    }
  }
} as any;

// Use ts-node/tsx to compile the ts properly, but we might need to patch it directly 
// because import.meta is syntax. Instead, let's just make a direct supabase call matching the service exactly:
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_PUBLISHABLE_KEY!);

async function run() {
  const payload = {
    name: "dvdvsvds",
    phone: "9876543213",
    email: 'whatsapp-only@mqtravels.com',
    destination: "India",
    travel_date: "Flexible",
    adults: 2,
    children: 0,
    travellers_count: 2,
    tour_type: "Adventure",
    budget_tier: "Premium (₹8000+)",
    preferred_contact_method: 'whatsapp',
    source_page: "/",
    cta_label: 'Trip Planner Wizard',
    requirements: "test"
  };

  const { data, error } = await supabase.from("enquiries").insert([payload]);
  console.log("Result:", data, "Error:", error);
}

run();
