import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { megaMenuData, MegaMenuState } from '@/data/destinationsMegaMenu';

export default function DestinationsMegaMenu() {
  const [activeTab, setActiveTab] = useState<"state" | "region" | "popular">("state");
  
  // Default to Uttarakhand if no hover
  const defaultState = megaMenuData[0].states[0];
  const [hoveredState, setHoveredState] = useState<MegaMenuState>(defaultState);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[960px]"
    >
      <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Top Selector Bar */}
        <div className="flex border-b border-gray-100 px-6 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab("state")}
            className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 relative ${
              activeTab === "state" ? "text-primary border-primary bg-white" : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            Browse by State / UT
            {activeTab === "state" && (
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary rounded-b" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab("region")}
            className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "region" ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            Browse by Region
          </button>
          <button 
            onClick={() => setActiveTab("popular")}
            className={`px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === "popular" ? "text-primary border-primary" : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            Popular Destinations
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex h-[500px]">
          
          {/* Left Side: Regions & States Grid */}
          <div className="w-2/3 bg-white p-6 overflow-y-auto style-scroll">
            {activeTab === "state" && (
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
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              hoveredState.slug === stateInfo.slug
                                ? "bg-primary/5 text-primary font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {stateInfo.name}
                              {stateInfo.type === 'union-territory' && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-400 font-normal">UT</span>
                              )}
                            </span>
                            {hoveredState.slug === stateInfo.slug && (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === "region" && (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Region grouping view coming soon...
              </div>
            )}
            
            {activeTab === "popular" && (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Curated popular destinations view coming soon...
              </div>
            )}
          </div>

          {/* Right Side: Active State Preview Panel */}
          <div className="w-1/3 bg-gray-50 p-6 border-l border-gray-100 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6">
                <span className="inline-block px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-gray-500 rounded-full mb-3 shadow-sm">
                  {hoveredState.region}
                </span>
                <h4 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  {hoveredState.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {hoveredState.summary}
                </p>
              </div>

              <div className="flex-1">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Top Destinations
                </h5>
                <div className="grid grid-cols-1 gap-2">
                  {hoveredState.topDestinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      to={`/destinations/${hoveredState.slug}/${dest.slug}`}
                      className="group flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 hover:border-primary/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                        {dest.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200">
                <Link
                  to={`/destinations/${hoveredState.slug}`}
                  className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white text-sm font-medium rounded-xl shadow-sm hover:bg-primary-dark transition-colors gap-2"
                >
                  Explore {hoveredState.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom CTA Row */}
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between text-sm">
          <p className="text-gray-400">Discover incredible landscapes spanning the entire subcontinent.</p>
          <div className="flex items-center gap-6">
            <Link to="/destinations" className="text-white hover:text-primary-light transition-colors font-medium flex items-center gap-1.5">
              Explore by Region <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/destinations" className="text-primary hover:text-white transition-colors font-medium flex items-center gap-1.5">
              View All States & Union Territories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
