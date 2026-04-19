import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { festivalsData } from "@/data/festivals";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getFestivalWhatsAppUrl } from "@/lib/contact";

const FestivalsOfIndia = () => {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container-page mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            Celebrate India
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Festivals of Incredible India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Time your journey to coincide with one of India's spectacular festivals.
            Discover vibrant traditions and unforgettable celebrations across the nation.
          </p>
        </ScrollReveal>

        {/* 1-col mobile, 2-col tablet, 3-col desktop grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-0">
          {festivalsData.map((festival, i) => (
            <ScrollReveal
              key={festival.id}
              delay={i < 6 ? i * 0.1 : 0}
              className="h-full"
            >
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border bg-gray-200 flex flex-col h-[400px]">
                
                {/* Background image */}
                <ImgWithFallback
                  src={festival.image}
                  alt={`${festival.name} festival in ${festival.city}, ${festival.state}, India`}
                  fallbackSrc=""
                  fallbackColor={festival.colorHex}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                />

                {/* Soft dark gradient everywhere to ensure text is readable, gets darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90 z-10" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                  <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {festival.tag}
                  </span>
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {festival.month}
                  </span>
                </div>

                {/* Content Container (Bottom Aligned) */}
                <div className="relative z-20 mt-auto p-5 flex flex-col justify-end h-full">
                  
                  {/* Title & Location (Always Visible) */}
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                      {festival.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-white/90 text-sm mb-4">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="font-medium text-gray-100">
                        {festival.city}, <span className="text-gray-300">{festival.state}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description & Button (Revealed on Hover) */}
                  <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-200 line-clamp-3 mb-5 leading-relaxed">
                        {festival.description}
                      </p>
                      <a
                        href={getFestivalWhatsAppUrl(festival.name, festival.city)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent text-white px-4 py-2.5 text-sm font-semibold hover:bg-accent/90 transition-colors shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Plan Your Trip <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA row */}
        <ScrollReveal className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-secondary/30 border border-border">
            <p className="text-foreground font-medium mb-4 text-lg">Ready to experience India's vibrant culture?</p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Browse Festival Packages <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FestivalsOfIndia;
