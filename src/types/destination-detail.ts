import type { DestinationData } from "@/types/models";

/** CMS / static destination shape used on listing & detail pages */
export interface DestinationDetail {
  id: string;
  name: string;
  slug: string;
  stateSlug: string;
  state?: string;
  country?: string;
  tagline?: string;
  shortDescription?: string;
  image?: string;
  heroImage?: string;
  altitude?: string;
  bestSeason?: string;
  idealDuration?: string;
  difficulty?: string;
  popularityScore?: number;
  trending?: boolean;
  packagesCount?: number;
  overview?: string[];
  quickFacts?: Array<{ label: string; value: string }>;
  bestTimeToVisit?: unknown[];
  highlights?: unknown[];
  inclusions?: string[];
  exclusions?: string[];
  travelTips?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: string[];
  relatedDestinations?: string[];
  relatedPackageSlugs?: string[];
  relatedBlogSlugs?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
    stay: string;
    meals: string;
  }>;
}

export function toDestinationData(detail: DestinationDetail): DestinationData {
  return detail as unknown as DestinationData;
}
