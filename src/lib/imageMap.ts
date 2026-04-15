/**
 * MQT Asset Mapping & Resolution Engine v3.0 (Dynamic CMS Version)
 *
 * Fast, lightweight resolution of image URLs pointing directly to Supabase.
 * No eager loading, no massive local asset dependencies.
 */

export type ImageVariant = 'hero' | 'card' | 'banner' | 'thumbnail' | 'gallery-1' | 'gallery-2' | 'gallery-3';

export interface ImageResolution {
  src: string;
  fallbackSrc: string;
}

const BRANDED_PLACEHOLDER = '/placeholder.svg';

const resolve = (cmsUrl?: string): ImageResolution => {
  if (cmsUrl && (cmsUrl.startsWith('http') || cmsUrl.startsWith('/') || cmsUrl.startsWith('data:'))) {
    return { src: cmsUrl, fallbackSrc: BRANDED_PLACEHOLDER };
  }
  return { src: BRANDED_PLACEHOLDER, fallbackSrc: BRANDED_PLACEHOLDER };
};

export function getStateImage(_stateSlug: string, _variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getCityImage(_stateSlug: string, _citySlug: string, _variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getDestinationImage(_destSlug: string, _variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getPopularLocationImage(_stateSlug: string, _locationSlug: string, _variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getPackageImage(_packageSlug: string, _variant: ImageVariant = 'card', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getBlogImage(_blogSlug: string, _variant: ImageVariant = 'hero', cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}

export function getCategoryImage(_categorySlug: string, cmsUrl?: string): ImageResolution {
  return resolve(cmsUrl);
}
