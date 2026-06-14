/** Shared SEO constants and helpers for MyQuickTrippers */

export const SITE_URL = "https://www.myquicktrippers.com";
export const SITE_NAME = "MQT — MyQuickTrippers";
export const BRAND_SUFFIX = " | MQT";

export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200";

export const DEFAULT_META_DESCRIPTION =
  "MQT (MyQuickTrippers) — expertly curated India tour packages. Luxury getaways, spiritual journeys, beach escapes & heritage tours. Free quote today.";

export interface FaqItem {
  question: string;
  answer: string;
}

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function resolveImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`);
}

/** Keep title tags under ~60 chars with brand suffix */
export function formatSeoTitle(primary: string, includeBrand = true): string {
  const suffix = includeBrand ? BRAND_SUFFIX : "";
  const maxPrimary = 60 - suffix.length;
  let trimmed = primary.trim();
  if (trimmed.length > maxPrimary) {
    trimmed = trimmed.slice(0, maxPrimary - 1).trimEnd() + "…";
  }
  return includeBrand ? `${trimmed}${suffix}` : trimmed;
}

/** Meta descriptions: 150–160 chars ideal */
export function formatSeoDescription(description: string, max = 160): string {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "MyQuickTrippers",
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    description:
      "Premium curated travel experiences across India — Rajasthan, Kerala, Ladakh, Goa and all states.",
    telephone: "+91-8171158569",
    email: "info@myquicktrippers.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    priceRange: "₹₹",
  };
}

export function combineSchemas(...schemas: object[]): string {
  return JSON.stringify(schemas);
}

/** Voice-search friendly package FAQs (40–60 word answers) */
export function buildPackageFaqs(
  title: string,
  destination: string,
  days: number,
  price: number,
  includes: string[],
  highlights: string[]
): FaqItem[] {
  const includesText =
    includes.slice(0, 4).join(", ") || "accommodation, transport, and guided sightseeing";
  const highlightsText =
    highlights.slice(0, 3).join(", ") || `key experiences in ${destination}`;

  return [
    {
      question: `What is included in the ${title} package?`,
      answer: `Your ${title} includes ${includesText}, plus curated activities such as ${highlightsText}. MQT coordinates hotels, transfers, and on-ground support so you travel stress-free.`,
    },
    {
      question: `How many days are enough for ${destination}?`,
      answer: `This itinerary is ${days} days, ideal for covering ${destination} comfortably without rushing. Need more time? MQT can extend stays or add nearby destinations on request.`,
    },
    {
      question: `What is the price of the ${title}?`,
      answer: `Packages start from ₹${price.toLocaleString("en-IN")} per person (season and group size may vary). Request a free customised quote from MyQuickTrippers for exact pricing and inclusions.`,
    },
    {
      question: `What is the best time to visit ${destination}?`,
      answer: `Season depends on your experience—snow, festivals, or pleasant weather. Share your travel month with MQT and we will recommend the ideal window and route for ${destination}.`,
    },
    {
      question: `Is it safe to book ${destination} tours with MyQuickTrippers?`,
      answer: `Yes. MQT uses verified partners, 24/7 trip support, and real-time assistance on active routes. Our Meerut-based team has curated Himalayan and pan-India journeys for 500+ travellers.`,
    },
  ];
}
