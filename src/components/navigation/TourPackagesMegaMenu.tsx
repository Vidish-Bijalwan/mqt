import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, MapPin, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { packageMenuData, PackageCategory } from '@/data/packageMenuData';
import { ImgWithFallback } from '@/components/ui/ImgWithFallback';
import { getPackageImage } from '@/lib/imageMap';

export default function TourPackagesMegaMenu() {
  const defaultCategory = packageMenuData[0].categories[0];
  const [hoveredCategory, setHoveredCategory] = useState<PackageCategory>(defaultCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-[30%] lg:left-3/4 lg:-translate-x-1/2 top-full pt-4 z-50 w-[900px] max-w-[95vw]"
    >
      <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex h-[480px] bg-white">
          
          {/* Left Side: Category Groups List */}
          <div className="w-[40%] lg:w-1/3 bg-gray-50 p-6 overflow-y-auto border-r border-gray-100 style-scroll">
            <div className="space-y-6">
              {packageMenuData.map((group) => (
                <div key={group.title}>
                  <h3 className="font-display font-semibold text-gray-900 mb-3 px-2 text-sm uppercase tracking-wider">
                    {group.title}
                  </h3>
                  <ul className="space-y-1">
                    {group.categories.map((category) => (
                      <li key={category.slug}>
                        <Link 
                          to={`/packages/${category.slug}`}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onFocus={() => setHoveredCategory(category)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            hoveredCategory.slug === category.slug
                              ? "bg-white shadow-sm border border-gray-200 text-primary font-medium"
                              : "text-gray-600 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          {category.name}
                          {hoveredCategory.slug === category.slug && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Active Category Preview Panel */}
          <div className="w-[60%] lg:w-2/3 bg-white p-6 flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={hoveredCategory.slug}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15 }}
                className="relative z-10 flex flex-col h-full"
              >
                {/* Header */}
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    {hoveredCategory.name}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {hoveredCategory.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase mr-1 flex items-center">Best For:</span>
                    {hoveredCategory.bestFor.map(tag => (
                      <span key={tag} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1">
                  {/* Top Destinations */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Popular Regions
                    </h5>
                    <ul className="space-y-2">
                      {hoveredCategory.topDestinations.map(dest => (
                        <li key={dest.destinationSlug}>
                          <Link 
                            to={`/destinations/${dest.stateSlug}/${dest.destinationSlug}`}
                            className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors" />
                            {dest.name} 
                            <span className="text-[10px] text-gray-400">({dest.state})</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Itinerary */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      Featured Journey
                    </h5>
                    {hoveredCategory.featuredPackages.map(pkg => {
                      const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
                      return (
                        <Link 
                          key={pkg.slug}
                          to={`/packages/${hoveredCategory.slug}/${pkg.slug}`}
                          className="group block rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all"
                        >
                          <div className="relative h-24 w-full overflow-hidden">
                             <ImgWithFallback
                                src={src}
                                fallbackSrc={fallbackSrc}
                                alt={pkg.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             />
                             <div className="absolute inset-0 bg-black/20 z-[1]" />
                             <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-background/90 backdrop-blur-sm text-[9px] font-bold text-foreground rounded z-[2]">
                               {pkg.duration}
                             </span>
                          </div>
                          <div className="p-3 bg-white">
                            <h6 className="font-semibold text-sm text-gray-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">{pkg.title}</h6>
                            <p className="text-[10px] text-gray-500 line-clamp-1">{pkg.hook}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-200 grid grid-cols-2 gap-3">
                  <Link
                    to={`/packages/${hoveredCategory.slug}`}
                    className="flex justify-center items-center px-4 py-2.5 border border-primary text-primary text-sm font-medium rounded-xl hover:bg-primary hover:text-white transition-colors"
                  >
                    Explore Category
                  </Link>
                  <Link
                    to={`/contact`}
                    className="flex justify-center items-center px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl shadow-sm hover:bg-primary-dark transition-colors gap-2"
                  >
                    Get Custom Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

        {/* Bottom CTA Row */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-sm shrink-0">
          <p className="text-gray-400">Hand-crafted itineraries customized entirely to your preferences.</p>
          <div className="flex items-center gap-6">
            <Link to="/packages" className="text-primary hover:text-white transition-colors font-medium flex items-center gap-1.5">
              View All Tour Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
