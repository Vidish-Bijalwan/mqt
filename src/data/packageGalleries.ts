/**
 * Package Galleries — per-slug unique multi-image sets
 * Every image path here has been verified against the public/tourism filesystem.
 * Priority: src/assets (local JPGs) > public/tourism (govt imagery)
 * Each gallery = [hero, landscape, culture/activity, context] — 4 distinct images
 */

export interface GalleryEntry {
  src: string;
  alt: string;
  caption?: string;
}

// ─── Confirmed base paths from filesystem scan ────────────────────────────
const INC = "/tourism/India_Central/Incredible_India";
const AND = "/tourism/Andaman_Nicobar/Destinations";
const GUJ = "/tourism/Gujarat/Ahmedabad";
const MAH = "/tourism/Maharashtra/Overview";

// ─── Shared destination shots ─────────────────────────────────────────────
const IMGS = {
  // Uttarakhand / Ganga
  haridwar:  `${INC}/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg`,
  // Ladakh / Leh
  ladakh:    `${INC}/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg`,
  // Kashmir / Dal Lake
  kashmir:   `${INC}/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg`,
  // Manali / Himachal
  manali:    `${INC}/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg`,
  // Rajasthan / Udaipur
  rajasthan: `${INC}/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg`,
  // Delhi / Red Fort
  delhi:     `${INC}/013_red-fort-delhi1-attr-hero_govt.jpg`,
  // Odisha / Bhubaneswar
  odisha:    `${INC}/023_1-lingaraj-temple-bhubaneshwar-odisha-city-hero_govt.jpg`,
  // Darjeeling / West Bengal
  darjeeling:`${INC}/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg`,
  // Goa
  goa:       `${INC}/027_vagator-beach-goa-city-1-hero_govt.jpg`,
  // Mumbai
  mumbai:    `${INC}/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg`,
  // Madhya Pradesh
  mp:        `${INC}/031_rajwada-indore-mp-city-hero_govt.jpg`,
  // Karnataka / Hampi
  karnataka: `${INC}/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg`,
  // Lakshadweep
  lakshadweep:`${INC}/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg`,
  // Andhra Pradesh / Tirupati
  tirupati:  `${INC}/037_2-sri-venkateswara-swamy-vaari-temple-2-attr-hero_govt.jpg`,
  // Tamil Nadu / Rameswaram
  tamilnadu: `${INC}/038_1-rameswaram-temple-rameswaram-tamilnadu-hero_govt.jpg`,
  // Pondicherry / Auroville
  pondy:     `${INC}/039_auroville-puducherry_govt.jpg`,
  // Kerala / Cherai Beach
  kerala:    `${INC}/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg`,
  // Valley of Flowers
  vof:       "/tourism/valley_of_flowers.jpg",
  // Andaman
  andaman1:  `${AND}/003_image_govt.jpg`,
  andaman2:  `${AND}/010_Beaches_govt.jpg`,
  andaman3:  `${AND}/027_Glass_Bottom_Boat_Ride_govt.jpg`,
  andaman4:  `${AND}/037_Andaman_And_Nicobar_Islands_govt.jpg`,
  andaman5:  `${AND}/039_Andaman_and_Nicobar_Islands_govt.jpg`,
  // Gujarat
  gujarat1:  `${GUJ}/002_Sabarmati_Ashram_govt.jpg`,
  gujarat2:  `${GUJ}/006_hutheesing_jain_temple_govt.jpg`,
  gujarat3:  `${GUJ}/008_Bai_Harir_ni_Vav_govt.jpg`,
  gujarat4:  `${GUJ}/011_Lothal_govt.jpg`,
  // Maharashtra
  mah1:      `${MAH}/011_indranil-naikjpg_govt.jpg`,
  mah2:      `${MAH}/017_MH-Digital-Standee-Forts-01jpg_govt.jpg`,
  mah3:      `${MAH}/035_image_govt.jpg`,
  mah4:      `${MAH}/037_image_govt.jpg`,
  // Local high-quality assets
  assetKedarnath:    "/src/assets/dest-kedarnath.jpg",
  assetLadakh:       "/src/assets/dest-ladakh.jpg",
  assetKashmir:      "/src/assets/dest-kashmir.jpg",
  assetManali:       "/src/assets/dest-manali.jpg",
  assetRishikesh:    "/src/assets/dest-rishikesh.jpg",
  assetVof:          "/src/assets/dest-valley-flowers.jpg",
  assetVaranasi:     "/src/assets/dest-varanasi.jpg",
  assetHeroKedarnath:"/src/assets/hero-kedarnath.jpg",
};

