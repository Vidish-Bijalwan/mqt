import { Link } from "react-router-dom";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import { travelRoutes } from "@/data/travelRoutes";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const TravelRoutes = () => {
  return (
    <section className="section-y bg-surface overflow-hidden">
      <div className="container-page mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Curated Itineraries
          </span>
          <h2 className="section-heading">Popular Travel Routes</h2>
          <p className="section-subheading mx-auto">
            Expertly planned circuits across India — just pick your route and we'll take care of the rest.
          </p>
        </ScrollReveal>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {travelRoutes.map((route, i) => (
            <ScrollReveal key={route.id} delay={i < 4 ? i * 0.08 : 0}>
              <Link
                to={`/packages${route.packageSlug ? "/" + route.packageSlug : ""}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden shadow-soft border border-border h-56 sm:h-64 hover:shadow-card transition-shadow duration-300"
              >
                {/* Background image */}
                <img
                  src={route.image}
                  alt={`${route.title} travel route in India`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-white/20">
                    {route.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-display text-xl font-bold leading-tight mb-1">{route.title}</h3>

                  {/* Route path — scroll on mobile */}
                  <div className="flex items-center gap-1 text-white/70 text-[11px] mb-2 overflow-hidden">
                    {route.route.split("→").map((stop, idx, arr) => (
                      <span key={idx} className="flex items-center gap-1 shrink-0">
                        <span className="truncate max-w-[60px]">{stop.trim()}</span>
                        {idx < arr.length - 1 && <ChevronRight className="w-3 h-3 shrink-0 text-accent" />}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-white/60">
                      <Clock className="w-3.5 h-3.5" /> {route.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:gap-2 transition-all">
                      {route.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelRoutes;
