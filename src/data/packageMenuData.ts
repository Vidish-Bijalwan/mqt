export type PackageMenuItem = {
  name: string;
  state: string;
  stateSlug: string;
  destinationSlug: string;
};

export type FeaturedPackage = {
  title: string;
  slug: string;
  destination: string;
  state: string;
  duration: string;
  hook: string;
  highlights: string[];
  image?: string;
};

export type PackageCategory = {
  name: string;
  slug: string;
  summary: string;
  bestFor: string[];
  topDestinations: PackageMenuItem[];
  featuredPackages: FeaturedPackage[];
};

export type PackageMenuGroup = {
  title: string;
  categories: PackageCategory[];
};

export const packageMenuData: PackageMenuGroup[] = [
  {
    title: "Browse by Travel Style",
    categories: [
      {
        name: "Family Holidays",
        slug: "family-holidays",
        summary: "Comfortable, well-paced journeys designed for shared experiences across India's most loved destinations.",
        bestFor: ["Multi-generation travel", "School holidays", "Relaxed itineraries"],
        topDestinations: [
          { name: "Jaipur", state: "Rajasthan", stateSlug: "rajasthan", destinationSlug: "jaipur" },
          { name: "Munnar", state: "Kerala", stateSlug: "kerala", destinationSlug: "munnar" },
          { name: "Goa", state: "Goa", stateSlug: "goa", destinationSlug: "north-goa" },
          { name: "Srinagar", state: "Jammu & Kashmir", stateSlug: "jammu-and-kashmir", destinationSlug: "srinagar" }
        ],
        featuredPackages: [
          {
            title: "Royal Rajasthan Family Escape",
            slug: "royal-rajasthan-family-escape",
            destination: "Jaipur & Udaipur",
            state: "Rajasthan",
            duration: "6 Days / 5 Nights",
            hook: "Palaces, bazaars, and sunset boat rides.",
            highlights: ["Guided heritage walks", "Premium family-friendly stays"],
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Honeymoon Journeys",
        slug: "honeymoon-journeys",
        summary: "Romantic escapes blending luxury, privacy, and breathtaking Indian landscapes.",
        bestFor: ["Newlyweds", "Anniversaries", "Romantic getaways"],
        topDestinations: [
          { name: "Alleppey", state: "Kerala", stateSlug: "kerala", destinationSlug: "alleppey" },
          { name: "Gulmarg", state: "Jammu & Kashmir", stateSlug: "jammu-and-kashmir", destinationSlug: "gulmarg" },
          { name: "Havelock", state: "Andaman", stateSlug: "andaman-and-nicobar-islands", destinationSlug: "havelock-island" },
          { name: "Udaipur", state: "Rajasthan", stateSlug: "rajasthan", destinationSlug: "udaipur" }
        ],
        featuredPackages: [
          {
            title: "Kerala Backwaters Romance",
            slug: "kerala-backwaters-romance",
            destination: "Alleppey & Munnar",
            state: "Kerala",
            duration: "5 Days / 4 Nights",
            hook: "Private houseboats and misty tea estates.",
            highlights: ["Candlelight dinner cruise", "Private luxury villa stay"],
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Adventure Tours",
        slug: "adventure-tours",
        summary: "Thrilling expeditions pushing your boundaries in the Himalayas and beyond.",
        bestFor: ["Thrill seekers", "Trekkers", "Mountain expeditions"],
        topDestinations: [
          { name: "Leh", state: "Ladakh", stateSlug: "ladakh", destinationSlug: "leh" },
          { name: "Rishikesh", state: "Uttarakhand", stateSlug: "uttarakhand", destinationSlug: "rishikesh" },
          { name: "Manali", state: "Himachal Pradesh", stateSlug: "himachal-pradesh", destinationSlug: "manali" }
        ],
        featuredPackages: [
          {
            title: "Ladakh Motorbike Expedition",
            slug: "ladakh-motorbike-expedition",
            destination: "Leh & Pangong Lake",
            state: "Ladakh",
            duration: "8 Days / 7 Nights",
            hook: "Conquer the highest motorable passes on earth.",
            highlights: ["Royal Enfield riding", "High-altitude camping"],
            image: "https://images.unsplash.com/photo-1542223189-67a03fa0f0db?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Luxury Getaways",
        slug: "luxury-getaways",
        summary: "Exclusive, hand-crafted opulent stays in India's most premium heritage properties.",
        bestFor: ["Premium travelers", "Exclusive retreats", "Wellness"],
        topDestinations: [
          { name: "Udaipur", state: "Rajasthan", stateSlug: "rajasthan", destinationSlug: "udaipur" },
          { name: "Coorg", state: "Karnataka", stateSlug: "karnataka", destinationSlug: "coorg" },
          { name: "Goa", state: "Goa", stateSlug: "goa", destinationSlug: "south-goa" }
        ],
        featuredPackages: [
          {
            title: "Udaipur Palace Experience",
            slug: "udaipur-palace-experience",
            destination: "Udaipur",
            state: "Rajasthan",
            duration: "4 Days / 3 Nights",
            hook: "Live like modern royalty.",
            highlights: ["Taj Lake Palace stay", "Private yacht transfer"],
            image: "https://images.unsplash.com/photo-1615836245337-f584e0c4e1f7?auto=format&fit=crop&q=80"
          }
        ]
      }
    ]
  },
  {
    title: "Browse by Theme",
    categories: [
      {
        name: "Pilgrimage Tours",
        slug: "pilgrimage-tours",
        summary: "Profound spiritual journeys exploring ancient temples and sacred Indian rivers.",
        bestFor: ["Spiritual seekers", "Devotional trips", "Elders"],
        topDestinations: [
          { name: "Varanasi", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", destinationSlug: "varanasi" },
          { name: "Kedarnath", state: "Uttarakhand", stateSlug: "uttarakhand", destinationSlug: "kedarnath" },
          { name: "Amritsar", state: "Punjab", stateSlug: "punjab", destinationSlug: "amritsar" }
        ],
        featuredPackages: [
          {
            title: "Char Dham Yatra",
            slug: "char-dham-yatra",
            destination: "Kedarnath & Badrinath",
            state: "Uttarakhand",
            duration: "11 Days / 10 Nights",
            hook: "The ultimate Himalayan spiritual circuit.",
            highlights: ["Helicopter transfers available", "VIP Darshan"],
            image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Beach Escapes",
        slug: "beach-escapes",
        summary: "Sun-soaked itineraries across India's sprawling coastlines and tropical islands.",
        bestFor: ["Couples", "Water sports", "Relaxation"],
        topDestinations: [
          { name: "North Goa", state: "Goa", stateSlug: "goa", destinationSlug: "north-goa" },
          { name: "Havelock Island", state: "Andaman", stateSlug: "andaman-and-nicobar-islands", destinationSlug: "havelock-island" },
          { name: "Kovalam", state: "Kerala", stateSlug: "kerala", destinationSlug: "kovalam" }
        ],
        featuredPackages: [
          {
            title: "Andaman Coral Retreat",
            slug: "andaman-coral-retreat",
            destination: "Havelock & Neil",
            state: "Andaman & Nicobar",
            duration: "6 Days / 5 Nights",
            hook: "Scuba dive into pristine coral reefs.",
            highlights: ["Scuba certification option", "Beachfront resort stay"],
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Heritage Trails",
        slug: "heritage-trails",
        summary: "Immersive journeys diving deep into UNESCO World Heritage sites and ancient history.",
        bestFor: ["History buffs", "Photography lovers", "Educational trips"],
        topDestinations: [
          { name: "Agra", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", destinationSlug: "agra" },
          { name: "Hampi", state: "Karnataka", stateSlug: "karnataka", destinationSlug: "hampi" },
          { name: "Khajuraho", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", destinationSlug: "khajuraho" }
        ],
        featuredPackages: [
          {
            title: "Golden Triangle Classic",
            slug: "golden-triangle-classic",
            destination: "Delhi, Agra, Jaipur",
            state: "Multi-State",
            duration: "6 Days / 5 Nights",
            hook: "The quintessential Indian heritage circuit.",
            highlights: ["Taj Mahal sunrise tour", "Guided fort immersions"],
            image: "https://images.unsplash.com/photo-1564507592228-00569727dc02?auto=format&fit=crop&q=80"
          }
        ]
      },
      {
        name: "Wildlife Retreats",
        slug: "wildlife-retreats",
        summary: "Immersive tiger safaris and bird-watching expeditions in deep national park jungles.",
        bestFor: ["Nature lovers", "Wildlife photography", "Family safaris"],
        topDestinations: [
          { name: "Bandhavgarh", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", destinationSlug: "bandhavgarh" },
          { name: "Kaziranga", state: "Assam", stateSlug: "assam", destinationSlug: "kaziranga" },
          { name: "Gir", state: "Gujarat", stateSlug: "gujarat", destinationSlug: "gir-national-park" }
        ],
        featuredPackages: [
          {
            title: "Tiger Safari Expedition",
            slug: "tiger-safari-expedition",
            destination: "Bandhavgarh National Park",
            state: "Madhya Pradesh",
            duration: "4 Days / 3 Nights",
            hook: "Track the elusive Bengal Tiger in the wild.",
            highlights: ["Open Jeep safaris", "Luxury jungle lodge"],
            image: "https://images.unsplash.com/photo-1588863024976-11b3329ccae7?auto=format&fit=crop&q=80"
          }
        ]
      }
    ]
  }
];
