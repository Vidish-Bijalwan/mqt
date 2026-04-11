import destKedarnath from "@/assets/dest-kedarnath.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destKashmir from "@/assets/dest-kashmir.jpg";
import destManali from "@/assets/dest-manali.jpg";
import destRishikesh from "@/assets/dest-rishikesh.jpg";
import destValleyFlowers from "@/assets/dest-valley-flowers.jpg";

export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
}

export interface BlogContentSection {
  type: "heading" | "paragraph" | "list" | "tip_box" | "callout";
  content: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: BlogContentSection[];
  relatedPackageSlugs: string[];
  relatedDestinationSlugs: string[];
  relatedBlogSlugs: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "best-time-to-visit-kedarnath-2025",
    title: "Best Time to Visit Kedarnath in 2025 — Complete Guide",
    metaDescription: "Plan your Kedarnath yatra with this complete guide to the ideal months, weather conditions, crowd levels, and insider tips for 2025.",
    category: "Travel Guide",
    tags: ["Kedarnath", "Pilgrimage", "Uttarakhand", "Himalayan travel"],
    author: { name: "Arjun Negi", role: "Kedarnath Specialist", initials: "AN" },
    date: "April 10, 2025",
    readTime: "6 min read",
    image: destKedarnath,
    excerpt: "Planning your Kedarnath yatra? Discover the ideal months, weather conditions, and insider tips to make your pilgrimage unforgettable.",
    featured: true,
    content: [
      { type: "paragraph", content: "Kedarnath — one of the twelve Jyotirlingas and part of the revered Char Dham circuit — opens its doors for pilgrims typically in late April or May and closes before Diwali. Choosing the right time to visit is crucial, as the weather and crowd conditions vary dramatically across the season." },
      { type: "heading", content: "Season Overview: When Does Kedarnath Open?" },
      { type: "paragraph", content: "The Kedarnath Temple opens on Akshaya Tritiya (late April to early May) and closes on Bhai Dooj (approximately 14 days after Diwali, typically in November). The exact dates are announced by the Badrinath-Kedarnath Temple Committee (BKTC) every year. The 2025 opening date has been announced for May 2, 2025." },
      { type: "heading", content: "May–June: The Peak Yatra Season" },
      { type: "paragraph", content: "May and June represent the most popular time to visit Kedarnath — and for good reason. The weather is at its most clement (8–18°C at 3,583m), the trek route is fully clear of snow, and the energy of thousands of fellow pilgrims creates an atmosphere of collective devotion that is deeply moving. However, this is also when crowds are at their densest — up to 20,000+ pilgrims per day in peak May–June. Book accommodation 2–3 months in advance." },
      { type: "tip_box", content: "Pro Tip: Arrive at Gaurikund by 4 AM to start the trek early — completing it before 11 AM avoids the worst midday congestion and gives you the best weather window." },
      { type: "heading", content: "July–August: Monsoon Season — Proceed with Caution" },
      { type: "paragraph", content: "The monsoon season brings significant rainfall to Uttarakhand. While rain can make the trek route slippery and increase the risk of landslides on the access roads, the monsoon season has an otherworldly beauty — misty valleys, rushing waterfalls, and dramatic cloud formations around the peaks. Pilgrims who visit in August often report the journey to be more spiritually intense due to its challenges. Keep flexible days in your itinerary as route closures are possible." },
      { type: "heading", content: "September–October: The Hidden Gem Season" },
      { type: "paragraph", content: "September through October is arguably the best time to visit Kedarnath for those who have flexibility. The monsoon has retreated, leaving the air crystal clear with stunning visibility of Kedarnath Peak (6,940m), Thalay Sagar, and Bhrigupanth. Crowds are 40–50% lower than peak summer, accommodation is readily available, and the post-monsoon colours of the Himalayan vegetation are spectacular. November brings the risk of early snowfall and the eventual closure of the temple." },
      { type: "heading", content: "What to Pack for Kedarnath" },
      { type: "list", content: "Essential packing list:", items: ["Warm fleece or down jacket (mandatory — even in summer, nights dip to 2–5°C)", "Waterproof trekking shoes (the trek path can be wet and muddy)", "Rain poncho (essential for June–September visits)", "Trekking poles (knee support on the steep descent)", "UV-protection sunscreen SPF 50+ (high-altitude UV exposure is intense)", "Torch / headlamp with extra batteries", "Personal medications and a basic first-aid kit", "Sufficient cash (no ATMs at Kedarnath, last ATM at Guptkashi)"] },
      { type: "callout", content: "At MyQuickTrippers, we organise Kedarnath packages from May to October with different departure dates to match your preferred season. All packages include local guide, accommodation, meals, and transport from Haridwar/Rishikesh." },
    ],
    relatedPackageSlugs: ["kedarnath-yatra-5-nights-6-days"],
    relatedDestinationSlugs: ["kedarnath", "char-dham"],
    relatedBlogSlugs: ["char-dham-yatra-complete-planning-guide", "how-to-plan-kedarnath-badrinath-pilgrimage"],
  },
  {
    id: "2",
    slug: "ladakh-travel-guide-beginners",
    title: "Ladakh Travel Guide for First-Time Visitors — Everything You Need to Know",
    metaDescription: "Complete Ladakh travel guide for first-time visitors: permits, acclimatisation, best routes, packing list, and essential tips for an epic Ladakh trip.",
    category: "Trekking Guide",
    tags: ["Ladakh", "Adventure", "Himalayan trek", "India travel"],
    author: { name: "Rohan Kapoor", role: "Ladakh Adventure Specialist", initials: "RK" },
    date: "March 25, 2025",
    readTime: "8 min read",
    image: destLadakh,
    excerpt: "Everything you need to know before your first trip to Ladakh — permits, acclimatisation, packing list, and the best routes to explore.",
    featured: false,
    content: [
      { type: "paragraph", content: "Ladakh is not just a destination — it is a test of how open you are to having your understanding of beautiful places completely rewritten. The stark, moon-like landscape, the 5,000m passes, the turquoise lakes, and the ancient monasteries perched on impossible cliffs will leave you permanently altered." },
      { type: "heading", content: "How to Reach Ladakh" },
      { type: "paragraph", content: "By Air: The fastest and most recommended option. Flights operate from Delhi, Chandigarh, Srinagar, and Mumbai to Kushok Bakula Rimpochee Airport in Leh. Flight time from Delhi: 1.5 hours. Flights are spectacular — on a clear day, the view of the Himalayas and Karakoram from the plane is extraordinary." },
      { type: "paragraph", content: "By Road option 1 — Manali-Leh Highway (490 km): Open approximately June to September. A 2-day road journey crossing 5 high passes: Rohtang La, Baralacha La, Lachulung La, Nakee La, and Tanglang La. The landscape transition from green Kullu Valley to barren Ladakhi moonscape is breathtaking." },
      { type: "heading", content: "The Single Most Important Ladakh Rule: Acclimatise" },
      { type: "paragraph", content: "When you fly into Leh (3,524m), your body has gone from sea level to over 3,500m in 90 minutes. Altitude sickness (Acute Mountain Sickness — AMS) is a real risk. The solution is simple: rest on arrival day. Do not trek, do not exercise, do not carry heavy luggage. Drink plenty of water. Sleep. Explore only the Leh market in the evening on Day 1. This is non-negotiable for a safe Ladakh trip." },
      { type: "tip_box", content: "Acclimatisation Day Rule: Always spend minimum 2 nights in Leh city (3,524m) before proceeding to higher destinations like Pangong (4,350m) or Nubra (3,048m)." },
      { type: "heading", content: "Permits Required for Ladakh" },
      { type: "list", content: "Permit requirements for Indian nationals:", items: ["Leh city: No permit required", "Nubra Valley (Khardung La → Hunder): Inner Line Permit (ILP)", "Pangong Tso (via Chang La): Inner Line Permit (ILP)", "Tso Moriri: Inner Line Permit (ILP)", "Dah-Hanu: Protected Area Permit (PAP)", "Note: Foreign nationals need PAP for most areas outside Leh city"] },
      { type: "paragraph", content: "ILPs are issued online via the Leh district website or physically at the DC office in Leh. Processing takes 30 minutes to 1 hour. We arrange all permits for our guests." },
      { type: "heading", content: "What to Pack for Ladakh" },
      { type: "list", content: "Essential Ladakh packing list:", items: ["Warm layers (down jacket — even in July, nights at Pangong are 5°C)", "Sunscreen SPF 50+ (UV radiation is intense at high altitude)", "Sunglasses with UV protection (snow blindness risk)", "Good trekking or sports shoes (not sandals — terrain is rocky)", "Sufficient cash (ATMs in Leh only, card machines rare beyond city)", "Offline maps (Google Maps with Ladakh downloaded)", "Basic medicines: Diamox (ask your doctor), Dolo 650, ORS sachets", "Water bottle (stay hydrated — 3L/day minimum at altitude)"] },
      { type: "callout", content: "Ready to explore Ladakh? Our Ladakh Adventure Tour (7 nights, 8 days) covers Leh, Nubra Valley, and Pangong Tso with all permits, private vehicle, and experienced guide included." },
    ],
    relatedPackageSlugs: ["ladakh-adventure-7-nights-8-days"],
    relatedDestinationSlugs: ["ladakh"],
    relatedBlogSlugs: ["manali-in-december-is-it-worth-it", "rishikesh-adventure-activities-full-guide"],
  },
  {
    id: "3",
    slug: "valley-of-flowers-trek-complete-guide",
    title: "Valley of Flowers Trek — The Complete Guide for 2025",
    metaDescription: "Everything about the Valley of Flowers trek: route, difficulty, best time, what flowers bloom, and how to plan your UNESCO World Heritage trek in 2025.",
    category: "Trek Guide",
    tags: ["Valley of Flowers", "Trekking", "Uttarakhand", "UNESCO"],
    author: { name: "Priya Thakur", role: "Trek & Nature Specialist", initials: "PT" },
    date: "March 15, 2025",
    readTime: "7 min read",
    image: destValleyFlowers,
    excerpt: "A UNESCO World Heritage Site nestled in the Himalayas, the Valley of Flowers is a once-in-a-lifetime trekking experience. Here's how to plan it.",
    featured: false,
    content: [
      { type: "paragraph", content: "Imagine walking through a valley so spectacular that the British mountaineer Frank Smythe, who discovered it in 1931, returned to write an entire book about it. The Valley of Flowers is a 87 sq km basin in the Chamoli district of Uttarakhand that transforms, during the monsoon season, into one of the most extraordinary natural spectacles on Earth." },
      { type: "heading", content: "Why the Valley of Flowers is Special" },
      { type: "paragraph", content: "The valley is a UNESCO World Heritage Site (since 2005), home to 500+ species of wildflowers including many rare and endemic Himalayan species. The combination of its UNESCO status, the adjacent Hemkund Sahib pilgrimage, and the extraordinary biodiversity at high altitude makes this one of the most unique trek destinations in the world — and yet it remains surprisingly accessible even for moderate fitness levels." },
      { type: "heading", content: "Best Time to Visit: July–September" },
      { type: "paragraph", content: "The valley is open from July 1 to October 31 each year. The peak bloom is between late July and late August — this is when the maximum diversity of flowers is visible simultaneously. The early July window catches the first blooms. September has fewer flowers but dramatically clearer skies. The valley is closed from November to June (under snow)." },
      { type: "heading", content: "Trek Route and Difficulty" },
      { type: "list", content: "The trek breakdown:", items: ["Govindghat → Pulna: Drive 4 km (if road is open) or 4 km walk", "Pulna → Ghangaria: 9 km trek, 3–4 hours, moderate ascent along Pushpawati River gorge", "Ghangaria → Valley of Flowers entry: 3 km trek, 1 hour, gentle terrain", "Valley exploration: up to 5 km inside the valley (no camping allowed)", "Optional: Ghangaria → Hemkund Sahib: 6 km, 3–4 hours, steep ascent to 4,329m"] },
      { type: "tip_box", content: "Naturalist Guide Tip: Hire a certified naturalist guide from Ghangaria for your Valley day — they can identify the rare species and know exactly where the rarest flowers (Brahma Kamal, Blue Poppy) are blooming on any given day." },
      { type: "heading", content: "Flowers You Will See" },
      { type: "list", content: "Common flowers in peak bloom (July–August):", items: ["Brahma Kamal (Saussurea obvallata) — state flower of Uttarakhand", "Himalayan Blue Poppy (Meconopsis aculeata)", "Cobra Lily (Arisaema)", "Himalayan Edelweiss", "Marsh Marigold (Caltha palustris)", "Geranium, Potentilla, Primula, Aconitum", "Himalayan Orchids (multiple species)"] },
      { type: "callout", content: "Our Valley of Flowers Trek Package (6 nights, 7 days) includes naturalist guide, all accommodation, meals, National Park permits, and porter service from Haridwar/Rishikesh." },
    ],
    relatedPackageSlugs: ["valley-of-flowers-trek-6-nights-7-days"],
    relatedDestinationSlugs: ["valley-of-flowers", "kedarnath"],
    relatedBlogSlugs: ["best-time-to-visit-kedarnath-2025", "rishikesh-adventure-activities-full-guide"],
  },
  {
    id: "4",
    slug: "kashmir-honeymoon-houseboat-to-gulmarg",
    title: "Kashmir Honeymoon Trip: From Dal Lake Houseboat to Gulmarg Snow",
    metaDescription: "Complete Kashmir honeymoon guide: ideal itinerary, best houseboats, Gulmarg activities, what to expect, and how to plan a perfect romantic trip to Kashmir.",
    category: "Honeymoon Guide",
    tags: ["Kashmir", "Honeymoon", "Dal Lake", "Gulmarg"],
    author: { name: "Sakshi Mehra", role: "Destination Wedding & Honeymoon Specialist", initials: "SM" },
    date: "February 20, 2025",
    readTime: "7 min read",
    image: destKashmir,
    excerpt: "Kashmir honeymoon trip complete guide — houseboat selection, Gulmarg gondola, Pahalgam valleys, and the most romantic experiences in the Valley.",
    featured: true,
    content: [
      { type: "paragraph", content: "If there is one destination that turns newly married couples into lifelong travellers, it is Kashmir. The Valley is not just visually extraordinary — it is sensory poetry. The smell of chinar wood burning, the sound of a shikara paddle on glassy water, the sight of Gulmarg meadow stretching to snow-capped peaks at 3,980m — these are not things you forget." },
      { type: "heading", content: "The Best Houseboat for Your Honeymoon" },
      { type: "paragraph", content: "Dal Lake has over 800 registered houseboats, but not all are equal. For a honeymoon, we recommend the 'A-Deluxe' or 'Luxury' category houseboats in the Dal Lake Boulevard area or Nagin Lake (quieter side). Look for: private deck with lake view, en-suite bathroom, proper heating, and a reliable houseboat keeper." },
      { type: "tip_box", content: "Honeymoon Booking Tip: Always request a lake-facing room on the upper deck — this is where the best sunrise views are. And book the morning shikara (5:30 AM) the night before — it is transformative in the pre-dawn silence." },
      { type: "heading", content: "5-Day Kashmir Honeymoon Itinerary" },
      { type: "list", content: "Day-wise breakdown:", items: ["Day 1: Arrive Srinagar → houseboat check-in → evening shikara sunset ride → houseboat dinner", "Day 2: Mughal Gardens → Shankaracharya Temple → Hazratbal Shrine → Lal Chowk market stroll", "Day 3: Gulmarg — Gondola ride to Kongdori / Apharwat Peak → pony ride in meadows", "Day 4: Pahalgam — Betaab Valley → Baisaran meadows → Lidder riverside lunch", "Day 5: Sunrise shikara → souvenir shopping (pashmina, saffron, walnut crafts) → airport"] },
      { type: "heading", content: "Most Romantic Experiences in Kashmir" },
      { type: "list", content: "Experiences to book in advance:", items: ["Private shikara with floating flower arrangement at sunrise", "Candlelit dinner on the houseboat deck overlooking the lake", "Pony ride through Gulmarg meadows at golden hour", "Picnic arranged at Baisaran (Pahalgam) with valley view", "Private Mughal Garden photography session at Shalimar Bagh"] },
      { type: "callout", content: "Our Kashmir Honeymoon Special includes 5 nights (2 on houseboat, 3 in hotel), all sightseeing, private cab, complimentary romantic welcome decoration and cake at the houseboat. Contact us for competitive tailored pricing." },
    ],
    relatedPackageSlugs: ["kashmir-honeymoon-5-nights-6-days"],
    relatedDestinationSlugs: ["kashmir"],
    relatedBlogSlugs: ["best-time-to-visit-kedarnath-2025", "manali-in-december-is-it-worth-it"],
  },
  {
    id: "5",
    slug: "char-dham-yatra-complete-planning-guide",
    title: "Char Dham Yatra 2025 — Complete Planning Guide from Haridwar",
    metaDescription: "Complete Char Dham Yatra planning guide for 2025: opening dates, itinerary, registration process, accommodation tips, and what to carry.",
    category: "Pilgrimage Guide",
    tags: ["Char Dham", "Kedarnath", "Badrinath", "Pilgrimage"],
    author: { name: "Arjun Negi", role: "Char Dham Yatra Specialist", initials: "AN" },
    date: "February 5, 2025",
    readTime: "9 min read",
    image: destKedarnath,
    excerpt: "Complete guide to planning the 2025 Char Dham Yatra: opening dates, registration, itinerary, helicopter options, and insider tips for a spiritual Himalayan journey.",
    featured: false,
    content: [
      { type: "paragraph", content: "The Char Dham Yatra — Yamunotri, Gangotri, Kedarnath, Badrinath — is considered the ultimate Hindu pilgrimage, a circuit of the four sacred abodes of the divine nestled in the Garhwal Himalayas. Whether you are a devout pilgrim, a curious traveller, or someone seeking a spiritual reset, the Char Dham has a way of reshaping your perspective permanently." },
      { type: "heading", content: "2025 Char Dham Opening Dates" },
      { type: "list", content: "Approximate 2025 temple opening dates:", items: ["Yamunotri: Akshaya Tritiya (May 1, 2025)", "Gangotri: Akshaya Tritiya (May 1, 2025)", "Kedarnath: Akshaya Tritiya (May 2, 2025)", "Badrinath: Approximately May 4–8, 2025 (announced by the temple committee)", "All temples close: October–November (before Diwali or around Bhai Dooj)"] },
      { type: "heading", content: "Mandatory Yatra Registration" },
      { type: "paragraph", content: "Registration for the Char Dham Yatra is mandatory since 2022 for all pilgrims. Register online at registrationandtouristcare.uk.gov.in. You will receive a registration number which must be shown at multiple checkpoints along the route. Carry your photo ID (Aadhaar/passport) at all times. We assist all our guests with online registration as part of the package." },
      { type: "heading", content: "How Many Days Does Char Dham Take?" },
      { type: "paragraph", content: "Minimum 10 days is required to complete all four dhams by road from Haridwar, with enough time for proper darshan at each site. Rushed 7–8 day itineraries exist but involve very long driving days. Extended 12–14 day tours allow rest days and include Badrinath's Mana Village (the last Indian village before Tibet) and the full Kedarnath experience." },
      { type: "tip_box", content: "Consider Char Dham by Helicopter for seniors and those with health restrictions: complete all four dhams in just 1–2 days with our dedicated premium helicopter packages." },
      { type: "callout", content: "Our Char Dham packages (10–12 days) come with private vehicle, experienced guide, all accommodation, and yatra registration support." },
    ],
    relatedPackageSlugs: ["kedarnath-yatra-5-nights-6-days"],
    relatedDestinationSlugs: ["kedarnath", "char-dham", "rishikesh"],
    relatedBlogSlugs: ["best-time-to-visit-kedarnath-2025", "how-to-plan-kedarnath-badrinath-pilgrimage"],
  },
  {
    id: "6",
    slug: "manali-in-december-is-it-worth-it",
    title: "Manali in December — Is It Worth It? Snow, Activities & What to Expect",
    metaDescription: "Thinking about visiting Manali in December? Find out exactly what to expect — snow conditions, open roads, activities, accommodation, and is it worth the trip.",
    category: "Seasonal Guide",
    tags: ["Manali", "Winter", "Snow", "Himachal Pradesh"],
    author: { name: "Rohan Kapoor", role: "Himachal Pradesh Expert", initials: "RK" },
    date: "January 10, 2025",
    readTime: "5 min read",
    image: destManali,
    excerpt: "Is Manali worth visiting in December? Honest breakdown of what to expect — snow, roads, prices, and the best activities for a winter trip.",
    featured: false,
    content: [
      { type: "paragraph", content: "Short answer: Yes — absolutely. December in Manali is one of the most underrated travel experiences in North India. While Rohtang Pass is closed by November, Solang Valley receives excellent snowfall from December and is where the action is." },
      { type: "heading", content: "What's Open in December?" },
      { type: "list", content: "Accessible in December:", items: ["Manali town: fully open and accessible", "Solang Valley: open, typically snow-covered from December", "Hadimba Temple: always open", "Old Manali: open — charming in winter with fewer tourists", "Rohtang Pass: CLOSED (closed from November–May)", "Spiti Valley: Road generally closed (via Rohtang) — accessible via Shimla only"] },
      { type: "heading", content: "Snow Activities in December" },
      { type: "paragraph", content: "Solang Valley in December offers skiing, snowboarding, sledding, snowball fights, and snow tubing. The valley typically has 3–5 feet of snow from mid-December. Gear rental is available on the spot. Professional ski instructors are available for beginners." },
      { type: "heading", content: "What Temperature to Expect" },
      { type: "paragraph", content: "Manali town in December sees daytime temperatures of 2–8°C and night temperatures of -4 to 0°C. Solang Valley is colder — expect -8 to -2°C. Pack accordingly: thermal base layers, fleece, down jacket, waterproof outer layer, and good snow boots." },
      { type: "tip_box", content: "December Accommodation Tip: Avoid budget hotels without proper central heating — winters can be brutal. Book mid-range hotels with indoor heating systems. Cosy fireplace cottages in Old Manali are popular and atmospheric." },
      { type: "callout", content: "Our Manali Winter Package (4 nights, 5 days) includes Solang Valley snow activities, private cab, heated accommodation, and all meals. Enquire now for custom pricing." },
    ],
    relatedPackageSlugs: ["manali-family-4-nights-5-days"],
    relatedDestinationSlugs: ["manali"],
    relatedBlogSlugs: ["ladakh-travel-guide-beginners", "rishikesh-adventure-activities-full-guide"],
  },
  {
    id: "7",
    slug: "rishikesh-adventure-activities-full-guide",
    title: "Rishikesh Adventure Activities — Full Guide to Rafting, Bungee & More",
    metaDescription: "Complete guide to adventure activities in Rishikesh: white-water rafting routes, bungee jumping, paragliding, cliff jumping, and what to book in advance.",
    category: "Adventure Guide",
    tags: ["Rishikesh", "Rafting", "Adventure", "Bungee"],
    author: { name: "Vikram Singh", role: "Adventure Sports Coordinator", initials: "VS" },
    date: "December 22, 2024",
    readTime: "6 min read",
    image: destRishikesh,
    excerpt: "Everything you need to know about adventure activities in Rishikesh — rafting routes, bungee details, prices, and which activities to book vs walk-in.",
    featured: false,
    content: [
      { type: "paragraph", content: "Rishikesh is the undisputed adventure capital of India. While the city is globally famous for yoga, it offers a parallel universe of adrenaline — world-class white-water rafting on the Ganga, India's highest bungee jump, paragliding over Himalayan valleys, cliff jumping, and kayaking through gorges." },
      { type: "heading", content: "White-Water Rafting Routes on the Ganga" },
      { type: "list", content: "The 4 main rafting routes:", items: ["Brahmpuri to Rishikesh: 9 km, 2 hours, Grade 1–2 (Beginner/Family)", "Shivpuri to Rishikesh: 16 km, 3 hours, Grade 2–3 (Most Popular)", "Marine Drive to Rishikesh: 26 km, 4–5 hours, Grade 3–4 (Experienced adventurers)", "Kaudiyala to Rishikesh: 36 km, full day, Grade 4–5 (Expert rafters only)"] },
      { type: "heading", content: "Bungee Jumping at Jumpin Heights" },
      { type: "paragraph", content: "Jumpin Heights at Mohan Chatti is India's highest fixed-platform bungee jump at 83m (272 feet) above the rocky gorge. The platform is internationally certified. They also offer a Giant Swing (83m arc swing, great for groups) and Flying Fox (250m zip-line). Minimum age: 12, weight: 40–110 kg." },
      { type: "tip_box", content: "Book bungee at least 48 hours in advance — Jumpin Heights is regularly sold out, especially on weekends and public holidays. Online booking is available at jumpinheights.com." },
      { type: "heading", content: "Paragliding in Rishikesh" },
      { type: "paragraph", content: "Tandem paragliding from hills above Rishikesh with views of the Ganga valley is available from multiple operators. The best paragliding site near Rishikesh is actually from Bir Billing (3.5 hours away) — if you have an extra day, this is the world's second-highest paragliding site." },
      { type: "callout", content: "Our Rishikesh Adventure Weekend Package includes 16km Ganga rafting, guided yoga session, riverside camp with bonfire, and all transfers from Delhi. Contact us for custom pricing based on your dates." },
    ],
    relatedPackageSlugs: [],
    relatedDestinationSlugs: ["rishikesh"],
    relatedBlogSlugs: ["ladakh-travel-guide-beginners", "valley-of-flowers-trek-complete-guide"],
  },
  {
    id: "8",
    slug: "how-to-plan-kedarnath-badrinath-pilgrimage",
    title: "How to Plan a Kedarnath and Badrinath Pilgrimage — Step by Step",
    metaDescription: "Step-by-step guide to planning a Kedarnath and Badrinath pilgrimage: best route, registration, accommodation booking, packing list, and timeline.",
    category: "Pilgrimage Guide",
    tags: ["Kedarnath", "Badrinath", "Char Dham", "Pilgrimage"],
    author: { name: "Meera Joshi", role: "Spiritual Travel Consultant", initials: "MJ" },
    date: "November 30, 2024",
    readTime: "8 min read",
    image: destKedarnath,
    excerpt: "Step-by-step guide to planning your Kedarnath and Badrinath pilgrimage — route, registration, accommodation, packing, and how to combine both shrines efficiently.",
    featured: false,
    content: [
      { type: "paragraph", content: "Kedarnath and Badrinath together are often called the 'Do Dham' — two of the most sacred shrines in Hinduism, located within the same Himalayan region. They can be visited in 7–8 days as a Do Dham yatra, or as part of the complete 10–12 day Char Dham circuit." },
      { type: "heading", content: "Step 1: Choose Your Travel Period" },
      { type: "paragraph", content: "Both shrines are open May–October. We recommend September–October for the best experience: crowds are manageable (50% lower than May–June), the post-monsoon skies are crystal clear with excellent peak visibility, and temperatures are crisp and comfortable for the trek." },
      { type: "heading", content: "Step 2: Complete Your Online Registration" },
      { type: "paragraph", content: "All pilgrims visiting Char Dham shrines must register at registrationandtouristcare.uk.gov.in. You will need a valid photo ID, mobile number, and emergency contact details. Registration is free. The registration slip with QR code is checked at Gaurikund (for Kedarnath) and at Badrinath town entry. Register at least 1 month in advance." },
      { type: "heading", content: "Step 3: Plan Your Route" },
      { type: "list", content: "Efficient Kedarnath–Badrinath circuit:", items: ["Day 1: Arrive Haridwar, Ganga Aarti evening", "Day 2: Drive to Guptkashi (310 km, 10 hrs) — base for Kedarnath", "Day 3: Guptkashi → Gaurikund → 16 km trek to Kedarnath", "Day 4: Kedarnath darshan + Shankaracharya Samadhi + optional Vasuki Tal", "Day 5: Return trek + drive towards Badrinath (220 km)", "Day 6: Badrinath darshan + Tapt Kund dip + Mana Village", "Day 7: Return drive to Haridwar (310 km)"] },
      { type: "callout", content: "Too busy to plan this yourself? Our Kedarnath & Badrinath Do Dham Package handles everything — accommodation, transport, guide, registration, and darshan coordination. Enquire for personalised pricing." },
    ],
    relatedPackageSlugs: ["kedarnath-yatra-5-nights-6-days"],
    relatedDestinationSlugs: ["kedarnath", "char-dham", "rishikesh"],
    relatedBlogSlugs: ["best-time-to-visit-kedarnath-2025", "char-dham-yatra-complete-planning-guide"],
  },
  {
    id: "9",
    slug: "top-10-himalayan-treks-beginners",
    title: "Top 10 Himalayan Treks for Beginners in India",
    metaDescription: "Best Himalayan treks for beginners: Triund, Valley of Flowers, Kedarkantha, Hampta Pass, Chopta, and more — with difficulty ratings, duration, and how to book.",
    category: "Trek Guide",
    tags: ["Trekking", "Himalayas", "Beginners", "Uttarakhand"],
    author: { name: "Priya Thakur", role: "Trek & Nature Specialist", initials: "PT" },
    date: "October 15, 2024",
    readTime: "8 min read",
    image: destValleyFlowers,
    excerpt: "The best Himalayan treks for first-time trekkers — from easy 1-day escapes to 6-day beginner-friendly trail experiences, ranked by difficulty and experience quality.",
    featured: false,
    content: [
      { type: "paragraph", content: "The Himalayas do not demand expertise — they demand respect, preparation, and the willingness to walk. Many of the most beautiful Himalayan treks are accessible to fit beginners with no prior trekking experience. Here are ten that we consistently recommend to first-time trekkers." },
      { type: "heading", content: "1. Triund Trek, Dharamshala (Easy)" },
      { type: "paragraph", content: "The most popular beginner trek in Himachal Pradesh. A 9 km trail from McLeod Ganj in Dharamshala to the Triund ridge at 2,850m, with jaw-dropping views of the Dhauladhar range. Doable in 5–6 hours, camp overnight at the top, return in the morning. No guide required. Best March–May and October–November." },
      { type: "heading", content: "2. Valley of Flowers, Uttarakhand (Easy–Moderate)" },
      { type: "paragraph", content: "A UNESCO World Heritage Site and one of the most visually overwhelming treks in India. The approach trek to Ghangaria (13 km from Govindghat) is well-maintained and suitable for anyone with basic fitness. The valley itself is gentle walking terrain. Best July–August." },
      { type: "heading", content: "3. Kedarkantha Trek, Uttarakhand (Moderate)" },
      { type: "paragraph", content: "A 6-day winter trek in the Govind Wildlife Sanctuary reaching Kedarkantha summit at 3,810m. The trail passes through dense pine and oak forests under heavy snowfall (December–March) and offers stunning 360° Himalayan panoramas from the summit. One of the best winter summit experiences for beginners." },
      { type: "heading", content: "4. Chopta–Tungnath–Chandrashila, Uttarakhand (Easy)" },
      { type: "paragraph", content: "The 'Mini Switzerland of India' — Chopta is a highland meadow accessible by road to 2,680m. From there, a 3.5 km trek reaches Tungnath (the world's highest Shiva temple at 3,680m) and another km to Chandrashila summit (4,000m) with panoramic views of Nanda Devi, Trishul, and Kedarnath peaks. February–April is spectacular with snow." },
      { type: "list", content: "Other excellent beginner treks:", items: ["5. Hampta Pass (Easy–Moderate): Kullu to Lahaul via a dramatic pass with changing landscapes", "6. Sandakphu, Darjeeling (Moderate): Best views of Kanchenjunga and Everest from Indian soil", "7. Deoria Tal, Uttarakhand (Easy): Stunning reflection lake at 2,438m with Chaukhamba massif reflections", "8. Bhrigu Lake, Manali (Moderate): High-altitude alpine lake trek at 4,235m from Manali in 3 days", "9. Dayara Bugyal, Uttarakhand (Easy): Vast high-altitude meadow trek with 360° snow views", "10. Roopkund Trek (Challenging): The 'Skeleton Lake' trek — one of India's most famous at 5,02 9m"] },
      { type: "callout", content: "Planning your first Himalayan trek? Our experts can match you with the perfect route based on your fitness level, available days, and time of year. Contact us for a free consultation." },
    ],
    relatedPackageSlugs: ["valley-of-flowers-trek-6-nights-7-days", "ladakh-adventure-7-nights-8-days"],
    relatedDestinationSlugs: ["valley-of-flowers", "rishikesh"],
    relatedBlogSlugs: ["valley-of-flowers-trek-complete-guide", "rishikesh-adventure-activities-full-guide"],
  },
];

// ── Convenience exports ───────────────────────────────────────────────────────

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return blogPosts;
  return blogPosts.filter((p) => p.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getAllBlogCategories(): string[] {
  const cats = new Set(blogPosts.map((p) => p.category));
  return ["All", ...Array.from(cats)];
}
