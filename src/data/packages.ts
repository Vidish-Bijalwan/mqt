import destKedarnath from "@/assets/dest-kedarnath.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destValleyFlowers from "@/assets/dest-valley-flowers.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";
import destKashmir from "@/assets/dest-kashmir.jpg";
import destManali from "@/assets/dest-manali.jpg";
import destRishikesh from "@/assets/dest-rishikesh.jpg";

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  destination: string;
  state: string;
  country: string;
  type: "domestic" | "international";
  duration: { nights: number; days: number };
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  discountBadge?: string;
  includes: string[];
  categories: string[];
  tags: string[];
  highlights: string[];
  season: string;
  availability: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  packagesCount: number;
}

export const destinations: Destination[] = [
  { id: "1", name: "Kedarnath", slug: "kedarnath", image: destKedarnath, packagesCount: 15 },
  { id: "2", name: "Ladakh", slug: "ladakh", image: destLadakh, packagesCount: 12 },
  { id: "3", name: "Valley of Flowers", slug: "valley-of-flowers", image: destValleyFlowers, packagesCount: 8 },
  { id: "4", name: "Varanasi", slug: "varanasi", image: destVaranasi, packagesCount: 10 },
  { id: "5", name: "Kashmir", slug: "kashmir", image: destKashmir, packagesCount: 18 },
  { id: "6", name: "Manali", slug: "manali", image: destManali, packagesCount: 14 },
  { id: "7", name: "Rishikesh", slug: "rishikesh", image: destRishikesh, packagesCount: 9 },
  { id: "8", name: "Char Dham", slug: "char-dham", image: destKedarnath, packagesCount: 6 },
];

