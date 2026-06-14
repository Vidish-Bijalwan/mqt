import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { CinematicSection } from "./ui/CinematicSection";

const DESTINATIONS = [
  {
    id: "kashmir",
    name: "Kashmir",
    bestFor: "Honeymoon & Landscapes",
    image: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    slug: "kashmir",
  },
  {
    id: "kerala",
    name: "Kerala",
    bestFor: "Relaxation & Nature",
    image: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    slug: "kerala",
  },
  {
    id: "ladakh",
    name: "Ladakh",
    bestFor: "Adventure & Thrills",
    image: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    slug: "ladakh",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    bestFor: "Heritage & Royals",
    image: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    slug: "rajasthan",
  },
  {
    id: "andaman",
    name: "Andaman",
    bestFor: "Beaches & Water Sports",
    image: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    slug: "andaman",
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    bestFor: "Spiritual & Mountains",
    image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    slug: "uttarakhand",
  },
];

const DestinationGrid = () => {
  return (
    <CinematicSection variant="map" className="section-y">
      <div className="section-header-center section-intro-center mb-10 md:mb-14">
        <span className="section-eyebrow">Handpicked for you</span>
        <h2 className="section-heading text-4xl md:text-5xl">Top Destinations</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6">
        {DESTINATIONS.map((dest) => (
          <Link
            key={dest.id}
            to={`/destinations/${dest.slug}`}
            className="group relative rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[4/5] sm:aspect-[3/4] block shadow-md hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 border border-slate-200/50"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 transition-transform duration-500 group-hover:-translate-y-1">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-sm">
                Best for: {dest.bestFor}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
              <div>
                <h3 className="text-white font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-md mb-2 transition-transform duration-500 group-hover:translate-x-2">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1.5 text-amber-400 font-medium text-sm drop-shadow-sm transition-transform duration-500 group-hover:translate-x-2 delay-75">
                  <MapPin className="w-4 h-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
                  <span className="uppercase tracking-widest text-[11px]">Explore</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CinematicSection>
  );
};

export default DestinationGrid;
