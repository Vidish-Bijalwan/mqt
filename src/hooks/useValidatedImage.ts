/**
 * useValidatedImage – React hook for deterministic, crash-safe image rendering.
 *
 * Usage:
 *   const { src, onError } = useValidatedImage(pkg.image, pkg.slug);
 *   <img src={src} onError={onError} alt={pkg.title} />
 *
 * Priority chain:
 *   1. `primarySrc` (image from packages.ts / DB)
 *   2. TOURISM_FALLBACKS[slug] — deterministic map lookup
 *   3. `/images/placeholder.svg` — graceful final fallback
 */

import { useState, useCallback } from 'react';

const PLACEHOLDER = '/images/placeholder.svg';

import { TOURISM_FALLBACKS } from '@/lib/imageMap';

export function useValidatedImage(primarySrc?: string | null, slug?: string) {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  // Determine the current best src
  const getActiveSrc = useCallback(() => {
    // 1. Try primary
    if (primarySrc && !failedSrcs.has(primarySrc)) return primarySrc;

    // 2. Fallback from slug map
    if (slug) {
      const normalized = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const slugFallback = TOURISM_FALLBACKS[normalized];
      if (slugFallback && !failedSrcs.has(slugFallback)) return slugFallback;
    }

    // 3. Final: placeholder
    return PLACEHOLDER;
  }, [primarySrc, slug, failedSrcs]);

  const onError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const failedSrc = e.currentTarget.src;
    setFailedSrcs(prev => {
      if (prev.has(failedSrc)) return prev;
      const next = new Set(prev);
      next.add(failedSrc);
      return next;
    });
  }, []);

  return { src: getActiveSrc(), onError };
}
