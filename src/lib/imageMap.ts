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

/** Core Resolver Engine */
function resolveImage(path: string, fallbackType: string): string {
  if (imageRegistry[path]) {
    return imageRegistry[path];
  }
  
  // Try generic webp fallback if exists, otherwise fallback to our SVG placeholders
  const webpFallback = `../assets/images/placeholders/${fallbackType}-fallback.webp`;
  const svgFallback = `../assets/images/placeholders/${fallbackType}-fallback.svg`;
  const genericSvg = `../assets/images/placeholders/generic-fallback.svg`;

  return imageRegistry[webpFallback] || imageRegistry[svgFallback] || imageRegistry[genericSvg] || '/fallback.svg';
}

/** 1. States Map */
export function getStateImage(stateSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/states/${stateSlug}/${variant}.webp`;
  return resolveImage(path, 'state');
}

/** 2. Cities Map */
export function getCityImage(stateSlug: string, citySlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/cities/${stateSlug}/${citySlug}/${variant}.webp`;
  return resolveImage(path, 'city');
}

/** 3. Popular Locations Map */
export function getPopularLocationImage(stateSlug: string, locationSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/popular-locations/${stateSlug}/${locationSlug}/${variant}.webp`;
  return resolveImage(path, 'location');
}

/** 4. Packages Map */
export function getPackageImage(packageSlug: string, variant: ImageVariant = 'card', cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/packages/${packageSlug}/${variant}.webp`;
  return resolveImage(path, 'package');
}

/** 5. Blogs Map */
export function getBlogImage(blogSlug: string, variant: ImageVariant = 'hero', cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/blog/${blogSlug}/${variant}.webp`;
  return resolveImage(path, 'blog');
}

/** 6. Standard Category Map */
export function getCategoryImage(categorySlug: string, cmsUrl?: string): string {
  if (cmsUrl && cmsUrl.startsWith('http')) return cmsUrl;
  const path = `../assets/images/categories/${categorySlug}/hero.webp`;
  return resolveImage(path, 'category');
}
