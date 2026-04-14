import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.VITE_SUPABASE_URL || "";
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(url, key);

async function run() {
  console.log("Connecting to", url);
  const { data, error } = await supabase.from("enquiries").insert([
    {
      name: "Test User",
      phone: "1234567890",
      email: "test@example.com",
      destination: "India"
    }
  ]);
  
  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Insert success:", data);
  }
}

run();
