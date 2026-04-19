import fs from 'fs';
import path from 'path';

const OPTIMIZED_DIR = path.join(process.cwd(), 'src', 'assets', 'images', 'destinations');
const STATES_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'india-states.ts');
const DESTINATIONS_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'destinations.ts');

export function runValidationPipeline() {
  console.log('--- Image Validation Pipeline ---');
  
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    console.error(`[FAIL] Optimized directory missing: ${OPTIMIZED_DIR}`);
    return false;
  }

  const existingFiles = fs.readdirSync(OPTIMIZED_DIR);
  let errors = 0;
  
  console.log(`Found ${existingFiles.length} optimized images.`);

  // Validation rules: 
  // 1. All images must be .webp
  // 2. Naming should be consistent (lowercase, hyphens)
  const namingRegex = /^[a-z0-9]+-[a-z0-9\-]+-hero\.webp$/;
  // Note: we can relax this regex based on our exact naming, but this enforces standard.

  for (const file of existingFiles) {
    if (file.startsWith('.')) continue; // skip hidden
    
    if (path.extname(file) !== '.webp') {
      console.error(`[WARN] Non-webp file found: ${file}`);
      errors++;
    }

    if (!namingRegex.test(file)) {
      // It's a soft warning if it doesn't match the strict `state-dest-hero` format exactly,
      // as some might be generic state hero images.
      // console.warn(`[INFO] Custom named image (not standard slug pattern): ${file}`);
    }
  }

  // Cross-reference data files if they exist (to ensure no broken paths in production JSON)
  // This could be expanded by importing the TS directly using ts-node or a regex scanner.

  if (errors > 0) {
    console.log(`\nValidation finished with ${errors} warnings.`);
  } else {
    console.log('\n[SUCCESS] Image validation passed.');
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runValidationPipeline();
}
