import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { destinations } from "@/data/packages";
import { destinationsData } from "@/data/destinations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getStateImage } from "@/lib/imageMap";

const DestinationExplorer = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Calculate max drag distance
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    
    // Recalculate on resize
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="section-padding bg-surface overflow-hidden">
      <ScrollReveal className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">Explore Our Top Destinations</h2>
          <p className="section-subheading mx-auto">
            From ancient temples to frozen lakes — every trail tells a story
          </p>
        </div>

        {/* Drag Carousel */}
        <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-visible">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex gap-5 pb-8" // Extra padding for shadow/tilt
          >
            {destinations.map((dest) => {
              const stateSlug = destinationsData.find(d => d.slug === dest.slug)?.stateSlug || "india";
              return (
              <motion.div key={dest.id} variants={staggerItem} className="flex-shrink-0 w-[240px] md:w-[280px]">
                <TiltCard className="h-full group">
                  <Link
                    to={`/destinations/${stateSlug}/${dest.slug}`}
                    className="block h-full outline-none"
                    draggable="false"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-soft">
                      <ImgWithFallback
                        src={getStateImage(dest.slug, 'card').src}
                        fallbackSrc={getStateImage(dest.slug, 'card').fallbackSrc}
                        alt={`${dest.name} travel destination in India`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                        <h3 className="font-body font-semibold text-lg text-background">{dest.name}</h3>
                        <p className="text-sm text-background/80">{dest.packagesCount} Packages</p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default DestinationExplorer;
