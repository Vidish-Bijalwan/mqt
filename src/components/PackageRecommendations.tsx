import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { tourPackages } from "@/data/packages";
import { getSimilarPackages } from "@/lib/recommendations";

interface PackageCardProps {
  pkg: typeof tourPackages[0];
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const categoryEmoji: Record<string, string> = {
    pilgrimage: "🛕",
    adventure: "🧗",
    family: "👨‍👩‍👧",
    luxury: "✨",
    honeymoon: "👩‍❤️‍👨",
    spiritual: "🧘",
  };

  const mainCategory = pkg?.categories?.[0]?.toLowerCase() || 'all';

  if (!pkg) return null;

  return (
    <Link
      to={`/packages/${mainCategory}/${pkg.slug || ""}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image || "/placeholder.jpg"}
          alt={pkg.title || "Tour Package"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-600 shadow-sm">
            {categoryEmoji[mainCategory] || "✈️"} {mainCategory}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
           <span className="text-white font-bold text-sm drop-shadow-md flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
             {pkg.destination}
           </span>
        </div>
      </div>
      
      <div className="p-5">
        <h4 className="font-display font-bold text-[#111111] leading-tight mb-2 group-hover:text-amber-600 transition-colors">
          {pkg.title}
        </h4>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-tighter">Duration</span>
             <span className="text-xs font-bold text-gray-700">{pkg.duration.days} Days</span>
          </div>
          <div className="text-right">
             <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-tighter block mb-0.5">Price</span>
              <span className="text-lg font-bold text-amber-600">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface PackageRecommendationsProps {
  packageId: string;
  topN?: number;
}

const PackageRecommendations: React.FC<PackageRecommendationsProps> = ({ packageId, topN = 4 }) => {
  const currentPkg = useMemo(() => tourPackages.find(p => p.id === packageId), [packageId]);
  
  const recommendations = useMemo(() => {
    if (!currentPkg) return [];
    return getSimilarPackages(currentPkg, tourPackages, topN);
  }, [currentPkg, topN]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 border-t border-gray-50 bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-2">✨ You might also love</h3>
          <p className="text-gray-500 font-medium">Handpicked alternatives based on your current selection</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageRecommendations;
