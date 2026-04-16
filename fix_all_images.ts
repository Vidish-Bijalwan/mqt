import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

const imageMap: Record<string, string> = {
    // Packages / Destinations
    'mountain': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop',
    'pilgrimage': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2000&auto=format&fit=crop',
    'rishikesh': 'https://images.unsplash.com/photo-1605221677323-aebe2a0bd0ab?q=80&w=2000&auto=format&fit=crop',
    'mussoorie': 'https://images.unsplash.com/photo-1626714216733-149b1ff88991?q=80&w=2000&auto=format&fit=crop',
    'jaipur': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop',
    'rajasthan': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop',
    'lonavala': 'https://images.unsplash.com/photo-1596766463991-62d4e68eabe5?q=80&w=2000&auto=format&fit=crop',
    'ooty': 'https://images.unsplash.com/photo-1587313885622-6b9ec7ad3d86?q=80&w=2000&auto=format&fit=crop',
    'coorg': 'https://images.unsplash.com/photo-1587313885622-6b9ec7ad3d86?q=80&w=2000&auto=format&fit=crop',
    'beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop',
    'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop',
    'andaman': 'https://images.unsplash.com/photo-1588698188118-2ad16a75f115?q=80&w=2000&auto=format&fit=crop',
    'heritage': 'https://images.unsplash.com/photo-1558485292-628d00d6aa04?q=80&w=2000&auto=format&fit=crop',
    'darjeeling': 'https://images.unsplash.com/photo-1544634076-a90160ddf44a?q=80&w=2000&auto=format&fit=crop',
    'kashmir': 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?q=80&w=2000&auto=format&fit=crop',
    'honeymoon': 'https://images.unsplash.com/photo-1510260462006-2d57ac0f10a8?q=80&w=2000&auto=format&fit=crop',
    
    // Festivals
    'holi': 'https://images.unsplash.com/photo-1553315801-b258dc2d44fc?q=80&w=2000&auto=format&fit=crop',
    'diwali': 'https://images.unsplash.com/photo-1510252528766-3d238ea5f756?q=80&w=2000&auto=format&fit=crop',
    'pushkar': 'https://images.unsplash.com/photo-1603517436015-84e1b212f458?q=80&w=2000&auto=format&fit=crop',
    'mumbai': 'https://images.unsplash.com/photo-1568461821814-118837f4017e?q=80&w=2000&auto=format&fit=crop',
    'ganesh': 'https://images.unsplash.com/photo-1568461821814-118837f4017e?q=80&w=2000&auto=format&fit=crop',
    'harvest': 'https://images.unsplash.com/photo-1596752762283-8a3962bceec3?q=80&w=2000&auto=format&fit=crop',
};

const DEFAULT = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop';

function getUrl(title: string): string {
    const titleLower = title.toLowerCase();
    for (const [key, url] of Object.entries(imageMap)) {
        if (titleLower.includes(key)) {
            return url;
        }
    }
    return DEFAULT;
}

async function updateTable(tableName: string, nameField: string) {
    const { data: items } = await supabase.from(tableName).select(`id, ${nameField}, image_url, cover_image`);
    if (!items) return;
    
    for (const item of items) {
        const correctUrl = getUrl(item[nameField] || '');
        await supabase.from(tableName).update({ image_url: correctUrl, cover_image: correctUrl }).eq('id', item.id);
        console.log(`Updated ${tableName} -> ${item[nameField]}`);
    }
}

async function run() {
    console.log("Updating Packages...");
    await updateTable('packages', 'title');
    console.log("Updating Destinations...");
    await updateTable('destinations', 'name');
    console.log("Updating Categories...");
    await updateTable('categories', 'name');
    console.log("Updating Festivals...");
    await updateTable('festivals', 'name');
    console.log("Done!");
}

run();
