export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tour: string;
  destination: string;
  date: string;
  rating: number;
  text: string;
  initials: string;
  avatar?: string;
  verified: boolean;
  source?: "Google" | "TripAdvisor" | "Direct";
}

export const allTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    location: "New Delhi",
    tour: "Kedarnath Yatra Package",
    destination: "Kedarnath",
    date: "March 2025",
    rating: 5,
    text: "The Kedarnath trip was beyond our expectations. Everything was perfectly organised from the hotel stays to the guided treks. The team was available 24/7 and made us feel completely safe throughout the journey. Our guide knew every step of the route and the best viewpoints. Will definitely book again for Char Dham.",
    initials: "RS",
    verified: true,
    source: "Google",
  },
  {
    id: "2",
    name: "Priya Patel",
    location: "Mumbai",
    tour: "Kashmir Honeymoon Special",
    destination: "Kashmir",
    date: "February 2025",
    rating: 5,
    text: "Our honeymoon in Kashmir was absolutely magical. The houseboat experience, the Shikara ride on Dal Lake at sunrise, and the snow in Gulmarg — everything was picture perfect. The surprise romantic setup on our houseboat (rose petals, candles, welcome cake) was so thoughtful. Thank you MyQuickTrippers for the most beautiful start to our married life!",
    initials: "PP",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "3",
    name: "Amit Kumar",
    location: "Bangalore",
    tour: "Ladakh Adventure Tour",
    destination: "Ladakh",
    date: "July 2024",
    rating: 5,
    text: "Ladakh was a dream come true! The itinerary was well-planned with proper acclimatisation days — I was grateful for that because some friends who went with other operators got severe altitude sickness. Our guide Tashi was incredibly knowledgeable about local culture, bird life, and monastery history. Pangong felt like another planet.",
    initials: "AK",
    verified: true,
    source: "Google",
  },
  {
    id: "4",
    name: "Sunita Agarwal",
    location: "Jaipur",
    tour: "Char Dham Yatra",
    destination: "Char Dham",
    date: "June 2024",
    rating: 5,
    text: "This was my lifelong dream — to complete the Char Dham Yatra before turning 60. MyQuickTrippers made it possible with so much care. They arranged a pony for me at Kedarnath, priority darshan at Badrinath, and the entire trip felt like I had family looking after me. No hidden costs, everything was exactly as described.",
    initials: "SA",
    verified: true,
    source: "Direct",
  },
  {
    id: "5",
    name: "Vikram & Ananya Reddy",
    location: "Hyderabad",
    tour: "Valley of Flowers Trek",
    destination: "Valley of Flowers",
    date: "August 2024",
    rating: 5,
    text: "We had never trekked before and were nervous. Our guide Rajesh was patient, informative, and incredibly encouraging. The Valley in peak bloom (August) was otherworldly — I have no other word for it. The Brahma Kamal that Rajesh found for us was the cherry on top. Best trip of our lives, hands down.",
    initials: "VR",
    verified: true,
    source: "Google",
  },
  {
    id: "6",
    name: "Deepak Mishra",
    location: "Lucknow",
    tour: "Varanasi Spiritual Journey",
    destination: "Varanasi",
    date: "November 2024",
    rating: 5,
    text: "The Varanasi trip changed something inside me. The sunrise boat ride, witnessing the Ganga Aarti from a boat in the middle of the river, and the old city walk were profound experiences. Our guide explained the philosophy and history behind every ritual. Book with MyQuickTrippers if you want depth, not just sightseeing.",
    initials: "DM",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "7",
    name: "Kavya Nair",
    location: "Kochi",
    tour: "Manali Family Adventure",
    destination: "Manali",
    date: "December 2024",
    rating: 5,
    text: "We were a family of 6 (including my 68-year-old mother-in-law and two kids aged 9 and 13). I was worried it would be too much for the elderly. But the team had planned everything so well — comfortable hotel, large vehicle, slow pace on difficult days. My mother-in-law saw snow for the first time and cried with joy. Priceless.",
    initials: "KN",
    verified: true,
    source: "Google",
  },
  {
    id: "8",
    name: "Arjun & Lavanya Menon",
    location: "Chennai",
    tour: "Kashmir Honeymoon Special",
    destination: "Kashmir",
    date: "October 2024",
    rating: 5,
    text: "5 stars is not enough. Every single thing was perfect — from the taxi at the airport to the last shikara ride on Day 5. The houseboat was beautiful, the guide was knowledgeable and discreet (perfect for honeymooners), and the Pahalgam day was absolutely stunning in autumn colours. Will recommend to everyone we know.",
    initials: "AM",
    verified: true,
    source: "Google",
  },
  {
    id: "9",
    name: "Rohit Verma",
    location: "Chandigarh",
    tour: "Kedarnath Yatra Package",
    destination: "Kedarnath",
    date: "September 2024",
    rating: 5,
    text: "Second time with MyQuickTrippers and they keep getting better. This time I did the 5 nights Kedarnath package including the Vasuki Tal extension — those 2 hours above the temple near the glacier were the most peaceful of my year. The logistics were flawless. Highly recommend the September season — fewer crowds, clearer skies.",
    initials: "RV",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "10",
    name: "Meera & Suresh Pillai",
    location: "Pune",
    tour: "Ladakh Adventure Tour",
    destination: "Ladakh",
    date: "August 2024",
    rating: 4,
    text: "A fantastic trip overall. Pangong at sunrise was breathtaking — I keep that image as my laptop wallpaper. Nubra Valley and the camel ride was fun. One small note: the hotel in Nubra was basic, but I understand that's the standard for that area. The team was helpful and responsive via WhatsApp throughout.",
    initials: "MP",
    verified: true,
    source: "Google",
  },
  {
    id: "11",
    name: "Dr Rajesh Gupta",
    location: "Ahmedabad",
    tour: "Char Dham Yatra",
    destination: "Char Dham",
    date: "May 2024",
    rating: 5,
    text: "Completed Char Dham at 72 years old with full support from the team. Helicopter for Kedarnath was arranged seamlessly. Priority darshan at all four sites saved hours of waiting. The guide was calm and patient with our pace. This is exactly how senior pilgrimages should be organised. My family thanks the entire MQT team.",
    initials: "RG",
    verified: true,
    source: "Direct",
  },
  {
    id: "12",
    name: "Sneha Joshi",
    location: "Surat",
    tour: "Valley of Flowers Trek",
    destination: "Valley of Flowers",
    date: "July 2024",
    rating: 5,
    text: "Solo trip as a woman — the team went above and beyond to make me feel safe. Daily WhatsApp check-ins, my guide's number shared with family, and the naturalist knowledge was extraordinary. The Hemkund Sahib climb was tough but completely worth it for the sacred lake views. I came back a different person.",
    initials: "SJ",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "13",
    name: "Ankit & Pooja Sharma",
    location: "Noida",
    tour: "Kashmir Honeymoon Special",
    destination: "Kashmir",
    date: "January 2025",
    rating: 5,
    text: "We went to Kashmir in January expecting it to be cold and quiet. It was magical — Dal Lake was partially frozen, Gulmarg had 6 feet of snow, and the entire valley was white and silent. The houseboat with its kangdi (traditional heater) indoors was incredibly cosy. A winter Kashmir honeymoon is highly underrated.",
    initials: "AS",
    verified: true,
    source: "Google",
  },
  {
    id: "14",
    name: "Harish Nambiar",
    location: "Trivandrum",
    tour: "Manali Family Adventure",
    destination: "Manali",
    date: "May 2024",
    rating: 5,
    text: "First hill station trip for our two boys (8 and 11). They absolutely loved the snow at Solang Valley and the Rohtang Pass. The Hadimba Temple was fascinating for all of us. Our driver Ravi was excellent — patient, knowledgeable, and great with kids. Already planning Ladakh next year with MyQuickTrippers.",
    initials: "HN",
    verified: true,
    source: "Google",
  },
  {
    id: "15",
    name: "Smita Kulkarni",
    location: "Nagpur",
    tour: "Varanasi Spiritual Journey",
    destination: "Varanasi",
    date: "December 2024",
    rating: 5,
    text: "Dev Deepawali in Varanasi — watching 100,000 lamps light up all 88 ghats simultaneously was the most breathtaking thing I have ever witnessed. The team arranged us a front-row boat position. Worth every rupee. If you are planning Varanasi for Dev Deepawali, book at least 2 months in advance.",
    initials: "SK",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "16",
    name: "Nikhil Bajpai",
    location: "Kanpur",
    tour: "Kedarnath Yatra Package",
    destination: "Kedarnath",
    date: "October 2024",
    rating: 5,
    text: "October Kedarnath is the hidden gem months — fewer people, golden sunlight on the peaks, and an atmosphere of deep peace. The guide knew all the obscure stories about the temple's history. The sunrise from Shankaracharya Samadhi was spiritual in the literal sense. Already planning a return for Badrinath.",
    initials: "NB",
    verified: true,
    source: "Direct",
  },
  {
    id: "17",
    name: "Leena & Raj Malhotra",
    location: "Gurgaon",
    tour: "Ladakh Adventure Tour",
    destination: "Ladakh",
    date: "September 2024",
    rating: 5,
    text: "7 nights in Ladakh felt like a lifetime in the best possible way. The itinerary pacing was exactly right — not rushed, enough time at each site to actually absorb it. Tso Moriri (optional extension) was MORE beautiful than Pangong. Ask the team about the Tso Moriri extension — completely worth it.",
    initials: "LM",
    verified: true,
    source: "Google",
  },
  {
    id: "18",
    name: "Gaurav Tiwari",
    location: "Indore",
    tour: "Kashmir Honeymoon Special",
    destination: "Kashmir",
    date: "April 2025",
    rating: 5,
    text: "April Kashmir during tulip season is something else entirely. The Tulip Garden had 1.5 million blooming flowers with snow on the Zabarwan hills in the background. Our guide got us there at 7 AM before the crowds — perfect photography conditions. The houseboat we stayed in was absolutely stunning. Perfect honeymoon.",
    initials: "GT",
    verified: true,
    source: "Google",
  },
  {
    id: "19",
    name: "Pallavi Shetty",
    location: "Mangalore",
    tour: "Valley of Flowers Trek",
    destination: "Valley of Flowers",
    date: "August 2024",
    rating: 5,
    text: "As someone who was skeptical about whether I was fit enough for trekking, this trip proved me wrong. The guide calibrated the pace perfectly and the support from the ground team was constant. The Valley itself — I am lost for words. It is one of those places that makes you feel the world is still fundamentally beautiful.",
    initials: "PS",
    verified: true,
    source: "TripAdvisor",
  },
  {
    id: "20",
    name: "Sanjay & Nisha Bansal",
    location: "Bhopal",
    tour: "Manali Family Adventure",
    destination: "Manali",
    date: "April 2025",
    rating: 4,
    text: "Good trip overall. Rohtang Pass was spectacular with the snow still thick in April. The hotel was comfortable and centrally located. Our only feedback: the restaurant options near the hotel were limited for pure vegetarians — the team can perhaps curate a better list. Everything else was well-managed and worth the value.",
    initials: "SB",
    verified: true,
    source: "Google",
  },
];

// ── Convenience exports ───────────────────────────────────────────────────────

export function getTestimonialsByDestination(destination: string): Testimonial[] {
  return allTestimonials.filter(
    (t) => t.destination.toLowerCase() === destination.toLowerCase()
  );
}

export function getAverageRating(): number {
  if (allTestimonials.length === 0) return 0;
  const total = allTestimonials.reduce((sum, t) => sum + t.rating, 0);
  return Math.round((total / allTestimonials.length) * 10) / 10;
}

export function getRatingBreakdown(): Record<number, number> {
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allTestimonials.forEach((t) => {
    breakdown[t.rating] = (breakdown[t.rating] ?? 0) + 1;
  });
  return breakdown;
}
