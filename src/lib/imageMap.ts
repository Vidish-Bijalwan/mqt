/**
 * MQT Asset Mapping & Resolution Engine
 * 
 * Synchronously maps local images for the React application.
 * Uses Vite's `import.meta.glob` to resolve hashes and verify existence instantly.
 * Any missing image safely trips the fallback logic to prevent UI breakages.
 */

const imageRegistry = import.meta.glob('../assets/images/**/*.{webp,jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>;

export type ImageVariant = 'hero' | 'card' | 'banner' | 'thumbnail' | 'gallery-1' | 'gallery-2' | 'gallery-3';

export interface ImageResolution {
  src: string;
  fallbackSrc: string;
}

const SUPABASE_STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL || 'https://missing.supabase.co'}/storage/v1/object/public/public-assets`;

/** Core Resolver Engine */
function resolveLocalFallback(path: string, fallbackType: string): string {
  if (imageRegistry[path]) {
    return imageRegistry[path];
  }
  
  // Try generic webp fallback if exists, otherwise fallback to our SVG placeholders
  const webpFallback = `../assets/images/placeholders/${fallbackType}-fallback.webp`;
  const svgFallback = `../assets/images/placeholders/${fallbackType}-fallback.svg`;
  const genericSvg = `../assets/images/placeholders/generic-fallback.svg`;

  return imageRegistry[webpFallback] || imageRegistry[svgFallback] || imageRegistry[genericSvg] || '/placeholder.svg';
}

/** 1. States Map */
export function getStateImage(stateSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/states/${stateSlug}/${variant}.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'state');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/states/${stateSlug}/${variant}.webp`;
  return { src, fallbackSrc };
}

/** 2. Cities Map */
export function getCityImage(stateSlug: string, citySlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/cities/${stateSlug}/${citySlug}/${variant}.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'city');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/cities/${stateSlug}/${citySlug}/${variant}.webp`;
  return { src, fallbackSrc };
}

/** 3. Popular Locations Map */
export function getPopularLocationImage(stateSlug: string, locationSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/popular-locations/${stateSlug}/${locationSlug}/${variant}.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'location');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/popular-locations/${stateSlug}/${locationSlug}/${variant}.webp`;
  return { src, fallbackSrc };
}

/** 4. Packages Map */
export function getPackageImage(packageSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/packages/${packageSlug}/${variant}.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'package');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/packages/${packageSlug}/${variant}.webp`;
  return { src, fallbackSrc };
}

/** 5. Blogs Map */
export function getBlogImage(blogSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/blog/${blogSlug}/${variant}.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'blog');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/blog/${blogSlug}/${variant}.webp`;
  return { src, fallbackSrc };
}

/** 6. Standard Category Map */
export function getCategoryImage(categorySlug: string, cmsUrl?: string): ImageResolution {
  const localPath = `../assets/images/categories/${categorySlug}/hero.webp`;
  const fallbackSrc = resolveLocalFallback(localPath, 'category');
  if (cmsUrl && cmsUrl.startsWith('http')) return { src: cmsUrl, fallbackSrc };
  const src = `${SUPABASE_STORAGE_BASE}/categories/${categorySlug}/hero.webp`;
  return { src, fallbackSrc };
}
