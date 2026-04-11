import DestinationPage from "@/components/DestinationPage";
import destLadakh from "@/assets/dest-ladakh.jpg";

const Ladakh = () => (
  <DestinationPage
    name="Ladakh"
    tagline="Land of High Passes"
    heroImage={destLadakh}
    price="From ₹22,999"
    duration="7 Days / 6 Nights"
    groupSize="2–10 people"
    bestTime="June – September"
    description={[
      "Ladakh — the 'Land of High Passes' — is one of the most spectacular and remote regions on Earth. Perched at altitudes above 3,500 metres in the northernmost part of India, it offers an otherworldly landscape of turquoise lakes, stark desert mountains, ancient Buddhist monasteries, and some of the world's highest motorable roads.",
      "Our Ladakh tour packages are designed to take you beyond the typical tourist trail. You'll watch the sunrise over Pangong Tso, traverse the Nubra Valley's double-humped Bactrian camel dunes, and wander the prayer halls of Thiksey and Hemis monasteries with a local monk as your guide.",
      "Every MyQuickTrippers Ladakh itinerary includes acclimatisation days, premium stays, and 4x4 transfers on the mountain passes — so you experience Ladakh's full magnificence without compromising on safety or comfort.",
    ]}
    highlights={[
      "Pangong Tso — the famous blue lake",
      "Nubra Valley double-humped camel dunes",
      "World's highest motorable road — Khardung La",
      "Ancient monasteries: Thiksey, Hemis, Diskit",
      "Magnetic Hill & Confluence of Indus-Zanskar",
      "Premium stays in Leh & Nubra Valley",
    ]}
    itinerary={[
      { day: "D1", title: "Arrival in Leh — Rest & Acclimatise", desc: "Fly in to Leh airport (11,562 ft). Hotel check-in and full day rest for acclimatisation. Light walk around the local market in the evening." },
      { day: "D2", title: "Leh Local Sightseeing", desc: "Visit Shanti Stupa, Leh Palace, Hall of Fame, and Shankar Monastery. Afternoon briefing for the mountain road journey ahead." },
      { day: "D3", title: "Leh → Nubra Valley via Khardung La", desc: "Early morning drive over Khardung La pass (18,380 ft). Afternoon at Diskit Monastery and Hunder Sand Dunes. Camel safari at sunset." },
      { day: "D4", title: "Nubra Valley Exploration", desc: "Explore Sumur village, Samstanling Monastery, and the green Nubra river banks. Overnight in a premium Nubra Valley camp." },
      { day: "D5", title: "Nubra → Pangong Tso via Shyok Valley", desc: "Drive through the scenic Shyok River valley to the legendary Pangong Lake. Sunset over the changing blue waters of Pangong Tso." },
      { day: "D6", title: "Pangong → Leh via Chang La", desc: "Sunrise at Pangong lake — the most iconic moment of the trip. Drive back to Leh via Chang La pass and Hemis Monastery." },
      { day: "D7", title: "Departure from Leh", desc: "Morning at leisure or optional village walk. Transfer to Leh airport for onward flight." },
    ]}
    includes={[
      "6 nights premium accommodation (Leh + Nubra + Pangong)",
      "All road transfers in private 4x4 vehicles",
      "All Inner Line Permits for restricted areas",
      "All meals throughout the trip",
      "Expert local guide for all sightseeing",
      "Camel safari in Nubra Valley",
    ]}
  />
);

export default Ladakh;
