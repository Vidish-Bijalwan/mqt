import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Himalayan monastery perched on a cliff with snow-capped peaks at golden sunset — luxury India travel by MyQuickTrippers"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-primary mb-6"
        >
          India's Finest Travel Experiences
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[1.1] mb-6"
        >
          Discover the
          <br />
          <span className="gold-gradient-text font-medium italic">Himalayas & Beyond</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From sacred temples of Kedarnath to the pristine lakes of Ladakh — curated luxury journeys through India's most breathtaking landscapes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#destinations"
            className="inline-block px-10 py-4 font-body text-sm uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            Explore Destinations
          </a>
          <a
            href="#experiences"
            className="inline-block px-10 py-4 font-body text-sm uppercase tracking-[0.2em] border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            View Experiences
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
