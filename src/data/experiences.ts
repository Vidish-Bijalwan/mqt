export interface ExperienceBenefit {
  emoji: string;
  title: string;
  desc: string;
}

export interface ExperienceComparisonRow {
  feature: string;
  values: string[];
}

export interface ExperienceCategory {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  description: string[];
  whoIsItFor: string[];
  benefits: ExperienceBenefit[];
  featuredPackageSlugs: string[];
  comparisonHeaders: string[];
  comparisonRows: ExperienceComparisonRow[];
  faqs: { question: string; answer: string }[];
  relatedCategories: string[];
  popularityScore: number;
}

export const experienceCategories: ExperienceCategory[] = [
  {
    id: "1",
    slug: "honeymoon",
    title: "Honeymoon Journeys",
    tagline: "Begin Your Forever Story in Incredible India",
    heroImage: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    description: [
      "Your honeymoon deserves more than a package tour — it deserves a story. At MyQuickTrippers, we design honeymoon journeys where every moment is curated for romance, privacy, and unforgettable memories. From a moonlit shikara ride on Dal Lake to a tropical villa in the Andamans, every detail is meticulously planned.",
      "Our honeymoon packages span India's most romantic destinations — Kerala's serene backwaters, the pristine beaches of Goa and Lakshadweep, the regal palaces of Rajasthan, and the snowy peaks of Kashmir. We handle all logistics so you can focus entirely on each other."
    ],
    whoIsItFor: [
      "Newly married couples looking for their first holiday together",
      "Couples celebrating anniversaries or special occasions",
      "Those who prefer privacy, luxury, and personalised attention"
    ],
    benefits: [
      { emoji: "💑", title: "Couples-Only Planning", desc: "Your itinerary is designed exclusively for two — no shared group buses, no compromise." },
      { emoji: "🛏", title: "Premium Room Upgrades", desc: "We negotiate honeymoon room upgrades, flower arrangements, and welcome surprises." },
      { emoji: "🍽", title: "Candlelit Dinners", desc: "Special romantic dinners arranged at scenic rooftops, beach decks, or lakeside." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: ["Feature", "Premium Honeymoon", "Luxury Escape"],
    comparisonRows: [
      { feature: "Accommodation", values: ["4-star boutique", "5-star luxury / private pool villa"] },
      { feature: "Transfers", values: ["Private premium sedan", "Luxury SUV / private speedboats"] }
    ],
    faqs: [
      { question: "What is the best honeymoon destination in India?", answer: "Kerala backwaters, Andaman beaches, Rajasthan palaces, and Kashmir snowscapes are consistently top-rated." }
    ],
    relatedCategories: ["luxury", "beach-escapes"],
    popularityScore: 95
  },
  {
    id: "2",
    slug: "family",
    title: "Family Holidays",
    tagline: "Memories That Your Family Will Talk About for Years",
    heroImage: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    description: [
      "Family holidays should create stories that are retold at dining tables for decades. Our family tour packages are designed to balance what everyone wants — adventure for the kids, culture and leisure for parents, and comfortable pacing for grandparents.",
      "We have extensive experience planning multi-generational family trips across India. Whether it's exploring the heritage of Rajasthan, cruising the backwaters of Kerala, or enjoying the cool climes of Ooty and Munnar, we ensure seamless execution."
    ],
    whoIsItFor: [
      "Multi-generational families traveling with grandparents and children",
      "Parents looking for child-friendly resorts and activities",
      "Extended family groups celebrating reunions"
    ],
    benefits: [
      { emoji: "👨‍👩‍👧", title: "Kid-Friendly Activities", desc: "We ensure itineraries have engaging activities for younger travellers." },
      { emoji: "🏨", title: "Family Suites & Interconnected Rooms", desc: "We prioritise properties that comfortably accommodate larger family units." },
      { emoji: "🚑", title: "24/7 Support", desc: "Our ground team is always reachable for absolute peace of mind." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["heritage-trails", "wildlife-retreats"],
    popularityScore: 92
  },
  {
    id: "3",
    slug: "beach-escapes",
    title: "Beach Escapes",
    tagline: "Sun, Sand, and Serenity Across India's Coastlines",
    heroImage: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    description: [
      "From the vibrant beach shacks of North Goa to the secluded white sands of the Andaman and Nicobar Islands, India's coastline offers unparalleled tropical escapes. We curate beach holidays focusing on relaxation, water sports, and seaside luxury.",
      "Whether you want a private snorkeling expedition in Lakshadweep or a lively sunset cruise in Goa, our coastal packages guarantee the perfect maritime getaway."
    ],
    whoIsItFor: [
      "Couples seeking tropical romantic getaways",
      "Friends looking for water sports, nightlife, and beach leisure",
      "Anyone wanting to disconnect by the ocean"
    ],
    benefits: [
      { emoji: "🏖", title: "Ocean-View Properties", desc: "Guaranteed sea-facing rooms or private beachfront villas." },
      { emoji: "🤿", title: "Managed Water Sports", desc: "Pre-booked scuba diving, snorkeling, and surfing with certified PADI instructors." },
      { emoji: "⛵", title: "Private Charters", desc: "Access to private yachts and sunset catamaran cruises." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["luxury", "honeymoon"],
    popularityScore: 90
  },
  {
    id: "4",
    slug: "heritage-trails",
    title: "Heritage Trails",
    tagline: "Step Back in Time and Experience India's Royal Legacy",
    heroImage: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    description: [
      "India's history is written in its grand forts, magnificent palaces, and ancient temple cities. Our Heritage Trails take you through the architectural marvels of Rajasthan, the Mughal grandeur of Agra, and the Dravidian temple complexes of South India.",
      "Experience royal hospitality by staying in authentic converted palaces and taking guided tours with expert local historians who bring centuries-old stories to life."
    ],
    whoIsItFor: [
      "History enthusiasts and architecture lovers",
      "Travellers wanting to experience royal Indian hospitality",
      "Cultural explorers seeking deep immersion"
    ],
    benefits: [
      { emoji: "🏰", title: "Palace Stays", desc: "Experience luxury living in restored historical havelis and royal properties." },
      { emoji: "📜", title: "Expert Historians", desc: "Guided tours by verified historians, not just standard tour guides." },
      { emoji: "🎭", title: "Cultural Immersion", desc: "Exclusive access to folk performances, traditional crafts, and royal dining." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["luxury", "family"],
    popularityScore: 88
  },
  {
    id: "5",
    slug: "wildlife-retreats",
    title: "Wildlife Retreats",
    tagline: "Into the Wild: Tigers, Elephants, and Incredible Biodiversity",
    heroImage: "/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg", // Jungle safari
    description: [
      "India is home to some of the world's most spectacular wildlife. From tracing the Bengal Tiger in Ranthambore and Bandhavgarh to witnessing the one-horned rhinoceros in Kaziranga, our wildlife retreats immerse you deep in nature safely and comfortably.",
      "We partner with eco-conscious safari lodges and experienced naturalists to ensure every game drive is educational, respectful of the ecosystem, and completely unforgettable."
    ],
    whoIsItFor: [
      "Nature lovers and wildlife photography enthusiasts",
      "Families seeking educational and thrilling vacations",
      "Travellers wanting to escape urban landscapes"
    ],
    benefits: [
      { emoji: "🐅", title: "Guaranteed Safari Bookings", desc: "We secure core-zone safari permits months in advance." },
      { emoji: "🌿", title: "Eco-Luxury Lodges", desc: "Stay in premium tented camps and lodges situated right on the park borders." },
      { emoji: "🔭", title: "Expert Naturalists", desc: "Every safari is accompanied by a highly experienced tracker to maximize sightings." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["adventure", "family"],
    popularityScore: 85
  },
  {
    id: "6",
    slug: "luxury",
    title: "Luxury Getaways",
    tagline: "Uncompromised Elegance and Bespoke Service Across India",
    heroImage: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg", // Luxury pool/hotel
    description: [
      "For those who demand the absolute best, our luxury travel packages offer elite experiences across India's most prestigious properties. We manage every detail seamlessly, leaving you to experience pure relaxation.",
      "From a chartered houseboat in Kerala to a private villa overlooking the Aravalli hills, we provide VIP fast-track transfers, exclusive dining, and uncompromising comfort at every step."
    ],
    whoIsItFor: [
      "High-net-worth individuals requiring absolute privacy",
      "Travellers seeking premium relaxation without compromise",
      "International guests wanting an elite Indian experience"
    ],
    benefits: [
      { emoji: "👑", title: "Elite Property Selection", desc: "Only Taj, Oberoi, Leela, and elite luxury boutique properties." },
      { emoji: "🚁", title: "Private Transfers", desc: "Chauffeur-driven luxury vehicles and private charter assistance." },
      { emoji: "🛎", title: "Personal Concierge", desc: "A dedicated 24/7 travel manager tracking your entire journey seamlessly." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["honeymoon", "heritage-trails"],
    popularityScore: 89
  },
  {
    id: "7",
    slug: "pilgrimage",
    title: "Pilgrimage Tours",
    tagline: "Sacred Journeys and Spiritual Connections",
    heroImage: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg", // Varanasi
    description: [
      "India is the spiritual heart of the world. Our pilgrimage tours handle all the complex logistics of visiting major shrines, allowing you and your elders to focus entirely on devotion.",
      "From the high-altitude Kedarnath yatra to the serene aartis of Varanasi, from Tirupati darshans to the ancient circuits of South India, we ensure comfortable stays, VIP darshan passes, and verified guides."
    ],
    whoIsItFor: [
      "Devout pilgrims seeking seamless spiritual journeys",
      "Elderly travellers requiring comfortable, supportive logistics",
      "Those looking to experience India's ancient temple cultures"
    ],
    benefits: [
      { emoji: "📿", title: "VIP Darshan Logistics", desc: "We assist in securing special entry passes where permissible to avoid long queues." },
      { emoji: "🧘", title: "Senior Citizen Support", desc: "Prioritized ground-floor rooms, porter assistance, and comfortable transport." },
      { emoji: "🕉", title: "Verified Local Pandits", desc: "We connect you with authentic local priests for special pujas." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["family", "heritage-trails"],
    popularityScore: 94
  },
  {
    id: "8",
    slug: "adventure",
    title: "Adventure Tours",
    tagline: "Thrilling Expeditions Across India's Dramatic Landscapes",
    heroImage: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg", // Mountains/Adventure
    description: [
      "For the adrenaline seekers, India offers extraordinary experiences — from crossing high-altitude passes in Ladakh to surfing the waves in Goa, and white-water rafting in Rishikesh.",
      "We believe adventure should be challenging but never compromised on safety. Every adventure package includes proper risk assessment, certified guides, high-quality gear, and strict emergency protocols."
    ],
    whoIsItFor: [
      "Thrill-seekers craving active and extreme experiences",
      "Groups of friends looking for high-energy trips",
      "Nature enthusiasts eager to explore rugged terrain safely"
    ],
    benefits: [
      { emoji: "🧗", title: "Certified Adventure Guides", desc: "All adventure guides hold verifiable certifications in their specific domain." },
      { emoji: "🎽", title: "Quality Gear Support", desc: "Only top-tier, safety-checked equipment used for all activities." },
      { emoji: "📡", title: "Emergency Protocols", desc: "Strict safety measures and swift medical protocols on all demanding routes." }
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: [],
    comparisonRows: [],
    faqs: [],
    relatedCategories: ["wildlife-retreats", "beach-escapes"],
    popularityScore: 87
  }
];
