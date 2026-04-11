import DestinationPage from "@/components/DestinationPage";
import destValley from "@/assets/dest-valley-of-flowers.jpg";

const ValleyOfFlowers = () => (
  <DestinationPage
    name="Valley of Flowers"
    tagline="UNESCO World Heritage Trek"
    heroImage={destValley}
    price="From ₹14,999"
    duration="6 Days / 5 Nights"
    groupSize="2–8 people"
    bestTime="July – September"
    description={[
      "The Valley of Flowers is one of the most ethereal and untouched landscapes on Earth — a UNESCO World Heritage Site tucked deep in the Chamoli district of Uttarakhand. Every monsoon, the valley bursts into a breathtaking canvas of over 500 species of rare Himalayan wildflowers, painting the alpine meadows in shades of violet, red, yellow, and white.",
      "The valley is only accessible on foot — a 17-km trek from Govindghat through Ghangaria — which ensures it remains pristine and crowd-free compared to other Himalayan destinations. With MyQuickTrippers, you'll be guided by an expert botanist who can name and explain the significance of each rare flower species you encounter.",
      "Combining the Valley of Flowers trek with a visit to the sacred Hemkund Sahib Gurudwara — one of the world's highest gurdwaras at 4,329 metres — makes this one of the most spiritually and visually rich journeys available in the Indian Himalayas.",
    ]}
    highlights={[
      "500+ species of rare Himalayan wildflowers",
      "UNESCO World Heritage Site",
      "Expert botanist guide throughout",
      "Hemkund Sahib Gurudwara visit",
      "Premium trek camps in Ghangaria",
      "Nanda Devi National Park sightings",
    ]}
    itinerary={[
      { day: "D1", title: "Arrival in Haridwar / Rishikesh", desc: "Arrival and transfer to partner hotel. Evening briefing and equipment check for the trek ahead." },
      { day: "D2", title: "Drive to Govindghat / Trek to Ghangaria", desc: "Early morning drive to Govindghat (8 hrs). Trek 14 km to Ghangaria base camp (3,050 m). Overnight at premium guest house." },
      { day: "D3", title: "Valley of Flowers Trek — Day 1", desc: "Full day in the Valley of Flowers (3,658 m). Guided botanist walk through the bloom with detailed species identification. Back to Ghangaria by evening." },
      { day: "D4", title: "Hemkund Sahib + Valley Extension", desc: "Morning trek to Hemkund Sahib Gurudwara (4,329 m) — one of the highest places of worship in the world. Afternoon optional return to the valley." },
      { day: "D5", title: "Trek Down to Govindghat", desc: "Gentle morning trek back to Govindghat with photostops along the Pushpawati river. Drive to Joshimath for overnight stay." },
      { day: "D6", title: "Return to Haridwar / Rishikesh", desc: "Morning drive through Chamoli Garhwal. Option for an Rishikesh evening aarti before departure." },
    ]}
    includes={[
      "5 nights accommodation (hotel + mountain camps)",
      "All meals from Day 2 to Day 5",
      "Expert botanist / trekking guide",
      "Valley of Flowers & Hemkund Sahib entry permits",
      "All road transfers in private vehicle",
      "First aid kit and emergency support",
    ]}
  />
);

export default ValleyOfFlowers;
