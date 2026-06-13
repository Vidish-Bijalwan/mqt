import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const DESTINATIONS = [
  {
    id: "kashmir",
    name: "Kashmir",
    image: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    slug: "kashmir",
  },
  {
    id: "kerala",
    name: "Kerala",
    image: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    slug: "kerala",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    image: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    slug: "ladakh",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    image: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    slug: "rajasthan",
  },
  {
    id: "andaman",
    name: "Andaman",
    image: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    slug: "andaman",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    slug: "uttarakhand",
  },
];

const DestinationGrid = () => {
  return (
    <section className="section">
      <div className="container-page">
        <div className="section-header-center section-intro-center">
          <span className="section-eyebrow">EXPLORE BY REGION</span>
          <h2 className="section-heading">Top Destinations</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 grid-gap">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              to={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] block shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] hover:-translate-y-1.5 transition-all duration-400"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-white font-display font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2 leading-tight drop-shadow-sm">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0" />
                  <span className="truncate">{dest.name}</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;
