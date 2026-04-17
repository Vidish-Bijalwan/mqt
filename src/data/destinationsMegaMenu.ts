export type MegaMenuDestination = {
  name: string;
  slug: string;
  image?: string;
  state?: string;
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
  description: string;
  bestFor: string;
  image: string;
  states: MegaMenuState[];
  featuredDestinations: MegaMenuDestination[];
};

export type PopularCategory = {
  name: string;
  destinations: MegaMenuDestination[];
};

export type PopularSection = {
  trending: MegaMenuDestination[];
  categories: PopularCategory[];
  quickPicks: {
    category: string;
    items: MegaMenuDestination[];
  }[];
};

export const megaMenuData: MegaMenuRegion[] = [
  {
    name: "North India",
    slug: "north-india",
    description: "The crown of India, defined by the towering Himalayas, sacred rivers, and deep spiritual heritage.",
    bestFor: "Adventure, Spirituality, Snowscapes, Himalayan Escapes",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Kedarnath", slug: "kedarnath", state: "Uttarakhand" },
      { name: "Manali", slug: "manali", state: "Himachal Pradesh" },
      { name: "Srinagar", slug: "srinagar", state: "Jammu & Kashmir" },
      { name: "Rishikesh", slug: "rishikesh", state: "Uttarakhand" },
      { name: "Leh", slug: "leh", state: "Ladakh" }
    ],
    states: [
      {
        name: "Uttarakhand",
        slug: "uttarakhand",
        type: "state",
        region: "North India",
        summary: "Sacred circuits, Himalayan escapes, spiritual towns, and high-altitude adventures.",
        image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
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
    description: "Where vast deserts meet endless coastlines, royal heritage, and bustling metropolises.",
    bestFor: "Heritage Architecture, Beaches, Deserts, Nightlife",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Jaipur", slug: "jaipur", state: "Rajasthan" },
      { name: "North Goa", slug: "north-goa", state: "Goa" },
      { name: "Udaipur", slug: "udaipur", state: "Rajasthan" },
      { name: "Mumbai", slug: "mumbai", state: "Maharashtra" },
      { name: "Jaisalmer", slug: "jaisalmer", state: "Rajasthan" }
    ],
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
    description: "Tropical landscapes draped in greenery, ancient Dravidian temples, and tranquil backwaters.",
    bestFor: "Lush Nature, Ayurveda, Backwaters, Coffee Estates",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Munnar", slug: "munnar", state: "Kerala" },
      { name: "Alleppey", slug: "alleppey", state: "Kerala" },
      { name: "Ooty", slug: "ooty", state: "Tamil Nadu" },
      { name: "Coorg", slug: "coorg", state: "Karnataka" },
      { name: "Hampi", slug: "hampi", state: "Karnataka" }
    ],
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
    description: "Deep historical roots featuring colonial architecture, massive tea gardens, and ancient temples.",
    bestFor: "Culture, Tea Estates, Temples, Diverse Wildlife",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Darjeeling", slug: "darjeeling", state: "West Bengal" },
      { name: "Puri", slug: "puri", state: "Odisha" },
      { name: "Kolkata", slug: "kolkata", state: "West Bengal" },
      { name: "Bodh Gaya", slug: "bodh-gaya", state: "Bihar" }
    ],
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
    description: "The verdant heart of India known for prime tiger reserves and iconic cultural landmarks.",
    bestFor: "Tiger Safaris, Cave Art, Mughal Architecture",
    image: "https://images.unsplash.com/photo-1588863024976-11b3329ccae7?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Varanasi", slug: "varanasi", state: "Uttar Pradesh" },
      { name: "Bandhavgarh", slug: "bandhavgarh", state: "Madhya Pradesh" },
      { name: "Agra", slug: "agra", state: "Uttar Pradesh" },
      { name: "Khajuraho", slug: "khajuraho", state: "Madhya Pradesh" }
    ],
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
    description: "Undiscovered frontiers boasting immense biodiversity, living root bridges, and rolling tea estates.",
    bestFor: "Offbeat Exploration, Monasteries, Wildlife",
    image: "https://images.unsplash.com/photo-1589394815804-964ce0fae412?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Shillong", slug: "shillong", state: "Meghalaya" },
      { name: "Kaziranga", slug: "kaziranga", state: "Assam" },
      { name: "Tawang", slug: "tawang", state: "Arunachal Pradesh" },
      { name: "Gangtok", slug: "gangtok", state: "Sikkim" }
    ],
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
    description: "From crystalline equatorial waters to modern urban territories, discovering India's exceptional frontiers.",
    bestFor: "Scuba Diving, Luxury Resorts, Secluded Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
    featuredDestinations: [
      { name: "Havelock Island", slug: "havelock-island", state: "Andaman & Nicobar" },
      { name: "Agatti", slug: "agatti", state: "Lakshadweep" },
      { name: "Port Blair", slug: "port-blair", state: "Andaman & Nicobar" }
    ],
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

