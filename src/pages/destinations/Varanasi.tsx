import DestinationPage from "@/components/DestinationPage";
import destVaranasi from "@/assets/dest-varanasi.jpg";

const Varanasi = () => (
  <DestinationPage
    name="Varanasi"
    tagline="India's Eternal Spiritual City"
    heroImage={destVaranasi}
    price="From ₹12,499"
    duration="3 Days / 2 Nights"
    groupSize="2–15 people"
    bestTime="October – March"
    description={[
      "Varanasi — also known as Kashi or Banaras — is one of the oldest continuously inhabited cities on Earth, and India's most sacred destination. Sitting on the banks of the Ganges in Uttar Pradesh, its ancient ghats have witnessed millennia of rituals, prayers, cremations, and celebrations, making it a place unlike anywhere else in the world.",
      "A MyQuickTrippers Varanasi tour is built around the rhythm of the city — beginning before dawn at the ghats for the sunrise boat ride, through the winding alleys of the old city, and culminating in the thunderous spectacle of the evening Ganga Aarti at Dashashwamedh Ghat. We arrange private access that keeps you away from the tourist crowds.",
      "Whether you come on a spiritual pilgrimage or as a curious traveller drawn by the ancient mystic energy of Kashi, our expert Varanasi guides will open the city's hidden soul to you — its stories, its temples, its silk weavers, and its profound relationship with life and death.",
    ]}
    highlights={[
      "Private sunrise boat ride on the Ganges",
      "VIP evening Ganga Aarti experience",
      "Guided old city walk through Kashi lanes",
      "Kashi Vishwanath temple visit",
      "Sarnath — where Buddha gave his first sermon",
      "Traditional Banarasi silk weaver visit",
    ]}
    itinerary={[
      { day: "D1", title: "Arrival in Varanasi", desc: "Arrive and check in to partner hotel near the ghats. Evening orientation walk along the ghats. VIP seating for the Ganga Aarti at Dashashwamedh Ghat." },
      { day: "D2", title: "Varanasi Full Day", desc: "Pre-dawn boat ride on the Ganges to watch the city wake up. Breakfast at ghat-side café. Expert-guided walk through Vishwanath Gali, Kashi Vishwanath temple, and the famous Manikarnika cremation ghat with respectful explanation of the rituals." },
      { day: "D3", title: "Sarnath & Departure", desc: "Morning visit to Sarnath — where Buddha delivered his first sermon after enlightenment. Archaeological museum tour. Transfer to Varanasi airport / station." },
    ]}
    includes={[
      "2 nights premium hotel near the ghats",
      "All meals (breakfast + 2 dinners)",
      "Private sunrise boat ride on the Ganges",
      "Expert local guide for all sightseeing",
      "VIP Ganga Aarti seating pass",
      "All road transfers in private vehicle",
    ]}
  />
);

export default Varanasi;
