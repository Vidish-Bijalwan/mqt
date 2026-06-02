import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { ItineraryRecord } from "@/data/itineraries";

interface ItineraryCardProps {
  itinerary: ItineraryRecord;
  className?: string;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary, className = "" }) => {
  return (
    <div className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${className}`}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={itinerary.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
          alt={itinerary.packageName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#111111] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            {itinerary.region}
          </span>
          {itinerary.categoryTags[0] && (
            <span className="px-2.5 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {itinerary.categoryTags[0]}
            </span>
          )}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {/* Duration badge bottom-right */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" /> {itinerary.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display text-lg font-bold text-[#111111] mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
          <Link to={`/itineraries/${itinerary.slug}`} className="before:absolute before:inset-0">
            {itinerary.packageName}
          </Link>
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="line-clamp-1">{itinerary.startingPoint} → {itinerary.endingPoint}</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {itinerary.shortDescription}
        </p>

        {/* Bottom CTA bar */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Indicative</div>
            <div className="text-sm font-bold text-[#111111]">{itinerary.pricing.priceLabel}</div>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
            View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};