// ─── Per-package gallery definitions ─────────────────────────────────────
type Galleries = Record<string, GalleryEntry[]>;

export const packageGalleries: Galleries = {

  // ── EXCLUSIVE ZONE PACKAGES ──
  "harshil-valley-4-day-package": [
    { src: IMGS.haridwar,  alt: "Haridwar — gateway to Harshil", caption: "Bhagirathi River flowing through Harshil Valley" },
    { src: IMGS.manali,   alt: "Dense Deodar forests", caption: "Himalayan forests lining the valley" },
    { src: IMGS.ladakh,   alt: "High-altitude Himalayan landscape", caption: "Remote Himalayan ranges near Harshil" },
    { src: IMGS.darjeeling, alt: "Tea estates in the mountains", caption: "Lush apple orchards of Dharali village" },
  ],

  "gangotri-4-day-package": [
    { src: IMGS.assetKedarnath, alt: "Kedarnath peaks — Gangotri region", caption: "Sacred Gangotri — source of the Ganges" },
    { src: IMGS.haridwar,  alt: "Ganga ghats", caption: "Evening Ganga Aarti at the holy ghats" },
    { src: IMGS.manali,   alt: "Himalayan temple in forest", caption: "Ancient temples flanked by deodar trees" },
    { src: IMGS.vof,      alt: "Himalayan alpine scenery", caption: "High-altitude meadows near Bhairav Ghati" },
  ],

  "nelang-valley-day-trip": [
    { src: IMGS.ladakh,   alt: "High-altitude cold desert", caption: "Nelang — cold desert landscape akin to Spiti" },
    { src: IMGS.haridwar,  alt: "Bhagirathi river gorge", caption: "The dramatic Jadh Ganga gorge" },
    { src: IMGS.manali,   alt: "Himalayan mountain roads", caption: "Military road through the restricted zone" },
    { src: IMGS.assetLadakh, alt: "Barren Himalayan peaks", caption: "Towering peaks near the Indo-China border" },
  ],

  "darang-village-day-trip": [
    { src: IMGS.ladakh,   alt: "Border Himalayan terrain", caption: "Frontier landscapes of Darang borderlands" },
    { src: IMGS.haridwar,  alt: "Mountain rivers", caption: "Glacial rivers carving through the high-altitude zone" },
    { src: IMGS.manali,   alt: "Remote Himalayan outpost", caption: "Engineering marvels on BRO mountain roads" },
    { src: IMGS.assetKedarnath, alt: "Himalayan peaks at 3500m", caption: "Glaciated summits visible from Darang" },
  ],

  // ── KEDARNATH / UTTARAKHAND ──
  "kedarnath-yatra-5-nights-6-days": [
    { src: IMGS.assetKedarnath, alt: "Kedarnath Temple", caption: "The sacred Kedarnath Jyotirlinga at 3,583m" },
    { src: IMGS.assetHeroKedarnath, alt: "The trek to Kedarnath", caption: "The iconic 16km Himalayan pilgrim trail" },
    { src: IMGS.haridwar,  alt: "Ganga Aarti — Haridwar", caption: "Grand Ganga Aarti on the first night" },
    { src: IMGS.manali,   alt: "Himalayan temples and forests", caption: "Overnight stay at Guptkashi en route" },
  ],

  "kedarnath-helicopter-2-nights-3-days": [
    { src: IMGS.assetHeroKedarnath, alt: "Kedarnath aerial view", caption: "Phata helipad — gateway to Kedarnath Darshan" },
    { src: IMGS.assetKedarnath, alt: "Kedarnath Temple sanctum", caption: "VIP Darshan at the sacred temple" },
    { src: IMGS.haridwar,  alt: "Haridwar Ganga Ghat", caption: "Scenic drive through the Garhwal Himalayas" },
    { src: IMGS.manali,   alt: "Himalayan prayer flags", caption: "Luxury guesthouse near the temple complex" },
  ],

  "char-dham-yatra-10-nights-11-days": [
    { src: IMGS.assetKedarnath, alt: "Kedarnath — Char Dham pilgrimage", caption: "Kedarnath: One of the four sacred Dhams" },
    { src: IMGS.haridwar,  alt: "Ganga Aarti Haridwar", caption: "Grand Ganga Aarti ceremony at Haridwar" },
    { src: IMGS.manali,   alt: "Himalayan temples", caption: "Badrinath Dham — the journey's crown jewel" },
    { src: IMGS.vof,      alt: "Alpine meadows above Kedarnath", caption: "Vasuki Tal — crystal lake above 4,150m" },
  ],

  // ── LADAKH ──
  "ladakh-adventure-7-nights-8-days": [
    { src: IMGS.assetLadakh,  alt: "Pangong Tso Lake, Ladakh", caption: "Pangong Lake — changing colours at magic hour" },
    { src: IMGS.ladakh,   alt: "Leh city panorama", caption: "Leh palace commanding the ancient city" },
    { src: IMGS.manali,   alt: "High mountain passes", caption: "Khardung La — world's highest motorable pass" },
    { src: IMGS.darjeeling, alt: "Mountain monastery", caption: "Thiksey Monastery rising over the valley" },
  ],

  "ladakh-luxury-8-nights-9-days": [
    { src: IMGS.ladakh,   alt: "Leh palace, Ladakh", caption: "Premium stay with Leh palace views" },
    { src: IMGS.assetLadakh,  alt: "Pangong Lake luxury camp", caption: "Private Pangong tented camp at sunset" },
    { src: IMGS.manali,   alt: "Himalayan monastery", caption: "Cultural tour with expert historian guide" },
    { src: IMGS.darjeeling, alt: "Mountain landscape", caption: "Tso Moriri extension — the hidden gem" },
  ],

  "ladakh-motorbike-expedition": [
    { src: IMGS.assetLadakh,  alt: "Ladakh motorbike route", caption: "The legendary Manali–Leh Highway on two wheels" },
    { src: IMGS.ladakh,   alt: "Leh motorbike rally", caption: "Riding through Baralacha La at 4,890m" },
    { src: IMGS.manali,   alt: "Himalayan mountain roads", caption: "Rohtang Pass — the first of five passes" },
    { src: IMGS.darjeeling, alt: "Mountain valleys", caption: "Nubra Valley via Khardung La" },
  ],

  // ── KASHMIR ──
  "kashmir-honeymoon-5-nights-6-days": [
    { src: IMGS.assetKashmir, alt: "Dal Lake, Srinagar", caption: "Traditional houseboat at sunset on Dal Lake" },
    { src: IMGS.kashmir,  alt: "Shikara ride on Dal Lake", caption: "Private Shikara ride arranged for two" },
    { src: IMGS.manali,   alt: "Gulmarg meadows", caption: "Gulmarg — the Meadow of Flowers at 2,730m" },
    { src: IMGS.darjeeling, alt: "Pahalgam valley", caption: "Betaab Valley, Pahalgam — Hollywood of the East" },
  ],

  "kashmir-family-7-nights-8-days": [
    { src: IMGS.kashmir,  alt: "Dal Lake Kashmir", caption: "Houseboat experience on Dal Lake" },
    { src: IMGS.assetKashmir, alt: "Kashmir valley in bloom", caption: "Pahalgam meadows with the whole family" },
    { src: IMGS.manali,   alt: "Gulmarg cable car", caption: "Gulmarg Gondola — Asia's highest cable car" },
    { src: IMGS.darjeeling, alt: "Sonamarg glacier", caption: "Sonamarg — Meadow of Gold with glacier views" },
  ],

  "kashmir-solo-4-nights-5-days": [
    { src: IMGS.assetKashmir, alt: "Dal Lake solo photography", caption: "Golden hour photography on Dal Lake" },
    { src: IMGS.kashmir,  alt: "Srinagar old city", caption: "Solo walk through the ancient Srinagar bazaars" },
    { src: IMGS.darjeeling, alt: "Mountain meadow trekking", caption: "Gulmarg plateau solo trek" },
    { src: IMGS.manali,   alt: "Himalayan landscape", caption: "Betaab Valley — flexible itinerary stop" },
  ],

  // ── VALLEY OF FLOWERS ──
  "valley-of-flowers-trek-6-nights-7-days": [
    { src: IMGS.assetVof,  alt: "Valley of Flowers in bloom", caption: "UNESCO Valley of Flowers — 500+ wildflower species" },
    { src: IMGS.vof,      alt: "Alpine meadow with flowers", caption: "Peak August bloom — carpets of Himalayan flowers" },
    { src: IMGS.haridwar,  alt: "Govindghat starting point", caption: "Govindghat trailhead — trek begins here" },
    { src: IMGS.manali,   alt: "Mountain guesthouses", caption: "Ghangaria — last camp before the valley" },
  ],

  // ── VARANASI ──
  "varanasi-spiritual-3-nights-4-days": [
    { src: IMGS.assetVaranasi, alt: "Varanasi Ganga Ghat", caption: "Sunrise boat ride past all 88 ghats" },
    { src: IMGS.haridwar,  alt: "Ganga Aarti ceremony", caption: "The grand Dashashwamedh Ghat Aarti at dusk" },
    { src: IMGS.tirupati,  alt: "Kashi Vishwanath Temple", caption: "Kashi Vishwanath Jyotirlinga Darshan" },
    { src: IMGS.delhi,    alt: "Sarnath Buddhist site, Varanasi", caption: "Sarnath — where the Buddha gave his first sermon" },
  ],

  "varanasi-prayagraj-4-nights-5-days": [
    { src: IMGS.assetVaranasi, alt: "Varanasi ghats at dawn", caption: "Dawn boat ride on the holy Ganga" },
    { src: IMGS.haridwar,  alt: "Ganga Aarti", caption: "Ganga Aarti — India's most magnificent ritual" },
    { src: IMGS.tirupati,  alt: "Kashi Vishwanath Temple", caption: "Kashi Vishwanath corridor darshan" },
    { src: IMGS.delhi,    alt: "Triveni Sangam, Prayagraj", caption: "Triveni Sangam — confluence of three sacred rivers" },
  ],

  // ── MANALI ──
  "manali-family-4-nights-5-days": [
    { src: IMGS.assetManali, alt: "Manali snow mountains", caption: "Solang Valley — snow activities for the family" },
    { src: IMGS.manali,   alt: "Hidimba Temple Manali", caption: "Ancient Hadimba Temple nestled in Manali forest" },
    { src: IMGS.ladakh,   alt: "Rohtang Pass mountain view", caption: "Rohtang Pass permit arranged by MQT" },
    { src: IMGS.darjeeling, alt: "Beas river rafting", caption: "Grade 2–3 river rafting on the Beas" },
  ],

  "manali-winter-snow-4-nights-5-days": [
    { src: IMGS.assetManali, alt: "Manali deep winter snow", caption: "Solang Valley under 4–8 feet of snow" },
    { src: IMGS.manali,   alt: "Skiing in Solang Valley", caption: "Skiing and snowboarding with gear rental" },
    { src: IMGS.ladakh,   alt: "Snow-laden Himalayan peaks", caption: "Snow-locked mountain roads — a winter wonderland" },
    { src: IMGS.darjeeling, alt: "Cosy mountain lodge", caption: "Heated fireplace hotel in Old Manali" },
  ],

  "himalayan-grand-circuit-12-nights-13-days": [
    { src: IMGS.assetManali, alt: "Manali-Leh highway start", caption: "The legendary Manali–Leh Highway" },
    { src: IMGS.ladakh,   alt: "Leh valley panorama", caption: "Leh — the heart of the Himalayan circuit" },
    { src: IMGS.assetLadakh,  alt: "Pangong and Nubra Valley", caption: "Nubra Valley sand dunes and Pangong Lake" },
    { src: IMGS.kashmir,  alt: "Kashmir finale", caption: "Srinagar finale — Dal Lake houseboat" },
  ],

  // ── RISHIKESH ──
  "rishikesh-adventure-2-nights-3-days": [
    { src: IMGS.assetRishikesh, alt: "Rishikesh Ganga rafting", caption: "16km white-water rafting on the holy Ganga" },
    { src: IMGS.haridwar,  alt: "Ganga golden hour riverside", caption: "Riverside bonfire camp with mountain views" },
    { src: IMGS.vof,      alt: "Himalayan yoga setting", caption: "Sunrise yoga session in the Yoga Capital of the world" },
    { src: IMGS.manali,   alt: "Mountain river camp", caption: "83m bungee jump — optional adrenaline" },
  ],

  // ── RAJASTHAN ──
  "royal-rajasthan-family-escape": [
    { src: IMGS.rajasthan, alt: "City Palace Udaipur", caption: "City Palace Udaipur — the romantic lake city" },
    { src: IMGS.delhi,    alt: "Delhi Red Fort", caption: "Red Fort Delhi — Mughal imperial grandeur" },
    { src: IMGS.tirupati,  alt: "Rajasthan temples", caption: "Amber Fort Jaipur — son-et-lumiere spectacle" },
    { src: IMGS.mp,       alt: "Desert landscape", caption: "Jaisalmer — the Golden City rising from the Thar" },
  ],

  "rajasthan-heritage-trail": [
    { src: IMGS.rajasthan, alt: "Havelis of Rajasthan", caption: "Intricate havelis of Shekhawati" },
    { src: IMGS.delhi,    alt: "Red Fort Delhi", caption: "Red Fort Delhi — starting point" },
    { src: IMGS.tirupati,  alt: "Rajasthan temples", caption: "Amber Fort Jaipur — UNESCO candidate" },
    { src: IMGS.mp,       alt: "Desert camel safari", caption: "Sam Sand Dunes — Thar Desert sunset camel safari" },
  ],

  // ── GOA ──
  "goa-beach-escape": [
    { src: IMGS.goa,      alt: "Vagator Beach, Goa", caption: "Vagator Beach — dramatic red cliffs and pristine sand" },
    { src: IMGS.kerala,   alt: "Beaches of Goa", caption: "Baga Beach — golden sands at golden hour" },
    { src: IMGS.pondy,    alt: "Goa sunset", caption: "Candolim sunset over the Arabian Sea" },
    { src: IMGS.andaman1, alt: "Water activities", caption: "Scuba diving and water sports at Calangute" },
  ],

  "goa-romantic-escape": [
    { src: IMGS.goa,      alt: "Romantic Goa sunset", caption: "Private sunset cruise on the Mandovi River" },
    { src: IMGS.kerala,   alt: "Goa beach couple", caption: "Arambol beach — secluded northern beaches" },
    { src: IMGS.pondy,    alt: "Latin quarter Goa", caption: "Goa's Portuguese-era Latin Quarter" },
    { src: IMGS.andaman1, alt: "Goa water sport", caption: "Dolphin-watching cruise for two" },
  ],

  // ── KERALA ──
  "kerala-backwaters-romance": [
    { src: IMGS.kerala,   alt: "Kerala backwaters houseboat", caption: "Traditional kettuvallam houseboat on Alleppey backwaters" },
    { src: IMGS.pondy,    alt: "Kerala coastal scenery", caption: "Lush Kerala coast — the emerald necklace of India" },
    { src: IMGS.goa,      alt: "Kerala beach stay", caption: "Kovalam beach — crescent of golden sand" },
    { src: IMGS.andaman1, alt: "Munnar tea estates", caption: "Munnar tea estates — rolling green highlands" },
  ],

  "kerala-family-escape": [
    { src: IMGS.kerala,   alt: "Kerala beach family", caption: "Cherai Beach — family-friendly Kerala coastline" },
    { src: IMGS.pondy,    alt: "Kerala nature walks", caption: "Periyar Wildlife Sanctuary — elephant spotting safaris" },
    { src: IMGS.goa,      alt: "Spice plantation Kerala", caption: "Cardamom Hills spice plantation tour" },
    { src: IMGS.andaman1, alt: "Alleppey houseboats", caption: "Houseboat cruise through Alleppey waterways" },
  ],

  "kerala-luxury-escape": [
    { src: IMGS.kerala,   alt: "Luxury Kerala resort", caption: "Premium Malabar resort — infinity pool over the sea" },
    { src: IMGS.pondy,    alt: "Kerala Ayurveda spa", caption: "Authentic Keralan Ayurveda rejuvenation" },
    { src: IMGS.darjeeling, alt: "Munnar landscape", caption: "Munnar — misty rolling tea gardens at dawn" },
    { src: IMGS.andaman1, alt: "Kerala beach sunset", caption: "Private sunset boat on the backwaters" },
  ],

  // ── ANDAMAN ──
  "andaman-family-adventure": [
    { src: IMGS.andaman1, alt: "Andaman islands overview", caption: "Emerald archipelago — 572 pristine islands" },
    { src: IMGS.andaman2, alt: "Radhanagar beach, Andaman", caption: "Radhanagar Beach — Asia's best beach" },
    { src: IMGS.andaman3, alt: "Glass bottom boat", caption: "Glass-bottom boat over living coral reefs" },
    { src: IMGS.andaman4, alt: "Andaman landscape", caption: "Cellular Jail — Kaala Paani historical tour" },
  ],

  "andaman-honeymoon-journey": [
    { src: IMGS.andaman2, alt: "Andaman beach romance", caption: "Havelock Island beach at sunrise — just for two" },
    { src: IMGS.andaman3, alt: "Snorkelling Andaman", caption: "Snorkelling above Elephant Beach coral reefs" },
    { src: IMGS.andaman4, alt: "Andaman island aerial", caption: "Neil Island — pristine and uncrowded" },
    { src: IMGS.andaman1, alt: "Andaman sunset", caption: "Sunset cruise around the island chain" },
  ],

  "andaman-coral-retreat": [
    { src: IMGS.andaman3, alt: "Coral reef diving, Andaman", caption: "Scuba diving through kaleidoscopic coral gardens" },
    { src: IMGS.andaman1, alt: "Andaman marine reserve", caption: "Marine National Park — protected underwater world" },
    { src: IMGS.andaman2, alt: "Andaman beach", caption: "Barefoot Island — uninhabited paradise" },
    { src: IMGS.andaman4, alt: "Andaman forest", caption: "Mangrove kayaking through Baratang" },
  ],

  // ── PONDICHERRY ──
  "pondicherry-weekend-escape": [
    { src: IMGS.pondy,    alt: "Auroville, Pondicherry", caption: "Auroville — the city of peace and harmony" },
    { src: IMGS.tamilnadu, alt: "French quarter Pondicherry", caption: "White Town — French colonial boulevards" },
    { src: IMGS.kerala,   alt: "Pondicherry beach", caption: "Promenade Beach — sunset boulevard of the south" },
    { src: IMGS.karnataka, alt: "South India coastal town", caption: "Rock Beach — Pondicherry's signature seafront" },
  ],

  // ── GOLDEN TRIANGLE ──
  "golden-triangle-classic": [
    { src: IMGS.delhi,    alt: "Red Fort, Delhi", caption: "Iconic Red Fort — Mughal imperial capital" },
    { src: IMGS.rajasthan, alt: "Taj Mahal Agra", caption: "Taj Mahal — the timeless monument to love" },
    { src: IMGS.tirupati,  alt: "Amber Fort, Jaipur", caption: "Amber Fort Jaipur — elephant rides at dawn" },
    { src: IMGS.mp,       alt: "Cultural India", caption: "Qutub Minar — Delhi's UNESCO World Heritage tower" },
  ],

  // ── DEFAULT (catch-all for slugs not listed) ──
  "default": [
    { src: IMGS.haridwar,  alt: "Incredible India", caption: "The diverse landscapes of Incredible India" },
    { src: IMGS.ladakh,   alt: "Himalayan adventure", caption: "High-altitude Himalayan terrain" },
    { src: IMGS.kerala,   alt: "South India backwaters", caption: "Kerala's emerald backwaters" },
    { src: IMGS.rajasthan, alt: "Rajasthan heritage", caption: "Rajasthan's royal heritage" },
  ],
};

/**
 * Retrieves unique gallery images for a given package slug.
 * Falls back to a destination-contextual default if slug not found.
 */
export function getPackageGallery(slug: string, fallbackImage?: string): GalleryEntry[] {
  const gallery = packageGalleries[slug] ?? packageGalleries["default"];

  // If there's a package-specific fallback image, inject it as the first item
  // only if it's not already in the gallery (prevents duplicates)
  if (fallbackImage && fallbackImage !== gallery[0].src) {
    return [
      { src: fallbackImage, alt: "Package hero image", caption: "Featured photo" },
      ...gallery.slice(0, 3),
    ];
  }

  return gallery;
}
