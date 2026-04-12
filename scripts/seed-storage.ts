import fs from 'fs';
import path from 'path';
import https from 'https';
import { createClient } from '@supabase/supabase-js';

// Configuration
const BUCKET_NAME = 'public-assets';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Image Mappings Matrix (Safe, high-quality Unsplash URLs)
const imageMatrix = {
  states: {
    'rajasthan': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80',
    'kerala': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
    'andaman': 'https://images.unsplash.com/photo-1589394815804-964ce0fae412?auto=format&fit=crop&w=1920&q=80',
    'uttarakhand': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80',
    'himachal-pradesh': 'https://images.unsplash.com/photo-1605649487212-4dcf3b6f1188?auto=format&fit=crop&w=1920&q=80',
    'jammu-and-kashmir': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=80',
    'ladakh': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
  },
  cities: {
    'jaipur': 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1920&q=80',
    'munnar': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    'rishikesh': 'https://images.unsplash.com/photo-1605649487212-4dcf3b6f1188?auto=format&fit=crop&w=1920&q=80',
    'manali': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80',
  },
  packages: {
    'kedarnath-yatra-5-nights-6-days': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80',
    'ladakh-adventure-7-nights-8-days': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    'kashmir-honeymoon-5-nights-6-days': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=80',
    'valley-of-flowers-trek': 'https://images.unsplash.com/photo-1605649487212-4dcf3b6f1188?auto=format&fit=crop&w=1920&q=80',
    'rajasthan-heritage-tour-7-nights': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80',
    'kerala-backwaters-and-tea-estates': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
    'andaman-islands-luxury-escape': 'https://images.unsplash.com/photo-1589394815804-964ce0fae412?auto=format&fit=crop&w=1920&q=80',
    'goa-beaches-and-heritage': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
  },
  categories: {
    'spiritual': 'https://images.unsplash.com/photo-1605649487212-4dcf3b6f1188?auto=format&fit=crop&w=1920&q=80',
    'honeymoon': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80',
    'adventure': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80',
    'family': 'https://images.unsplash.com/photo-1589394815804-964ce0fae412?auto=format&fit=crop&w=1920&q=80',
    'heritage': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80',
    'nature': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80',
  }
};

/** Downloads image as a buffer */
function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }
      const data: Buffer[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

/** 
 * Script creates local structured fallback images 
 * AND uploads them to Supabase (if keys present) protecting the pipeline perfectly.
 */
async function run() {
  console.log('🚀 Starting Visual Asset Pipeline...');

  // 1. Create local fallback structure
  const rootLocalDir = path.resolve(process.cwd(), 'src/assets/images');
  
  if (!fs.existsSync(rootLocalDir)) fs.mkdirSync(rootLocalDir, { recursive: true });

  let supabase: any = null;
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    console.log('✅ Supabase credentials found! Will upload to Storage.');
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Quick check to see if bucket exists.
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find((b: any) => b.name === BUCKET_NAME)) {
      console.log(`⚠️ Bucket '${BUCKET_NAME}' not found! You must create it in the Supabase Dashboard and set to Public to serve images.`);
    }
  } else {
    console.log('⚠️ No SUPABASE_SERVICE_KEY found. Generating local structured fallbacks ONLY.');
  }

  // Iterate Matrix
  for (const [entityType, mappings] of Object.entries(imageMatrix)) {
    const typeDir = path.join(rootLocalDir, entityType);
    if (!fs.existsSync(typeDir)) fs.mkdirSync(typeDir, { recursive: true });

    for (const [slug, url] of Object.entries(mappings)) {
      console.log(`\nProcessing: ${entityType}/${slug}...`);
      try {
        const buffer = await downloadImage(url);
        console.log(`  -> Downloaded ${buffer.length} bytes`);

        // Create local deterministic path
        let relativeStoragePath = '';
        if (entityType === 'cities') {
          // Flattening state/city structure slightly (e.g. rajasthan/jaipur/hero.webp)
          // For simplicity in the script, we dump it inside the folder as city-slug/hero.webp
          relativeStoragePath = `${entityType}/${slug}/hero.webp`;
        } else if (entityType === 'packages') {
          relativeStoragePath = `${entityType}/${slug}/card.webp`;
        } else {
          relativeStoragePath = `${entityType}/${slug}/hero.webp`;
        }

        // Save Locally
        const localFilePath = path.join(rootLocalDir, ...relativeStoragePath.split('/'));
        const localFileDir = path.dirname(localFilePath);
        if (!fs.existsSync(localFileDir)) fs.mkdirSync(localFileDir, { recursive: true });
        
        fs.writeFileSync(localFilePath, buffer);
        console.log(`  -> Saved locally: src/assets/images/${relativeStoragePath}`);

        // Upload to Supabase
        if (supabase) {
          const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(relativeStoragePath, buffer, {
              cacheControl: '3600',
              upsert: true,
              contentType: 'image/jpeg'
            });

          if (error) {
            console.error(`  -> Supabase Upload Failed:`, error.message);
          } else {
            console.log(`  -> Supabase Upload Success: ${relativeStoragePath}`);
          }
        }
      } catch (err) {
        console.error(`  -> Failed:`, err);
      }
    }
  }

  console.log('\n✅ Pipeline Complete! The hybrid resolver will now be able to fetch high quality local assets as a fallback.');
}

run().catch(console.error);
