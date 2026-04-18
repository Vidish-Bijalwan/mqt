export interface FestivalCard {
  id: string;
  name: string;
  city: string;
  state: string;
  month: string;
  description: string;
  image: string;
  tag: string;
  colorHex?: string;
}

export const festivalsData: FestivalCard[] = [
  {
    id: "f1",
    name: "Holi",
    city: "Mathura & Vrindavan",
    state: "Uttar Pradesh",
    month: "March",
    description: "World's most colourful festival — powder-drenched celebrations at the birthplace of Lord Krishna.",
    image: "/assets/festivals/holi.jpg",
    tag: "UNESCO Cultural",
    colorHex: "#f97316"
  },
  {
    id: "f2",
    name: "Diwali",
    city: "Varanasi",
    state: "Uttar Pradesh",
    month: "Oct – Nov",
    description: "Festival of lights — floating diyas on the Ganga in Varanasi ghats.",
    image: "/assets/festivals/diwali.jpg",
    tag: "India's Biggest",
    colorHex: "#eab308"
  },
  {
    id: "f3",
    name: "Pushkar Camel Fair",
    city: "Pushkar",
    state: "Rajasthan",
    month: "November",
    description: "World's largest camel fair — 200,000+ attendees, camel races, traditional folk performances.",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    tag: "National Geographic List",
    colorHex: "#d97706"
  },
  {
    id: "f4",
    name: "Kumbh Mela",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    month: "Jan – Mar (every 12 yr)",
    description: "World's largest human gathering — millions take a sacred dip at the Sangam confluence.",
    image: "/assets/festivals/kumbh-mela.jpg",
    tag: "UNESCO Listed",
    colorHex: "#3b82f6"
  },
  {
    id: "f5",
    name: "Durga Puja",
    city: "Kolkata",
    state: "West Bengal",
    month: "October",
    description: "10-day UNESCO heritage festival — pandal-hopping, goddess idols, and Bengal's greatest spectacle.",
    image: "/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    tag: "UNESCO Intangible Heritage",
    colorHex: "#7e22ce"
  },
  {
    id: "f6",
    name: "Ganesh Chaturthi",
    city: "Mumbai",
    state: "Maharashtra",
    month: "Aug – Sep",
    description: "10-day festival culminating in grand immersion processions drawing millions to the sea.",
    image: "/tourism/India_Central/Incredible_India/028_Mumbai_skyline_Bandra_-_Worli_Sea_Link_bridge_with_govt.jpg",
    tag: "Mumbai's Grandest",
    colorHex: "#ea580c"
  },
  {
    id: "f7",
    name: "Onam",
    city: "Alleppey",
    state: "Kerala",
    month: "Aug – Sep",
    description: "Snake boat races with 100 rowers, Pookalam flower carpets, and the legendary 28-dish feast.",
    image: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    tag: "Harvest Festival",
    colorHex: "#10b981"
  },
  {
    id: "f8",
    name: "Mysuru Dasara",
    city: "Mysore",
    state: "Karnataka",
    month: "October",
    description: "100 caparisoned elephants in procession, Mysore Palace illuminated every night for 10 days.",
    image: "/tourism/India_Central/Incredible_India/035_vitthala-temple-complex-hampi-karnataka-city-hero_govt.jpg",
    tag: "State Festival",
    colorHex: "#eab308"
  },
  {
    id: "f9",
    name: "Rann Utsav",
    city: "Rann of Kutch",
    state: "Gujarat",
    month: "Nov – Feb",
    description: "Tent city in white salt desert — folk music, dance, handicrafts, and full-moon night magic.",
    image: "/tourism/Gujarat/Ahmedabad/002_Sabarmati_Ashram_govt.jpg",
    tag: "Desert Festival",
    colorHex: "#334155"
  },
  {
    id: "f10",
    name: "Hornbill Festival",
    city: "Kisama",
    state: "Nagaland",
    month: "December",
    description: "16 Naga tribes performing together — India's most vibrant tribal cultural showcase.",
    image: "/assets/festivals/hornbill.jpg",
    tag: "Tribal Culture",
    colorHex: "#b91c1c"
  },
  {
    id: "f11",
    name: "Hemis Festival",
    city: "Leh",
    state: "Ladakh",
    month: "Jun – Jul",
    description: "Largest monastery festival in Ladakh — masked Cham dances, and the rare thangka display.",
    image: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    tag: "Monastery Festival",
    colorHex: "#c2410c"
  },
  {
    id: "f12",
    name: "Thrissur Pooram",
    city: "Thrissur",
    state: "Kerala",
    month: "Apr – May",
    description: "Grandest temple festival — 100 caparisoned elephants, parasol competition, and orchestra.",
    image: "/assets/festivals/thrissur-pooram.jpg",
    tag: "Temple Festival",
    colorHex: "#f59e0b"
  }
];
