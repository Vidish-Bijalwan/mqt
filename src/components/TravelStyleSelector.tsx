import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/motion";
import { CinematicSection } from "./ui/CinematicSection";

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

const POPULAR_STYLES = ["Honeymoon", "Adventure", "Family", "Weekend Breaks", "Luxury", "Pilgrimage"];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE_SMOOTH },
  }),
};

const TravelStyleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/packages?category=${category}`);
  };

  const [featured, ...rest] = TRAVEL_STYLES;

  return (
    <CinematicSection variant="sunrise" className="section">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Left vertical visual anchor (desktop only) */}
        <div className="hidden lg:flex flex-col items-center justify-start w-12 shrink-0 border-r border-amber-900/10 pt-4">
          <Compass className="w-6 h-6 text-amber-500 mb-8 opacity-60" />
          <span className="writing-vertical font-display text-xs tracking-[0.3em] text-slate-400 uppercase rotate-180 opacity-60">
            Plan by Mood
          </span>
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="section-intro">
              <span className="section-eyebrow">Find Your Journey</span>
              <h2 className="section-heading">How do you want to travel?</h2>
              <p className="section-subheading">Curated journeys perfectly tailored to your style and pace.</p>
            </div>
            
            {/* Quick Pills */}
            <div className="flex flex-wrap items-center gap-2 max-w-sm justify-start md:justify-end">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mr-2 w-full md:w-auto text-left md:text-right">Popular:</span>
              {POPULAR_STYLES.slice(0, 3).map((style) => (
                <button key={style} className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:border-amber-400 hover:text-amber-600 transition-colors bg-white/50 backdrop-blur-sm">
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Featured Hero Card - Taller Cinematic Aspect */}
            <motion.button
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => handleSelect(featured.category)}
              className="group relative w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.5/1] max-h-[400px] rounded-2xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 shadow-soft"
              aria-label={`Explore ${featured.title} packages`}
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = featured.fallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
                <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight drop-shadow-md">
                  {featured.title}
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white/80 text-sm md:text-lg font-medium drop-shadow-sm">{featured.desc}</p>
                  <span className="hidden md:inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/30 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.button>

            {/* Denser Grid for smaller cards: 3 columns then 2 columns on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
              {rest.map((style, i) => (
                <motion.button
                  key={style.id}
                  custom={i + 1}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  onClick={() => handleSelect(style.category)}
                  className={`group relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 hover:-translate-y-1 shadow-sm hover:shadow-elevated transition-all duration-400 ${i < 3 ? 'col-span-1 md:col-span-2' : 'col-span-1 md:col-span-3'}`}
                  aria-label={`Explore ${style.title} packages`}
                >
                  <img
                    src={style.image}
                    alt={style.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = style.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 z-10">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight mb-1.5 drop-shadow-sm">
                      {style.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 line-clamp-1">{style.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CinematicSection>
  );
};

export default TravelStyleSelector;