export const popularDestinationsData: PopularSection = {
  trending: [
    { name: "Kedarnath", slug: "kedarnath", state: "Uttarakhand", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80" },
    { name: "Jaipur", slug: "jaipur", state: "Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80" },
    { name: "Munnar", slug: "munnar", state: "Kerala", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80" },
    { name: "Goa", slug: "goa", state: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80" },
    { name: "Andaman", slug: "andaman-and-nicobar-islands", state: "Andaman", image: "https://images.unsplash.com/photo-1589394815804-964ce0fae412?auto=format&fit=crop&q=80" },
    { name: "Varanasi", slug: "varanasi", state: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&q=80" }
  ],
  categories: [
    {
      name: "Spiritual Escapes",
      destinations: [
        { name: "Rishikesh", slug: "rishikesh", state: "Uttarakhand" },
        { name: "Varanasi", slug: "varanasi", state: "Uttar Pradesh" },
        { name: "Tirupati", slug: "tirupati", state: "Andhra Pradesh" },
        { name: "Amritsar", slug: "amritsar", state: "Punjab" }
      ]
    },
    {
      name: "Beach Holidays",
      destinations: [
        { name: "North Goa", slug: "north-goa", state: "Goa" },
        { name: "Havelock", slug: "havelock-island", state: "Andaman" },
        { name: "Gokarna", slug: "gokarna", state: "Karnataka" },
        { name: "Kovalam", slug: "kovalam", state: "Kerala" }
      ]
    },
    {
      name: "Heritage Trails",
      destinations: [
        { name: "Udaipur", slug: "udaipur", state: "Rajasthan" },
        { name: "Hampi", slug: "hampi", state: "Karnataka" },
        { name: "Agra", slug: "agra", state: "Uttar Pradesh" },
        { name: "Khajuraho", slug: "khajuraho", state: "Madhya" }
      ]
    },
    {
      name: "Mountain Escapes",
      destinations: [
        { name: "Manali", slug: "manali", state: "Himachal" },
        { name: "Gulmarg", slug: "gulmarg", state: "Kashmir" },
        { name: "Tawang", slug: "tawang", state: "Arunachal" },
        { name: "Darjeeling", slug: "darjeeling", state: "Bengal" }
      ]
    }
  ],
  quickPicks: [
    {
      category: "Honeymoon Picks",
      items: [
        { name: "Srinagar Houseboats", slug: "srinagar", state: "Kashmir" },
        { name: "Alleppey Backwaters", slug: "alleppey", state: "Kerala" }
      ]
    },
    {
      category: "Family Favorites",
      items: [
        { name: "Ooty Hills", slug: "ooty", state: "Tamil Nadu" },
        { name: "Jaipur Palaces", slug: "jaipur", state: "Rajasthan" }
      ]
    },
    {
      category: "Weekend Escapes",
      items: [
        { name: "Lonavala", slug: "lonavala", state: "Maharashtra" },
        { name: "Coorg", slug: "coorg", state: "Karnataka" }
      ]
    }
  ]
};
