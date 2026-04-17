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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Colorful_Holi.jpg/1280px-Colorful_Holi.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dev_Deepawali_at_Varanasi.jpg/1280px-Dev_Deepawali_at_Varanasi.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pushkar_camel_fair.jpg/1280px-Pushkar_camel_fair.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kumbh_Mela_Allahabad.jpg/1280px-Kumbh_Mela_Allahabad.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Durga_Puja_Kolkata_2019.jpg/1280px-Durga_Puja_Kolkata_2019.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ganesh_Visarjan_in_Mumbai.jpg/1280px-Ganesh_Visarjan_in_Mumbai.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Aranmula_Vallamkali.jpg/1280px-Aranmula_Vallamkali.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mysore_Palace_Illumination.jpg/1280px-Mysore_Palace_Illumination.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/White_Desert_of_Kutch.jpg/1280px-White_Desert_of_Kutch.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Hornbill_festival_nagaland.jpg/1280px-Hornbill_festival_nagaland.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hemis_monastery_Cham_dance.jpg/1280px-Hemis_monastery_Cham_dance.jpg",
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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Thrissur_Pooram_Elephants.jpg/1280px-Thrissur_Pooram_Elephants.jpg",
    tag: "Temple Festival",
    colorHex: "#f59e0b"
  }
];
