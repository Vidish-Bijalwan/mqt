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
    <TiltCard className="bg-white w-full h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group block">
      <Link
        to={`/packages/${categorySlug || 'tour'}/${pkg.slug}`}
        className="block h-full relative border-none outline-none flex flex-col"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden aspect-[16/10] shrink-0">
          {(() => {
            const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
            return (
              <ImgWithFallback
                src={src}
                fallbackSrc={fallbackSrc}
                alt={`${pkg.title} - ${pkg.destination} tour package`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                lazy={true}
              />
            );
          })()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
          
          {/* Category Badge */}
          {categoryLabel && (
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Removed Starting price badge per requirements */}

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5" />
              {pkg.destination}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 mt-1">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            <Clock className="h-3.5 w-3.5" />
            <span>{pkg.duration}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
            {pkg.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 italic">
            "{pkg.hook}"
          </p>

          <div className="mt-auto mb-5 space-y-1">
             {pkg.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-gray-100">
            <span className="flex items-center justify-center py-2.5 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
               <Search className="w-3.5 h-3.5 mr-1.5" /> Details
            </span>
            <span
              onClick={handleGetQuote}
              className="flex items-center justify-center py-2.5 rounded-lg bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer"
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
