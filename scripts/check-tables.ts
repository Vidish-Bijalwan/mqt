import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_PUBLISHABLE_KEY!);

async function checkTables() {
  const tables = ["states_uts", "destinations", "packages", "blog_posts", "testimonials", "faqs", "package_categories"];
  for (const t of tables) {
    const { error } = await supabase.from(t).select("id").limit(1);
    if (error) {
      console.log(`Table ${t}: Error - ${error.message}`);
    } else {
      console.log(`Table ${t}: OK`);
    }
  }
}
checkTables();
