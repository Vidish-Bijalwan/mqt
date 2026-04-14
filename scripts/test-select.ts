import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.VITE_SUPABASE_URL || "";
// Use SERVICE_ROLE key if available for bypassing RLS, or anon key
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase.from("enquiries").select("*");
  console.log("Found enquiries:", data?.length);
  if (data?.length) {
    console.log(data[0]);
  }
}
run();
