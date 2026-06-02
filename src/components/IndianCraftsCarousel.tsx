import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
import { craftsData } from "@/data/crafts";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getCraftWhatsAppUrl } from "@/lib/contact";
import { ScrollableRow } from "@/components/ui/ScrollableRow";

const IndianCraftsCarousel = () => {
  // Pick one standout craft per state (every 10th item = first of each state) — 12 items shown
  const featuredCrafts = craftsData.filter((_, i) => i % 10 === 0).slice(0, 12);

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container-page mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            Exquisite Crafts
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Handicrafts of Incredible India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich heritage of Indian artisans. From exquisite embroidery to intricate woodwork, bring home a piece of timeless tradition.
          </p>
        </ScrollReveal>

        {/* Scrollable Carousel */}
        <ScrollReveal delay={0.2} className="relative w-full overflow-visible">
          <ScrollableRow className="pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {featuredCrafts.map((craft, i) => (
              <div 
                key={craft.id} 
                className="flex-none w-[280px] sm:w-[320px] lg:w-[350px] snap-center sm:snap-start mr-4 sm:mr-6 lg:mr-8 group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border bg-gray-200 flex flex-col h-[400px]"
              >
                {/* Background image */}
                <ImgWithFallback
                  src={craft.image}
                  alt={`${craft.name} from ${craft.city}, ${craft.state}`}
                  fallbackSrc=""
                  fallbackColor={craft.colorHex}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                />

                {/* Soft dark gradient everywhere to ensure text is readable, gets darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 transition-opacity duration-300 group-hover:opacity-90 z-10" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                  <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {craft.state}
                  </span>
                </div>

                {/* Content Container (Bottom Aligned) */}
                <div className="relative z-20 mt-auto p-5 flex flex-col justify-end h-full">
                  
                  {/* Title & Location (Always Visible) */}
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                      {craft.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-white/90 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium text-gray-100">
                        {craft.city}
                      </span>
                    </div>
                  </div>

                  {/* Description & Button (Revealed on Hover) */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-200 line-clamp-3 mb-5 leading-relaxed">
                        {craft.description}
                      </p>
                      <a
                        href={getCraftWhatsAppUrl(craft.name, `${craft.city}, ${craft.state}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 text-white px-4 py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShoppingBag className="w-4 h-4" /> Enquire to Buy
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </ScrollableRow>
        </ScrollReveal>

        {/* CTA row */}
        <ScrollReveal className="mt-12 text-center" delay={0.4}>
          <div className="inline-flex flex-col items-center">
            <Link
              to="/crafts"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore All Indian Crafts <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default IndianCraftsCarousel;
