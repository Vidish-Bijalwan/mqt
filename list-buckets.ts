import { createClient } from "@supabase/supabase-js";
const url = process.env.VITE_SUPABASE_URL || "https://missing";
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "missing";
const supabase = createClient(url, key);
async function run() {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) console.error(error);
  else console.log(data.map(b => b.name));
}
run();
