import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { festivalsData } from "@/data/festivals";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getFestivalWhatsAppUrl } from "@/lib/contact";

const FestivalsOfIndia = () => {
  return (
    <section className="section-y bg-background overflow-hidden">
      <div className="container-page mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
            Celebrate India
          </span>
          <h2 className="section-heading">Festivals of Incredible India</h2>
          <p className="section-subheading mx-auto">
            Time your journey to coincide with one of India's spectacular festivals — 15 unmissable celebrations across the nation.
          </p>
        </ScrollReveal>

        {/* Scrollable card row — snap on mobile, 3-col grid on desktop per spec */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 scrollbar-hide snap-x snap-mandatory md:snap-none">
          {festivalsData.map((festival, i) => (
            <ScrollReveal
              key={festival.id}
              delay={i < 6 ? i * 0.08 : 0}
              className="snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-auto"
            >
              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-border aspect-video cursor-default festival-card bg-[#0F172A]">
                {/* Background image with color fallback */}
                <ImgWithFallback
                  src={festival.image}
                  alt={`${festival.name} festival in ${festival.city}, ${festival.state}, India`}
                  fallbackSrc=""
                  fallbackColor={festival.colorHex}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />

                {/* Permanent dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Hover overlay — slides up */}
                <div className="festival-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-black/60 p-5 translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out flex flex-col justify-end h-full opacity-0 group-hover:opacity-100">
                  <div className="mb-auto" />
                  <p className="text-[13px] text-gray-300 leading-relaxed mb-4">{festival.description}</p>
                  <a
                    href={getFestivalWhatsAppUrl(festival.name, festival.city)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#F59E0B] text-[#F59E0B] px-4 py-2 text-sm font-semibold hover:bg-[#F59E0B] hover:text-white transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Plan a Trip <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Tag pill */}
                <div className="absolute top-3 left-3">
                  <span className="bg-accent/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                    {festival.tag}
                  </span>
                </div>

                {/* Bottom info — always visible initially */}
                <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-200 z-10">
                  <h3 className="font-display text-[18px] font-bold text-white mb-1 leading-tight">{festival.name}</h3>
                  <div className="flex items-center justify-between text-white/90 text-xs">
                    <span className="text-[#F59E0B] font-medium">
                      {festival.city}, {festival.state}
                    </span>
                  </div>
                </div>

                {/* Top Right Month Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {festival.month}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA row */}
        <ScrollReveal className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Want to experience a festival firsthand?</p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 rounded-full border border-primary text-primary px-6 py-2.5 text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
          >
            Browse Festival-Themed Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FestivalsOfIndia;
