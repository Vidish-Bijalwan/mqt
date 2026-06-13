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
    src: "/tourism/India_Central/Incredible_India/015_7-choglamsar-leh-ladakh-city-hero-new_govt.jpg",
    alt: "Leh Ladakh, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg",
    alt: "Hidimba Temple, Manali, Himachal Pradesh, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    alt: "Ganga Ghat, Haridwar, Uttarakhand, India",
  },
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-900 hero-mobile flex flex-col">
      {/* Background — no scale on mobile to avoid stretched/cropped look */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-full md:scale-[1.05]"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : ("auto" as const)}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ transitionDuration: "2000ms" }}
          />
        ))}
      </motion.div>

      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #FBF7EF 0%, rgba(251,247,239,0.95) 2%, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div className="absolute bottom-10 left-4 sm:left-6 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300 rounded-full border-0 cursor-pointer"
            style={{
              width: currentSlide === i ? 24 : 8,
              height: 8,
              background: currentSlide === i ? "#F59E0B" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* Content anchored to bottom on mobile — avoids squashed center layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-30 mt-auto w-full container-page pb-6 pt-16 sm:pb-8 sm:pt-20 md:py-14 flex flex-col items-center text-center md:justify-center md:flex-1"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display font-bold text-white leading-[1.12] mb-3 sm:mb-5 text-[1.65rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] max-w-3xl"
        >
          Your India Trip,
          <br className="hidden sm:block" /> Planned by Locals Who&apos;ve Been There
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-white/90 font-light leading-relaxed mb-5 sm:mb-7 max-w-xl mx-auto text-sm sm:text-base md:text-lg"
        >
          Custom itineraries for Kashmir, Ladakh, Char Dham &amp; 28 states.
          <span className="hidden sm:inline"> Ready in 24 hours.</span>
          <span className="sm:hidden block mt-1">Ready in 24 hours.</span>
        </motion.p>

        <motion.div variants={staggerItem} className="w-full max-w-md mx-auto mb-4 sm:mb-6">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Dream trip (e.g. Kashmir 5 days)"
              className="w-full h-11 sm:h-12 pl-4 pr-12 rounded-xl bg-white/10 border border-white/30 text-white text-sm sm:text-base placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md"
              id="hero-dream-trip"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = e.currentTarget.value;
                  if (val) {
                    window.open(
                      `https://wa.me/917668741373?text=Hi! I want to plan: ${encodeURIComponent(val)}`,
                      "_blank"
                    );
                  }
                }
              }}
            />
            <button
              type="button"
              className="absolute right-1.5 top-1.5 bottom-1.5 w-9 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              onClick={() => {
                const input = document.getElementById("hero-dream-trip") as HTMLInputElement;
                const val = input?.value;
                if (val) {
                  window.open(
                    `https://wa.me/917668741373?text=Hi! I want to plan: ${encodeURIComponent(val)}`,
                    "_blank"
                  );
                } else {
                  window.open(getGeneralWhatsAppUrl(), "_blank");
                }
              }}
              aria-label="Send to WhatsApp"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="flex justify-center w-full">
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold text-white rounded-xl bg-[#25D366] shadow-lg shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98] transition-transform no-underline"
            id="hero-whatsapp-cta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Start Planning — It&apos;s Free
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
