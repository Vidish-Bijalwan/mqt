import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import destKedarnath from "@/assets/dest-kedarnath.jpg";
import destValley from "@/assets/dest-valley-of-flowers.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";

const destinations = [
  {
    name: "Kedarnath",
    tagline: "Sacred Himalayan Temple",
    description: "Ancient Shiva temple nestled among snow-capped peaks at 11,755 ft",
    image: destKedarnath,
    price: "From ₹18,999",
  },
  {
    name: "Valley of Flowers",
    tagline: "UNESCO Heritage",
    description: "Vibrant alpine meadows blooming with rare Himalayan wildflowers",
    image: destValley,
    price: "From ₹14,999",
  },
  {
    name: "Ladakh",
    tagline: "Land of High Passes",
    description: "Pangong Lake, ancient monasteries, and the world's highest motorable roads",
    image: destLadakh,
    price: "From ₹22,999",
  },
  {
    name: "Varanasi",
    tagline: "Spiritual Capital",
    description: "Timeless ghats along the sacred Ganges — India's oldest living city",
    image: destVaranasi,
    price: "From ₹12,499",
  },
];

const DestinationCard = ({ dest, index }: { dest: typeof destinations[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative overflow-hidden hover-lift cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={dest.image}
          alt={`${dest.name} — ${dest.description}. Book luxury India travel with MyQuickTrippers`}
          loading="lazy"
          width={640}
          height={800}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-2">
          {dest.tagline}
        </p>
        <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
          {dest.name}
        </h3>
        <p className="font-body text-sm text-foreground/50 mb-3">
          {dest.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-primary font-semibold">{dest.price}</span>
          <span className="font-body text-xs uppercase tracking-[0.15em] text-foreground/40 group-hover:text-primary transition-colors duration-300">
            Explore →
          </span>
        </div>
      </div>
    </motion.article>
  );
};

const DestinationsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="destinations" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Handpicked For You
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
            Featured Indian Destinations
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
