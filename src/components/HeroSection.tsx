import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useEffect, useRef } from "react";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import SemanticSearchBar from "./SemanticSearchBar";

const heroSlides = [
  {
    src: "/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg",
    alt: "Taj Mahal at sunrise with reflection pool mist, Agra, Uttar Pradesh, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/027_vagator-beach-goa-city-1-hero_govt.jpg",
    alt: "Pangong Tso Lake at sunrise with turquoise water and barren mountains, Ladakh, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg",
    alt: "Ganga Aarti fire ritual at Dashashwamedh Ghat with priests and brass lamps, Varanasi, India",
  },
  {
    src: "/tourism/India_Central/Incredible_India/040_Cherai_Beach_Ernakulam_Kochi_Kerala_India_on_a_clo_govt.jpg",
    alt: "Kerala backwaters houseboat at golden hour with coconut palms and reflections, Alleppey, India",
  },
];

const stats = [
  { icon: "✨", label: "Curated Pan-India Journeys" },
  { icon: "⭐", label: "4.9 Rated" },
  { icon: "😊", label: "10,000+ Happy Travellers" },
  { icon: "📅", label: "Expert Planners" },
];

const popularTags = ["Kerala Backwaters", "Rajasthan Heritage", "Goa Beaches", "Andaman Islands", "Himalayan Treks", "Varanasi Spiritual"];

const HeroSection = () => {
  const navigate = useNavigate();
  const { openPlanner } = useTripPlanner();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  // CTA single pulse — fires once after 2s
  useEffect(() => {
    const t = setTimeout(() => {
      if (ctaBtnRef.current) {
        ctaBtnRef.current.classList.add('animate-cta-pulse');
        ctaBtnRef.current.addEventListener('animationend', () => {
          ctaBtnRef.current?.classList.remove('animate-cta-pulse');
        }, { once: true });
      }
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Slider with Parallax */}
      <motion.div 
        style={{ 
          y: bgY, 
          scale: 1.1,

          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="absolute inset-0 w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto' as any}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ transitionDuration: '2000ms' }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 z-20" />
        <div className="absolute inset-0 gradient-hero z-20" />
      </motion.div>

      {/* Content */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center pt-16 pb-32"
      >
        <motion.p variants={staggerItem} className="text-accent font-body font-medium text-sm md:text-base tracking-widest uppercase mb-4 shadow-sm">
          ✨ Premium India Travel Experiences Since 2019
        </motion.p>

        <motion.h1 variants={staggerItem} className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-background leading-tight mb-6">
          Discover the Soul<br className="hidden md:block" /> of Incredible India
        </motion.h1>

        <motion.p variants={staggerItem} className="font-body text-base md:text-lg text-background/90 max-w-2xl mx-auto mb-8 font-medium">
          From spiritual circuits and Himalayan escapes to serene beaches, heritage cities, wildlife retreats, and luxury holidays — every journey is exclusively crafted around your style and schedule.
        </motion.p>

        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <MagneticButton>
            <Button 
              size="lg" 
              onClick={() => navigate("/packages")}
              ref={ctaBtnRef}
              className="gradient-accent text-accent-foreground font-semibold px-8 text-base hover:scale-[1.02] transition-transform shadow-lg"
            >
              Explore Packages
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => openPlanner({ intent_type: 'custom_trip' }, 'hero_cta')}
              className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white font-medium px-8 text-base shadow-sm backdrop-blur-sm"
            >
              Plan Custom Trip →
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-background/80 text-sm">
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
              {i < stats.length - 1 && <span className="hidden md:inline text-background/30 ml-4">|</span>}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Search Widget */}
      <ScrollReveal delay={0.6} className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-20 px-4">
        <div className="container mx-auto flex flex-col gap-4 relative">
          <div className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-md p-2 rounded-[2rem] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <SemanticSearchBar />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default HeroSection;
