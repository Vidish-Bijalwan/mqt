/**
 * Researched destination copy — overrides generic generator text.
 * Keys match destination slug in destinationsData.
 */
export interface DestinationAttraction {
  name: string;
  description: string;
  duration?: string;
}

export interface DestinationContentOverride {
  shortDescription: string;
  overviewParagraphs: string[];
  attractions: DestinationAttraction[];
  highlights: string[];
  travelTips: string[];
  howToReach?: { byAir: string; byTrain: string; byRoad: string };
  seoTitle?: string;
  seoDescription?: string;
}

export const destinationContentOverrides: Record<string, DestinationContentOverride> = {
  mussoorie: {
    shortDescription:
      "Colonial-era hill station above Dehradun — misty ridges, Mall Road cafés, and views of the Garhwal Himalayas.",
    overviewParagraphs: [
      "Mussoorie (around 2,005 m) is one of India's oldest hill stations, developed from the 1820s as a British summer retreat above the Doon Valley. Today it balances heritage walks in Landour, family-friendly viewpoints, and quick access from Delhi and Dehradun.",
      "The town sits on a horse-shoe ridge with the Mall Road as its spine. Clear days open views toward Bandarpunch and the Yamuna gorge; monsoon months bring lush greenery but also landslide risk on approach roads.",
      "MQT packages combine Mussoorie stays with Corbett, Nainital, or Char Dham circuits — ideal for long weekends and first-time Uttarakhand visitors.",
    ],
    attractions: [
      { name: "Gun Hill", description: "Second-highest point in town; cable car or short trek for Himalayan panoramas.", duration: "2–3 hours" },
      { name: "Kempty Falls", description: "Tiered waterfall 15 km downhill — popular picnic stop (avoid peak holiday crowds).", duration: "Half day" },
      { name: "Lal Tibba", description: "Highest viewpoint near Landour; telescope points toward major peaks on clear mornings.", duration: "1–2 hours" },
      { name: "Camel's Back Road", description: "Quiet ridge walk named for its rock silhouette — best at sunrise or sunset.", duration: "1 hour" },
      { name: "Landour", description: "Adjacent cantonment with bakeries, churches, and cedar forests — cooler and less crowded than the Mall.", duration: "Half day" },
      { name: "Company Garden", description: "Municipal gardens with boating — easy stop for families.", duration: "1–2 hours" },
    ],
    highlights: [
      "Mall Road evening strolls and Tibetan market snacks",
      "Gun Hill ropeway and Himalayan viewpoints",
      "Kempty Falls day trip from town",
      "Landour heritage walk and café culture",
      "Winter possibility of light snow on higher ridges",
    ],
    travelTips: [
      "Book hotels on Mall Road or Landour early for summer weekends and Christmas week.",
      "Carry layers — evenings cool even in summer; winters need heavy woollens.",
      "Avoid July–August if sensitive to rain-related road delays on Dehradun–Mussoorie route.",
      "Start Kempty Falls before 10 AM to beat traffic from Dehradun day-trippers.",
    ],
    howToReach: {
      byAir: "Jolly Grant Airport (Dehradun) ~60 km — taxis take 2–2.5 hours via hill roads.",
      byTrain: "Dehradun Railway Station ~34 km — frequent trains from Delhi; shared cabs to Library Bazaar.",
      byRoad: "~290 km from Delhi via Meerut–Roorkee–Dehradun; NH quality good until final 34 km climb.",
    },
    seoTitle: "Mussoorie Travel Guide 2026 | Queen of Hills Uttarakhand | MQT",
    seoDescription:
      "Plan Mussoorie holidays: best season, Gun Hill, Kempty Falls, Landour walks, budgets & custom Uttarakhand tour packages from My Quick Trippers.",
  },
  manali: {
    shortDescription:
      "Himachal hub for Solang adventures, Old Manali cafés, and gateway treks toward Rohtang and Spiti.",
    overviewParagraphs: [
      "Manali (≈2,050 m) sits in the Kullu Valley where the Beas River meets pine-covered slopes. It serves backpackers, families, and skiers with a split personality: bustling Mall Road versus laid-back Old Manali villages.",
      "Seasonal access to Rohtang Pass (permit required) and Atal Tunnel routes makes Manali a staging point for Lahaul, Leh, and high-altitude camping.",
      "Book adventure add-ons — paragliding, river rafting, and hamlet homestays — through MQT for vetted operators and monsoon-safe scheduling.",
    ],
    attractions: [
      { name: "Solang Valley", description: "Zorbing, skiing (winter), and paragliding with meadow backdrops.", duration: "Full day" },
      { name: "Hadimba Temple", description: "Deodar-wood temple from 1553 AD surrounded by cedar forest.", duration: "1 hour" },
      { name: "Old Manali", description: "Cafés, guesthouses, and Manu Temple lane — slower pace than Mall Road.", duration: "Half day" },
      { name: "Vashisht Hot Springs", description: "Sulphur springs and temple above the river — popular at dusk.", duration: "2 hours" },
    ],
    highlights: ["Rohtang / Lahaul day excursions", "Beas riverside cafés", "Winter snow activities in Solang", "Temple and village culture walks"],
    travelTips: ["Acclimatise one night before high passes", "Carry permit paperwork for Rohtang", "Book rafting only with licensed outfits"],
    howToReach: {
      byAir: "Bhuntar (Kullu) Airport ~50 km.",
      byTrain: "Nearest broad gauge: Chandigarh or Pathankot, then overnight bus.",
      byRoad: "Overnight Volvo from Delhi (~12–14 hrs) or Chandigarh (~8 hrs).",
    },
    seoTitle: "Manali Travel Guide 2026 | Himachal Packages | My Quick Trippers",
    seoDescription: "Manali itinerary ideas: Solang, Old Manali, Rohtang permits, best months & curated Himachal tour packages.",
  },
  kedarnath: {
    shortDescription:
      "Sacred Char Dham shrine at 3,583 m — trek or helicopter access via Gaurikund with strict seasonal window.",
    overviewParagraphs: [
      "Kedarnath Temple honours Lord Shiva in the Garhwal Himalayas and reopens each year around Akshaya Tritiya (April–May) until snowfall closes the route (usually November).",
      "Pilgrims trek 16 km from Gaurikund or use helicopter / pony services arranged by Uttarakhand authorities. MQT Char Dham packages handle transport, stays in Guptkashi/Sonprayag, and darshan coordination.",
      "Altitude and weather change rapidly — plan buffer days and travel insurance for mountain delays.",
    ],
    attractions: [
      { name: "Kedarnath Temple", description: "Stone mandir rebuilt after 2013 floods; morning aarti most sought-after.", duration: "2–3 hours" },
      { name: "Bhairavnath Temple", description: "Short climb above main shrine — guardian deity viewpoint.", duration: "1 hour" },
      { name: "Chorabari Tal (Gandhi Sarovar)", description: "Glacial lake trek for fit pilgrims (guide recommended).", duration: "4–5 hours" },
    ],
    highlights: ["Char Dham yatra circuit", "Mandakini valley scenery", "Helicopter & pony logistics support"],
    travelTips: ["Register on Uttarakhand tourism portals when mandated", "Pack rain gear even in summer", "Avoid alcohol — temple town norms"],
    seoTitle: "Kedarnath Yatra Guide 2026 | Char Dham Trek | MQT",
    seoDescription: "Kedarnath opening dates, trek distance, helicopter options & Char Dham packages with My Quick Trippers.",
  },
  rishikesh: {
    shortDescription: "Yoga capital on the Ganges — rafting, ashrams, and bridge sunsets at Lakshman Jhula.",
    overviewParagraphs: [
      "Rishikesh draws spiritual seekers, adventure travellers, and weekenders from Delhi NCR. The Ganga here is cleaner upstream of Haridwar, ideal for gentle rafting grades and evening Ganga Aarti at Parmarth Niketan.",
      "Tapovan and Swarg Ashram neighbourhoods host yoga schools; Shivpuri and Marine Drive sectors run Grade III–IV rapids in season.",
    ],
    attractions: [
      { name: "Lakshman Jhula & Ram Jhula", description: "Suspension bridges linking ashram quarters — pedestrian-only vibe.", duration: "1–2 hours" },
      { name: "River Rafting (Shivpuri–Lakshman)", description: "16–26 km stretches September–June depending on water.", duration: "Half day" },
      { name: "Neelkanth Mahadev", description: "Forest temple 32 km uphill — jeep or trek combinations.", duration: "Half day" },
    ],
    highlights: ["Ganga Aarti ceremonies", "Yoga retreats", "Bungee / giant swing at Jumpin Heights (seasonal)"],
    travelTips: ["Respect ashram dress codes near temples", "Book rafting with safety-certified operators only"],
    seoTitle: "Rishikesh Travel Guide 2026 | Rafting & Yoga Tours | MQT",
    seoDescription: "Best time for Rishikesh rafting, ashram stays, weekend itineraries from Delhi & custom Uttarakhand packages.",
  },
  jaipur: {
    shortDescription: "Pink City palaces, Amber Fort elephant walks, and artisan bazaars on Rajasthan's Golden Triangle.",
    overviewParagraphs: [
      "Jaipur is the anchor of Rajasthan tourism — UNESCO-listed Jantar Mantar and Amer Fort, alongside living crafts in Johari and Bapu bazaars.",
      "Combine with Agra and Delhi for classic Golden Triangle routes or extend to Jodhpur and Udaipur for desert-lake contrasts.",
    ],
    attractions: [
      { name: "Amber Fort", description: "Hilltop Rajput fort with mirror palace halls — go early for fewer crowds.", duration: "3–4 hours" },
      { name: "Hawa Mahal", description: "Iconic five-storey façade for royal women to watch street festivals.", duration: "1 hour" },
      { name: "City Palace", description: "Still partly royal residence with museums and courtyards.", duration: "2–3 hours" },
    ],
    highlights: ["Sunrise at Amer", "Rajasthani thali food tours", "Block printing workshops in Sanganer"],
    travelTips: ["Carry sun protection year-round", "Negotiate autorickshaw fares before boarding"],
    seoTitle: "Jaipur Tourism Guide 2026 | Rajasthan Packages | MQT",
    seoDescription: "Jaipur forts, markets, best months & Golden Triangle tour packages from My Quick Trippers.",
  },
  ladakh: {
    shortDescription: "High-altitude desert of monasteries, Pangong Lake, and Khardung La — acclimatise in Leh first.",
    overviewParagraphs: [
      "Ladakh's Buddhist culture, stark landscapes, and oxygen-thin passes require careful pacing. Most travellers fly into Leh, rest 24–48 hours, then explore Nubra, Pangong, and monasteries like Thiksey and Hemis.",
      "Inner Line Permits apply for certain valleys; Indian nationals need valid photo ID. MQT Ladakh circuits include homestays and responsible drivers familiar with AMS protocols.",
    ],
    attractions: [
      { name: "Pangong Lake", description: "Colour-shifting brackish lake — overnight camps on east bank permits.", duration: "2 days" },
      { name: "Nubra Valley", description: "Sand dunes, double-humped camels, and Diskit monastery.", duration: "2–3 days" },
      { name: "Thiksey Monastery", description: "12-storey gelugpa complex resembling Potala.", duration: "2 hours" },
    ],
    highlights: ["Monastery festivals (summer)", "Stok Kangri views", "Apricot harvest in Hemis Shukpachan"],
    travelTips: ["Carry photocopies for permits", "No littering — carry waste back from lakes", "Avoid alcohol first 48 hours at altitude"],
    seoTitle: "Ladakh Travel Guide 2026 | Leh Packages | My Quick Trippers",
    seoDescription: "Ladakh best season, acclimatisation tips, Pangong-Nubra itineraries & curated high-altitude tours.",
  },
  varanasi: {
    shortDescription: "Living spiritual city on the Ganges — dawn boat rides, ghats, and Banarasi silk lanes.",
    overviewParagraphs: [
      "Varanasi (Kashi) is among the world's oldest continuously inhabited cities. Pilgrims bathe at dawn, priests perform Ganga Aarti at Dashashwamedh Ghat, and narrow galis hide silk weavers and street food legends.",
      "Allow two nights minimum to absorb rhythm — sunrise boating is non-negotiable for first-time visitors.",
    ],
    attractions: [
      { name: "Dashashwamedh Ghat Aarti", description: "Evening lamp ceremony — arrive 45 minutes early for riverside seats.", duration: "1 hour" },
      { name: "Sunrise Boat Ride", description: "Row from Assi to Manikarnika watching the city wake.", duration: "90 min" },
      { name: "Sarnath", description: "Buddha's first sermon site — museums and stupas 13 km away.", duration: "Half day" },
    ],
    highlights: ["Banarasi paan and kachori alleys", "Silk weaving demonstrations", "Dev Deepawali (Nov) lamp festival"],
    travelTips: ["Wear easy-remove footwear for temple visits", "Respect photography rules at cremation ghats"],
    seoTitle: "Varanasi Travel Guide 2026 | Ganges Tours | MQT",
    seoDescription: "Varanasi ghats, boat rides, best time to visit & spiritual tour packages across North India.",
  },
  goa: {
    shortDescription: "Coastal state mixing Portuguese heritage, beach shacks, and spice plantation hinterlands.",
    overviewParagraphs: [
      "North Goa pulses with Baga–Calangute nightlife; South Goa offers quieter Colva and Palolem crescents. Monsoon greens the countryside for waterfall treks without beach swimming.",
      "MQT Goa packages blend heritage Old Goa churches, Dudhsagar day trips, and boutique stays.",
    ],
    attractions: [
      { name: "Basilica of Bom Jesus", description: "UNESCO church holding St. Francis Xavier relics.", duration: "1 hour" },
      { name: "Fort Aguada", description: "17th-century Portuguese fort with lighthouse views.", duration: "2 hours" },
      { name: "Spice Plantations", description: "Ponda hinterland tours with traditional lunch.", duration: "Half day" },
    ],
    highlights: ["Beach shack sunsets", "Feni tasting (of age)", "Dolphin spotting (Oct–May)"],
    travelTips: ["Rent scooters only if confident on Indian roads", "Pre-book Dec–Jan peak season flights"],
    seoTitle: "Goa Holiday Guide 2026 | Beach Packages | My Quick Trippers",
    seoDescription: "North vs South Goa, best season, heritage sites & family beach packages from MQT.",
  },
  nainital: {
    shortDescription:
      "Kumaon lake town at 2,084 m — Naini Lake boating, Mall Road, and day trips to Bhimtal and Sattal.",
    overviewParagraphs: [
      "Nainital wraps around a mango-shaped lake in the Kumaon Hills. Colonial-era schools, rowboats, and viewpoints like Snow View and Tiffin Top make it a family favourite from Delhi and the plains.",
      "Combine with Corbett safaris or Mussoorie for a week-long Uttarakhand sampler. Winters can bring light snow on surrounding ridges.",
    ],
    attractions: [
      { name: "Naini Lake", description: "Pedal and row boats; evening walks on the Mall.", duration: "2–3 hours" },
      { name: "Snow View Point", description: "Cable car or trek for Himalayan peaks on clear days.", duration: "Half day" },
      { name: "Bhimtal & Sattal", description: "Quieter lakes with aquarium and birding.", duration: "Full day" },
    ],
    highlights: ["Lake boating", "Mall Road shopping", "Zoo and eco cave gardens", "Kumaoni cuisine"],
    travelTips: ["Parking near Mall is limited — use hotel shuttles", "Book lake-facing rooms early for summer"],
    seoTitle: "Nainital Travel Guide 2026 | Lake Holidays Uttarakhand | MQT",
    seoDescription: "Nainital lake tours, best season, Bhimtal day trips & Uttarakhand package deals.",
  },
  haridwar: {
    shortDescription:
      "Gateway to Char Dham on the Ganges — Ganga Aarti at Har Ki Pauri and access to Rishikesh & Rajaji.",
    overviewParagraphs: [
      "Haridwar is where the Ganga leaves the mountains for the plains. Pilgrims bathe at Har Ki Pauri; adventure travellers use it as a base for Rishikesh rafting and Corbett.",
      "MQT yatra packages stage here before Kedarnath, Badrinath, or Hemkund routes with verified transport partners.",
    ],
    attractions: [
      { name: "Har Ki Pauri Ganga Aarti", description: "Evening lamp ceremony — arrive early for ghats seating.", duration: "1 hour" },
      { name: "Chandi Devi / Mansa Devi", description: "Hilltop shrines via cable car.", duration: "Half day" },
      { name: "Rajaji Tiger Reserve", description: "Jeep safaris on city outskirts.", duration: "3 hours" },
    ],
    highlights: ["Spiritual bathing ghats", "Char Dham road start", "Street food and bazaar"],
    travelTips: ["Secure footwear in crowds during Kumbh periods", "Respect no-alcohol zones near temples"],
    seoTitle: "Haridwar Travel Guide 2026 | Ganga Aarti & Yatra | MQT",
    seoDescription: "Haridwar ghats, best time, Char Dham packages & Ganges tours from My Quick Trippers.",
  },
  kerala: {
    shortDescription: "Backwaters, Ayurveda retreats, and Malabar spice coast — God's Own Country slow travel.",
    overviewParagraphs: [
      "Kerala strings together Alleppey houseboats, Munnar tea estates, Fort Kochi synagogues, and Wayanad rainforest lodges. Monsoon (Jun–Sep) powers Ayurveda therapies while winter suits beach time in Varkala.",
    ],
    attractions: [
      { name: "Alleppey Houseboats", description: "Overnight kettuvallam cruises through paddy-fringed canals.", duration: "1–2 nights" },
      { name: "Munnar Tea Gardens", description: "Eravikulam NP nearby for Nilgiri tahr sightings.", duration: "2 days" },
      { name: "Fort Kochi", description: "Chinese fishing nets, biennale art, and seafood.", duration: "1 day" },
    ],
    highlights: ["Kathakali performances", "Periyar wildlife boat safaris", "Onam festival decor (Aug–Sep)"],
    travelTips: ["Confirm houseboat AC vs non-AC pricing", "Carry rain shells for monsoon Ayurveda stays"],
    seoTitle: "Kerala Tour Guide 2026 | Backwater Packages | MQT",
    seoDescription: "Kerala itineraries: houseboats, Munnar, Kochi & customised South India packages.",
  },
  udaipur: {
    shortDescription: "City of Lakes — marble palaces, Lake Pichola cruises, and living Rajasthani craft traditions.",
    overviewParagraphs: [
      "Udaipur's Mewar dynasty left a skyline of island palaces and whitewashed havelis reflected in Lake Pichola. It is India's most popular wedding and honeymoon destination after Goa, with year-round cultural performances and rooftop dining.",
      "Pair with Jodhpur's blue city or Jaipur's forts on a week-long Rajasthan loop.",
    ],
    attractions: [
      { name: "City Palace Complex", description: "Museum, courtyards, and boat jetty to Jag Mandir.", duration: "3 hours" },
      { name: "Lake Pichola", description: "Sunset boat ride past Lake Palace hotel.", duration: "1 hour" },
      { name: "Monsoon Palace (Sajjangarh)", description: "Hilltop sunset over Aravalli ranges.", duration: "2 hours" },
    ],
    highlights: ["Heritage walks in old city", "Shilpgram crafts fair (winter)", "Bagore ki Haveli dance show"],
    travelTips: ["Book lake-view hotels months ahead for Dec–Feb weddings season", "Carry scarf for temple dress codes"],
    seoTitle: "Udaipur Travel Guide 2026 | Rajasthan Lake City | MQT",
    seoDescription: "Udaipur palaces, best time, honeymoon packages & Rajasthan tours.",
  },
  agra: {
    shortDescription: "Home of the Taj Mahal — Mughal mausoleums, Agra Fort, and Fatehpur Sikri day trips.",
    overviewParagraphs: [
      "Agra sits on the Yamuna where Shah Jahan built the Taj Mahal in white Makrana marble. Sunrise visits minimise crowds; combine with Agra Fort and Itimad-ud-Daulah (Baby Taj) on the same day.",
      "Fatehpur Sikri, Akbar's abandoned capital, lies 40 km west — essential add-on for Golden Triangle tours.",
    ],
    attractions: [
      { name: "Taj Mahal", description: "Closed Fridays; full-moon night viewing limited tickets.", duration: "2–3 hours" },
      { name: "Agra Fort", description: "Red sandstone seat of Mughal power — views to Taj across river.", duration: "2 hours" },
      { name: "Fatehpur Sikri", description: "Buland Darwaza and palace complex — go early.", duration: "Half day" },
    ],
    highlights: ["Marble inlay craft demos", "Mughlai petha sweets", "Yamuna riverfront at dusk"],
    travelTips: ["Taj closed every Friday", "Use official ASI guides at monuments"],
    seoTitle: "Agra Taj Mahal Guide 2026 | Golden Triangle | MQT",
    seoDescription: "Taj Mahal timings, Agra Fort, Fatehpur Sikri & Golden Triangle packages.",
  },
  srinagar: {
    shortDescription: "Summer capital of Kashmir — Dal Lake houseboats, Mughal gardens, and handicraft souks.",
    overviewParagraphs: [
      "Srinagar blends shikara commutes, walnut wood carving, and saffron kahwa tea on houseboat decks. Base here for Gulmarg skiing (winter) and Pahalgam valley drives.",
      "Check travel advisories seasonally; MQT monitors road and flight status for booked guests.",
    ],
    attractions: [
      { name: "Dal & Nigeen Lakes", description: "Houseboat stays and floating vegetable market (dawn).", duration: "Half day" },
      { name: "Mughal Gardens", description: "Nishat and Shalimar terraced chinars.", duration: "3 hours" },
      { name: "Old City", description: "Jamia Masjid, Shah Hamdan shrine, spice lanes.", duration: "2 hours" },
    ],
    highlights: ["Kashmiri wazwan feast", "Pashmina weaving demos", "Tulip garden (spring)"],
    travelTips: ["Carry photo ID for checkpoints", "Book houseboats via licensed owners"],
    seoTitle: "Srinagar Kashmir Guide 2026 | Dal Lake Tours | MQT",
    seoDescription: "Srinagar houseboats, Gulmarg trips & Kashmir honeymoon packages.",
  },
  munnar: {
    shortDescription: "Tea-country hills at 1,600 m — estates, Eravikulam NP, and misty drives from Kochi.",
    overviewParagraphs: [
      "Munnar was opened by British planters; today Tata Tea Museum and endless emerald slopes define the landscape. Nilgiri tahr sightings in Eravikulam NP peak during Jan–Apr calving season.",
    ],
    attractions: [
      { name: "Tea Museum", description: "Processing demo and estate history.", duration: "1 hour" },
      { name: "Eravikulam National Park", description: "Tahr viewpoints — online tickets required.", duration: "3 hours" },
      { name: "Mattupetty Dam", description: "Boating and dairy farm visit.", duration: "Half day" },
    ],
    highlights: ["Top Station Tamil Nadu border views", "Anayirangal dam picnic", "Local cardamom shops"],
    travelTips: ["Park closed Feb–Mar for tahr calving (verify dates yearly)", "Narrow roads — day drives only recommended"],
    seoTitle: "Munnar Travel Guide 2026 | Kerala Tea Hills | MQT",
    seoDescription: "Munnar tea estates, Eravikulam NP & Kerala hill station packages.",
  },
  alleppey: {
    shortDescription: "Venice of the East — backwater houseboats through coconut canals and paddy fringes.",
    overviewParagraphs: [
      "Alleppey (Alappuzha) launches thousands of kettuvallam houseboats into Vembanad Lake's labyrinth. One-night cruises include onboard chef; day cruises suit tighter budgets.",
    ],
    attractions: [
      { name: "Houseboat Cruise", description: "Overnight with AC cabin options Nov–Feb peak.", duration: "1 night" },
      { name: "Alleppey Beach", description: "Pier and lighthouse — sunset crowds.", duration: "1 hour" },
      { name: "Marari Beach", description: "Quieter coast 16 km north.", duration: "Half day" },
    ],
    highlights: ["Nehru Trophy snake boat race (Aug)", "Coir village visits", "Kerala seafood on deck"],
    travelTips: ["Confirm cruise route length (standard 22 km loop)", "Mosquito repellent for evenings"],
    seoTitle: "Alleppey Backwaters Guide 2026 | Houseboat Kerala | MQT",
    seoDescription: "Alleppey houseboat rates, best season & Kerala backwater tours.",
  },
  hampi: {
    shortDescription: "Boulder-strewn UNESCO site — Vijayanagara empire ruins on the Tungabhadra.",
    overviewParagraphs: [
      "Hampi's 1,600+ protected monuments span royal enclosures, elephant stables, and the iconic stone chariot at Vittala Temple. Bouldering and coracle ferries add adventure to history.",
    ],
    attractions: [
      { name: "Vittala Temple", description: "Stone chariot and musical pillars hall.", duration: "2 hours" },
      { name: "Virupaksha Temple", description: "Active shrine at heart of site.", duration: "1 hour" },
      { name: "Matanga Hill", description: "Sunrise panorama over ruins.", duration: "90 min" },
    ],
    highlights: ["Hippie island cafés across river", "Coracle ride to Anegundi", "Heritage cycle tours"],
    travelTips: ["Start at dawn to avoid heat Oct–Mar", "Wear sturdy shoes on granite terrain"],
    seoTitle: "Hampi Heritage Guide 2026 | Karnataka UNESCO | MQT",
    seoDescription: "Hampi ruins map, best season & Karnataka heritage packages.",
  },
  "jim-corbett": {
    shortDescription: "India's first national park — Bengal tiger, elephant, and birding in Sal forests.",
    overviewParagraphs: [
      "Corbett (861 sq km) spans Ramganga valley in Uttarakhand with zones Bijrani, Jhirna, Dhikala, and Durgadevi. Jeep safaris at dawn and dusk offer best predator sightings; Dhikala night stay inside core needs early booking.",
    ],
    attractions: [
      { name: "Jeep Safari", description: "Zone assigned by forest lottery — book via MQT.", duration: "3 hours" },
      { name: "Corbett Museum", description: "Jim Corbett's legacy at Kaladhungi.", duration: "1 hour" },
      { name: "Garjia Temple", description: "Riverside shrine inside park buffer.", duration: "1 hour" },
    ],
    highlights: ["Mahseer fishing (permit)", "Birding for hornbills and fish eagles", "Kosi river relaxation"],
    travelTips: ["Safari permits sell out on holidays — book 30+ days ahead", "No plastic inside park"],
    seoTitle: "Jim Corbett Safari Guide 2026 | Tiger Uttarakhand | MQT",
    seoDescription: "Corbett safari zones, best time & wildlife packages from Delhi.",
  },
  leh: {
    shortDescription: "High-altitude desert capital — monasteries, markets, and gateway to Nubra & Pangong.",
    overviewParagraphs: [
      "Leh (3,500 m) requires 24–48 hours acclimatisation before crossing Khardung La or visiting Pangong. Summer (Jun–Sep) is the main season; winters are harsh with limited flights.",
    ],
    attractions: [
      { name: "Leh Palace & Tsemo", description: "Nine-storey royal ruin overlooking town.", duration: "2 hours" },
      { name: "Thiksey Monastery", description: "12-storey gelugpa complex resembling Potala.", duration: "2 hours" },
      { name: "Shanti Stupa", description: "Japanese peace pagoda sunset spot.", duration: "1 hour" },
    ],
    highlights: ["Leh Main Bazaar apricots", "Sindhu Ghat festival site", "Motorcycle expeditions"],
    travelTips: ["Carry photocopies for inner-line permits", "Avoid strenuous activity day one"],
    seoTitle: "Leh Ladakh Guide 2026 | High Altitude Tours | MQT",
    seoDescription: "Leh acclimatisation, Pangong trips & Ladakh bike packages.",
  },
  coorg: {
    shortDescription: "Kodagu coffee country — misty plantations, Abbey Falls, and Tibetan Bylakuppe nearby.",
    overviewParagraphs: [
      "Coorg (Kodagu) supplies much of India's coffee; estate homestays offer plantation walks and pepper tastings. Dubare elephant camp and Nagarhole NP are within day-trip range.",
    ],
    attractions: [
      { name: "Coffee Estate Walk", description: "Harvest season Dec–Feb.", duration: "2 hours" },
      { name: "Abbey & Iruppu Falls", description: "Monsoon-swollen cascades in rainforest.", duration: "Half day" },
      { name: "Talacauvery", description: "Origin shrine of river Cauvery.", duration: "3 hours" },
    ],
    highlights: ["Pandi curry & bamboo shoot dishes", "Bylakuppe Golden Temple", "White-water rafting Barapole (seasonal)"],
    travelTips: ["Mountain roads after rain — allow buffer time", "Book estate stays for authentic meals"],
    seoTitle: "Coorg Travel Guide 2026 | Karnataka Coffee Hills | MQT",
    seoDescription: "Coorg homestays, waterfalls & Karnataka weekend packages.",
  },
  darjeeling: {
    shortDescription: "Queen of the Hills (East) — tea, toy train, and Kanchenjunga sunrise at Tiger Hill.",
    overviewParagraphs: [
      "Darjeeling's Happy Valley Tea Estate, Himalayan Railway UNESCO line, and mix of Gorkha, Bengali, and Tibetan cultures create a distinct hill station unlike the north.",
    ],
    attractions: [
      { name: "Tiger Hill", description: "4 AM start for Kanchenjunga sunrise — pre-book jeep.", duration: "3 hours" },
      { name: "Darjeeling Himalayan Railway", description: "Joy ride to Ghum — India's highest station.", duration: "2 hours" },
      { name: "Peace Pagoda", description: "Japanese stupa with valley views.", duration: "1 hour" },
    ],
    highlights: ["Momos on Mall Road", "Tea tasting sessions", "Padmaja Naidu Himalayan Zoo (red panda)"],
    travelTips: ["Carry umbrella year-round", "Toy train tickets sell out in peak season"],
    seoTitle: "Darjeeling Travel Guide 2026 | Tea & Kanchenjunga | MQT",
    seoDescription: "Darjeeling toy train, Tiger Hill & Sikkim combo packages.",
  },
  amritsar: {
    shortDescription: "Sikh spiritual heart — Golden Temple sarovar, Jallianwala Bagh, and Wagah border ceremony.",
    overviewParagraphs: [
      "Amritsar's Harmandir Sahib (Golden Temple) feeds thousands daily at langar. Evening Palki Sahib ceremony is moving for all faiths. Wagah-Attari border parade is a 30 km drive.",
    ],
    attractions: [
      { name: "Golden Temple", description: "Cover head, wash feet, clockwise parikrama.", duration: "2–3 hours" },
      { name: "Wagah Border", description: "Retreat ceremony before sunset — arrive early.", duration: "Half day" },
      { name: "Partition Museum", description: "Town Hall exhibits on 1947.", duration: "1 hour" },
    ],
    highlights: ["Amritsari kulcha alley", "Durgiana Temple", "Pul Kanjari heritage site"],
    travelTips: ["No alcohol/tobacco in temple zone", "Saturday border crowds heaviest"],
    seoTitle: "Amritsar Golden Temple Guide 2026 | Punjab Tours | MQT",
    seoDescription: "Amritsar darshan timings, Wagah border & Punjab pilgrimage packages.",
  },
  tirupati: {
    shortDescription: "Tirumala Venkateswara Temple — world's busiest pilgrimage hill with laddu prasadam.",
    overviewParagraphs: [
      "Tirupati in Andhra Pradesh draws millions annually to Tirumala's hill shrine. VIP darshan tickets, hair offering (tonsuring), and Govindaraja temple in town require planning through official TTD or MQT partners.",
    ],
    attractions: [
      { name: "Tirumala Temple", description: "Darshan queues vary — book quota tickets online.", duration: "4–8 hours" },
      { name: "Silathoranam", description: "Natural rock arch near temple.", duration: "30 min" },
      { name: "Kapila Theertham", description: "Waterfall temple at foot of hills.", duration: "1 hour" },
    ],
    highlights: ["Tirupati laddu prasadam", "Sri Venkateswara museum", "Chandragiri Fort day trip"],
    travelTips: ["Follow temple dress code strictly", "Mobile phones banned in inner sanctum"],
    seoTitle: "Tirupati Darshan Guide 2026 | Tirumala Yatra | MQT",
    seoDescription: "Tirupati VIP darshan help, best time & South India temple tours.",
  },
  lonavala: {
    shortDescription: "Mumbai-Pune weekend hills — monsoon waterfalls, chikki fudge, and misty Western Ghats.",
    overviewParagraphs: [
      "Lonavala and twin Khandala sit on the Mumbai-Pune expressway with viewpoints, caves (Karla-Bhaja nearby), and chikki shops. Peak green season Jul–Sep; winter clear views Dec–Feb.",
    ],
    attractions: [
      { name: "Tiger's Leap", description: "Cliff viewpoint — cautious in rain.", duration: "1 hour" },
      { name: "Bhushi Dam", description: "Stepped waterfall crowds in monsoon.", duration: "2 hours" },
      { name: "Lohagad Fort", description: "Monsoon trek to Vinchu Kata ridge.", duration: "Half day" },
    ],
    highlights: ["Chikki and fudge shops", "Pawna Lake camping", "Expressway weekend escape"],
    travelTips: ["Avoid driving in zero visibility fog", "Weekend traffic from Mumbai heavy"],
    seoTitle: "Lonavala Weekend Guide 2026 | Maharashtra Hills | MQT",
    seoDescription: "Lonavala monsoon trips, viewpoints & Mumbai weekend packages.",
  },
  pondicherry: {
    shortDescription: "French Quarter lanes, Auroville, and calm beaches on the Tamil Nadu coast.",
    overviewParagraphs: [
      "Puducherry preserves colonial grid streets, Sri Aurobindo Ashram, and seaside promenade cycling. Auroville's Matrimandir needs prior booking; Paradise Beach is a ferry ride away.",
    ],
    attractions: [
      { name: "White Town", description: "Pastel villas, cafés, and Basilica.", duration: "Half day" },
      { name: "Auroville", description: "Matrimandir viewing slot — book online.", duration: "3 hours" },
      { name: "Paradise Beach", description: "Ferry from Chunnambar boat house.", duration: "Half day" },
    ],
    highlights: ["Promenade sunrise joggers", "French bakeries", "Scuba at Temple Reef (seasonal)"],
    travelTips: ["Sunday promenade closed to vehicles — walkable", "Carry cash for beach shacks"],
    seoTitle: "Pondicherry Travel Guide 2026 | Auroville Tours | MQT",
    seoDescription: "Pondicherry French town, Auroville & Chennai weekend packages.",
  },
  "havelock-island": {
    shortDescription: "Andaman's flagship beach — Radhanagar sunset, scuba, and reef snorkelling.",
    overviewParagraphs: [
      "Havelock (Swaraj Dweep) offers Radhanagar Beach (Asia's best beach lists), Elephant Beach snorkelling, and PADI dive centres. Ferries from Port Blair take 1.5–2.5 hours depending on vessel.",
    ],
    attractions: [
      { name: "Radhanagar Beach", description: "Beach 7 — sunset photography hotspot.", duration: "2 hours" },
      { name: "Elephant Beach", description: "Speedboat + snorkel with coral.", duration: "Half day" },
      { name: "Scuba Dive", description: "Discover scuba or certified dives — seasonal visibility best Feb–May.", duration: "Half day" },
    ],
    highlights: ["Bioluminescence kayak (new moon)", "Neil Island day trip", "Seafood beach BBQ"],
    travelTips: ["Book ferries in advance peak Dec–Jan", "No plastic on beaches — fines apply"],
    seoTitle: "Havelock Island Guide 2026 | Andaman Beaches | MQT",
    seoDescription: "Havelock diving, Radhanagar Beach & Andaman island packages.",
  },
  "spiti-valley": {
    shortDescription: "Cold desert trans-Himalaya — Key Monastery, Kaza, and high villages above 3,800 m.",
    overviewParagraphs: [
      "Spiti opens via Manali-Rohtang (summer) or Shimla-Kinnaur year-round with longer approach. Buddhist gompas, fossil villages, and starry skies define this remote circuit; minimum 7–8 days recommended.",
    ],
    attractions: [
      { name: "Key Monastery", description: "Thousand-year-old gelugpa gompa above Spiti River.", duration: "2 hours" },
      { name: "Chandratal Lake", description: "Camping at moon lake — 4,300 m.", duration: "Overnight" },
      { name: "Pin Valley NP", description: "Snow leopard habitat — winter expeditions.", duration: "Full day" },
    ],
    highlights: ["Komic highest village café", "Tabo ancient murals", "Spitian butter tea hospitality"],
    travelTips: ["AMS risk — ascend slowly", "Carry cash — few ATMs in Kaza"],
    seoTitle: "Spiti Valley Guide 2026 | Himachal Desert | MQT",
    seoDescription: "Spiti road trip season, Key Monastery & adventure packages.",
  },
  ranthambore: {
    shortDescription: "Rajasthan's iconic tiger reserve — fort ruins rising above sal forest lakes.",
    overviewParagraphs: [
      "Ranthambore's tigers are habituated to jeeps, making it India's most reliable big-cat photography park. Zones 1–10 allocate by forest lottery; combine with Jaipur for heritage+tiger week.",
    ],
    attractions: [
      { name: "Jeep / Canter Safari", description: "3-hour slots dawn and dusk.", duration: "3 hours" },
      { name: "Ranthambore Fort", description: "Ganesh temple inside park buffer.", duration: "2 hours" },
      { name: "Padam Talao", description: "Lotus lake where tigers swim in heat.", duration: "Via safari" },
    ],
    highlights: ["Tiger photography", "Rajbagh ruins", "Chambal river gharial trip (extension)"],
    travelTips: ["Book safaris 90 days ahead online", "Neutral clothing, no bright colours"],
    seoTitle: "Ranthambore Safari Guide 2026 | Tiger Rajasthan | MQT",
    seoDescription: "Ranthambore tiger zones, booking tips & wildlife Rajasthan tours.",
  },
};
