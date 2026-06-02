/* eslint-disable */
// ──────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED FROM Discover India Packages.txt
// ──────────────────────────────────────────────────────────────────────────────

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface ItineraryPricing {
  startingPrice: number | null;
  priceLabel: string;
  priceDisclaimer: string;
}

export interface ItineraryRecord {
  id: string;
  slug: string;
  packageName: string;
  region: "North India" | "East India" | "Central India" | "West India" | "South India";
  duration: string;
  nights: number;
  days: number;
  placesCovered: string[];
  startingPoint: string;
  endingPoint: string;
  shortDescription: string;
  dayWiseItinerary: ItineraryDay[];
  pricing: ItineraryPricing;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  categoryTags: string[];
  image: string;
  seoTitle: string;
  seoDescription: string;
}

export const itineraries: ItineraryRecord[] = [
  {
    "id": "golden-triangle",
    "slug": "golden-triangle",
    "packageName": "Golden Triangle",
    "region": "North India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Delhi",
      "Agra",
      "Jaipur",
      "Delhi"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Delhi",
    "shortDescription": "Explore Delhi, Agra, Jaipur on a 6-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Agra",
      "Jaipur",
      "Delhi"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Golden Triangle Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Golden Triangle itinerary covering Delhi, Agra, Jaipur. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "delhi-agra",
    "slug": "delhi-agra",
    "packageName": "Delhi & Agra",
    "region": "North India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Delhi",
      "Agra",
      "Delhi"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Delhi",
    "shortDescription": "Explore Delhi, Agra, Delhi on a 4-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Agra",
      "Delhi"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Delhi & Agra Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Delhi & Agra itinerary covering Delhi, Agra, Delhi. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "rajasthan-tour",
    "slug": "rajasthan-tour",
    "packageName": "Rajasthan Tour",
    "region": "North India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Delhi",
      "Agra",
      "Jaipur",
      "Pushkar",
      "Udaipur",
      "Mount Abu",
      "Udaipur"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Udaipur",
    "shortDescription": "Explore Delhi, Agra, Jaipur on a 7-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Agra",
      "Jaipur",
      "Pushkar"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Rajasthan Tour Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Rajasthan Tour itinerary covering Delhi, Agra, Jaipur. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "golden-triangle-wildlife",
    "slug": "golden-triangle-wildlife",
    "packageName": "Golden Triangle & Wildlife",
    "region": "North India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Delhi",
      "Agra",
      "Ranthambore",
      "Jaipur"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Jaipur",
    "shortDescription": "Explore Delhi, Agra, Ranthambore on a 7-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Agra",
      "Ranthambore",
      "Jaipur"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Golden Triangle & Wildlife Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Golden Triangle & Wildlife itinerary covering Delhi, Agra, Ranthambore. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "himachal-delight",
    "slug": "himachal-delight",
    "packageName": "Himachal Delight",
    "region": "North India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Chandigarh",
      "Shimla",
      "Manali",
      "Chandigarh"
    ],
    "startingPoint": "Chandigarh",
    "endingPoint": "Chandigarh",
    "shortDescription": "Explore Chandigarh, Shimla, Manali on a 6-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Chandigarh",
      "Shimla",
      "Manali",
      "Chandigarh"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Himachal Delight Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Himachal Delight itinerary covering Chandigarh, Shimla, Manali. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "scenic-himachal-golden-temple",
    "slug": "scenic-himachal-golden-temple",
    "packageName": "Scenic Himachal & Golden Temple",
    "region": "North India",
    "duration": "7 Nights / 8 Days",
    "nights": 7,
    "days": 8,
    "placesCovered": [
      "Amritsar",
      "Dharamshala",
      "Dalhousie",
      "Chandigarh"
    ],
    "startingPoint": "Amritsar",
    "endingPoint": "Chandigarh",
    "shortDescription": "Explore Amritsar, Dharamshala, Dalhousie on a 8-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Amritsar",
      "Dharamshala",
      "Dalhousie",
      "Chandigarh"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Scenic Himachal & Golden Temple Itinerary | 8 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Scenic Himachal & Golden Temple itinerary covering Amritsar, Dharamshala, Dalhousie. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "romantic-uttaranchal",
    "slug": "romantic-uttaranchal",
    "packageName": "Romantic Uttaranchal",
    "region": "North India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Delhi",
      "Mussoorie",
      "Corbett",
      "Nainital",
      "Delhi"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Delhi",
    "shortDescription": "Explore Delhi, Mussoorie, Corbett on a 7-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Mussoorie",
      "Corbett",
      "Nainital"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Romantic Uttaranchal Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Romantic Uttaranchal itinerary covering Delhi, Mussoorie, Corbett. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "best-of-kashmir",
    "slug": "best-of-kashmir",
    "packageName": "Best of Kashmir",
    "region": "North India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Sringar",
      "Sonmarg",
      "Gulmarg",
      "Pahalgam",
      "Srinagar"
    ],
    "startingPoint": "Sringar",
    "endingPoint": "Srinagar",
    "shortDescription": "Explore Sringar, Sonmarg, Gulmarg on a 7-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Sringar",
      "Sonmarg",
      "Gulmarg",
      "Pahalgam"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Best of Kashmir Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Best of Kashmir itinerary covering Sringar, Sonmarg, Gulmarg. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "valley-of-flower-in-ladakh",
    "slug": "valley-of-flower-in-ladakh",
    "packageName": "Valley of Flower in Ladakh",
    "region": "North India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Leh",
      "Nubra Valley",
      "Pangong Lake",
      "Leh"
    ],
    "startingPoint": "Leh",
    "endingPoint": "Leh",
    "shortDescription": "Explore Leh, Nubra Valley, Pangong Lake on a 7-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Leh",
      "Nubra Valley",
      "Pangong Lake",
      "Leh"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Valley of Flower in Ladakh Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Valley of Flower in Ladakh itinerary covering Leh, Nubra Valley, Pangong Lake. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "vaishnodevi-with-jammu",
    "slug": "vaishnodevi-with-jammu",
    "packageName": "Vaishnodevi with Jammu",
    "region": "North India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Jammu",
      "Katra",
      "Vaishnodevi",
      "Jammu"
    ],
    "startingPoint": "Jammu",
    "endingPoint": "Jammu",
    "shortDescription": "Explore Jammu, Katra, Vaishnodevi on a 4-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Jammu",
      "Katra",
      "Vaishnodevi",
      "Jammu"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Vaishnodevi with Jammu Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Vaishnodevi with Jammu itinerary covering Jammu, Katra, Vaishnodevi. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "chardham-yatra",
    "slug": "chardham-yatra",
    "packageName": "Chardham Yatra",
    "region": "North India",
    "duration": "9 Nights / 10 Days",
    "nights": 9,
    "days": 10,
    "placesCovered": [
      "Delhi",
      "Haridwar",
      "Rudraprayag",
      "Kedarnath",
      "Badrinath",
      "Joshimath",
      "Rishikesh",
      "Delhi"
    ],
    "startingPoint": "Delhi",
    "endingPoint": "Delhi",
    "shortDescription": "Explore Delhi, Haridwar, Rudraprayag on a 10-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Delhi",
      "Haridwar",
      "Rudraprayag",
      "Kedarnath"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Chardham Yatra Itinerary | 10 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Chardham Yatra itinerary covering Delhi, Haridwar, Rudraprayag. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "varanasi-patna",
    "slug": "varanasi-patna",
    "packageName": "Varanasi & Patna",
    "region": "North India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Varanasi",
      "Bodhgaya",
      "Ragjir",
      "Patna"
    ],
    "startingPoint": "Varanasi",
    "endingPoint": "Patna",
    "shortDescription": "Explore Varanasi, Bodhgaya, Ragjir on a 6-day route across North India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Varanasi",
      "Bodhgaya",
      "Ragjir",
      "Patna"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Varanasi & Patna Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Varanasi & Patna itinerary covering Varanasi, Bodhgaya, Ragjir. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "best-of-east",
    "slug": "best-of-east",
    "packageName": "Best of East",
    "region": "East India",
    "duration": "7 Nights / 8 Days",
    "nights": 7,
    "days": 8,
    "placesCovered": [
      "Bagdogra",
      "Darjeeling",
      "Kalimpong",
      "Gangtok",
      "Tsomgo Lake",
      "Bagdogra"
    ],
    "startingPoint": "Bagdogra",
    "endingPoint": "Bagdogra",
    "shortDescription": "Explore Bagdogra, Darjeeling, Kalimpong on a 8-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bagdogra",
      "Darjeeling",
      "Kalimpong",
      "Gangtok"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Best of East Itinerary | 8 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Best of East itinerary covering Bagdogra, Darjeeling, Kalimpong. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "darjeeling-tour",
    "slug": "darjeeling-tour",
    "packageName": "Darjeeling Tour",
    "region": "East India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Bagdogra",
      "Gangtok",
      "Darjeeling",
      "Bagdogra"
    ],
    "startingPoint": "Bagdogra",
    "endingPoint": "Bagdogra",
    "shortDescription": "Explore Bagdogra, Gangtok, Darjeeling on a 6-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bagdogra",
      "Gangtok",
      "Darjeeling",
      "Bagdogra"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Darjeeling Tour Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Darjeeling Tour itinerary covering Bagdogra, Gangtok, Darjeeling. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "cherrapunji-tour",
    "slug": "cherrapunji-tour",
    "packageName": "Cherrapunji Tour",
    "region": "East India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Guwahati",
      "Cherrapunji",
      "Guwhati"
    ],
    "startingPoint": "Guwahati",
    "endingPoint": "Guwhati",
    "shortDescription": "Explore Guwahati, Cherrapunji, Guwhati on a 5-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Guwahati",
      "Cherrapunji",
      "Guwhati"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Cherrapunji Tour Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Cherrapunji Tour itinerary covering Guwahati, Cherrapunji, Guwhati. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "kaziranga-cherrapunji-tour",
    "slug": "kaziranga-cherrapunji-tour",
    "packageName": "Kaziranga & Cherrapunji Tour",
    "region": "East India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Guwahati",
      "Kaziranga National Park",
      "Shillong",
      "Cherrapunji",
      "Guwahati"
    ],
    "startingPoint": "Guwahati",
    "endingPoint": "Guwahati",
    "shortDescription": "Explore Guwahati, Kaziranga National Park, Shillong on a 6-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Guwahati",
      "Kaziranga National Park",
      "Shillong",
      "Cherrapunji"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Kaziranga & Cherrapunji Tour Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Kaziranga & Cherrapunji Tour itinerary covering Guwahati, Kaziranga National Park, Shillong. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "jewel-of-east",
    "slug": "jewel-of-east",
    "packageName": "Jewel of East",
    "region": "East India",
    "duration": "7 Nights / 8 Days",
    "nights": 7,
    "days": 8,
    "placesCovered": [
      "Guwahati",
      "Bhalukpong",
      "Bomdila",
      "Tawang",
      "Dirang",
      "Nameri",
      "Guwhati"
    ],
    "startingPoint": "Guwahati",
    "endingPoint": "Guwhati",
    "shortDescription": "Explore Guwahati, Bhalukpong, Bomdila on a 8-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Guwahati",
      "Bhalukpong",
      "Bomdila",
      "Tawang"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Jewel of East Itinerary | 8 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Jewel of East itinerary covering Guwahati, Bhalukpong, Bomdila. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "heritage-of-odisha",
    "slug": "heritage-of-odisha",
    "packageName": "Heritage of Odisha",
    "region": "East India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Bhubaneshwar",
      "Puri",
      "Ratnagiri",
      "Bhitarkanika",
      "Bhuvaneshwar"
    ],
    "startingPoint": "Bhubaneshwar",
    "endingPoint": "Bhuvaneshwar",
    "shortDescription": "Explore Bhubaneshwar, Puri, Ratnagiri on a 4-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bhubaneshwar",
      "Puri",
      "Ratnagiri",
      "Bhitarkanika"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Heritage of Odisha Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Heritage of Odisha itinerary covering Bhubaneshwar, Puri, Ratnagiri. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "odisha-package",
    "slug": "odisha-package",
    "packageName": "Odisha Package",
    "region": "East India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Bhubaneshwar",
      "Konark",
      "Puri",
      "Chilika",
      "Bhuvaneshwar"
    ],
    "startingPoint": "Bhubaneshwar",
    "endingPoint": "Bhuvaneshwar",
    "shortDescription": "Explore Bhubaneshwar, Konark, Puri on a 5-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bhubaneshwar",
      "Konark",
      "Puri",
      "Chilika"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Odisha Package Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Odisha Package itinerary covering Bhubaneshwar, Konark, Puri. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "assam-despatch-cruise-2",
    "slug": "assam-despatch-cruise-2",
    "packageName": "Assam Despatch Cruise 2",
    "region": "East India",
    "duration": "7 Nights / 8 Days",
    "nights": 7,
    "days": 8,
    "placesCovered": [
      "Guwahati to Silghat"
    ],
    "startingPoint": "Guwahati to Silghat",
    "endingPoint": "Guwahati to Silghat",
    "shortDescription": "Explore Guwahati to Silghat on a 8-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Guwahati to Silghat"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Assam Despatch Cruise 2 Itinerary | 8 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Assam Despatch Cruise 2 itinerary covering Guwahati to Silghat. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "assam-despatch-cruise-7",
    "slug": "assam-despatch-cruise-7",
    "packageName": "Assam Despatch Cruise 7",
    "region": "East India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Brahmaputra Taster",
      "guwahati to Guwahati"
    ],
    "startingPoint": "Brahmaputra Taster",
    "endingPoint": "guwahati to Guwahati",
    "shortDescription": "Explore Brahmaputra Taster, guwahati to Guwahati on a 5-day route across East India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Brahmaputra Taster",
      "guwahati to Guwahati"
    ],
    "categoryTags": [
      "Hill Station",
      "Nature"
    ],
    "image": "",
    "seoTitle": "Assam Despatch Cruise 7 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Assam Despatch Cruise 7 itinerary covering Brahmaputra Taster, guwahati to Guwahati. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "madhya-pradesh-heritage",
    "slug": "madhya-pradesh-heritage",
    "packageName": "Madhya Pradesh Heritage",
    "region": "Central India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Bhopal",
      "Sanchi",
      "Ujjain",
      "Indore",
      "Mandu",
      "Maheshwar",
      "Indore"
    ],
    "startingPoint": "Bhopal",
    "endingPoint": "Indore",
    "shortDescription": "Explore Bhopal, Sanchi, Ujjain on a 7-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bhopal",
      "Sanchi",
      "Ujjain",
      "Indore"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Madhya Pradesh Heritage Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Madhya Pradesh Heritage itinerary covering Bhopal, Sanchi, Ujjain. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "spiritual-madhya-pradesh",
    "slug": "spiritual-madhya-pradesh",
    "packageName": "Spiritual Madhya Pradesh",
    "region": "Central India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Indore",
      "Ujjain",
      "Maheshwar",
      "Mandu",
      "Indore"
    ],
    "startingPoint": "Indore",
    "endingPoint": "Indore",
    "shortDescription": "Explore Indore, Ujjain, Maheshwar on a 5-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Indore",
      "Ujjain",
      "Maheshwar",
      "Mandu"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Spiritual Madhya Pradesh Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Spiritual Madhya Pradesh itinerary covering Indore, Ujjain, Maheshwar. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "bhopal-package-1",
    "slug": "bhopal-package-1",
    "packageName": "Bhopal Package 1",
    "region": "Central India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Bhopal",
      "Pachmari",
      "Bhopal"
    ],
    "startingPoint": "Bhopal",
    "endingPoint": "Bhopal",
    "shortDescription": "Explore Bhopal, Pachmari, Bhopal on a 5-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bhopal",
      "Pachmari",
      "Bhopal"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Bhopal Package 1 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Bhopal Package 1 itinerary covering Bhopal, Pachmari, Bhopal. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "bhopal-package-2",
    "slug": "bhopal-package-2",
    "packageName": "Bhopal Package 2",
    "region": "Central India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Jabalapur",
      "Satpura National Park",
      "Pachmarhi",
      "Bandhavagarh",
      "Jabalapur"
    ],
    "startingPoint": "Jabalapur",
    "endingPoint": "Jabalapur",
    "shortDescription": "Explore Jabalapur, Satpura National Park, Pachmarhi on a 7-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Jabalapur",
      "Satpura National Park",
      "Pachmarhi",
      "Bandhavagarh"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Bhopal Package 2 Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Bhopal Package 2 itinerary covering Jabalapur, Satpura National Park, Pachmarhi. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "khajuraho-orchha",
    "slug": "khajuraho-orchha",
    "packageName": "Khajuraho & Orchha",
    "region": "Central India",
    "duration": "2 Nights / 3 Days",
    "nights": 2,
    "days": 3,
    "placesCovered": [
      "Khajuraho",
      "Orchha",
      "Gwalior"
    ],
    "startingPoint": "Khajuraho",
    "endingPoint": "Gwalior",
    "shortDescription": "Explore Khajuraho, Orchha, Gwalior on a 3-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Khajuraho",
      "Orchha",
      "Gwalior"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Khajuraho & Orchha Itinerary | 3 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Khajuraho & Orchha itinerary covering Khajuraho, Orchha, Gwalior. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "wild-madhya-pradesh",
    "slug": "wild-madhya-pradesh",
    "packageName": "Wild Madhya Pradesh",
    "region": "Central India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Jabalpur",
      "Bandhavgarh",
      "Kanha",
      "Pench",
      "Nagpur"
    ],
    "startingPoint": "Jabalpur",
    "endingPoint": "Nagpur",
    "shortDescription": "Explore Jabalpur, Bandhavgarh, Kanha on a 7-day route across Central India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Jabalpur",
      "Bandhavgarh",
      "Kanha",
      "Pench"
    ],
    "categoryTags": [
      "Heritage",
      "Culture"
    ],
    "image": "",
    "seoTitle": "Wild Madhya Pradesh Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Wild Madhya Pradesh itinerary covering Jabalpur, Bandhavgarh, Kanha. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "gujarat-package-1",
    "slug": "gujarat-package-1",
    "packageName": "Gujarat Package 1",
    "region": "West India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Jamnagar",
      "Dwarka",
      "Somnath",
      "Rajkot"
    ],
    "startingPoint": "Jamnagar",
    "endingPoint": "Rajkot",
    "shortDescription": "Explore Jamnagar, Dwarka, Somnath on a 5-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Jamnagar",
      "Dwarka",
      "Somnath",
      "Rajkot"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Gujarat Package 1 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Gujarat Package 1 itinerary covering Jamnagar, Dwarka, Somnath. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "gujarat-package-2",
    "slug": "gujarat-package-2",
    "packageName": "Gujarat Package 2",
    "region": "West India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Ahmedabad",
      "Jamnagar",
      "Dwarka",
      "Somnath",
      "Sasan Gir",
      "Diu"
    ],
    "startingPoint": "Ahmedabad",
    "endingPoint": "Diu",
    "shortDescription": "Explore Ahmedabad, Jamnagar, Dwarka on a 7-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Ahmedabad",
      "Jamnagar",
      "Dwarka",
      "Somnath"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Gujarat Package 2 Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Gujarat Package 2 itinerary covering Ahmedabad, Jamnagar, Dwarka. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "gir-somnath-tour",
    "slug": "gir-somnath-tour",
    "packageName": "Gir & Somnath Tour",
    "region": "West India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Rajkot",
      "Sasan Gir",
      "Somnath",
      "Diu"
    ],
    "startingPoint": "Rajkot",
    "endingPoint": "Diu",
    "shortDescription": "Explore Rajkot, Sasan Gir, Somnath on a 5-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Rajkot",
      "Sasan Gir",
      "Somnath",
      "Diu"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Gir & Somnath Tour Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Gir & Somnath Tour itinerary covering Rajkot, Sasan Gir, Somnath. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "ajanta-ellora-aurangabad",
    "slug": "ajanta-ellora-aurangabad",
    "packageName": "Ajanta, Ellora & Aurangabad",
    "region": "West India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Aurangabad",
      "Ajanta",
      "Ellora",
      "Aurangabad"
    ],
    "startingPoint": "Aurangabad",
    "endingPoint": "Aurangabad",
    "shortDescription": "Explore Aurangabad, Ajanta, Ellora on a 4-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Aurangabad",
      "Ajanta",
      "Ellora",
      "Aurangabad"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Ajanta, Ellora & Aurangabad Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Ajanta, Ellora & Aurangabad itinerary covering Aurangabad, Ajanta, Ellora. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "goa-package-1",
    "slug": "goa-package-1",
    "packageName": "Goa Package 1",
    "region": "West India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "North Goa & South Goa"
    ],
    "startingPoint": "North Goa & South Goa",
    "endingPoint": "North Goa & South Goa",
    "shortDescription": "Explore North Goa & South Goa on a 5-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "North Goa & South Goa"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Goa Package 1 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Goa Package 1 itinerary covering North Goa & South Goa. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "goa-package-2",
    "slug": "goa-package-2",
    "packageName": "Goa Package 2",
    "region": "West India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "North Goa & South Goa"
    ],
    "startingPoint": "North Goa & South Goa",
    "endingPoint": "North Goa & South Goa",
    "shortDescription": "Explore North Goa & South Goa on a 4-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "North Goa & South Goa"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Goa Package 2 Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Goa Package 2 itinerary covering North Goa & South Goa. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "shirdi-package",
    "slug": "shirdi-package",
    "packageName": "Shirdi Package",
    "region": "West India",
    "duration": "2 Nights / 3 Days",
    "nights": 2,
    "days": 3,
    "placesCovered": [
      "Pune",
      "Shirdi",
      "Shingnapur",
      "Pune"
    ],
    "startingPoint": "Pune",
    "endingPoint": "Pune",
    "shortDescription": "Explore Pune, Shirdi, Shingnapur on a 3-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Pune",
      "Shirdi",
      "Shingnapur",
      "Pune"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Shirdi Package Itinerary | 3 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Shirdi Package itinerary covering Pune, Shirdi, Shingnapur. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "shirdi-nashik-mumbai-package",
    "slug": "shirdi-nashik-mumbai-package",
    "packageName": "Shirdi, Nashik & Mumbai Package",
    "region": "West India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Pune",
      "Shirdi",
      "Shingnapur",
      "Nashik",
      "Mumbai"
    ],
    "startingPoint": "Pune",
    "endingPoint": "Mumbai",
    "shortDescription": "Explore Pune, Shirdi, Shingnapur on a 5-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Pune",
      "Shirdi",
      "Shingnapur",
      "Nashik"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Shirdi, Nashik & Mumbai Package Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Shirdi, Nashik & Mumbai Package itinerary covering Pune, Shirdi, Shingnapur. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "wine-tour",
    "slug": "wine-tour",
    "packageName": "Wine Tour",
    "region": "West India",
    "duration": "2 Nights / 3 Days",
    "nights": 2,
    "days": 3,
    "placesCovered": [
      "Nashik"
    ],
    "startingPoint": "Nashik",
    "endingPoint": "Nashik",
    "shortDescription": "Explore Nashik on a 3-day route across West India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Nashik"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Wine Tour Itinerary | 3 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Wine Tour itinerary covering Nashik. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "exotic-coorg",
    "slug": "exotic-coorg",
    "packageName": "Exotic Coorg",
    "region": "South India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Bangalore",
      "Coorg",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Coorg, Bangalore on a 4-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Coorg",
      "Bangalore"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Exotic Coorg Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Exotic Coorg itinerary covering Bangalore, Coorg, Bangalore. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "kerala-package-1",
    "slug": "kerala-package-1",
    "packageName": "Kerala Package 1",
    "region": "South India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Cochin",
      "Munnar",
      "Thekkady",
      "Alleppey",
      "Cochin"
    ],
    "startingPoint": "Cochin",
    "endingPoint": "Cochin",
    "shortDescription": "Explore Cochin, Munnar, Thekkady on a 6-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Cochin",
      "Munnar",
      "Thekkady",
      "Alleppey"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Kerala Package 1 Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Kerala Package 1 itinerary covering Cochin, Munnar, Thekkady. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "kerala-package-2",
    "slug": "kerala-package-2",
    "packageName": "Kerala Package 2",
    "region": "South India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Trivandrum",
      "Kovalam",
      "Kanyakumari",
      "Trivandrum"
    ],
    "startingPoint": "Trivandrum",
    "endingPoint": "Trivandrum",
    "shortDescription": "Explore Trivandrum, Kovalam, Kanyakumari on a 4-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Trivandrum",
      "Kovalam",
      "Kanyakumari",
      "Trivandrum"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Kerala Package 2 Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Kerala Package 2 itinerary covering Trivandrum, Kovalam, Kanyakumari. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "kerala-delight",
    "slug": "kerala-delight",
    "packageName": "Kerala Delight",
    "region": "South India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Cochin",
      "Munnar",
      "Kumarakom",
      "Alleppey",
      "Cochin"
    ],
    "startingPoint": "Cochin",
    "endingPoint": "Cochin",
    "shortDescription": "Explore Cochin, Munnar, Kumarakom on a 6-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Cochin",
      "Munnar",
      "Kumarakom",
      "Alleppey"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Kerala Delight Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Kerala Delight itinerary covering Cochin, Munnar, Kumarakom. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "tirupati-package",
    "slug": "tirupati-package",
    "packageName": "Tirupati Package",
    "region": "South India",
    "duration": "1 Nights / 2 Days",
    "nights": 1,
    "days": 2,
    "placesCovered": [
      "Bangalore",
      "Tirupati",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Tirupati, Bangalore on a 2-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Tirupati",
      "Bangalore"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Tirupati Package Itinerary | 2 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Tirupati Package itinerary covering Bangalore, Tirupati, Bangalore. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "lakshwadeep-package",
    "slug": "lakshwadeep-package",
    "packageName": "Lakshwadeep Package",
    "region": "South India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Cochin",
      "Minicoy Island",
      "Kalpeni Island",
      "Kavaratti Island",
      "Cochin"
    ],
    "startingPoint": "Cochin",
    "endingPoint": "Cochin",
    "shortDescription": "Explore Cochin, Minicoy Island, Kalpeni Island on a 5-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Cochin",
      "Minicoy Island",
      "Kalpeni Island",
      "Kavaratti Island"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Lakshwadeep Package Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Lakshwadeep Package itinerary covering Cochin, Minicoy Island, Kalpeni Island. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "andaman-package-1",
    "slug": "andaman-package-1",
    "packageName": "Andaman Package 1",
    "region": "South India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Portblair",
      "Havelock Island",
      "Portblair"
    ],
    "startingPoint": "Portblair",
    "endingPoint": "Portblair",
    "shortDescription": "Explore Portblair, Havelock Island, Portblair on a 4-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Portblair",
      "Havelock Island",
      "Portblair"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Andaman Package 1 Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Andaman Package 1 itinerary covering Portblair, Havelock Island, Portblair. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "andaman-package-2",
    "slug": "andaman-package-2",
    "packageName": "Andaman Package 2",
    "region": "South India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Portblair",
      "Havelock Island",
      "Portblair"
    ],
    "startingPoint": "Portblair",
    "endingPoint": "Portblair",
    "shortDescription": "Explore Portblair, Havelock Island, Portblair on a 5-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Portblair",
      "Havelock Island",
      "Portblair"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Andaman Package 2 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Andaman Package 2 itinerary covering Portblair, Havelock Island, Portblair. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "karnataka-heritage-tour-1",
    "slug": "karnataka-heritage-tour-1",
    "packageName": "Karnataka Heritage Tour 1",
    "region": "South India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Bangalore",
      "Chitradurga",
      "Hospet",
      "Hampi",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Chitradurga, Hospet on a 5-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Chitradurga",
      "Hospet",
      "Hampi"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Karnataka Heritage Tour 1 Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Karnataka Heritage Tour 1 itinerary covering Bangalore, Chitradurga, Hospet. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "karnataka-heritage-tour-2",
    "slug": "karnataka-heritage-tour-2",
    "packageName": "Karnataka Heritage Tour 2",
    "region": "South India",
    "duration": "6 Nights / 7 Days",
    "nights": 6,
    "days": 7,
    "placesCovered": [
      "Bangalore",
      "Hospet",
      "Hampi",
      "Bijapur",
      "Badami",
      "Goa"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Goa",
    "shortDescription": "Explore Bangalore, Hospet, Hampi on a 7-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Hospet",
      "Hampi",
      "Bijapur"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Karnataka Heritage Tour 2 Itinerary | 7 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Karnataka Heritage Tour 2 itinerary covering Bangalore, Hospet, Hampi. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "karnataka-spiritual-tour",
    "slug": "karnataka-spiritual-tour",
    "packageName": "Karnataka Spiritual Tour",
    "region": "South India",
    "duration": "5 Nights / 6 Days",
    "nights": 5,
    "days": 6,
    "placesCovered": [
      "Mangalore",
      "Udupi",
      "Murudeshwar",
      "Gokarna",
      "Sringeri",
      "Mangalore"
    ],
    "startingPoint": "Mangalore",
    "endingPoint": "Mangalore",
    "shortDescription": "Explore Mangalore, Udupi, Murudeshwar on a 6-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Mangalore",
      "Udupi",
      "Murudeshwar",
      "Gokarna"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Karnataka Spiritual Tour Itinerary | 6 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Karnataka Spiritual Tour itinerary covering Mangalore, Udupi, Murudeshwar. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "mysore-ooty",
    "slug": "mysore-ooty",
    "packageName": "Mysore & Ooty",
    "region": "South India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Bangalore",
      "Mysore",
      "Ooty",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Mysore, Ooty on a 5-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Mysore",
      "Ooty",
      "Bangalore"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Mysore & Ooty Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Mysore & Ooty itinerary covering Bangalore, Mysore, Ooty. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "bandipur-wayanad-tour",
    "slug": "bandipur-wayanad-tour",
    "packageName": "Bandipur & Wayanad Tour",
    "region": "South India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Bangalore",
      "Bandipur",
      "Wayanad",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Bandipur, Wayanad on a 4-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Bangalore",
      "Bandipur",
      "Wayanad",
      "Bangalore"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Bandipur & Wayanad Tour Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Bandipur & Wayanad Tour itinerary covering Bangalore, Bandipur, Wayanad. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "madurai-munnar",
    "slug": "madurai-munnar",
    "packageName": "Madurai & Munnar",
    "region": "South India",
    "duration": "4 Nights / 5 Days",
    "nights": 4,
    "days": 5,
    "placesCovered": [
      "Madurai",
      "Munnar",
      "Madurai"
    ],
    "startingPoint": "Madurai",
    "endingPoint": "Madurai",
    "shortDescription": "Explore Madurai, Munnar, Madurai on a 5-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival",
        "description": "Arrival and local sightseeing."
      }
    ],
    "pricing": {
      "startingPrice": null,
      "priceLabel": "Price on request",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "Accommodation on single / twin / triple sharing with breakfast",
      "Transportation by A/c vehicle as per the itinerary",
      "Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner",
      "Guide service and entrance fees",
      "Flight / Train tickets",
      "Anything not mentioned in inclusions"
    ],
    "highlights": [
      "Madurai",
      "Munnar",
      "Madurai"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Madurai & Munnar Itinerary | 5 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Madurai & Munnar itinerary covering Madurai, Munnar, Madurai. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  },
  {
    "id": "pondicherry-getaway",
    "slug": "pondicherry-getaway",
    "packageName": "Pondicherry Getaway",
    "region": "South India",
    "duration": "3 Nights / 4 Days",
    "nights": 3,
    "days": 4,
    "placesCovered": [
      "Bangalore",
      "Pondicherry",
      "Bangalore"
    ],
    "startingPoint": "Bangalore",
    "endingPoint": "Bangalore",
    "shortDescription": "Explore Bangalore, Pondicherry, Bangalore on a 4-day route across South India.",
    "dayWiseItinerary": [
      {
        "day": 1,
        "title": "Day 01:",
        "description": "Delhi Meet on arrival at Delhi Airport and transfer to Hotel.  Relax and proceed  to visit New Delhi - This city designed and built by the British in the 1920's. visit Humayun's Tomb, Qutub Minar - built by Qutub-ud-Din Aibek in 1199, Red Fort (visit subject to security permission), the most opulent Fort and Palace of the Mughal Empire. Back to hotel.  Overnight."
      },
      {
        "day": 2,
        "title": "Day 02:",
        "description": "Delhi: Breakfast, proceed for full day local sightseeing visit tour of Old Delhi. Old Delhi - An ancient walled city. Visit India Gate and drive past President's House, Parliament House and Government Secretariat Building, Raj Ghat, the memorial site of the Mahatma Gandhi, Jama Masjid - the largest mosque in India and Chandini Chowk, the bustling and colourful market of the old city. Overnight. Jahan, the Taj is a white marble memorial to his beautiful wife Mumtaz Mahal. This monument took 22 years to be completed and was designed, and planned by Persian architect Ustad Isa, Agra Fort - Built by the famed Mughal emperor Akbar in 1565 AD, the fort is predominantly of red sandstone. Ensconced within is the picture perfect Pearl Mosque, which is a major tourist attraction. Overnight. (Taj Mahal remains closed on every Friday)"
      },
      {
        "day": 3,
        "title": "Day 04:",
        "description": "Agra / Jaipur Breakfast checkout and drive to Jaipur, enroute visit Fatehpur Sikri - The deserted, red Sandstone City, Emperor Akbar built that as his capital and palace in the late 16th century is an exhilarating experience. It a veritable fairytale city and its \"ruins\" are in pristine condition.  On arrival check into Hotel.  Relax and later proceed to visit Jantar Mantar (Solar Observatory), an astronomical treasure house, with solar devices that give accurate predictions till date, The City Palace - includes the Chandra Mahal and Mubarak Mahal palaces. Back to hotel. Overnight."
      },
      {
        "day": 4,
        "title": "Day 05:",
        "description": "Jaipur Amber Fort Morning after breakfast proceed to visit enjoy the experience of ride on elephant back to and from the top of the hill on which the fort is situated , Hawa Mahal - The ornamental facade of this \" Palace of Winds \" is a prominent landmark in Jaipur. It is a five-storey structure of sandstone plastered pink encrusted with fine trellis work and elaborate balconies, Jaigarh Fort \u2013 which was mainly utilized as the defense system against the invaders. Overnight."
      },
      {
        "day": 5,
        "title": "Day 06:",
        "description": "Jaipur / Delhi Back to Hotel. Early breakfast checkout and drive to Delhi to board the flight or transfer to Jaipur Airport to board the flight  for onward destination. Tour Ends."
      },
      {
        "day": 6,
        "title": "Day 03:",
        "description": "Delhi/Agra Morning breakfast checkout and drive to Agra. On arrival check into Hotel. Later proceed to visit Taj Mahal - Built by Shah"
      }
    ],
    "pricing": {
      "startingPrice": 19000,
      "priceLabel": "\u20b919,000",
      "priceDisclaimer": "Indicative historical package price. Final quote may vary. Contact My Quick Trippers for the latest quote."
    },
    "inclusions": [
      "19000 15000 13500 25000 2750 Free",
      "Accommodation on single / twin / triple sharing with bed,  breakfast and all taxes as per the itinerary Transportation by A/c vehicle as per the itinerary Driver allowance, parking, toll, inter state permit and taxes."
    ],
    "exclusions": [
      "Lunch and Dinner. Guide service and entrance fees Flight / Train tickets & anything not mentioned in the inclusion"
    ],
    "highlights": [
      "Bangalore",
      "Pondicherry",
      "Bangalore"
    ],
    "categoryTags": [
      "Beach",
      "Leisure"
    ],
    "image": "",
    "seoTitle": "Pondicherry Getaway Itinerary | 4 Days India Tour | My Quick Trippers",
    "seoDescription": "Explore the Pondicherry Getaway itinerary covering Bangalore, Pondicherry, Bangalore. View day-wise plan, inclusions, exclusions, and request a custom quote from My Quick Trippers."
  }
];

export function getRegions(): string[] {
  return [...new Set(itineraries.map(i => i.region))];
}

export function getCategoryTags(): string[] {
  return [...new Set(itineraries.flatMap(i => i.categoryTags))].sort();
}

export function getAllPlaces(): string[] {
  return [...new Set(itineraries.flatMap(i => i.placesCovered))].sort();
}

export function getItineraryBySlug(slug: string): ItineraryRecord | undefined {
  return itineraries.find(i => i.slug === slug);
}

export function getRelatedItineraries(current: ItineraryRecord, limit = 6): ItineraryRecord[] {
  return itineraries
    .filter(i => i.id !== current.id)
    .map(i => ({
      item: i,
      score:
        (i.region === current.region ? 3 : 0) +
        i.categoryTags.filter(t => current.categoryTags.includes(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.item);
}

export function getItineraryStats() {
  const validDurations = itineraries.filter(i => i.days > 0);
  return {
    totalItineraries: itineraries.length,
    regionsCovered: getRegions().length,
    popularDestinations: getAllPlaces().length,
    avgDuration: validDurations.length > 0
      ? Math.round(validDurations.reduce((s, i) => s + i.days, 0) / validDurations.length)
      : 0
  };
}
