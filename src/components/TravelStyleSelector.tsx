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
    <section className="section relative overflow-hidden">
      <div className="container-page relative z-10">
        <div className="section-header-center section-intro-center">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Find Your Journey</span>
          <h2 className="section-heading">
            How do you want to travel?
          </h2>
          <p className="section-subheading mx-auto">Find journeys tailored to your style and budget.</p>
        </div>

        <motion.button
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          onClick={() => handleSelect(featured.category)}
          className="group relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] max-h-[280px] md:max-h-[320px] rounded-2xl overflow-hidden cursor-pointer text-left mb-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 z-10">
            <h3 className="font-sans text-xl sm:text-2xl md:text-4xl font-bold text-white mb-1 leading-tight">
              {featured.title}
            </h3>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white/75 text-sm md:text-base">{featured.desc}</p>
              <span className="hidden md:inline-flex items-center gap-2 text-sm font-bold bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-full border border-white/20 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-gap mt-4">
          {rest.map((style, i) => (
            <motion.button
              key={style.id}
              custom={i + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => handleSelect(style.category)}
              className="group relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 hover:-translate-y-1.5 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] transition-all duration-400"
              aria-label={`Explore ${style.title} packages`}
            >
              <img
                src={style.image}
                alt={style.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = style.fallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight mb-1.5 drop-shadow-sm">
                  {style.title}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2">{style.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStyleSelector;
