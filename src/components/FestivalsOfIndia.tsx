import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { festivalsData } from "@/data/festivals";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

        {/* Scrollable card row — snap on mobile, 4-col grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5 scrollbar-hide snap-x snap-mandatory md:snap-none">
          {festivalsData.map((festival, i) => (
            <ScrollReveal
              key={festival.id}
              delay={i < 4 ? i * 0.08 : 0}
              className="snap-start shrink-0 w-[72vw] sm:w-[54vw] md:w-auto"
            >
              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-border h-64 md:h-72 cursor-default festival-card">
                {/* Background image */}
                <img
                  src={festival.image}
                  alt={`${festival.name} festival in ${festival.city}, ${festival.state}, India`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Permanent dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Hover overlay — slides up */}
                <div className="festival-overlay absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-xs text-white/80 leading-relaxed">{festival.description}</p>
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-accent hover:text-accent-light transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Plan around this festival <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Tag pill */}
                <div className="absolute top-3 left-3">
                  <span className="bg-accent/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
                    {festival.tag}
                  </span>
                </div>

                {/* Bottom info — always visible */}
                <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-200">
                  <h3 className="font-display text-xl font-bold text-white mb-1">{festival.name}</h3>
                  <div className="flex items-center gap-3 text-white/70 text-xs">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {festival.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {festival.month}
                    </span>
                  </div>
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
