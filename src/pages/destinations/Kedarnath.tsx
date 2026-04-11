import DestinationPage from "@/components/DestinationPage";
import destKedarnath from "@/assets/dest-kedarnath.jpg";

const Kedarnath = () => (
  <DestinationPage
    name="Kedarnath"
    tagline="Sacred Himalayan Temple"
    heroImage={destKedarnath}
    price="From ₹18,999"
    duration="5 Days / 4 Nights"
    groupSize="2–12 people"
    bestTime="May – June & Sep – Oct"
    description={[
      "Kedarnath is one of India's most revered pilgrimage destinations — a sacred Shiva temple nestled at 11,755 feet in the Garhwal Himalayas of Uttarakhand. Part of the Char Dham Yatra circuit, it draws hundreds of thousands of devotees every year who brave the Himalayan terrain to seek the blessings of Mahadev.",
      "MyQuickTrippers transforms this sacred journey into a seamless, comfortable experience. We handle everything — from luxury accommodation in Phata and Guptkashi to helicopter bookings, pony arrangements, and expert priest guides who help you perform the rituals the right way.",
      "Whether you're a first-time pilgrim or a seasoned Char Dham traveller, our Kedarnath yatra packages ensure you arrive spiritually prepared and physically comfortable — leaving the logistics entirely to us.",
    ]}
    highlights={[
      "Ancient Shiva temple at 11,755 ft altitude",
      "Helicopter transfer option available",
      "Luxury tent camping near the temple",
      "Expert local priest / guide included",
      "Bhimashila & Gandhi Sarovar visit",
      "Vasuki Tal optional trek",
    ]}
    itinerary={[
      { day: "D1", title: "Arrival in Dehradun / Haridwar", desc: "Arrival and transfer to Guptkashi. Evening briefing and welcome dinner at our partner property." },
      { day: "D2", title: "Guptkashi → Phata → Kedarnath", desc: "Early morning helicopter flight from Phata helipad (or trek via Gaurikund). Check in to luxury tent camp. Evening temple darshan." },
      { day: "D3", title: "Kedarnath Temple – Full Day", desc: "Morning VIP darshan at the Kedarnath temple. Afternoon walk to Bhimashila and Gandhi Sarovar. Evening aarti at the temple." },
      { day: "D4", title: "Kedarnath → Guptkashi", desc: "Morning darshan, then helicopter return to Phata. Drive to Guptkashi. Visit Ardhanareshwar temple." },
      { day: "D5", title: "Return to Dehradun / Haridwar", desc: "Morning drive to Rishikesh. Option for Ganga aarti at Triveni Ghat before departure." },
    ]}
    includes={[
      "Helicopter transfers (Phata – Kedarnath – Phata)",
      "3 nights luxury hotel + 1 night luxury tent",
      "All meals (breakfast, lunch, dinner)",
      "Expert guide & priest for rituals",
      "All road transfers in private vehicle",
      "VIP darshan permit",
    ]}
  />
);

export default Kedarnath;
