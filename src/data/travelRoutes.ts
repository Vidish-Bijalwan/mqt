export interface TravelRoute {
  id: string;
  title: string;
  route: string;
  duration: string;
  ctaLabel: string;
  image: string;
  tag: string;
  packageSlug?: string;
}

export const travelRoutes: TravelRoute[] = [
  {
    id: "r1",
    title: "Golden Triangle",
    route: "Delhi → Agra → Jaipur",
    duration: "5–7 days",
    ctaLabel: "Get Quote",
    image: "/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg",
    tag: "Most Popular",
    packageSlug: "heritage-tours",
  },
  {
    id: "r2",
    title: "Rajasthan Royal Circuit",
    route: "Jaipur → Jodhpur → Jaisalmer → Udaipur",
    duration: "10–12 days",
    ctaLabel: "Get Quote",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "Heritage",
    packageSlug: "heritage-tours",
  },
  {
    id: "r3",
    title: "Kerala Backwaters",
    route: "Kochi → Munnar → Thekkady → Alleppey → Kovalam",
    duration: "8–10 days",
    ctaLabel: "Send Enquiry",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "Nature",
    packageSlug: "nature-tours",
  },
  {
    id: "r4",
    title: "Himalayan Road Trip",
    route: "Manali → Rohtang → Spiti → Kaza → Kinnaur",
    duration: "12–15 days",
    ctaLabel: "Plan My Trip",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "Adventure",
    packageSlug: "adventure-tours",
  },
  {
    id: "r5",
    title: "Northeast Explorer",
    route: "Guwahati → Shillong → Cherrapunji → Kaziranga",
    duration: "7–10 days",
    ctaLabel: "Check Availability",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "Offbeat",
    packageSlug: "nature-tours",
  },
  {
    id: "r6",
    title: "South Temple Trail",
    route: "Chennai → Madurai → Rameswaram → Kanyakumari",
    duration: "8–10 days",
    ctaLabel: "Customize Trip",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "Pilgrimage",
    packageSlug: "pilgrimage-tours",
  },
  {
    id: "r7",
    title: "Pilgrimage Circuit",
    route: "Varanasi → Prayagraj → Ayodhya → Mathura → Vrindavan",
    duration: "7–9 days",
    ctaLabel: "Talk to Expert",
    image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    tag: "Spiritual",
    packageSlug: "pilgrimage-tours",
  },
  {
    id: "r8",
    title: "Goa + Karnataka Coast",
    route: "Mumbai → Goa → Hampi → Mysore → Coorg",
    duration: "10–14 days",
    ctaLabel: "Get Itinerary",
    image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    tag: "Beach + Heritage",
    packageSlug: "beach-escapes",
  },
];
