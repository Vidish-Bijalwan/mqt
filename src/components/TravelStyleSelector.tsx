import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/motion";

const TRAVEL_STYLES = [
  {
    id: "adventure",
    title: "Mountain Adventure",
    desc: "Ladakh · Spiti · Himachal · Trekking",
    category: "adventure-tours",
    image: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
  },
  {
    id: "leisure",
    title: "Beach & Leisure",
    desc: "Kerala · Goa · Andaman",
    category: "beach-escapes",
    image: "/tourism/India_Central/Incredible_India/036_kalpeni-kavaratti-lakshwadeep-3-musthead-hero_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
  },
  {
    id: "honeymoon",
    title: "Honeymoon & Romantic",
    desc: "Kashmir · Kerala · Goa",
    category: "honeymoon-journeys",
    image: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
  },
  {
    id: "family",
    title: "Family Holidays",
    desc: "Rajasthan · Kerala · Manali",
    category: "family-holidays",
    image: "/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
  },
  {
    id: "spiritual",
    title: "Spiritual Journey",
    desc: "Char Dham · Varanasi · Kedarnath",
    category: "pilgrimage-tours",
    image: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
  },
  {
    id: "wildlife",
    title: "Wildlife & Nature",
    desc: "Corbett · Ranthambore · Darjeeling",
    category: "wildlife",
    image: "/tourism/India_Central/Incredible_India/025_happy-valley-tea-estate-darjeeling-west_bengal-1-h_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
  },
];

const EASE = EASE_SMOOTH;
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
  }),
};

const TravelStyleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/packages?category=${category}`);
  };

  // First card = featured (full width), rest are in 2-col or 3-col grid
  const [featured, ...rest] = TRAVEL_STYLES;

  return (
    <section className="section-y-compact md:py-24 bg-[#FAF8F4] relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Find Your Journey</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 leading-tight mt-3 mb-3">
            How do you want to travel?
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-lg mx-auto">
            Find journeys tailored to your style and budget.
          </p>
        </div>

        {/* Featured Card — full width */}
        <motion.button
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          onClick={() => handleSelect(featured.category)}
          className="group relative w-full h-[200px] sm:h-[260px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer text-left mb-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
          aria-label={`Explore ${featured.title} packages`}
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = featured.fallback; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 z-10">
            <h3 className="font-sans text-xl sm:text-2xl md:text-5xl font-bold text-white mb-2">
              {featured.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm md:text-lg">{featured.desc}</p>
              <span className="hidden md:inline-flex items-center gap-2 text-sm font-bold bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-full border border-white/20 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.button>

        {/* Secondary cards — responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          {rest.map((style, i) => (
            <motion.button
              key={style.id}
              custom={i + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => handleSelect(style.category)}
              className="group relative h-[180px] sm:h-[220px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
              aria-label={`Explore ${style.title} packages`}
            >
              <img
                src={style.image}
                alt={style.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = style.fallback; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                <h3 className="font-sans text-lg md:text-xl font-bold text-white leading-tight mb-1">
                  {style.title}
                </h3>
                <p className="text-xs text-white/60 mb-3">{style.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStyleSelector;
