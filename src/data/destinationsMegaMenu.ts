export type MegaMenuDestination = {
  name: string;
  slug: string;
};

export type MegaMenuState = {
  name: string;
  slug: string;
  type: "state" | "union-territory";
  region: string;
  summary: string;
  image?: string;
  topDestinations: MegaMenuDestination[];
};

export type MegaMenuRegion = {
  name: string;
  slug: string;
  states: MegaMenuState[];
};

export const megaMenuData: MegaMenuRegion[] = [
  {
    name: "North India",
    slug: "north-india",
    states: [
      {
        name: "Uttarakhand",
        slug: "uttarakhand",
        type: "state",
        region: "North India",
        summary: "Sacred circuits, Himalayan escapes, spiritual towns, and high-altitude adventures.",
        image: "https://myquicktrippers.com/assets/hero-kedarnath.webp", // Generic fallback visual
        topDestinations: [
          { name: "Kedarnath", slug: "kedarnath" },
          { name: "Rishikesh", slug: "rishikesh" },
          { name: "Haridwar", slug: "haridwar" },
          { name: "Mussoorie", slug: "mussoorie" },
          { name: "Nainital", slug: "nainital" },
          { name: "Valley of Flowers", slug: "valley-of-flowers" }
        ]
      },
      {
        name: "Himachal Pradesh",
        slug: "himachal-pradesh",
        type: "state",
        region: "North India",
        summary: "Snow-capped peaks, lush valleys, apple orchards, and diverse scenic landscapes.",
        topDestinations: [
          { name: "Manali", slug: "manali" },
          { name: "Shimla", slug: "shimla" },
          { name: "Kasol", slug: "kasol" },
          { name: "Dharamshala", slug: "dharamshala" }
        ]
      },
      {
        name: "Jammu & Kashmir",
        slug: "jammu-and-kashmir",
        type: "union-territory",
        region: "North India",
        summary: "Pristine alpine lakes, saffron fields, and the undisputed paradise on earth.",
        topDestinations: [
          { name: "Srinagar", slug: "srinagar" },
          { name: "Gulmarg", slug: "gulmarg" },
          { name: "Pahalgam", slug: "pahalgam" },
          { name: "Sonamarg", slug: "sonamarg" }
        ]
      },
      {
        name: "Ladakh",
        slug: "ladakh",
        type: "union-territory",
        region: "North India",
        summary: "Stunning barren mountains, high altitude lakes, and ancient Buddhist monasteries.",
        topDestinations: [
          { name: "Leh", slug: "leh" },
          { name: "Nubra Valley", slug: "nubra-valley" },
          { name: "Pangong Lake", slug: "pangong-lake" }
        ]
      },
      {
        name: "Punjab",
        slug: "punjab",
        type: "state",
        region: "North India",
        summary: "Vibrant culture, golden harvests, and the spiritual heart of Sikhism.",
        topDestinations: [
          { name: "Amritsar", slug: "amritsar" },
          { name: "Chandigarh", slug: "chandigarh" },
          { name: "Ludhiana", slug: "ludhiana" }
        ]
      },
      {
        name: "Haryana",
        slug: "haryana",
        type: "state",
        region: "North India",
        summary: "Vedic heritage, agricultural heartlands, and growing urban hubs.",
        topDestinations: [
          { name: "Gurugram", slug: "gurugram" },
          { name: "Kurukshetra", slug: "kurukshetra" }
        ]
      }
    ]
  },
  {
    name: "West India",
    slug: "west-india",
    states: [
      {
        name: "Rajasthan",
        slug: "rajasthan",
        type: "state",
        region: "West India",
        summary: "Majestic forts, vast deserts, opulent palaces, and vibrant royal heritage.",
        topDestinations: [
          { name: "Jaipur", slug: "jaipur" },
          { name: "Udaipur", slug: "udaipur" },
          { name: "Jaisalmer", slug: "jaisalmer" },
          { name: "Jodhpur", slug: "jodhpur" }
        ]
      },
      {
        name: "Gujarat",
        slug: "gujarat",
        type: "state",
        region: "West India",
        summary: "Long coastlines, Asiatic lions, white deserts, and ancient temple ruins.",
        topDestinations: [
          { name: "Great Rann of Kutch", slug: "rann-of-kutch" },
          { name: "Gir National Park", slug: "gir-national-park" },
          { name: "Somnath", slug: "somnath" }
        ]
      },
      {
        name: "Maharashtra",
        slug: "maharashtra",
        type: "state",
        region: "West India",
        summary: "Bustling metropolises, western ghats, cave architecture, and coastal forts.",
        topDestinations: [
          { name: "Mumbai", slug: "mumbai" },
          { name: "Lonavala", slug: "lonavala" },
          { name: "Mahabaleshwar", slug: "mahabaleshwar" },
          { name: "Pune", slug: "pune" }
        ]
      },
      {
        name: "Goa",
        slug: "goa",
        type: "state",
        region: "West India",
        summary: "Sun-kissed beaches, Portuguese colonial architecture, and effervescent nightlife.",
        topDestinations: [
          { name: "North Goa", slug: "north-goa" },
          { name: "South Goa", slug: "south-goa" },
          { name: "Panjim", slug: "panjim" }
        ]
      }
    ]
  },
  {
    name: "South India",
    slug: "south-india",
    states: [
      {
        name: "Kerala",
        slug: "kerala",
        type: "state",
        region: "South India",
        summary: "Tranquil backwaters, spice plantations, ayurvedic retreats, and pristine seascapes.",
        topDestinations: [
          { name: "Munnar", slug: "munnar" },
          { name: "Alleppey", slug: "alleppey" },
          { name: "Wayanad", slug: "wayanad" },
          { name: "Kochi", slug: "kochi" }
        ]
      },
      {
        name: "Tamil Nadu",
        slug: "tamil-nadu",
        type: "state",
        region: "South India",
        summary: "Dravidian temples, cool hill stations, and rich classical heritage.",
        topDestinations: [
          { name: "Ooty", slug: "ooty" },
          { name: "Kodaikanal", slug: "kodaikanal" },
          { name: "Chennai", slug: "chennai" },
          { name: "Madurai", slug: "madurai" }
        ]
      },
      {
        name: "Karnataka",
        slug: "karnataka",
        type: "state",
        region: "South India",
        summary: "Tech hubs, ancient ruins of Hampi, coastal beauties, and sprawling coffee estates.",
        topDestinations: [
          { name: "Bengaluru", slug: "bengaluru" },
          { name: "Mysuru", slug: "mysuru" },
          { name: "Coorg", slug: "coorg" },
          { name: "Hampi", slug: "hampi" }
        ]
      },
      {
        name: "Andhra Pradesh",
        slug: "andhra-pradesh",
        type: "state",
        region: "South India",
        summary: "Historic temples, sprawling eastern ghats, and rich agricultural lands.",
        topDestinations: [
          { name: "Tirupati", slug: "tirupati" },
          { name: "Visakhapatnam", slug: "visakhapatnam" },
          { name: "Araku Valley", slug: "araku-valley" }
        ]
      },
      {
        name: "Telangana",
        slug: "telangana",
        type: "state",
        region: "South India",
        summary: "Historic monuments, royal nizami culture, and massive granite fortresses.",
        topDestinations: [
          { name: "Hyderabad", slug: "hyderabad" },
          { name: "Warangal", slug: "warangal" }
        ]
      }
    ]
  },
  {
    name: "East India",
    slug: "east-india",
    states: [
      {
        name: "West Bengal",
        slug: "west-bengal",
        type: "state",
        region: "East India",
        summary: "Colonial cityscapes, Sundarban mangroves, and sprawling tea estates of Darjeeling.",
        topDestinations: [
          { name: "Kolkata", slug: "kolkata" },
          { name: "Darjeeling", slug: "darjeeling" },
          { name: "Sundarbans", slug: "sundarbans" }
        ]
      },
      {
        name: "Odisha",
        slug: "odisha",
        type: "state",
        region: "East India",
        summary: "Tribal culture, ancient sea-side temples, and sweeping coastlines.",
        topDestinations: [
          { name: "Bhubaneswar", slug: "bhubaneswar" },
          { name: "Puri", slug: "puri" },
          { name: "Konark", slug: "konark" }
        ]
      },
      {
        name: "Bihar",
        slug: "bihar",
        type: "state",
        region: "East India",
        summary: "The cradle of history, ancient Buddhist university ruins, and spiritual awakening.",
        topDestinations: [
          { name: "Bodh Gaya", slug: "bodh-gaya" },
          { name: "Nalanda", slug: "nalanda" },
          { name: "Patna", slug: "patna" }
        ]
      },
      {
        name: "Jharkhand",
        slug: "jharkhand",
        type: "state",
        region: "East India",
        summary: "Dense forests, wildlife sanctuaries, and mesmerizing cascading waterfalls.",
        topDestinations: [
          { name: "Ranchi", slug: "ranchi" },
          { name: "Deoghar", slug: "deoghar" },
          { name: "Netarhat", slug: "netarhat" }
        ]
      }
    ]
  },
  {
    name: "Central India",
    slug: "central-india",
    states: [
      {
        name: "Madhya Pradesh",
        slug: "madhya-pradesh",
        type: "state",
        region: "Central India",
        summary: "Thriving tiger reserves, ancient carved temples, and prehistoric cave art.",
        topDestinations: [
          { name: "Bhopal", slug: "bhopal" },
          { name: "Indore", slug: "indore" },
          { name: "Khajuraho", slug: "khajuraho" },
          { name: "Bandhavgarh", slug: "bandhavgarh" }
        ]
      },
      {
        name: "Chhattisgarh",
        slug: "chhattisgarh",
        type: "state",
        region: "Central India",
        summary: "Unexplored landscapes, tribal villages, and majestic natural waterfalls.",
        topDestinations: [
          { name: "Raipur", slug: "raipur" },
          { name: "Bastar", slug: "bastar" },
          { name: "Chitrakote Falls", slug: "chitrakote-falls" }
        ]
      },
      {
        name: "Uttar Pradesh",
        slug: "uttar-pradesh",
        type: "state",
        region: "Central India",
        summary: "The iconic Taj Mahal, ancient spiritual cities, and deep classical heritage.",
        topDestinations: [
          { name: "Varanasi", slug: "varanasi" },
          { name: "Agra", slug: "agra" },
          { name: "Lucknow", slug: "lucknow" },
          { name: "Ayodhya", slug: "ayodhya" }
        ]
      }
    ]
  },
  {
    name: "North East India",
    slug: "north-east-india",
    states: [
      {
        name: "Assam",
        slug: "assam",
        type: "state",
        region: "North East India",
        summary: "Sprawling tea gardens, the mighty Brahmaputra, and one-horned rhinos.",
        topDestinations: [
          { name: "Guwahati", slug: "guwahati" },
          { name: "Kaziranga", slug: "kaziranga" },
          { name: "Majuli", slug: "majuli" }
        ]
      },
      {
        name: "Meghalaya",
        slug: "meghalaya",
        type: "state",
        region: "North East India",
        summary: "Living root bridges, the wettest places on earth, and sweeping green canyons.",
        topDestinations: [
          { name: "Shillong", slug: "shillong" },
          { name: "Cherrapunji", slug: "cherrapunji" },
          { name: "Dawki", slug: "dawki" }
        ]
      },
      {
        name: "Sikkim",
        slug: "sikkim",
        type: "state",
        region: "North East India",
        summary: "High altitude biodiversity, strict organic farming, and majestic Kanchenjunga.",
        topDestinations: [
          { name: "Gangtok", slug: "gangtok" },
          { name: "Pelling", slug: "pelling" },
          { name: "Nathu La", slug: "nathu-la" }
        ]
      },
      {
        name: "Arunachal Pradesh",
        slug: "arunachal-pradesh",
        type: "state",
        region: "North East India",
        summary: "The land of dawn-lit mountains and undiscovered Himalayan valleys.",
        topDestinations: [
          { name: "Tawang", slug: "tawang" },
          { name: "Ziro Valley", slug: "ziro-valley" },
          { name: "Itanagar", slug: "itanagar" }
        ]
      }
    ]
  },
  {
    name: "Islands & UTs",
    slug: "islands-and-uts",
    states: [
      {
        name: "Andaman & Nicobar",
        slug: "andaman-and-nicobar-islands",
        type: "union-territory",
        region: "Islands & UTs",
        summary: "Pristine white sand beaches, coral reefs, and vibrant marine life.",
        topDestinations: [
          { name: "Port Blair", slug: "port-blair" },
          { name: "Havelock Island", slug: "havelock-island" },
          { name: "Neil Island", slug: "neil-island" }
        ]
      },
      {
        name: "Lakshadweep",
        slug: "lakshadweep",
        type: "union-territory",
        region: "Islands & UTs",
        summary: "Exclusive coral atolls, untouched azure waters, and ultimate seclusion.",
        topDestinations: [
          { name: "Agatti", slug: "agatti" },
          { name: "Bangaram", slug: "bangaram" },
          { name: "Kavaratti", slug: "kavaratti" }
        ]
      },
      {
        name: "Delhi",
        slug: "delhi",
        type: "union-territory",
        region: "Islands & UTs",
        summary: "The historic capital spanning massive Mughal architecture and modern sprawl.",
        topDestinations: [
          { name: "New Delhi", slug: "new-delhi" },
          { name: "Old Delhi", slug: "old-delhi" }
        ]
      },
      {
        name: "Chandigarh",
        slug: "chandigarh",
        type: "union-territory",
        region: "Islands & UTs",
        summary: "A carefully planned city blending modern brutalism with extensive green parks.",
        topDestinations: [
          { name: "Rock Garden", slug: "rock-garden" },
          { name: "Sukhna Lake", slug: "sukhna-lake" }
        ]
      },
      {
        name: "Puducherry",
        slug: "puducherry",
        type: "union-territory",
        region: "Islands & UTs",
        summary: "French colonial quarters, tree-lined streets, and tranquil coastal spiritual centers.",
        topDestinations: [
          { name: "White Town", slug: "white-town" },
          { name: "Auroville", slug: "auroville" }
        ]
      }
    ]
  }
];
