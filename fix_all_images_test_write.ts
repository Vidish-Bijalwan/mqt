import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_PUBLISHABLE_KEY!);

async function run() {
    const { data: items } = await supabase.from('packages').select('id').limit(1);
    if (items && items.length > 0) {
        const id = items[0].id;
        const res = await supabase.from('packages').update({ title: 'testing' }).eq('id', id).select();
        console.log("Update res:", res);
    }
}
run();
