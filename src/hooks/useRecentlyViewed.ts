// ─────────────────────────────────────────────────────────────────────────────
// useRecentlyViewed — React hook wrapping the personalization engine
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { getRecentlyViewed, addRecentlyViewed, clearRecentlyViewed } from "@/lib/personalization";

export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>([]);

  // Hydrate on mount (localStorage is browser-only)
  useEffect(() => {
    setSlugs(getRecentlyViewed());
  }, []);

  const add = useCallback((slug: string) => {
    addRecentlyViewed(slug);
    setSlugs(getRecentlyViewed());
  }, []);

  const clear = useCallback(() => {
    clearRecentlyViewed();
    setSlugs([]);
  }, []);

  return { slugs, add, clear };
}
