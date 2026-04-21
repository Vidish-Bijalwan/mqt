import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_SMOOTH } from "@/lib/motion";

// Hick's Law: exactly 3 choices — not 6, not 8, THREE.
// Law of Similarity: all cards identical visual treatment.
// Progressive Disclosure: clicking reveals only relevant packages.
const TRAVEL_STYLES = [
  {
    id: "spiritual",
    icon: "🙏",
    title: "Spiritual Journey",
    desc: "Char Dham, Varanasi, Kedarnath, pilgrimage circuits",
    category: "pilgrimage",
    // Government tourism images — locally hosted
    image:
      "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
  },
  {
    id: "adventure",
    icon: "⛰",
    title: "Mountain & Adventure",
    desc: "Ladakh, Spiti, Himachal, trekking, road trips",
    category: "adventure",
    // Manali/Himachal Pradesh — confirmed local govt image (correct for mountain travel)
    image:
      "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    fallback:
      "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
  },
  {
    id: "leisure",
    icon: "🌴",
    title: "Beach & Leisure",
    desc: "Kerala, Goa, Andaman, honeymoon, family holidays",
    category: "beach-escapes",
    image: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    fallback: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
  },
] as const;

// EASE_SMOOTH typed as [number,number,number,number] — required by Framer Motion Variants
const EASE = EASE_SMOOTH;
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: EASE },
  }),
};

const TravelStyleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (category: string) => {
    navigate(`/packages?category=${category}`);
  };

  return (
    <section className="section-y bg-white reveal-section">
      <div className="container-page">
        {/* Section header — Serial Position Effect: first thing in section = most important */}
        <div className="text-center mb-10 md:mb-14">
          <span className="section-eyebrow">FIND YOUR JOURNEY</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-3">
            How do you want to travel?
          </h2>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Choose one. We'll do the rest.
          </p>
        </div>

        {/* 3 cards — Law of Similarity: identical treatment for all */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {TRAVEL_STYLES.map((style, i) => (
            <motion.button
              key={style.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              onClick={() => handleSelect(style.category)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60 aspect-[16/9] md:aspect-[3/4]"
              aria-label={`Explore ${style.title} packages`}
              // Aesthetic-Usability: beautiful card earns trust
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              {/* Background image with zoom on hover */}
              <img
                src={style.image}
                alt={style.title}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = style.fallback;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark gradient — bottom heavy — text always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content — Law of Proximity: icon+title+desc+CTA grouped at bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                <span className="text-3xl mb-3" aria-hidden>
                  {style.icon}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {style.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {style.desc}
                </p>
                {/* Von Restorff: amber CTA stands out from white text */}
                <span className="flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:gap-3 transition-all duration-300">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-amber-400/40 transition-all duration-300 pointer-events-none" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStyleSelector;
