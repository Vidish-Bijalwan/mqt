/**
 * Rich package copy for menu-driven and key tour slugs.
 */
export interface PackageContentOverride {
  overview: string;
  itineraryHighlights: string[];
  inclusions?: string[];
  exclusions?: string[];
  linkedItinerarySlug?: string;
}

export const packageContentOverrides: Record<string, PackageContentOverride> = {
  "mussoorie-weekend-retreat": {
    linkedItinerarySlug: "romantic-uttaranchal",
    overview:
      "Escape to the Queen of Hills on a compact 3-day break from Delhi or Dehradun. This Mussoorie weekend covers Mall Road evenings, Kempty Falls, Gun Hill ropeway, and optional Landour heritage time — with handpicked mid-range hotels and private cab transfers so you skip queue-heavy shared taxis on the climb from Dehradun.\n\nIdeal for couples, families, and first-time Uttarakhand visitors who want mountain air without a long trek. Extend to 5–7 days to combine Corbett safari or Nainital lake circuit (see Romantic Uttaranchal itinerary).",
    itineraryHighlights: [
      "Day 1: Pick-up from Delhi/Dehradun — scenic drive via Dehradun to Mussoorie, check-in, Mall Road & Library Bazaar evening walk",
      "Day 2: Kempty Falls morning visit, Gun Hill cable car, Company Garden; optional Lal Tibba sunset viewpoint",
      "Day 3: Landour bakeries & short heritage walk, checkout and drop to Dehradun/Delhi with photo stops",
    ],
    inclusions: [
      "2 nights hotel in Mussoorie (twin sharing) with breakfast",
      "Private AC vehicle for sightseeing and transfers as per itinerary",
      "Driver allowances, tolls, and parking",
      "MQT trip coordinator support on WhatsApp",
    ],
    exclusions: [
      "Lunch, dinner, and personal expenses",
      "Gun Hill ropeway / adventure activity tickets",
      "Travel insurance and monument entry fees",
      "Helicopter or pony charges if added later",
    ],
  },
  "harshil-valley-4-day-package": {
    overview:
      "Four-day ecological immersion in Harshil Valley along the Bhagirathi — deodar forests, apple orchards, and Bhotiya village culture. Exclusive small-group departure with limited seats.",
    itineraryHighlights: [
      "Day 1: Arrival Uttarkashi / Harshil — riverside check-in & acclimatisation walk",
      "Day 2: Dharali village, apple belt trails, local handloom interactions",
      "Day 3: Mukhba temple circuit & Bhagirathi gorge viewpoints",
      "Day 4: Departure with optional Gangotri extension on request",
    ],
    inclusions: ["Eco-lodge stays", "All meals", "Naturalist guide", "Permits assistance"],
    exclusions: ["Personal gear", "Gangotri extension transport unless booked"],
  },
  "romantic-uttaranchal": {
    overview:
      "Classic 7-day Uttarakhand loop: Delhi, Mussoorie hill station, Corbett wildlife, and Nainital lakes — balanced for families and honeymooners wanting variety without extreme trekking.",
    itineraryHighlights: [
      "Day 1: Delhi arrival — transfer to Mussoorie",
      "Day 2: Mussoorie local — Municipal Garden, Gun Hill, Mussoorie Lake, Mall",
      "Day 3: Drive to Corbett National Park",
      "Day 4: Optional Corbett jeep safari (morning)",
      "Day 5: Corbett to Nainital — Naini Lake & Mall",
      "Day 6: Bhimtal, Sattal, Naukuchiatal excursion",
      "Day 7: Return to Delhi",
    ],
    inclusions: [
      "6 nights accommodation with breakfast",
      "AC transport throughout the circuit",
      "Driver allowance and interstate taxes",
    ],
    exclusions: ["Lunch and dinner", "Safari gate fees", "Guide tips", "Flights or trains to Delhi"],
  },
  "golden-triangle-classic": {
    linkedItinerarySlug: "golden-triangle",
    overview:
      "India's most booked heritage circuit — Delhi's Mughal and colonial landmarks, sunrise at the Taj Mahal in Agra, and Jaipur's forts and bazaars. Six days at a comfortable pace with private AC car, licensed guides at monuments, and MQT hotel shortlists in each city.\n\nIdeal for first-time India visitors, families, and photography-focused groups. Upgrade to luxury palaces or add Ranthambore tiger safari on request.",
    itineraryHighlights: [
      "Day 1: Delhi arrival — India Gate drive, Qutub Minar & Humayun's Tomb (time permitting)",
      "Day 2: Old Delhi — Jama Masjid, Chandni Chowk rickshaw, Red Fort exterior",
      "Day 3: Delhi to Agra — Taj Mahal at sunrise or sunset, Agra Fort",
      "Day 4: Agra to Jaipur via Fatehpur Sikri — check-in Pink City",
      "Day 5: Jaipur — Amber Fort jeep, Hawa Mahal, City Palace & Jantar Mantar",
      "Day 6: Jaipur to Delhi — drop airport or station",
    ],
  },
  "royal-rajasthan-family-escape": {
    linkedItinerarySlug: "rajasthan-tour",
    overview:
      "Family-friendly Rajasthan sampler linking Jaipur's Amber Fort and bazaars with Udaipur's lakes and palaces. Paced for children and grandparents with AC transport, pool hotels, and optional puppet show or cooking class add-ons.",
    itineraryHighlights: [
      "Day 1: Arrive Jaipur — evening Johari Bazaar walk",
      "Day 2: Amber Fort elephant/jeep, City Palace, Hawa Mahal photo stop",
      "Day 3: Drive to Udaipur — Lake Pichola evening",
      "Day 4: City Palace, boat ride, Saheliyon ki Bari gardens",
      "Day 5: Optional Eklingji & Nagda temples",
      "Day 6: Udaipur to Jaipur/Delhi for departure",
    ],
  },
  "kerala-family-escape": {
    linkedItinerarySlug: "kerala-delight",
    overview:
      "Classic Kerala family route: misty Munnar tea country, Periyar wildlife boat cruise, and Alleppey houseboat night. Balanced driving distances, child-friendly resorts, and vegetarian meal coordination on request.",
    itineraryHighlights: [
      "Day 1: Kochi airport — Fort Kochi Chinese nets & synagogue",
      "Day 2: Kochi to Munnar — tea museum, Photo Point",
      "Day 3: Munnar — Eravikulam NP (seasonal), spice plantation",
      "Day 4: Munnar to Thekkady — Periyar lake boat safari",
      "Day 5: Thekkady to Alleppey — houseboat check-in & cruise",
      "Day 6: Alleppey to Kochi — Marari beach optional",
      "Day 7: Departure from Kochi",
    ],
  },
  "char-dham-yatra": {
    linkedItinerarySlug: "chardham-yatra",
    overview:
      "Complete Char Dham pilgrimage — Yamunotri, Gangotri, Kedarnath, and Badrinath — with road transport, verified stays in Guptkashi, Sonprayag, and Joshimath, and assistance for pony, helicopter, or trek segments. Seasonal May–November operations only.",
    itineraryHighlights: [
      "Day 1–2: Haridwar/Rishikesh — Ganga Aarti, yatra registration briefing",
      "Day 3–4: Yamunotri & Gangotri darshan circuits from Uttarkashi belt",
      "Day 5–7: Kedarnath — trek or helicopter from Sonprayag/Phata",
      "Day 8–10: Badrinath temple & Mana village (last village)",
      "Day 11: Return descent to Haridwar/Delhi",
    ],
    inclusions: [
      "Hotels and camps as per yatra season availability",
      "AC tempo traveller or SUV on Char Dham route",
      "MQT yatra coordinator and helpline",
      "Assistance for helicopter / pony booking (fare extra)",
    ],
    exclusions: [
      "Pony, palki, helicopter, and temple special darshan fees",
      "Meals during trek segments",
      "Medical or evacuation costs",
    ],
  },
  "kedarnath-yatra-5-nights-6-days": {
    linkedItinerarySlug: "chardham-yatra",
    overview:
      "Focused Kedarnath darshan package from Haridwar with acclimatised driving to Guptkashi/Sonprayag, guided trek or helicopter option to the temple (3,583 m), and buffer day for weather delays.",
    itineraryHighlights: [
      "Day 1: Haridwar arrival — Ganga Aarti",
      "Day 2: Haridwar to Guptkashi/Sonprayag",
      "Day 3: Trek or helicopter to Kedarnath — darshan & overnight near shrine or return to base",
      "Day 4: Buffer / second darshan attempt if needed",
      "Day 5: Descent to Guptkashi",
      "Day 6: Return Haridwar or Delhi",
    ],
  },
  "goa-beach-escape": {
    linkedItinerarySlug: "goa-package-2",
    overview:
      "North Goa beaches (Baga, Calangute, Anjuna) plus South Goa heritage — Old Goa churches, spice plantation lunch, and optional Dudhsagar monsoon waterfall trip. Suited to couples and friend groups wanting nightlife and pool time.",
    itineraryHighlights: [
      "Day 1: Airport pickup — North Goa beach sunset",
      "Day 2: Water sports slot & Anjuna flea market (Wednesday)",
      "Day 3: Old Goa Basilica, Mangeshi temple, spice farm",
      "Day 4: South Goa — Palolem or Colva relax day",
      "Day 5: Checkout & departure",
    ],
  },
  "jim-corbett-safari": {
    linkedItinerarySlug: "romantic-uttaranchal",
    overview:
      "Wildlife long weekend in India's oldest national park — jeep safaris in Bijrani or Dhikala zones (subject to forest permits), riverside resort stay, and optional elephant safari. Combine with Nainital or Mussoorie for a full Uttarakhand week.",
    itineraryHighlights: [
      "Day 1: Delhi/Haridwar to Corbett — evening nature walk",
      "Day 2: Morning jeep safari — Bandar log bridge area birding",
      "Day 3: Second safari or elephant ride — checkout",
      "Day 4: Return transfer to Delhi",
    ],
    inclusions: [
      "3 nights forest-edge resort with meals plan as quoted",
      "2 jeep safaris (zone per permit availability)",
      "Park entry & guide fees where included in quote",
    ],
    exclusions: ["Camera fees", "Alcohol", "Dhikala night stay supplement if requested"],
  },
  "kashmir-honeymoon-5-nights-6-days": {
    linkedItinerarySlug: "best-of-kashmir",
    overview:
      "Romantic Kashmir circuit — Srinagar houseboat or lakeside hotel, Gulmarg gondola to Kongdori, and Pahalgam meadow walks. Includes shikara ride, saffron fields (seasonal), and photographer-friendly sunrise slots.",
    itineraryHighlights: [
      "Day 1: Srinagar — houseboat check-in & Dal Lake shikara",
      "Day 2: Mughal Gardens (Nishat, Shalimar) & old city",
      "Day 3: Srinagar to Gulmarg — gondola phase 1 & 2",
      "Day 4: Gulmarg to Pahalgam — Betaab Valley",
      "Day 5: Pahalgam leisure or Aru Valley",
      "Day 6: Return Srinagar airport",
    ],
  },
  "ladakh-motorbike-expedition": {
    overview:
      "Guided Royal Enfield expedition across Khardung La, Nubra Valley sand dunes, and Pangong Lake colour bands. Includes mechanic support vehicle, oxygen kits, and acclimatisation nights in Leh before high passes.",
    itineraryHighlights: [
      "Day 1–2: Leh acclimatisation — Shanti Stupa, Leh Palace",
      "Day 3: Leh to Nubra via Khardung La — Diskit monastery, Hunder dunes",
      "Day 4: Nubra to Pangong via Shyok (route per conditions)",
      "Day 5: Pangong sunrise — return Leh",
      "Day 6–7: Optional Tso Moriri or departure buffer",
    ],
    exclusions: ["Bike security deposit", "Fuel surcharges if policy changes", "ILP fees"],
  },
  "rishikesh-adventure-2-nights-3-days": {
    overview:
      "Adrenaline weekend on the Ganga — Grade III–IV rafting (16 km Shivpuri run), optional bungee at Mohan Chatti, riverside camp or boutique hostel, and evening Ganga Aarti at Parmarth Niketan.",
    itineraryHighlights: [
      "Day 1: Arrival — camp check-in, cliff-side café sunset",
      "Day 2: Morning rafting & optional bungee/zip-line — Aarti at dusk",
      "Day 3: Yoga session or Kunjapuri sunrise trek — checkout",
    ],
  },
  "udaipur-couple-retreat": {
    overview:
      "Intimate Udaipur escape — Lake Pichola boat ride, City Palace museum, Monsoon Palace sunset, and heritage haveli stay. Candlelight dinner and vintage car bazaar tour available as upgrades.",
    itineraryHighlights: [
      "Day 1: Arrival — Lake Pichola sunset cruise",
      "Day 2: City Palace, Jagdish Temple, old city walk",
      "Day 3: Monsoon Palace AM — craft village or spa PM — departure",
    ],
  },
  "andaman-coral-retreat": {
    linkedItinerarySlug: "andaman-package-1",
    overview:
      "Port Blair history (Cellular Jail light & sound) plus Havelock's Radhanagar Beach and snorkelling at Elephant Beach. Ferry timings and forest permits pre-arranged by MQT.",
    itineraryHighlights: [
      "Day 1: Port Blair — Cellular Jail & Corbyn's Cove",
      "Day 2: Ferry to Havelock — Radhanagar sunset",
      "Day 3: Elephant Beach snorkelling / scuba intro dive",
      "Day 4: Havelock to Neil Island — Bharatpur beach",
      "Day 5: Return Port Blair — Chatham Saw Mill optional",
      "Day 6: Airport drop",
    ],
  },
  "hampi-heritage-trail": {
    linkedItinerarySlug: "karnataka-heritage-tour-1",
    overview:
      "UNESCO Vijayanagara ruins at golden hour — Virupaksha Temple gopuram, Vittala stone chariot, royal enclosure, and Tungabhadra coracle ride. Best on foot or bicycle with early starts to avoid heat.",
    itineraryHighlights: [
      "Day 1: Hospet arrival — Virupaksha Temple & Hampi Bazaar",
      "Day 2: Vittala Temple, Queen's Bath, Hazara Rama Temple",
      "Day 3: Matanga Hill sunrise — Anegundi across river — departure",
    ],
  },
  "valley-of-flowers-trek-6-nights-7-days": {
    linkedItinerarySlug: "valley-of-flower-in-ladakh",
    overview:
      "Monsoon trek into UNESCO Valley of Flowers National Park (Jul–Sep bloom) with base at Ghangaria, day hike to Hemkund Sahib, and licensed guide. Requires moderate fitness and rain gear.",
    itineraryHighlights: [
      "Day 1: Haridwar/Rishikesh to Joshimath",
      "Day 2: Joshimath to Govindghat — trek start",
      "Day 3: Govindghat to Ghangaria (14 km)",
      "Day 4: Valley of Flowers full-day trek",
      "Day 5: Hemkund Sahib ascent",
      "Day 6–7: Descent & return to Haridwar",
    ],
  },
};
