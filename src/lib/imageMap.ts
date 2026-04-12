/**
 * MQT Asset Mapping & Resolution Engine v2.0
 *
 * Priority chain: CMS URL → Supabase Storage → Local webp → Branded placeholder
 * Uses Vite's `import.meta.glob` to eagerly resolve local asset hashes.
 * Any missing image safely falls through — zero grey boxes, zero broken UI.
 */

import { getStateSlugForDest } from './destStateMap';

// ─── Local Asset Registry ───────────────────────────────────────────────────
const imageRegistry = import.meta.glob('../assets/images/**/*.{webp,jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// ─── Direct fallback imports (always available via Vite bundler) ─────────────
import destKedarnath from '@/assets/dest-kedarnath.jpg';
import destLadakh from '@/assets/dest-ladakh.jpg';
import destValleyFlowers from '@/assets/dest-valley-flowers.jpg';
import destVaranasi from '@/assets/dest-varanasi.jpg';
import destKashmir from '@/assets/dest-kashmir.jpg';
import destManali from '@/assets/dest-manali.jpg';
import destRishikesh from '@/assets/dest-rishikesh.jpg';

const BUNDLED_FALLBACKS: Record<string, string> = {
  'kedarnath':        destKedarnath,
  'char-dham':        destKedarnath,
  'ladakh':           destLadakh,
  'leh':              destLadakh,
  'nubra-valley':     destLadakh,
  'pangong-lake':     destLadakh,
  'valley-of-flowers':destValleyFlowers,
  'varanasi':         destVaranasi,
  'kashmir':          destKashmir,
  'srinagar':         destKashmir,
  'gulmarg':          destKashmir,
  'manali':           destManali,
  'shimla':           destManali,
  'rishikesh':        destRishikesh,
  'haridwar':         destRishikesh,
};

// ─── Types ──────────────────────────────────────────────────────────────────
export type ImageVariant = 'hero' | 'card' | 'banner' | 'thumbnail' | 'gallery-1' | 'gallery-2' | 'gallery-3';

export interface ImageResolution {
  src: string;
  fallbackSrc: string;
}

// ─── Supabase Storage Base ───────────────────────────────────────────────────
const SUPABASE_STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL || ''}/storage/v1/object/public/public-assets`;

// ─── Branded gradient placeholder ───────────────────────────────────────────
// A warm amber SVG — never a grey box
const BRANDED_PLACEHOLDER = '/placeholder.svg';

// ─── Core Local Resolver ─────────────────────────────────────────────────────
function resolveLocal(localPath: string): string | null {
  return imageRegistry[localPath] || null;
}

function resolveLocalFallback(fallbackType: string): string {
  const webp = `../assets/images/placeholders/${fallbackType}-fallback.webp`;
  const svg = `../assets/images/placeholders/${fallbackType}-fallback.svg`;
  const generic = `../assets/images/placeholders/generic-fallback.svg`;
  return imageRegistry[webp] || imageRegistry[svg] || imageRegistry[generic] || BRANDED_PLACEHOLDER;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. STATE IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getStateImage(stateSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  // CMS override
  if (cmsUrl && cmsUrl.startsWith('http')) {
    const local = resolveLocal(`../assets/images/states/${stateSlug}/${variant}.webp`);
    return { src: cmsUrl, fallbackSrc: local || resolveLocalFallback('state') };
  }
  // Local first (faster, works offline)
  const localPath = `../assets/images/states/${stateSlug}/${variant}.webp`;
  const local = resolveLocal(localPath);
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/states/${stateSlug}/${variant}.webp`
    : '';
  return {
    src: supabaseSrc || local || resolveLocalFallback('state'),
    fallbackSrc: local || resolveLocalFallback('state'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CITY IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getCityImage(stateSlug: string, citySlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    const local = resolveLocal(`../assets/images/cities/${stateSlug}/${citySlug}/${variant}.webp`);
    return { src: cmsUrl, fallbackSrc: local || resolveLocalFallback('city') };
  }
  const localPath = `../assets/images/cities/${stateSlug}/${citySlug}/${variant}.webp`;
  const local = resolveLocal(localPath);
  const bundled = BUNDLED_FALLBACKS[citySlug] || BUNDLED_FALLBACKS[stateSlug];
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/cities/${stateSlug}/${citySlug}/${variant}.webp`
    : '';
  return {
    src: supabaseSrc || local || bundled || resolveLocalFallback('city'),
    fallbackSrc: local || bundled || resolveLocalFallback('city'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. DESTINATION IMAGE (smart cascade: city → state → bundled → placeholder)
//    Use this for DestinationExplorer carousel, DestinationDetail gallery, etc.
// ─────────────────────────────────────────────────────────────────────────────
export function getDestinationImage(destSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    return { src: cmsUrl, fallbackSrc: BUNDLED_FALLBACKS[destSlug] || BRANDED_PLACEHOLDER };
  }

  const stateSlug = getStateSlugForDest(destSlug);

  // Priority 1: city-level local asset
  const cityLocal = resolveLocal(`../assets/images/cities/${stateSlug}/${destSlug}/${variant}.webp`);
  if (cityLocal) return { src: cityLocal, fallbackSrc: BUNDLED_FALLBACKS[destSlug] || BRANDED_PLACEHOLDER };

  // Priority 2: state-level local asset
  const stateLocal = resolveLocal(`../assets/images/states/${stateSlug}/${variant}.webp`);
  if (stateLocal) return { src: stateLocal, fallbackSrc: BUNDLED_FALLBACKS[destSlug] || stateLocal };

  // Priority 3: bundled legacy import (always works)
  const bundled = BUNDLED_FALLBACKS[destSlug] || BUNDLED_FALLBACKS[stateSlug];
  if (bundled) return { src: bundled, fallbackSrc: bundled };

  // Priority 4: Supabase city path (remote fallback)
  if (SUPABASE_STORAGE_BASE) {
    const supabaseSrc = `${SUPABASE_STORAGE_BASE}/cities/${stateSlug}/${destSlug}/${variant}.webp`;
    return { src: supabaseSrc, fallbackSrc: BRANDED_PLACEHOLDER };
  }

  return { src: BRANDED_PLACEHOLDER, fallbackSrc: BRANDED_PLACEHOLDER };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. POPULAR LOCATION IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getPopularLocationImage(stateSlug: string, locationSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    return { src: cmsUrl, fallbackSrc: resolveLocalFallback('location') };
  }
  const localPath = `../assets/images/popular-locations/${stateSlug}/${locationSlug}/${variant}.webp`;
  const local = resolveLocal(localPath);
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/popular-locations/${stateSlug}/${locationSlug}/${variant}.webp`
    : '';
  return {
    src: supabaseSrc || local || resolveLocalFallback('location'),
    fallbackSrc: local || resolveLocalFallback('location'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PACKAGE IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getPackageImage(packageSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    const local = resolveLocal(`../assets/images/packages/${packageSlug}/${variant}.webp`);
    return { src: cmsUrl, fallbackSrc: local || resolveLocalFallback('package') };
  }
  const localPath = `../assets/images/packages/${packageSlug}/${variant}.webp`;
  const local = resolveLocal(localPath);
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/packages/${packageSlug}/${variant}.webp`
    : '';
  return {
    src: supabaseSrc || local || resolveLocalFallback('package'),
    fallbackSrc: local || resolveLocalFallback('package'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. BLOG IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getBlogImage(blogSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    return { src: cmsUrl, fallbackSrc: resolveLocalFallback('blog') };
  }
  const localPath = `../assets/images/blog/${blogSlug}/${variant}.webp`;
  const local = resolveLocal(localPath);
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/blog/${blogSlug}/${variant}.webp`
    : '';
  return {
    src: supabaseSrc || local || resolveLocalFallback('blog'),
    fallbackSrc: local || resolveLocalFallback('blog'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CATEGORY IMAGE
// ─────────────────────────────────────────────────────────────────────────────
export function getCategoryImage(categorySlug: string, cmsUrl?: string): ImageResolution {
  if (cmsUrl && cmsUrl.startsWith('http')) {
    return { src: cmsUrl, fallbackSrc: resolveLocalFallback('category') };
  }
  const localPath = `../assets/images/categories/${categorySlug}/hero.webp`;
  const local = resolveLocal(localPath);
  const supabaseSrc = SUPABASE_STORAGE_BASE
    ? `${SUPABASE_STORAGE_BASE}/categories/${categorySlug}/hero.webp`
    : '';
  return {
    src: supabaseSrc || local || resolveLocalFallback('category'),
    fallbackSrc: local || resolveLocalFallback('category'),
  };
}
