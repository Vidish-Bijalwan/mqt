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
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    tag: "Most Popular",
    packageSlug: "heritage-tours",
  },
  {
    id: "r2",
    title: "Rajasthan Royal Circuit",
    route: "Jaipur → Jodhpur → Jaisalmer → Udaipur",
    duration: "10–12 days",
    ctaLabel: "Get Quote",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
    tag: "Heritage",
    packageSlug: "heritage-tours",
  },
  {
    id: "r3",
    title: "Kerala Backwaters",
    route: "Kochi → Munnar → Thekkady → Alleppey → Kovalam",
    duration: "8–10 days",
    ctaLabel: "Send Enquiry",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
    tag: "Nature",
    packageSlug: "nature-tours",
  },
  {
    id: "r4",
    title: "Himalayan Road Trip",
    route: "Manali → Rohtang → Spiti → Kaza → Kinnaur",
    duration: "12–15 days",
    ctaLabel: "Plan My Trip",
    image: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&q=80&w=800",
    tag: "Adventure",
    packageSlug: "adventure-tours",
  },
  {
    id: "r5",
    title: "Northeast Explorer",
    route: "Guwahati → Shillong → Cherrapunji → Kaziranga",
    duration: "7–10 days",
    ctaLabel: "Check Availability",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=800",
    tag: "Offbeat",
    packageSlug: "nature-tours",
  },
  {
    id: "r6",
    title: "South Temple Trail",
    route: "Chennai → Madurai → Rameswaram → Kanyakumari",
    duration: "8–10 days",
    ctaLabel: "Customize Trip",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    tag: "Pilgrimage",
    packageSlug: "pilgrimage-tours",
  },
  {
    id: "r7",
    title: "Pilgrimage Circuit",
    route: "Varanasi → Prayagraj → Ayodhya → Mathura → Vrindavan",
    duration: "7–9 days",
    ctaLabel: "Talk to Expert",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
    tag: "Spiritual",
    packageSlug: "pilgrimage-tours",
  },
  {
    id: "r8",
    title: "Goa + Karnataka Coast",
    route: "Mumbai → Goa → Hampi → Mysore → Coorg",
    duration: "10–14 days",
    ctaLabel: "Get Itinerary",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    tag: "Beach + Heritage",
    packageSlug: "beach-escapes",
  },
];
