import destKedarnath from "@/assets/dest-kedarnath.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destKashmir from "@/assets/dest-kashmir.jpg";
import destManali from "@/assets/dest-manali.jpg";
import destRishikesh from "@/assets/dest-rishikesh.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";
import destValleyFlowers from "@/assets/dest-valley-flowers.jpg";

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
    title: "Honeymoon Packages",
    tagline: "Begin Your Forever Story in the Himalayas",
    heroImage: destKashmir,
    description: [
      "Your honeymoon deserves more than a package tour — it deserves a story. At MyQuickTrippers, we design honeymoon journeys where every moment is curated for romance, privacy, and unforgettable memories. From a moonlit shikara ride on Dal Lake to a candlelit dinner overlooking snow-capped peaks, every detail is thought through.",
      "Our honeymoon packages span India's most romantic destinations — Kashmir's floating houseboats, Manali's snowy peaks, Kerala's backwaters, Andaman's turquoise beaches, and the regal palaces of Rajasthan. We handle all logistics so you can focus entirely on each other.",
    ],
    whoIsItFor: [
      "Newly married couples looking for their first holiday together",
      "Couples celebrating anniversaries or special occasions",
      "Those who prefer privacy, comfort, and personalised attention",
      "Couples who want romance without compromising on scenery and adventure",
    ],
    benefits: [
      { emoji: "💑", title: "Couples-Only Planning", desc: "Your itinerary is designed exclusively for two — no shared group buses, no compromise." },
      { emoji: "🛏", title: "Premium Room Upgrades", desc: "We negotiate honeymoon room upgrades, flower arrangements, and welcome surprises at hotels." },
      { emoji: "🍽", title: "Candlelit Dinners Arranged", desc: "Special romantic dinners arranged at scenic rooftops, beach decks, or by a riverside fire." },
      { emoji: "🚗", title: "Private Car Throughout", desc: "Your own private vehicle — no shared transfers, no strangers sharing your journey." },
      { emoji: "📸", title: "Photography Support", desc: "We connect you with local landscape photographers for professional couple shoots." },
      { emoji: "🌹", title: "Surprise Arrangements", desc: "Honeymoon surprises: rose-petal room decor, lakeview picnics, private sunset experiences." },
    ],
    featuredPackageSlugs: ["kashmir-honeymoon-5-nights-6-days"],
    comparisonHeaders: ["Feature", "Budget Honeymoon", "Standard Honeymoon", "Luxury Honeymoon"],
    comparisonRows: [
      { feature: "Accommodation", values: ["3-star hotel", "4-star hotel / houseboat", "5-star / boutique resort"] },
      { feature: "Transfers", values: ["Shared cab", "Private cab", "Private Innova / luxury SUV"] },
      { feature: "Meals", values: ["Breakfast only", "Breakfast + Dinner", "All meals + room service"] },
      { feature: "Special Surprises", values: ["None", "Cake + flowers", "Full honeymoon décor + candlelight dinner"] },
      { feature: "Price (per couple)", values: ["₹18,000–25,000", "₹30,000–50,000", "₹60,000+"] },
    ],
    faqs: [
      {
        question: "What is the best honeymoon destination in India?",
        answer: "Kashmir (houseboat + Gulmarg), Andaman (beaches), Kerala (backwaters), Rajasthan (palaces), and Manali (mountains) are consistently top-rated. Our most popular honeymoon destination is Kashmir — the combination of a Dal Lake houseboat, Gulmarg snow, and Pahalgam meadows is unmatched for romance.",
      },
      {
        question: "Can you arrange a surprise for my partner?",
        answer: "Absolutely. We specialise in pre-planned surprises: room decoration with rose petals and candles, a surprise cake at dinner, a private shikara arranged with flowers, a personalised welcome note, or a sunset photography session. Just tell us what you have in mind.",
      },
      {
        question: "Is it safe to travel to Kashmir for a honeymoon?",
        answer: "Yes — Kashmir welcomes millions of tourists annually including honeymoon couples. The main tourist areas (Srinagar, Dal Lake, Gulmarg, Pahalgam) are completely safe and well-patrolled. Many couples consider it their best travel experience. We stay connected with our local ground team for real-time safety updates.",
      },
      {
        question: "How far in advance should I book a honeymoon package?",
        answer: "We recommend booking at least 30–60 days in advance for domestic honeymoon packages. Peak season (May–June, September–October, December–January) books up fast — plan 2–3 months ahead. For luxury properties (houseboats, boutique resorts), 60–90 days notice is ideal.",
      },
    ],
    relatedCategories: ["luxury", "family"],
    popularityScore: 95,
  },
  {
    id: "2",
    slug: "family",
    title: "Family Tour Packages",
    tagline: "Memories That Your Family Will Talk About for Years",
    heroImage: destManali,
    description: [
      "Family holidays should create stories that are retold at dining tables for decades. Our family tour packages are designed to balance what everyone wants — adventure for the kids, culture and sightseeing for parents, comfortable hotels and activities for grandparents, and enough flexibility to respond to everyone's energy levels.",
      "We have extensive experience planning multi-generational family trips to Manali, Kashmir, Corbett, Nainital, Coorg, and Rajasthan. We factor in age-appropriate activities, family room configurations, and itineraries that never feel rushed.",
    ],
    whoIsItFor: [
      "Families with children of all ages (we design age-appropriate itineraries)",
      "Multi-generational groups including grandparents",
      "Families looking for a mix of adventure, nature, and culture",
      "Parents planning school holiday trips for 4–8 family members",
    ],
    benefits: [
      { emoji: "👨‍👩‍👧‍👦", title: "Family Room Configuration", desc: "We book connected family rooms, triple rooms, or adjacent rooms to keep your family together." },
      { emoji: "🍱", title: "Child-Friendly Menus", desc: "Restaurants and hotels are pre-screened for child-friendly Indian and continental food options." },
      { emoji: "🎒", title: "Age-Appropriate Activities", desc: "Itineraries are designed for all age groups — no activity is too challenging for seniors or grandparents." },
      { emoji: "🚐", title: "Spacious Vehicles", desc: "Tempo Travellers or large SUVs ensure everyone travels comfortably without luggage crowding." },
      { emoji: "🏨", title: "Vetted Family Hotels", desc: "Only hotels with pools, kids' clubs, and safety-rated rooms are selected for family packages." },
      { emoji: "📋", title: "Zero Stress Planning", desc: "We handle every detail — from meal preferences to inter-city transfers — so parents can truly relax." },
    ],
    featuredPackageSlugs: ["manali-family-4-nights-5-days"],
    comparisonHeaders: ["Feature", "Family Comfort", "Family Premium", "Family Luxury"],
    comparisonRows: [
      { feature: "Accommodation", values: ["3-star family room", "4-star family suite", "5-star resort with family villa"] },
      { feature: "Vehicle", values: ["Innova Crysta (6 pax)", "Tempo Traveller (10 pax)", "Premium Tempo + backup van"] },
      { feature: "Activities", values: ["Standard sightseeing", "Add adventure sports", "Customised daily experiences"] },
      { feature: "Guide", values: ["Local guide", "Private guide throughout", "Dedicated personal guide"] },
      { feature: "Price (per person)", values: ["₹10,000–15,000", "₹18,000–28,000", "₹35,000+"] },
    ],
    faqs: [
      {
        question: "What is the best family destination in North India?",
        answer: "Manali, Shimla, Nainital, Mussoorie, and Corbett are excellent choices. For a longer trip with more variety, Kashmir offers houseboat stays, Gulmarg cable cars, and horse rides that appeal to all ages. Rajasthan (Jaipur, Jodhpur, Jaisalmer) is excellent for families who enjoy history, forts, and safaris.",
      },
      {
        question: "What age is suitable for young children on a Himalayan trip?",
        answer: "Children aged 4+ can comfortably do Manali, Shimla, Nainital, and Kashmir (Srinagar–Gulmarg circuit). For high-altitude destinations like Ladakh (3,500m+) or the Valley of Flowers trek, we recommend age 10+ with proper acclimatisation planning. We always assess your specific family's health and fitness profile before recommending destinations.",
      },
    ],
    relatedCategories: ["honeymoon", "adventure"],
    popularityScore: 88,
  },
  {
    id: "3",
    slug: "pilgrimage",
    title: "Pilgrimage Tours",
    tagline: "Sacred Journeys Planned with Devotion and Care",
    heroImage: destKedarnath,
    description: [
      "Pilgrimage is not just religion — it is one of the oldest forms of purposeful travel, combining devotion, community, challenge, and transformation. MyQuickTrippers has been a trusted partner for thousands of pilgrims visiting Kedarnath, Char Dham, Varanasi, Amarnath, and other sacred circuits since 2019.",
      "We understand that pilgrimage travel requires a different kind of expertise — knowledge of temple timings, darshan protocols, yatra registration procedures, appropriate accommodation near temple precincts, and the physical demands of high-altitude shrines. Our pilgrimage packages are built around these principles.",
    ],
    whoIsItFor: [
      "Devout Hindu pilgrims seeking the major Himalayan and North Indian shrines",
      "Senior citizens and retirees undertaking their lifelong spiritual wish",
      "Families with elderly members who need extra support and care during the yatra",
      "Those seeking the Char Dham Yatra by road or by helicopter",
    ],
    benefits: [
      { emoji: "🛕", title: "Temple Priority Planning", desc: "We time your visits for early-morning darshan before the main crowd arrives — shorter queues, more peaceful experience." },
      { emoji: "📋", title: "Yatra Registration Support", desc: "Complete Char Dham and Amarnath yatra registration handled by our team on your behalf." },
      { emoji: "👵", title: "Senior-Friendly Options", desc: "Pony, palki, doli, and helicopter options for all major shrines — no pilgrim is excluded." },
      { emoji: "🍽", title: "Sattvic Meal Catering", desc: "All meals are pure vegetarian (sattvic) — no onion, garlic where required for observant pilgrims." },
      { emoji: "🏨", title: "Temple-Adjacent Stays", desc: "We book accommodation as close to the temple as possible — minimising morning travel time for darshan." },
      { emoji: "🙏", title: "Puja Arrangements", desc: "Special abhishek, rudrabhishek, and other puja bookings at Kedarnath and Badrinath arranged on request." },
    ],
    featuredPackageSlugs: ["kedarnath-yatra-5-nights-6-days", "varanasi-spiritual-3-nights-4-days"],
    comparisonHeaders: ["Feature", "Budget Pilgrimage", "Standard Pilgrimage", "Premium Pilgrimage"],
    comparisonRows: [
      { feature: "Transport", values: ["Shared cab", "Private cab", "Tempo Traveller with rest stops"] },
      { feature: "Accommodation", values: ["Dharamshala / basic guesthouse", "3-star hotel", "4-star temple-view hotel"] },
      { feature: "Kedarnath trek", values: ["On foot only", "Pony option available", "Pony + helicopter option"] },
      { feature: "Puja", values: ["General queue darshan", "Priority queue assistance", "Special VIP darshan + puja booking"] },
      { feature: "Price (per person)", values: ["₹8,000–12,000", "₹15,000–22,000", "₹28,000–45,000"] },
    ],
    faqs: [
      {
        question: "What is included in a Char Dham Yatra package?",
        answer: "Our standard Char Dham packages include accommodation throughout (10–12 nights), all meals, private vehicle, experienced guide, yatra registration support, and darshan coordination at all four temples. Optional add-ons: helicopter at Kedarnath, special pujas, Haridwar Ganga Aarti evening, Rishikesh stop.",
      },
      {
        question: "Is there a helicopter option for elderly pilgrims for Kedarnath?",
        answer: "Yes. Helicopter services from Phata, Guptkashi, Sirsi, and Agustmuni fly directly to the Kedarnath helipad (within 800m of the temple). One-way tickets range from ₹4,000–5,500/person. Round trip is ₹7,500–10,000. We handle booking via the official Uttarakhand Helicopter portal.",
      },
    ],
    relatedCategories: ["family", "adventure"],
    popularityScore: 92,
  },
  {
    id: "4",
    slug: "adventure",
    title: "Adventure Packages",
    tagline: "Go Beyond the Ordinary — Challenge, Thrill & Discovery",
    heroImage: destLadakh,
    description: [
      "For the adventurous traveller, the Himalayas offer some of the world's most extraordinary experiences — from crossing 5,000m passes in Ladakh to white-water rafting on the Ganga, from a 6-day high-altitude trek to the Valley of Flowers to a daring bungee jump in Rishikesh. Our adventure packages are designed by people who have done these routes themselves.",
      "We believe adventure should be accessible but never compromised on safety. Every adventure package includes proper risk assessment, certified guides, high-quality gear support, and emergency protocols. We do not cut corners on safety.",
    ],
    whoIsItFor: [
      "Trekkers and hikers looking for Himalayan trail experiences",
      "Solo travellers seeking an active, independent adventure",
      "Groups of friends planning a high-energy Himalayan expedition",
      "Thrill-seekers interested in rafting, bungee, paragliding, and mountain biking",
    ],
    benefits: [
      { emoji: "🏔", title: "5,000m+ Himalayan Experiences", desc: "Cross Khardung La (Ladakh), Rohtang Pass (Manali), or high-altitude passes of the Valley of Flowers circuit." },
      { emoji: "🧗", title: "Certified Adventure Guides", desc: "All our adventure guides hold IMF/NIM certifications and have 5+ seasons of experience in their specific domain." },
      { emoji: "🎽", title: "Quality Gear Support", desc: "Trekking poles, sleeping bags, rain gear, and high-altitude camping equipment provided or available at base." },
      { emoji: "🌊", title: "Water Sports Specialists", desc: "Grade 2–5 rafting, kayaking, cliff jumping, and stand-up paddleboarding with certified river safety teams." },
      { emoji: "📡", title: "Emergency Protocols", desc: "Satellite phone, oxygen cylinder backup, and NDRF emergency contact protocols on all high-altitude packages." },
      { emoji: "🏕", title: "Wilderness Camping", desc: "High-altitude camping under the stars with proper tents, sleeping gear, and campfire cook setups." },
    ],
    featuredPackageSlugs: ["ladakh-adventure-7-nights-8-days", "valley-of-flowers-trek-6-nights-7-days"],
    comparisonHeaders: ["Feature", "Weekend Adventure", "7-Day Himalayan", "Expedition"],
    comparisonRows: [
      { feature: "Duration", values: ["2–3 days", "6–8 days", "10–14 days"] },
      { feature: "Altitude", values: ["Up to 2,500m", "Up to 4,500m", "5,000m+"] },
      { feature: "Difficulty", values: ["Easy–Moderate", "Moderate", "Challenging"] },
      { feature: "Camping", values: ["Optional", "2–3 nights", "4–6 nights"] },
      { feature: "Price (per person)", values: ["₹5,000–10,000", "₹18,000–30,000", "₹40,000+"] },
    ],
    faqs: [
      {
        question: "Do I need prior trekking experience for your Himalayan tours?",
        answer: "It depends on the route. Rishikesh, Manali, and Nainital adventure experiences require zero experience. Valley of Flowers and Kedarnath require basic fitness (able to walk 10–15 km/day). Ladakh and Spiti are moderate. High-altitude expeditions (above 5,000m) require documented trekking experience. We assess every group individually.",
      },
      {
        question: "What is the minimum age for adventure packages?",
        answer: "Rafting (Grade 2–3): age 8+. Bungee: age 12, minimum 40kg weight. Paragliding: age 10+. Himalayan treks: age 10+ for moderate, 14+ for challenging. High-altitude expeditions: 16+. We have dedicated family adventure packages designed specifically for younger participants.",
      },
    ],
    relatedCategories: ["solo", "family"],
    popularityScore: 90,
  },
  {
    id: "5",
    slug: "luxury",
    title: "Luxury Packages",
    tagline: "Travel First Class Through India's Most Extraordinary Places",
    heroImage: destKashmir,
    description: [
      "Luxury travel in India is not just about five-star hotels — it is about exclusive access, personalised service, flawless logistics, and experiences that most travellers never get to have. Our luxury packages are crafted for guests who value comfort, privacy, and authenticity in equal measure.",
      "From a private houseboat on Dal Lake (decorated to your specifications) to a luxury tented camp in the Nubra Valley, from a heritage haveli in Jaisalmer to a boutique mountain resort in Manali — we work with the best properties and provide the highest-touch service in the industry.",
    ],
    whoIsItFor: [
      "High-net-worth travellers seeking premium experiences without compromise",
      "Couples and families who want world-class accommodation in extraordinary locations",
      "Corporate incentive groups requiring an impressive group travel experience",
      "International travellers visiting India's iconic Himalayan destinations in luxury",
    ],
    benefits: [
      { emoji: "🏰", title: "Handpicked Luxury Properties", desc: "Only properties rated 4-star and above — Heritage hotels, luxury tented camps, and boutique mountain lodges." },
      { emoji: "👤", title: "Dedicated Trip Manager", desc: "A single point of contact available 24/7 for the duration of your trip — no call menus, no waiting." },
      { emoji: "✈️", title: "Premium Transfers", desc: "Luxury SUVs (Toyota Land Cruiser, Mercedes Viano), private helicopters, and first-class train bookings." },
      { emoji: "🍷", title: "Fine Dining Experiences", desc: "Pre-booked private dinners, rooftop meals with valley views, and exclusive chef's table experiences." },
      { emoji: "🕴", title: "VIP Access & Priority", desc: "Priority darshan at major temples, private museum access, and exclusive local cultural performances." },
      { emoji: "📸", title: "Professional Photography", desc: "Dedicated travel and portrait photographer included in select luxury packages." },
    ],
    featuredPackageSlugs: ["kashmir-honeymoon-5-nights-6-days"],
    comparisonHeaders: ["Feature", "Premium", "Luxury", "Ultra-Luxury"],
    comparisonRows: [
      { feature: "Hotels", values: ["4-star", "5-star / boutique resort", "Heritage palace / private villa"] },
      { feature: "Vehicle", values: ["Innova Crysta", "Toyota Land Cruiser", "Private helicopter + luxury SUV"] },
      { feature: "Guide", values: ["Expert local guide", "Dedicated personal guide", "Historian / cultural expert"] },
      { feature: "Experiences", values: ["Standard itinerary", "Exclusive add-ons", "Fully bespoke daily experiences"] },
      { feature: "Price (per person)", values: ["₹25,000–40,000", "₹50,000–80,000", "₹1,00,000+"] },
    ],
    faqs: [
      {
        question: "What makes MyQuickTrippers luxury packages different?",
        answer: "Our luxury packages are genuinely bespoke — we do not offer off-the-shelf packages with a 'luxury' label. Every detail is designed specifically for you: from which houseboat on Dal Lake (we inspect properties personally) to which restaurant in Manali serves the finest Alpine views at dinner. Our minimum standard is a 4-star property, private vehicle, and dedicated guide throughout.",
      },
      {
        question: "Can you arrange a private Char Dham helicopter yatra?",
        answer: "Yes — we offer a complete private Char Dham Helicopter Yatra with dedicated helicopter (no seat sharing), luxury hotels at each base camp, VIP darshan priority assistance, and a dedicated travel manager accompanying the group. Price starts at ₹2,50,000 per couple for the 2-day circuit.",
      },
    ],
    relatedCategories: ["honeymoon", "family"],
    popularityScore: 82,
  },
  {
    id: "6",
    slug: "solo",
    title: "Solo Travel Packages",
    tagline: "Find Yourself on the Himalayan Trail",
    heroImage: destRishikesh,
    description: [
      "Solo travel is one of the most transformative experiences available — and the Himalayas are the perfect backdrop for self-discovery. Whether you are looking for meditative time in an ashram in Rishikesh, the solitude of a Ladakh road trip, or the company of like-minded travellers on a guided group trek, MyQuickTrippers has built out a complete solo travel programme.",
      "We understand the specific needs of solo travellers — safety, social connection, flexible itineraries, and single-occupancy accommodation at fair prices (we negotiate to eliminate the 'single supplement' wherever possible).",
    ],
    whoIsItFor: [
      "First-time solo travellers looking for structured yet flexible itineraries",
      "Experienced solo backpackers wanting guided access to restricted Himalayan areas",
      "Solo spiritual seekers looking for ashram, meditation, or pilgrimage experiences",
      "Career-break travellers or digital nomads seeking meaningful mountain experiences",
    ],
    benefits: [
      { emoji: "🔒", title: "Solo Safety Protocols", desc: "24/7 contact with our team throughout your trip. Daily check-ins + emergency escalation procedures." },
      { emoji: "👥", title: "Group Departures", desc: "Join our regular group departures to meet fellow solo travellers — most groups become lifelong friend circles." },
      { emoji: "💰", title: "Single-Supplement Free", desc: "We partner with properties that waive the single supplement on most of our solo packages." },
      { emoji: "📱", title: "SIM Card Assistance", desc: "We help solo travellers obtain local SIM cards with data plans before entering remote areas." },
      { emoji: "🏕", title: "Hostel & Camp Options", desc: "Curated network of social hostels and group camps where solo travellers naturally connect." },
      { emoji: "🧭", title: "Flexible Itineraries", desc: "Solo packages allow you to add or drop days, change activities, and self-direct portions of the trip." },
    ],
    featuredPackageSlugs: ["ladakh-adventure-7-nights-8-days", "valley-of-flowers-trek-6-nights-7-days"],
    comparisonHeaders: ["Feature", "Solo Budget", "Solo Standard", "Solo Premium"],
    comparisonRows: [
      { feature: "Accommodation", values: ["Hostel / dorm (solo room)", "3-star hotel single room", "4-star hotel single room"] },
      { feature: "Transport", values: ["Shared cab / public bus", "Private cab with 1–2 others", "Fully private vehicle"] },
      { feature: "Grouping", values: ["Join group departure", "Small group (4–6 pax)", "Fully solo experience"] },
      { feature: "Flexibility", values: ["Fixed itinerary", "Semi-flexible", "Fully customisable"] },
      { feature: "Price (per person)", values: ["₹8,000–14,000", "₹18,000–25,000", "₹30,000+"] },
    ],
    faqs: [
      {
        question: "Is Ladakh safe for solo female travellers?",
        answer: "Yes — Ladakh is widely considered one of the safest destinations in India for solo female travellers. The local culture is respectful and welcoming, the tourism infrastructure is well-developed, and our packages include female guides available on request. We also have solo female travel groups that depart every month in peak season.",
      },
      {
        question: "How do I meet other travellers on a solo trip?",
        answer: "We offer regular group departure dates for solo travellers — these are intimate groups of 4–8 people who share vehicles and accommodation while retaining individual freedom during the trip. Our Rishikesh and Valley of Flowers packages are particularly popular for solo travellers looking to connect with like-minded people.",
      },
    ],
    relatedCategories: ["adventure", "luxury"],
    popularityScore: 78,
  },
  {
    id: "7",
    slug: "weekend",
    title: "Weekend Getaways",
    tagline: "Escape the City. Reset Your Mind. Return Refreshed.",
    heroImage: destRishikesh,
    description: [
      "You do not need 10 days off to experience the Himalayas. Our weekend getaway packages are designed for city dwellers in Delhi, Chandigarh, Dehradun, and Jaipur who want to make maximum use of a 2–3 day holiday without the stress of complex planning.",
      "Rishikesh rafting, Mussoorie weekend, Nainital lake retreat, Bir Billing paragliding, Kasauli wine estate — our weekend packages cover the best short-trip options within 3–6 hours of North India's major cities.",
    ],
    whoIsItFor: [
      "Working professionals and double-income couples with limited annual leave",
      "Groups of friends looking for a quick escape without long planning",
      "Families needing a short break before or after school terms",
      "Those exploring Himalayan destinations for the first time before committing to a longer trip",
    ],
    benefits: [
      { emoji: "⚡", title: "Depart Friday, Return Sunday", desc: "Every package is optimised for the full weekend — depart after work Friday, return by Sunday evening." },
      { emoji: "🚗", title: "Drive from Delhi / Chandigarh", desc: "All our weekend destinations are 3–6 hours by road from Delhi or Chandigarh — no flights needed." },
      { emoji: "📦", title: "Fully Inclusive", desc: "Hotel, transfers, activities, meals — everything in one price. No hidden extras to calculate." },
      { emoji: "✅", title: "Pre-Vetted Properties", desc: "Every hotel is personally inspected — clean, comfortable, with fast WiFi for those who need to stay connected." },
      { emoji: "👥", title: "Private Groups Welcome", desc: "Ideal for groups of 4–8 friends — we customise group weekend packages with bespoke pricing." },
      { emoji: "📅", title: "Regular Departure Dates", desc: "We run fixed weekend departures from Delhi/Chandigarh every weekend — just pick your date and join." },
    ],
    featuredPackageSlugs: [],
    comparisonHeaders: ["Feature", "Rishikesh Weekend", "Manali Express", "Hill Station Escape"],
    comparisonRows: [
      { feature: "Duration", values: ["2 nights", "3 nights", "2 nights"] },
      { feature: "Distance from Delhi", values: ["240 km", "540 km", "120–180 km"] },
      { feature: "Top Activity", values: ["Rafting + Bungee", "Snow + Rohtang", "Trek + Cafe"] },
      { feature: "Vibe", values: ["Adventure + Spiritual", "Mountain + Adventure", "Chill + Nature"] },
      { feature: "Price (per person)", values: ["₹5,500–8,000", "₹9,000–14,000", "₹4,000–7,000"] },
    ],
    faqs: [
      {
        question: "How far is Rishikesh from Delhi?",
        answer: "240 km via the NH-58 highway — approximately 5–6 hours by road. The preferred option is an overnight Volvo bus (departs Delhi at 11 PM, arrives Rishikesh by 5 AM) or an early morning private car departure. We arrange private pickups from any Delhi location.",
      },
      {
        question: "What is the minimum group size for a private weekend getaway?",
        answer: "We accept private weekend bookings for groups of 2 or more. Solo travellers can join our shared-departure weekend groups that depart every Friday–Saturday from Delhi/Chandigarh. Pricing varies by group size — the more you are, the lower the per-person cost.",
      },
    ],
    relatedCategories: ["adventure", "solo"],
    popularityScore: 75,
  },
];

// ── Convenience exports ───────────────────────────────────────────────────────

export function getExperienceCategoryBySlug(slug: string): ExperienceCategory | undefined {
  return experienceCategories.find((c) => c.slug === slug);
}

export function getAllExperienceCategories(): ExperienceCategory[] {
  return [...experienceCategories].sort((a, b) => b.popularityScore - a.popularityScore);
}
