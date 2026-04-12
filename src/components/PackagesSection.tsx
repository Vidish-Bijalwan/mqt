import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import PackageCard from "./PackageCard";
import { ScrollableRow } from "@/components/ui/ScrollableRow";
import { packageMenuData } from "@/data/packageMenuData";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getPackageImage } from "@/lib/imageMap";

const PackagesSection = () => {
  // Flatten all categories from the groups for the unified filter row
  const allCategories = useMemo(() => {
    return packageMenuData.flatMap(group => group.categories);
  }, []);

  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(allCategories[0].slug);

  const activeCategory = useMemo(() => {
    return allCategories.find(c => c.slug === activeCategorySlug) || allCategories[0];
  }, [activeCategorySlug, allCategories]);

  return (
    <section className="section-y bg-gray-50 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Curated Journeys
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect Escape
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Handpicked itineraries matched perfectly to your travel style. Browse our premium collections designed for unparalleled Indian experiences.
          </p>
        </div>

        {/* LAYER 1: Category Filter (Pills) — scrollable on mobile without page scroll */}
        <ScrollableRow className="mb-10 w-full" innerClassName="flex gap-3 px-4 md:px-2 py-4 snap-x snap-mandatory">
             {allCategories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`snap-start shrink-0 whitespace-nowrap px-6 py-3 rounded-full text-[15px] font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    activeCategorySlug === cat.slug
                      ? "bg-primary text-white shadow-md transform scale-105"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary/50 hover:text-primary hover:bg-gray-50 hover:shadow-sm"
                  }`}
                >
                  {cat.name}
                </button>
             ))}
        </ScrollableRow>

        <AnimatePresence mode="wait">
           <motion.div
             key={activeCategory.slug}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.3 }}
           >
              {/* LAYER 2: Category Showcase Block */}
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 mb-12 flex flex-col lg:flex-row items-center gap-10">
                 <div className="flex-1">
                   <h3 className="font-display text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                     <Sparkles className="w-6 h-6 text-accent" />
                     {activeCategory.name}
                   </h3>
                   <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                     {activeCategory.summary}
                   </p>
                   
                   <div className="mb-6">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ideal For:</p>
                     <div className="flex flex-wrap gap-2">
                       {activeCategory.bestFor.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                            {tag}
                          </span>
                       ))}
                     </div>
                   </div>

                   <div>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                       <MapPin className="w-3.5 h-3.5" /> Spotlight Destinations:
                     </p>
                     <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {activeCategory.topDestinations.slice(0, 4).map(dest => (
                           <Link key={dest.destinationSlug} to={`/destinations/${dest.stateSlug}/${dest.destinationSlug}`} className="text-sm font-medium text-gray-800 hover:text-primary transition-colors underline decoration-gray-200 underline-offset-4 hover:decoration-primary">
                             {dest.name}
                           </Link>
                        ))}
                     </div>
                   </div>
                 </div>

                 <div className="w-full lg:w-1/3 flex flex-col gap-4">
                   <Link to={`/packages/${activeCategory.slug}`} className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-sm">
                     Explore All {activeCategory.name} <ArrowRight className="w-4 h-4" />
                   </Link>
                   <Link to="/contact" className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center hover:bg-gray-50 hover:border-primary/50 transition-colors">
                     Request Custom Itinerary
                   </Link>
                 </div>
              </div>

              {/* LAYER 3: Featured Packages Grid */}
              <div className="mb-8">
                 <div className="flex items-center justify-between mb-8">
                   <h3 className="font-display text-2xl font-bold text-gray-900">Featured {activeCategory.name}</h3>
                   <Link to={`/packages/${activeCategory.slug}`} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4 hidden md:flex">
                     View All <ArrowRight className="w-4 h-4" />
                   </Link>
                 </div>
                 
                 <div className="grid-cards-3">
                   {activeCategory.featuredPackages.map(pkg => (
                      <PackageCard 
                        key={pkg.slug} 
                        pkg={pkg} 
                        categoryLabel={activeCategory.name} 
                        categorySlug={activeCategory.slug} 
                      />
                   ))}
                 </div>

                 {/* Mobile View All CTA */}
                 <div className="mt-6 text-center md:hidden">
                   <Link to={`/packages/${activeCategory.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4">
                     View All {activeCategory.name} <ArrowRight className="w-4 h-4" />
                   </Link>
                 </div>
              </div>

           </motion.div>
        </AnimatePresence>

        {/* LAYER 4: Weekend Escapes Compact Strip */}
        <div className="mt-16 pt-12 border-t border-gray-200 pb-nav">
           <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
             <div>
               <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">Quick Weekend Escapes</h3>
               <p className="text-gray-500 text-sm">Short, revitalizing breaks starting under 4 days.</p>
             </div>
             <Link to="/packages/weekend-escapes" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4 shrink-0">
               View All <ArrowRight className="w-4 h-4" />
             </Link>
           </div>

           <div className="grid-cards-4">
              {(allCategories.find(c => c.slug === 'weekend-escapes')?.featuredPackages.slice(0, 4) || []).map(pkg => {
                const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
                return (
                  <Link key={pkg.slug} to={`/packages/weekend-escapes/${pkg.slug}`} className="group relative h-40 md:h-48 rounded-xl overflow-hidden shadow-sm">
                    <ImgWithFallback 
                      src={src} 
                      fallbackSrc={fallbackSrc} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      containerClassName="w-full h-full absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                       <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-0.5">{pkg.duration}</p>
                       <h4 className="text-xs md:text-sm font-medium line-clamp-2 group-hover:text-amber-200 transition-colors leading-tight">{pkg.title}</h4>
                    </div>
                  </Link>
                );
              })}
           </div>
        </div>

      </div>
    </section>
  );
};

export default PackagesSection;
