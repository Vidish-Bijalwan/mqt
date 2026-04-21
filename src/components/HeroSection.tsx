import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { useState, useEffect } from "react";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

const heroSlides = [
  {
    src: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    alt: "Dal Lake, Srinagar, Jammu & Kashmir, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    alt: "Vagator Beach, Goa, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    alt: "Ganga Ghat, Haridwar, Uttarakhand, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    alt: "Cherai Beach, Kerala, India",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  // Parallax: bg moves slower than scroll — creates depth
  const bgY = useTransform(scrollY, [0, 800], [0, 220]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Peak-End Rule: hero is the emotional PEAK — must be stunning
    // Responsive height: slightly shorter on mobile to prevent stretching text to the very bottom edge
    <section className="relative overflow-hidden bg-gray-900 h-[88svh] md:h-[100svh] min-h-[560px]">

      {/* Background image slider with parallax */}
      <motion.div
        style={{ y: bgY, scale: 1.08 }}
        className="absolute inset-0 w-full h-full origin-center"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : ("auto" as any)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ transitionDuration: "2000ms" }}
          />
        ))}
      </motion.div>

      {/* Overlay: bottom-heavy gradient so text is always readable */}
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.18) 70%, transparent 100%)",
        }}
      />

      {/* Slide indicator dots — Law of Proximity: grouped at bottom-left */}
      <div className="absolute bottom-8 left-6 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: currentSlide === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: currentSlide === i ? "#F59E0B" : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* Content — Serial Position Effect: anchored to BOTTOM */}
      {/* Fitts's Law: CTAs positioned where thumb naturally rests */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="absolute inset-x-0 bottom-0 z-30 container-page pb-28 md:pb-20"
      >
        {/* Trust pill — social proof first, Aesthetic-Usability + Trust */}
        <motion.div variants={staggerItem}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-wide mb-5">
            <span className="text-amber-400">✦</span>
            Premium India Travel Since 2019 · 500+ Travellers
          </span>
        </motion.div>

        {/* ONE headline — Serial Position Effect: first = most important */}
        <motion.h1
          variants={staggerItem}
          className="font-display font-bold text-white leading-[1.08] mb-5"
          style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
        >
          Discover the Soul<br className="hidden sm:block" /> of Incredible India
        </motion.h1>

        {/* ONE sub-line — answers "what do you do" in under 5 seconds */}
        <motion.p
          variants={staggerItem}
          className="text-white/80 font-light leading-relaxed mb-8 max-w-xl"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}
        >
          Curated journeys across every corner of India.
          <br className="hidden sm:block" />
          Planned for you. Perfected by locals.
        </motion.p>

        {/* TWO CTAs maximum — Fitts's Law: large targets, close together */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          {/* Primary: WhatsApp — Jakob's Law: green = universally recognised */}
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 font-semibold text-white rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-lg"
            style={{
              height: 56, // Fitts's Law: well above 44px minimum
              padding: "0 28px",
              background: "#25D366",
              boxShadow: "0 8px 28px rgba(37,211,102,0.4)",
              fontSize: 16,
              textDecoration: "none",
            }}
            id="hero-whatsapp-cta"
          >
            {/* WhatsApp icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Plan My Trip on WhatsApp
          </a>

          {/* Secondary: glass button */}
          <button
            onClick={() => navigate("/packages")}
            className="inline-flex items-center justify-center font-semibold text-white rounded-xl transition-all duration-200 hover:bg-white/20 active:scale-[0.97]"
            style={{
              height: 56,
              padding: "0 28px",
              background: "rgba(255,255,255,0.12)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              backdropFilter: "blur(8px)",
              fontSize: 16,
            }}
            id="hero-explore-cta"
          >
            Explore Packages →
          </button>
        </motion.div>

        {/* Goal-Gradient Effect: subtle scroll cue shows there's more below */}
        <motion.div
          variants={staggerItem}
          className="hidden sm:flex flex-col items-start gap-1 mt-6"
        >
          <span className="text-[11px] text-white/40 uppercase tracking-widest font-medium">
            Scroll to explore
          </span>
          <div
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            style={{ animation: "scrollArrow 1.8s ease-in-out infinite" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
