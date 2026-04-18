/**
 * MQT Asset Mapping & Resolution Engine v4.0 — Local-First Smart Resolver
 *
 * Priority chain:
 *   1. Local WebP  → /src/assets/images/{category}/{slug}/{variant}.webp
 *   2. Tourism JPG → /public/tourism/{state}/{section}/{file}.jpg
 *   3. CMS URL     → whatever the data layer supplies
 *   4. Gradient    → themed colour fallback (no broken icon)
 */

export type ImageVariant = 'hero' | 'card' | 'banner' | 'thumbnail' | 'gallery-1' | 'gallery-2' | 'gallery-3';

export interface ImageResolution {
  src: string;
  fallbackSrc: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static lookup tables built from actual filesystem inventory
// ─────────────────────────────────────────────────────────────────────────────

/** States that have local WebP assets in /src/assets/images/states/{slug}/ */
const LOCAL_STATES = new Set([
  'andaman-and-nicobar-islands', 'andaman-nicobar', 'andhra-pradesh',
  'arunachal-pradesh', 'assam', 'bihar', 'chandigarh', 'char-dham',
  'chhattisgarh', 'dadra-and-nagar-haveli-and-daman-and-diu',
  'dadra-nagar-haveli', 'delhi', 'goa', 'gujarat', 'haryana',
  'himachal-pradesh', 'jammu-and-kashmir', 'jammu-kashmir', 'jharkhand',
  'karnataka', 'kashmir', 'kedarnath', 'kerala', 'ladakh',
  'lakshadweep', 'madhya-pradesh', 'maharashtra', 'manali', 'manipur',
  'meghalaya', 'mizoram', 'nagaland', 'odisha', 'puducherry', 'punjab',
  'rajasthan', 'sikkim', 'tamil-nadu', 'telangana', 'tripura',
  'uttarakhand', 'uttar-pradesh', 'varanasi', 'west-bengal',
]);

/** Packages that have local WebP assets in /src/assets/images/packages/{slug}/ */
const LOCAL_PACKAGES = new Set([
  'varanasi-spiritual-3-nights-4-days', 'lonavala-quick-break',
  'mussoorie-weekend-retreat', 'mathura-vrindavan-yatra',
  'kashmir-honeymoon-5-nights-6-days', 'hampi-heritage-trail',
  'kasol-weekend-escape', 'ooty-coorg-family-journey', 'kerala-family-escape',
  'pondicherry-weekend-escape', 'varanasi-prayagraj-4-nights-5-days',
  'gokarna-beach-break', 'bir-billing-adventure',
  'rishikesh-adventure-2-nights-3-days', 'andaman-family-adventure',
  'goa-romantic-escape', 'rajasthan-heritage-tour-7-nights',
  'kerala-backwaters-romance', 'himalayan-grand-circuit-12-nights',
  'andaman-coral-retreat', 'andaman-honeymoon-journey', 'auli-snow-escape',
  'ayodhya-pilgrimage', 'char-dham-yatra-10-nights-11-days',
  'coorg-coffee-romance', 'darjeeling-tea-romance', 'goa-beaches-and-heritage',
  'goa-beach-escape', 'goa-family-beach-break', 'golden-triangle-classic',
  'jim-corbett-safari', 'kabini-jungle-escape', 'kanha-wildlife-retreat',
  'kashmir-family-7-nights-8-days', 'kashmir-solo-4-nights-5-days',
  'kaziranga-nature-escape', 'kedarnath-yatra-5-nights-6-days',
  'kerala-backwaters-and-tea-estates', 'kerala-luxury-escape',
  'kovalam-coastal-holiday', 'ladakh-adventure-7-nights-8-days',
  'ladakh-luxury-8-nights-9-days', 'ladakh-motorbike-expedition',
  'manali-family-4-nights-5-days', 'manali-winter-snow-4-nights-5-days',
  'rajasthan-heritage-trail', 'rajasthan-palace-retreat',
  'rameswaram-temple-trail', 'ranthambore-wildlife-tour',
  'royal-rajasthan-family-escape', 'spiti-valley-escape',
  'tiger-safari-expedition', 'tirupati-darshan-trip',
  'udaipur-couple-retreat', 'udaipur-palace-experience',
  'valley-of-flowers-trek-6-nights-7-days',
]);

/** Tourism JPG fallbacks keyed by destination slug */
const TOURISM_FALLBACKS: Record<string, string> = {
  // Incredible India core
  'delhi':          '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'ladakh':         '/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg',
  'kashmir':        '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
  'jammu-and-kashmir': '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
  'jammu-kashmir':  '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
  'manali':         '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'himachal-pradesh': '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'spiti-valley':   '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'rajasthan':      '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'jaipur':         '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'udaipur':        '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'jodhpur':        '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'jaisalmer':      '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'rann-of-kutch':  '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'uttarakhand':    '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'kedarnath':      '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'rishikesh':      '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'haridwar':       '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'char-dham':      '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'gangotri':       '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'harshil':        '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'valley-of-flowers': '/tourism/valley_of_flowers.jpg',
  'odisha':         '/tourism/India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg',
  'bhubaneswar':    '/tourism/India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg',
  'puri':           '/tourism/India_Central/Incredible_India/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg',
  'west-bengal':    '/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg',
  'darjeeling':     '/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg',
  'sikkim':         '/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg',
  'goa':            '/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg',
  'north-goa':      '/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg',
  'south-goa':      '/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg',
  'mumbai':         '/tourism/India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg',
  'maharashtra':    '/tourism/India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg',
  'madhya-pradesh': '/tourism/India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg',
  'karnataka':      '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'hampi':          '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'coorg':          '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'mysuru':         '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'lakshadweep':    '/tourism/India_Central/Incredible_India/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg',
  'andhra-pradesh': '/tourism/India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg',
  'tirupati':       '/tourism/India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg',
  'tamil-nadu':     '/tourism/India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg',
  'rameswaram':     '/tourism/India_Central/Incredible_India/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg',
  'puducherry':     '/tourism/India_Central/Incredible_India/039_auroville-puducherry_govt.jpg',
  'pondicherry':    '/tourism/India_Central/Incredible_India/039_auroville-puducherry_govt.jpg',
  'kerala':         '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'kochi':          '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'munnar':         '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'alleppey':       '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'wayanad':        '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'kovalam':        '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'andaman':        '/tourism/Andaman_Nicobar/Destinations/003_image_govt.jpg',
  'andaman-and-nicobar-islands': '/tourism/Andaman_Nicobar/Destinations/003_image_govt.jpg',
  'andaman-nicobar': '/tourism/Andaman_Nicobar/Destinations/003_image_govt.jpg',
  'gujarat':        '/tourism/Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg',
  'ahmedabad':      '/tourism/Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg',
  'manipur':        '/tourism/Manipur/Exclusive_Destination/003_ema_keithel3_govt.jpg',
  'nagaland':       '/tourism/Manipur/Screen_Reader_Access/002_image_govt.png',
  'meghalaya':      '/tourism/Manipur/Screen_Reader_Access/002_image_govt.png',
  'tripura':        '/tourism/Tripura/Destination/005_destination_govt.jpg',
  'haryana':        '/tourism/Haryana/Destinations/006_Ambala_govt.jpg',
  // Festival images (after download script runs)
  'holi':           '/assets/festivals/holi.jpg',
  'diwali':         '/assets/festivals/diwali.jpg',
  'kumbh-mela':     '/assets/festivals/kumbh-mela.jpg',
  'hornbill':       '/assets/festivals/hornbill.jpg',
  'thrissur-pooram': '/assets/festivals/thrissur-pooram.jpg',
  // Extra destinations
  'varanasi':       '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'agra':           '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'mathura':        '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'ayodhya':        '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'auli':           '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'kasol':          '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'shimla':         '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'dharamshala':    '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'bir-billing':    '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  'sundarbans':     '/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg',
  'kaziranga':      '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'ziro-valley':    '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'arunachal-pradesh': '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'assam':          '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'golden-triangle': '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'jim-corbett':    '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'ranthambore':    '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  'lonavala':       '/tourism/Maharashtra/Overview/011_indranil-naikjpg_govt.jpg',
  'mussoorie':      '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'ooty':           '/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg',
  'gokarna':        '/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg',
  'kabini':         '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'kanha':          '/tourism/India_Central/Incredible_India/031_rajwada-indore-mp-city-hero_govt.jpg',
  'uttar-pradesh':  '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'punjab':         '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'telangana':      '/tourism/India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg',
  'hyderabad':      '/tourism/India_Central/Incredible_India/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg',
  'bihar':          '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
  'chhattisgarh':   '/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg',
  'jharkhand':      '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  'mizoram':        '/tourism/Manipur/Screen_Reader_Access/002_image_govt.png',
  'dadra-nagar-haveli': '/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg',
};

const DEFAULT_FALLBACK = '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg';

// Normalize slug for lookup
const norm = (s: string) =>
  s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');

function lookupTourism(slug: string): string {
  const key = norm(slug);
  return TOURISM_FALLBACKS[key] ?? DEFAULT_FALLBACK;
}

// ─────────────────────────────────────────────────────────────────────────────
// Resolver helpers
// ─────────────────────────────────────────────────────────────────────────────

function resolveLocalState(slug: string, variant: ImageVariant): string | null {
  const s = norm(slug);
  if (!LOCAL_STATES.has(s)) return null;
  return `/src/assets/images/states/${s}/${variant}.webp`;
}

function resolveLocalPackage(slug: string, variant: ImageVariant): string | null {
  const s = norm(slug);
  if (!LOCAL_PACKAGES.has(s)) return null;
  const v = variant === 'banner' ? 'hero' : variant === 'gallery-1' ? 'card' : variant;
  const allowed = ['hero', 'card', 'thumbnail'];
  const finalV = allowed.includes(v) ? v : 'card';
  return `/src/assets/images/packages/${s}/${finalV}.webp`;
}

function resolveLocalCity(stateSlug: string, citySlug: string, variant: ImageVariant): string | null {
  const st = norm(stateSlug);
  const ci = norm(citySlug);
  const v = ['hero', 'card', 'thumbnail', 'gallery-1', 'gallery-2', 'gallery-3'].includes(variant) ? variant : 'card';
  return `/src/assets/images/cities/${st}/${ci}/${v}.webp`;
}

function resolveLocalCategory(categorySlug: string, variant: ImageVariant): string | null {
  const s = norm(categorySlug);
  const v = ['hero', 'card', 'thumbnail'].includes(variant) ? variant : 'card';
  return `/src/assets/images/categories/${s}/${v}.webp`;
}

function isValidCms(url?: string): boolean {
  return !!url && (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:'));
}

function makeFallback(slug: string): string {
  return lookupTourism(slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function getStateImage(stateSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const local = resolveLocalState(stateSlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(stateSlug);
  return { src: local ?? fallback, fallbackSrc: fallback };
}

export function getCityImage(stateSlug: string, citySlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const local = resolveLocalCity(stateSlug, citySlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(citySlug) || makeFallback(stateSlug);
  return { src: local ?? fallback, fallbackSrc: fallback };
}

export function getDestinationImage(destSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  const local = resolveLocalState(destSlug, variant) ?? resolveLocalPackage(destSlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(destSlug);
  return { src: local ?? (isValidCms(cmsUrl) ? cmsUrl as string : makeFallback(destSlug)), fallbackSrc: fallback };
}

export function getPopularLocationImage(stateSlug: string, locationSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const local = resolveLocalCity(stateSlug, locationSlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(locationSlug) || makeFallback(stateSlug);
  return { src: local ?? fallback, fallbackSrc: fallback };
}

export function getPackageImage(packageSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  const local = resolveLocalPackage(packageSlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(packageSlug);
  const src = local ?? (isValidCms(cmsUrl) ? cmsUrl as string : fallback);
  return { src, fallbackSrc: fallback };
}

export function getBlogImage(blogSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : DEFAULT_FALLBACK;
  return { src: isValidCms(cmsUrl) ? (cmsUrl as string) : DEFAULT_FALLBACK, fallbackSrc: fallback };
}

export function getCategoryImage(categorySlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  const local = resolveLocalCategory(categorySlug, variant);
  const fallback = isValidCms(cmsUrl) ? (cmsUrl as string) : makeFallback(categorySlug);
  return { src: local ?? fallback, fallbackSrc: fallback };
}
