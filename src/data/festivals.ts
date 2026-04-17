export interface FestivalCard {
  id: string;
  name: string;
  city: string;
  state: string;
  month: string;
  description: string;
  image: string;
  tag: string;
  colorHex?: string; // Fallback gradient hex
}

export const festivalsData: FestivalCard[] = [
  {
    id: "f1",
    name: "Holi",
    city: "Mathura & Vrindavan",
    state: "Uttar Pradesh",
    month: "March",
    description: "World's most colourful festival — powder-drenched celebrations at the birthplace of Lord Krishna.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1511216113906-8f56bbce1661?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1560935105-ff34d5885060?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1605273516104-58bcac4c03b8?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1600021677610-d01c0cb0a08e?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1577789467770-5b7fb749c952?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1601614777595-5db4f3f4c6aa?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1610486058097-cdddbda24c74?auto=format&fit=crop&q=80&w=1280",
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
    image: "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&q=80&w=1280",
    tag: "Temple Festival",
    colorHex: "#f59e0b"
  }
];
