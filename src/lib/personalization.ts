// ─────────────────────────────────────────────────────────────────────────────
// Personalization Engine — localStorage-backed, zero-backend
// ─────────────────────────────────────────────────────────────────────────────

const KEYS = {
  RECENTLY_VIEWED: "mqt_recently_viewed",
  LAST_DESTINATION: "mqt_last_destination",
  PREFILLED_ENQUIRY: "mqt_prefilled_enquiry",
} as const;

const MAX_RECENTLY_VIEWED = 6;

// ── Recently Viewed ──────────────────────────────────────────────────────────

/**
 * Returns array of recently viewed slugs, newest first.
 */
export function getRecentlyViewed(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.RECENTLY_VIEWED);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

/**
 * Adds a slug to recently viewed, removes duplicates, caps at MAX_RECENTLY_VIEWED.
 */
export function addRecentlyViewed(slug: string): void {
  try {
    const current = getRecentlyViewed().filter((s) => s !== slug);
    const updated = [slug, ...current].slice(0, MAX_RECENTLY_VIEWED);
    localStorage.setItem(KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
  } catch {
    // localStorage may be unavailable in SSR/private mode — silent fail
  }
}

/**
 * Clears the recently viewed list.
 */
export function clearRecentlyViewed(): void {
  try {
    localStorage.removeItem(KEYS.RECENTLY_VIEWED);
  } catch {
    /* noop */
  }
}

// ── Last Destination ─────────────────────────────────────────────────────────

export function getLastDestination(): string | null {
  try {
    return localStorage.getItem(KEYS.LAST_DESTINATION);
  } catch {
    return null;
  }
}

export function setLastDestination(slug: string): void {
  try {
    localStorage.setItem(KEYS.LAST_DESTINATION, slug);
  } catch {
    /* noop */
  }
}

// ── Pre-filled Enquiry ───────────────────────────────────────────────────────

export interface PrefilledEnquiry {
  name?: string;
  phone?: string;
  email?: string;
  destination?: string;
  tourType?: string;
}

export function getPrefilledEnquiry(): PrefilledEnquiry {
  try {
    const raw = localStorage.getItem(KEYS.PREFILLED_ENQUIRY);
    if (!raw) return {};
    return JSON.parse(raw) as PrefilledEnquiry;
  } catch {
    return {};
  }
}

export function setPrefilledEnquiry(data: Partial<PrefilledEnquiry>): void {
  try {
    const current = getPrefilledEnquiry();
    const merged = { ...current, ...data };
    localStorage.setItem(KEYS.PREFILLED_ENQUIRY, JSON.stringify(merged));
  } catch {
    /* noop */
  }
}

export function clearPrefilledEnquiry(): void {
  try {
    localStorage.removeItem(KEYS.PREFILLED_ENQUIRY);
  } catch {
    /* noop */
  }
}
