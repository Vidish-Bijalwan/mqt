// ─────────────────────────────────────────────────────────────────────────────
// Analytics Hook — fires console.log in dev
// To connect GA4: replace the body of `fire()` with gtag("event", name, props)
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";

export type AnalyticsEventName =
  | "package_click"
  | "package_view"
  | "destination_view"
  | "destination_click"
  | "enquiry_open"
  | "enquiry_submit"
  | "whatsapp_click"
  | "filter_used"
  | "sort_changed"
  | "blog_view"
  | "newsletter_signup"
  | "tab_switch"
  | "gallery_open"
  | "scroll_depth"
  | "recently_viewed_click"
  | "trending_badge_seen"
  | "page_view"
  | "social_share"
  | "download_itinerary"
  | "cta_click";

export type AnalyticsEventProps = Record<string, string | number | boolean | null | undefined>;

const isDev = import.meta.env.DEV;

function fire(name: AnalyticsEventName, props?: AnalyticsEventProps): void {
  if (isDev) {
    console.log(`[Analytics] ${name}`, props ?? {});
  }
  // ── Production swap ──────────────────────────────────────────────────────
  // Uncomment and fill your GA4 measurement ID in index.html, then:
  // if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
  //   (window as any).gtag("event", name, props);
  // }
  // ────────────────────────────────────────────────────────────────────────
}

/**
 * useAnalytics — returns a stable `track` function.
 * Call at the top of any component that needs event tracking.
 *
 * @example
 * const { track } = useAnalytics();
 * track("package_click", { slug: pkg.slug, price: pkg.price });
 */
export function useAnalytics() {
  const track = useCallback(
    (name: AnalyticsEventName, props?: AnalyticsEventProps) => {
      fire(name, props);
    },
    []
  );

  return { track };
}

// ── Standalone helper (for use outside React components) ─────────────────────
export { fire as trackEvent };