export const tourPackages: TourPackage[] = [
  {
    id: "1",
    title: "Kedarnath Yatra Package",
    slug: "kedarnath-yatra-5-nights-6-days",
    destination: "Kedarnath",
    state: "Uttarakhand",
    country: "India",
    type: "domestic",
    duration: { nights: 5, days: 6 },
    price: 12999,
    originalPrice: 15000,
    rating: 4.9,
    reviewsCount: 124,
    image: destKedarnath,
    badge: "Bestseller",
    discountBadge: "13% Off",
    includes: ["Hotel", "Meals", "Cab", "Guide"],
    categories: ["pilgrimage", "adventure"],
    tags: ["bestseller", "trending"],
    highlights: ["Kedarnath Temple Darshan", "Helicopter Option", "Rishikesh Sightseeing"],
    season: "May–October",
    availability: "Available",
  },
  {
    id: "2",
    title: "Ladakh Adventure Tour",
    slug: "ladakh-adventure-7-nights-8-days",
    destination: "Ladakh",
    state: "Ladakh",
    country: "India",
    type: "domestic",
    duration: { nights: 7, days: 8 },
    price: 24999,
    originalPrice: 30000,
    rating: 4.8,
    reviewsCount: 89,
    image: destLadakh,
    badge: "Trending",
    discountBadge: "17% Off",
    includes: ["Hotel", "Meals", "Cab", "Permits"],
    categories: ["adventure", "solo"],
    tags: ["trending"],
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass"],
    season: "June–September",
    availability: "Available",
  },
  {
    id: "3",
    title: "Kashmir Honeymoon Special",
    slug: "kashmir-honeymoon-5-nights-6-days",
    destination: "Kashmir",
    state: "Jammu & Kashmir",
    country: "India",
    type: "domestic",
    duration: { nights: 5, days: 6 },
    price: 18999,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 156,
    image: destKashmir,
    badge: "Most Popular",
    discountBadge: "14% Off",
    includes: ["Hotel", "Meals", "Cab", "Shikara Ride"],
    categories: ["honeymoon", "luxury"],
    tags: ["bestseller"],
    highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley"],
    season: "Year-round",
    availability: "Available",
  },
  {
    id: "4",
    title: "Valley of Flowers Trek",
    slug: "valley-of-flowers-trek-6-nights-7-days",
    destination: "Valley of Flowers",
    state: "Uttarakhand",
    country: "India",
    type: "domestic",
    duration: { nights: 6, days: 7 },
    price: 15999,
    originalPrice: 19000,
    rating: 4.7,
    reviewsCount: 67,
    image: destValleyFlowers,
    badge: "Seasonal",
    discountBadge: "16% Off",
    includes: ["Camping", "Meals", "Guide", "Permits"],
    categories: ["adventure", "solo"],
    tags: ["seasonal"],
    highlights: ["UNESCO Heritage Site", "Hemkund Sahib", "Alpine Meadows"],
    season: "July–September",
    availability: "Available",
  },
  {
    id: "5",
    title: "Varanasi Spiritual Journey",
    slug: "varanasi-spiritual-3-nights-4-days",
    destination: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    type: "domestic",
    duration: { nights: 3, days: 4 },
    price: 8999,
    originalPrice: 11000,
    rating: 4.8,
    reviewsCount: 203,
    image: destVaranasi,
    discountBadge: "18% Off",
    includes: ["Hotel", "Meals", "Boat Ride", "Guide"],
    categories: ["pilgrimage", "family"],
    tags: ["bestseller"],
    highlights: ["Ganga Aarti", "Kashi Vishwanath", "Sarnath Visit"],
    season: "October–March",
    availability: "Available",
  },
  {
    id: "6",
    title: "Manali Family Adventure",
    slug: "manali-family-4-nights-5-days",
    destination: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    type: "domestic",
    duration: { nights: 4, days: 5 },
    price: 13999,
    originalPrice: 16000,
    rating: 4.6,
    reviewsCount: 142,
    image: destManali,
    discountBadge: "12% Off",
    includes: ["Hotel", "Meals", "Cab", "Activities"],
    categories: ["family", "adventure"],
    tags: ["family-friendly"],
    highlights: ["Solang Valley", "Rohtang Pass", "Old Manali"],
    season: "Year-round",
    availability: "Available",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Rahul Sharma",
    location: "Delhi",
    tour: "Kedarnath Yatra",
    date: "March 2025",
    rating: 5,
    text: "The Kedarnath trip was beyond our expectations. Everything was perfectly organised from the hotel stays to the guided treks. The team was available 24/7 and made us feel completely safe throughout the journey.",
  },
  {
    id: "2",
    name: "Priya Patel",
    location: "Mumbai",
    tour: "Kashmir Honeymoon",
    date: "February 2025",
    rating: 5,
    text: "Our honeymoon in Kashmir was absolutely magical. The houseboat experience, the Shikara ride on Dal Lake, and the snow in Gulmarg — everything was picture perfect. Thank you MyQuickTrippers!",
  },
  {
    id: "3",
    name: "Amit Kumar",
    location: "Bangalore",
    tour: "Ladakh Adventure",
    date: "July 2024",
    rating: 5,
    text: "Ladakh was a dream come true! The itinerary was well-planned with proper acclimatization days. Our guide was incredibly knowledgeable about local culture. Highly recommend for adventure seekers.",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "Best Time to Visit Kedarnath in 2025 — Complete Guide",
    slug: "best-time-to-visit-kedarnath-2025",
    category: "Travel Guide",
    date: "April 10, 2025",
    readTime: "6 min read",
    excerpt: "Planning your Kedarnath yatra? Discover the ideal months, weather conditions, and insider tips to make your pilgrimage unforgettable.",
    image: destKedarnath,
  },
  {
    id: "2",
    title: "Ladakh Travel Guide for First-Time Visitors",
    slug: "ladakh-travel-guide-beginners",
    category: "Trekking Guide",
    date: "March 25, 2025",
    readTime: "8 min read",
    excerpt: "Everything you need to know before your first trip to Ladakh — permits, acclimatization, packing list, and the best routes to explore.",
    image: destLadakh,
  },
  {
    id: "3",
    title: "Valley of Flowers Trek — The Complete Guide",
    slug: "valley-of-flowers-trek-complete-guide",
    category: "Trek Guide",
    date: "March 15, 2025",
    readTime: "7 min read",
    excerpt: "A UNESCO World Heritage Site nestled in the Himalayas, the Valley of Flowers is a once-in-a-lifetime trekking experience. Here's how to plan it.",
    image: destValleyFlowers,
  },
];
