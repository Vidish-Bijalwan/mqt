import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const query = `
    DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
    DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
    DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

    CREATE POLICY "Admin Upload Access" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (true);

    CREATE POLICY "Admin Update Access" ON storage.objects
    FOR UPDATE TO authenticated
    USING (true);

    CREATE POLICY "Admin Delete Access" ON storage.objects
    FOR DELETE TO authenticated
    USING (true);
  `;
}
run();
