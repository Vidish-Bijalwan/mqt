import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { destinations } from "@/data/packages";
import { destinationsData } from "@/data/destinations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ScrollableRow } from "@/components/ui/ScrollableRow";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getDestinationImage } from "@/lib/imageMap";
import { getStateSlugForDest } from "@/lib/destStateMap";

const DestinationExplorer = () => {
  // Scroll tracking handled by ScrollableRow internally

  return (
    <section className="section-padding bg-surface overflow-hidden">
      <ScrollReveal className="container-page mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">Explore Our Top Destinations</h2>
          <p className="section-subheading mx-auto">
            From ancient temples to frozen lakes — every trail tells a story
          </p>
        </div>

        {/* Horizontal Carousel */}
        <ScrollableRow innerClassName="flex gap-4 pb-8 px-2 md:px-0 snap-x snap-mandatory">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex gap-4"
          >
            {destinations.map((dest) => {
              const stateSlug = destinationsData.find(d => d.slug === dest.slug)?.stateSlug
                || getStateSlugForDest(dest.slug);
              const { src, fallbackSrc } = getDestinationImage(dest.slug, 'card', dest.image);

              return (
                <motion.div key={dest.id} variants={staggerItem} className="snap-start flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]">
                  <TiltCard className="h-full group">
                    <Link
                      to={`/destinations/${stateSlug}/${dest.slug}`}
                      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-soft">
                        <ImgWithFallback
                          src={src}
                          fallbackSrc={fallbackSrc}
                          alt={`${dest.name} travel destination in India`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                          containerClassName="w-full h-full absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                          <h3 className="font-body font-semibold text-lg text-background">{dest.name}</h3>
                          <p className="text-sm text-background/80">{dest.packagesCount} Packages</p>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </ScrollableRow>
      </ScrollReveal>
    </section>
  );
};

export default DestinationExplorer;
