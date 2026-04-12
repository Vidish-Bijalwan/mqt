import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, Compass, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { megaMenuData, popularDestinationsData, MegaMenuState, MegaMenuRegion } from '@/data/destinationsMegaMenu';
import { getStateImage, getCityImage } from '@/lib/imageMap';
import { ImgWithFallback } from '@/components/ui/ImgWithFallback';

export default function DestinationsMegaMenu() {
  const [activeTab, setActiveTab] = useState<"state" | "region" | "popular">("state");
  
  // Default values for initial render to prevent broken empty states
  const defaultState = megaMenuData[0]?.states[0];
  const defaultRegion = megaMenuData[0];

  const [hoveredState, setHoveredState] = useState<MegaMenuState | undefined>(defaultState);
  const [hoveredRegion, setHoveredRegion] = useState<MegaMenuRegion | undefined>(defaultRegion);

  // Safely fallback if data is somehow empty
  if (!megaMenuData || megaMenuData.length === 0) return null;

  const currentHoveredState = hoveredState || defaultState;
  const currentHoveredRegion = hoveredRegion || defaultRegion;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-[20%] lg:left-1/2 lg:-translate-x-1/2 top-full pt-4 z-50 w-[1000px] max-w-[95vw]"
    >
      <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Top Selector Bar - Accessibility attributes added */}
        <div className="flex border-b border-gray-100 px-6 bg-gray-50/50" role="tablist">
          {[
            { id: "state", label: "Browse by State / UT" },
            { id: "region", label: "Browse by Region" },
            { id: "popular", label: "Popular Destinations" }
          ].map((tab) => (
            <button 
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id as "state" | "region" | "popular")}
              className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 relative outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                activeTab === tab.id ? "text-primary border-primary bg-white" : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTabIndicator" className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-b" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="h-[520px] overflow-hidden flex relative bg-white">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: BROWSE BY STATE / UT */}
            {activeTab === "state" && (
              <motion.div 
                key="tab-state"
                id="panel-state"
                role="tabpanel"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex w-full h-full"
              >
                {/* Left Side: Regions & States Grid */}
                <div className="w-[60%] lg:w-2/3 bg-white p-6 overflow-y-auto style-scroll">
                  <div className="columns-1 md:columns-2 gap-8 space-y-8">
                    {megaMenuData.map((region) => (
                      <div key={region.slug} className="break-inside-avoid">
                        <h3 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <Compass className="w-4 h-4 text-primary" />
                          {region.name}
                        </h3>
                        <ul className="space-y-1">
                          {region.states.map((stateInfo) => (
                            <li key={stateInfo.slug}>
                              <Link 
                                to={`/destinations/${stateInfo.slug}`}
                                onMouseEnter={() => setHoveredState(stateInfo)}
                                onFocus={() => setHoveredState(stateInfo)}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                  currentHoveredState.slug === stateInfo.slug
                                    ? "bg-primary/5 text-primary font-medium"
                                    : "text-gray-600 hover:bg-gray-50 focus:bg-gray-50"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {stateInfo.name}
                                  {stateInfo.type === 'union-territory' && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-400 font-normal">UT</span>
                                  )}
                                </span>
                                {currentHoveredState.slug === stateInfo.slug && (
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

                {/* Right Side: Active State Preview Panel */}
                <div className="w-[40%] lg:w-1/3 bg-gray-50 p-6 border-l border-gray-100 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Visual Fallback Image Header (Replaces blank empty space) */}
                    {currentHoveredState.image && (
                       <div className="w-full h-32 rounded-xl mb-4 overflow-hidden shadow-sm">
                         {(() => {
                           const { src, fallbackSrc } = getStateImage(currentHoveredState.slug, 'thumbnail', currentHoveredState.image);
                           return <ImgWithFallback src={src} fallbackSrc={fallbackSrc} alt={currentHoveredState.name} className="w-full h-full object-cover" />;
                         })()}
                       </div>
                    )}
                    {!currentHoveredState.image && (
                       <div className="mb-6">
                        <span className="inline-block px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-gray-500 rounded-full mb-3 shadow-sm">
                          {currentHoveredState.region}
                        </span>
                        <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">
                          {currentHoveredState.name}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed max-h-[85px] overflow-hidden text-ellipsis line-clamp-4">
                          {currentHoveredState.summary || `Discover the exceptional landscapes, heritage, and culture of ${currentHoveredState.name}.`}
                        </p>
                      </div>
                    )}
                    {currentHoveredState.image && (
                       <div className="mb-4">
                        <h4 className="font-display text-xl font-bold text-gray-900 mb-1">
                          {currentHoveredState.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {currentHoveredState.summary || `Discover the exceptional landscapes, heritage, and culture of ${currentHoveredState.name}.`}
                        </p>
                      </div>
                    )}

                    <div className="flex-1 mt-2">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        Top Destinations
                      </h5>
                      <div className="grid grid-cols-1 gap-2">
                        {currentHoveredState.topDestinations.slice(0, currentHoveredState.image ? 4 : 5).map((dest) => (
                          <Link
                            key={dest.slug}
                            to={`/destinations/${currentHoveredState.slug}/${dest.slug}`}
                            className="group flex items-center justify-between px-3 py-2 bg-white border border-gray-200 hover:border-primary/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                              {dest.name}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-auto border-t border-gray-200">
                      <Link
                        to={`/destinations/${currentHoveredState.slug}`}
                        className="flex items-center justify-center w-full px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl shadow-sm hover:bg-primary-dark transition-colors gap-2"
                      >
                        Explore {currentHoveredState.name} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: BROWSE BY REGION */}
            {activeTab === "region" && (
              <motion.div 
                key="tab-region"
                id="panel-region"
                role="tabpanel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex w-full h-full"
              >
                {/* Left Side: Regions List */}
                <div className="w-[40%] lg:w-1/3 bg-white p-6 border-r border-gray-100 overflow-y-auto">
                  <h3 className="font-display font-semibold text-gray-900 mb-4 px-2">Geographic Zones</h3>
                  <ul className="space-y-2">
                    {megaMenuData.map((region) => (
                      <li key={region.slug}>
                        <button
                          onMouseEnter={() => setHoveredRegion(region)}
                          onFocus={() => setHoveredRegion(region)}
                          className={`w-full text-left flex flex-col px-4 py-3 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            currentHoveredRegion.slug === region.slug
                              ? "bg-primary/5 border border-primary/20 shadow-sm"
                              : "bg-white border border-transparent hover:bg-gray-50"
                          }`}
                        >
                          <span className={`font-medium ${currentHoveredRegion.slug === region.slug ? "text-primary" : "text-gray-800"}`}>
                            {region.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {region.states.length} States & UTs
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side: Region Super Preview Panel */}
                <div className="w-[60%] lg:w-2/3 bg-gray-50 flex flex-col relative overflow-y-auto">
                  {/* Rich Image Header */}
                  <div className="h-40 relative w-full overflow-hidden shrink-0">
                    {(() => {
                      const { src, fallbackSrc } = currentHoveredRegion.image 
                        ? { src: currentHoveredRegion.image, fallbackSrc: currentHoveredRegion.image } 
                        : getStateImage('india-generic', 'hero');
                      return (
                        <ImgWithFallback 
                          src={src} 
                          fallbackSrc={fallbackSrc}
                          alt={currentHoveredRegion.name} 
                          className="w-full h-full object-cover" 
                        />
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <span className="inline-block px-2 py-0.5 bg-accent/90 text-accent-foreground text-[10px] font-bold uppercase tracking-wider rounded mb-1">
                        Best For: {currentHoveredRegion.bestFor}
                      </span>
                      <h4 className="font-display text-2xl font-bold text-white">
                        {currentHoveredRegion.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-gray-600 mb-6">
                      {currentHoveredRegion.description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 flex-1">
                      {/* States Column */}
                      <div>
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          Included States
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {currentHoveredRegion.states.map(s => (
                            <Link 
                              key={s.slug} 
                              to={`/destinations/${s.slug}`}
                              className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-primary hover:text-primary rounded-full transition-colors"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Destinations Column */}
                      <div>
                         <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5" />
                          Featured Stops
                        </h5>
                        <ul className="space-y-2">
                          {(currentHoveredRegion.featuredDestinations.length > 0 ? currentHoveredRegion.featuredDestinations : currentHoveredRegion.states[0].topDestinations.slice(0, 4)).map(dest => (
                             <li key={dest.slug}>
                               <Link 
                                to={`/destinations/${currentHoveredRegion.states.find(s=> s.name === dest.state)?.slug || currentHoveredRegion.states[0].slug}/${dest.slug}`}
                                className="group flex items-center justify-between px-3 py-2 bg-white border border-gray-100 hover:border-primary/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                                    {dest.name}
                                  </span>
                                  {dest.state && (
                                    <span className="text-[10px] text-gray-400 -mt-0.5">{dest.state}</span>
                                  )}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                              </Link>
                             </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <Link
                        to={`/destinations?region=${currentHoveredRegion.slug}`}
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl shadow-sm hover:bg-primary-dark transition-colors gap-2"
                      >
                        Discover Full {currentHoveredRegion.name} Region <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: POPULAR DESTINATIONS */}
            {activeTab === "popular" && (
              <motion.div 
                key="tab-popular"
                id="panel-popular"
                role="tabpanel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full p-6 overflow-y-auto style-scroll flex flex-col gap-6"
              >
                {/* Section 1: Trending Top Row */}
                <div>
                  <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    Trending This Season
                  </h3>
                  <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                    {popularDestinationsData.trending.map((dest) => (
                      <Link 
                        key={dest.slug} 
                        to={`/destinations/${dest.state?.toLowerCase().replace(/\s+/g,'-')}/${dest.slug}`}
                        className="group relative h-28 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        {(() => {
                          const { src, fallbackSrc } = getCityImage(dest.state?.toLowerCase().replace(/\s+/g,'-') || 'unknown', dest.slug, 'thumbnail', dest.image);
                          return (
                            <ImgWithFallback 
                              src={src} 
                              fallbackSrc={fallbackSrc}
                              alt={dest.name} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                          );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs font-semibold truncate">{dest.name}</p>
                          <p className="text-white/70 text-[9px] truncate">{dest.state}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Section 2: By Category */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-display font-semibold text-gray-900 mb-4">Curated by Experience</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularDestinationsData.categories.map((cat) => (
                      <div key={cat.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{cat.name}</h4>
                        <ul className="space-y-2">
                          {cat.destinations.map(dest => (
                            <li key={dest.slug}>
                              <Link 
                                to={`/destinations/${dest.state?.toLowerCase().replace(/\s+/g,'-')}/${dest.slug}`}
                                className="flex items-center justify-between text-sm font-medium text-gray-700 hover:text-primary transition-colors group"
                              >
                                {dest.name}
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Quick Picks Chips */}
                <div className="border-t border-gray-100 pt-6 mt-auto">
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {popularDestinationsData.quickPicks.map(qp => (
                      <div key={qp.category} className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{qp.category}:</span>
                        {qp.items.map(item => (
                          <Link 
                            key={item.slug}
                            to={`/destinations/${item.state?.toLowerCase().replace(/\s+/g,'-')}/${item.slug}`}
                            className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary rounded-md transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom CTA Row (Constant Visual Parity Layer) */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-sm shrink-0">
          <p className="text-gray-400">Discover incredible landscapes spanning the entire subcontinent.</p>
          <div className="flex items-center gap-6">
            <Link to="/destinations" className="text-white hover:text-primary-light transition-colors font-medium flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
              Explore by Region <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/destinations" className="text-primary hover:text-white transition-colors font-medium flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
              View All States & Union Territories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
