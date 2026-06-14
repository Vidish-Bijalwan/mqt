import { Link } from "react-router-dom";
import { Star, Clock, MapPin, Search } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import type { FeaturedPackage } from "@/data/packageMenuData";
import { getPackageImage } from "@/lib/imageMap";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";

interface PackageCardProps {
  pkg: FeaturedPackage;
  categoryLabel?: string;
  categorySlug?: string;
}

const PackageCard = ({ pkg, categoryLabel, categorySlug }: PackageCardProps) => {
  const { openPlanner } = useTripPlanner();

  const handleGetQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openPlanner(
      { destination_interest: pkg.destination, trip_style: pkg.categories as any },
      'package_card'
    );
  };

  return (
    <TiltCard className="bg-white w-full h-full rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:border-primary/20 hover:shadow-elevated transition-all duration-300 group block flex flex-col">
      <Link
        to={`/packages/${categorySlug || 'tour'}/${pkg.slug}`}
        className="block h-full relative border-none outline-none flex flex-col"
      >
        {/* Image Section - Taller aspect ratio */}
        <div className="relative overflow-hidden aspect-[6/5] shrink-0">
          {(() => {
            const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
            return (
              <ImgWithFallback
                src={src}
                fallbackSrc={fallbackSrc}
                alt={`${pkg.title} - ${pkg.destination} tour package`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                lazy={true}
              />
            );
          })()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
          
          {/* Category Badge */}
          {categoryLabel && (
            <div className="absolute top-4 left-4">
              <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                {categoryLabel}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 text-sm font-medium drop-shadow-sm bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate">{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
               ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{pkg.duration}</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {pkg.title}
          </h3>

          <div className="text-[11px] font-bold text-amber-700 bg-amber-50/80 px-2.5 py-1.5 rounded-md inline-flex items-center gap-1.5 mb-4 self-start border border-amber-200/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Highly Demanded
          </div>

          <div className="mt-auto mb-5 relative overflow-hidden group/itinerary bg-slate-50/80 rounded-xl p-3 sm:p-4 border border-slate-100">
             {/* Teaser Itinerary (hover to expand) */}
             <div className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Quick Itinerary</span>
                <span className="text-[10px] text-emerald-600/60 group-hover/itinerary:text-emerald-600 transition-colors cursor-pointer hover:underline">Hover to view</span>
             </div>
             <div className="space-y-1.5 max-h-[64px] overflow-hidden group-hover/itinerary:max-h-[140px] group-hover/itinerary:overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
               {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[13px] text-slate-600">
                    <span className="font-bold text-slate-400 min-w-[36px]">D{idx + 1}</span>
                    <span className="line-clamp-1 group-hover/itinerary:line-clamp-none" title={highlight}>{highlight}</span>
                  </div>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
            <span className="flex items-center justify-center py-2.5 rounded-xl text-slate-700 text-[13px] font-bold tracking-wide hover:bg-slate-50 transition-colors border border-slate-200 hover:border-slate-300">
               <Search className="w-4 h-4 mr-1.5 text-slate-400" /> Details
            </span>
            <span
              onClick={handleGetQuote}
              className="flex items-center justify-center py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold tracking-wide shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md cursor-pointer"
            >
               Get Quote
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

export default PackageCard;
