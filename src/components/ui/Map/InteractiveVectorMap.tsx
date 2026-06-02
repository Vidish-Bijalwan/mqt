import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DestinationModel, StateModel } from "@/types/models";
import { useNavigate } from "react-router-dom";
import { STATE_MAP_CONFIGS } from "./StateSvgPaths";
import {
  MapPin, Tent, Compass, Trees, Landmark, Snowflake, Bird, Map as MapIcon, Waves, Palmtree, Church, Eye,
  Search, Plus, Minus, Crosshair, ChevronRight, X, Calendar, Star, Info, MapPinned, Activity, BarChart2
} from "lucide-react";

// ── Types & Constants ────────────────────────────────────────────────

interface InteractiveVectorMapProps {
  stateModel: StateModel;
  destinations: DestinationModel[];
}

const CATEGORY_MAP = [
  { id: "all", label: "All", icon: <MapIcon className="w-5 h-5" />, color: "#475569" },
  { id: "wildlife", label: "Wildlife", icon: <Bird className="w-5 h-5" />, color: "#2E7D32" }, // Green
  { id: "heritage", label: "Heritage", icon: <Landmark className="w-5 h-5" />, color: "#F9A825" }, // Yellow
  { id: "adventure", label: "Adventure", icon: <Compass className="w-5 h-5" />, color: "#D84315" }, // Deep Orange
  { id: "religious", label: "Religious", icon: <Church className="w-5 h-5" />, color: "#6A1B9A", matches: ["temple", "pilgrimage", "Char Dham"] }, // Purple
  { id: "camping", label: "Camping", icon: <Tent className="w-5 h-5" />, color: "#558B2F" },
  { id: "trekking", label: "Trekking", icon: <Trees className="w-5 h-5" />, color: "#37474F" },
  { id: "nature", label: "Nature", icon: <Trees className="w-5 h-5" />, color: "#00838F", matches: ["nature", "valley", "lake", "waterfall"] },
];

const MOODS = [
  "Weekend Escape", "Family Trip", "Spiritual Journey", "Adventure Rush", "Nature Retreat", "Hidden Gems"
];

const THEME = {
  primary: "#00695C",
  secondary: "#26A69A",
  accent: "#FFC107",
  bg: "#0F172A"
};

const projectCoordinates = (lat: number, lng: number, mapConfig: any) => {
  const x = lng * mapConfig.cosFactor;
  const y = -lat;
  const [vMinX, vMinY, vWidth, vHeight] = mapConfig.viewBox.split(" ").map(Number);
  const xPct = ((x - vMinX) / vWidth) * 100;
  const yPct = ((y - vMinY) / vHeight) * 100;
  return { x: xPct, y: yPct };
};

const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

// ── Component ────────────────────────────────────────────────────────

export const InteractiveVectorMap: React.FC<InteractiveVectorMapProps> = ({ stateModel, destinations }) => {
  const navigate = useNavigate();
  
  // State
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapMode, setMapMode] = useState<"circuit" | "district">("circuit");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  
  const [hoveredDest, setHoveredDest] = useState<DestinationModel | null>(null);
  const [selectedDest, setSelectedDest] = useState<DestinationModel | null>(null);
  
  // Map Transform State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const mapConfig = STATE_MAP_CONFIGS[stateModel.slug.toLowerCase()];

  // Filter Destinations
  const filteredDestinations = useMemo(() => {
    let filtered = destinations;
    
    // Category Filter
    if (activeCategory !== "all") {
      const catDef = CATEGORY_MAP.find(c => c.id === activeCategory);
      const matches = catDef?.matches || [activeCategory];
      filtered = filtered.filter(d => matches.includes(d.type));
    }
    
    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.type.toLowerCase().includes(q) ||
        (d.shortDescription && d.shortDescription.toLowerCase().includes(q))
      );
    }
    
    // Mood Filter (Mock implementation based on types)
    if (activeMood) {
       if (activeMood === "Spiritual Journey") {
         filtered = filtered.filter(d => ["temple", "pilgrimage", "Char Dham"].includes(d.type));
       } else if (activeMood === "Adventure Rush") {
         filtered = filtered.filter(d => ["adventure", "trekking"].includes(d.type));
       } else if (activeMood === "Nature Retreat") {
         filtered = filtered.filter(d => ["nature", "wildlife", "lake", "waterfall"].includes(d.type));
       } else if (activeMood === "Weekend Escape") {
          filtered = filtered.slice(0, Math.max(1, Math.ceil(filtered.length / 2))); // Mock logic
       }
    }
    
    return filtered;
  }, [destinations, activeCategory, searchQuery, activeMood]);

  // Clustering Algorithm
  const clusters = useMemo(() => {
    if (!mapConfig) return [];
    
    const mappedDests = filteredDestinations.map(d => ({
      dest: d,
      pos: projectCoordinates(d.coordinates.lat, d.coordinates.lng, mapConfig)
    }));

    if (zoom > 2) {
      return mappedDests.map(d => ({
        x: d.pos.x, y: d.pos.y, destinations: [d.dest], isCluster: false
      }));
    }

    const threshold = 6 / zoom; // 6% of map width
    const result: {x: number, y: number, destinations: DestinationModel[], isCluster: boolean}[] = [];

    mappedDests.forEach(item => {
      let added = false;
      for (const cluster of result) {
        if (getDistance(item.pos, {x: cluster.x, y: cluster.y}) < threshold) {
          cluster.destinations.push(item.dest);
          cluster.isCluster = true;
          cluster.x = cluster.destinations.reduce((sum, d) => sum + projectCoordinates(d.coordinates.lat, d.coordinates.lng, mapConfig).x, 0) / cluster.destinations.length;
          cluster.y = cluster.destinations.reduce((sum, d) => sum + projectCoordinates(d.coordinates.lat, d.coordinates.lng, mapConfig).y, 0) / cluster.destinations.length;
          added = true;
          break;
        }
      }
      if (!added) {
        result.push({ x: item.pos.x, y: item.pos.y, destinations: [item.dest], isCluster: false });
      }
    });

    return result;
  }, [filteredDestinations, mapConfig, zoom]);

  // Nearby Attractions
  const nearbyAttractions = useMemo(() => {
    if (!selectedDest || !mapConfig) return [];
    const targetPos = projectCoordinates(selectedDest.coordinates.lat, selectedDest.coordinates.lng, mapConfig);
    
    return destinations
      .filter(d => d.id !== selectedDest.id)
      .map(d => {
        const pos = projectCoordinates(d.coordinates.lat, d.coordinates.lng, mapConfig);
        return { dest: d, dist: getDistance(targetPos, pos) };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3)
      .map(item => item.dest);
  }, [selectedDest, destinations, mapConfig]);

  // General Stats
  const stats = useMemo(() => {
    const s = { heritage: 0, adventure: 0, nature: 0, religious: 0 };
    filteredDestinations.forEach(d => {
      if (["heritage", "cultural", "historical"].includes(d.type)) s.heritage++;
      else if (["adventure", "trekking", "camping"].includes(d.type)) s.adventure++;
      else if (["temple", "pilgrimage", "Char Dham"].includes(d.type)) s.religious++;
      else s.nature++;
    });
    return s;
  }, [filteredDestinations]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 1));
  const handleReset = () => { setZoom(1); setPan({x: 0, y: 0}); };

  return (
    <section className="relative w-full min-h-screen bg-[#0F172A] overflow-hidden text-slate-100 flex flex-col font-body py-12">
      
      {/* Heavy blurred dark forest backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col h-full flex-1 max-w-7xl">
        
        {/* Header & Search */}
        <div className="flex flex-col items-center mb-10 w-full">
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md text-center mb-8">
            Explore the Unexplored
          </h2>

          {/* Search Bar - 500-600px wide */}
          <div className="relative w-full max-w-[600px] group mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search destinations, districts, circuits..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-full py-4 pl-14 pr-6 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-slate-400 text-lg shadow-xl"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-6">
            {CATEGORY_MAP.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive 
                      ? "bg-accent border-accent text-slate-900 shadow-[0_0_20px_rgba(249,168,37,0.4)] scale-105 font-bold" 
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.icon}
                  <span className="text-sm font-medium">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mood Chips */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center px-2">Moods:</span>
            {MOODS.map(mood => (
              <button
                key={mood}
                onClick={() => setActiveMood(activeMood === mood ? null : mood)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  activeMood === mood 
                    ? "bg-white text-slate-900 border-white shadow-lg scale-105" 
                    : "bg-transparent border-slate-600 text-slate-400 hover:border-slate-300 hover:text-slate-200"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>

          {/* Circuit / District Toggle */}
          <div className="flex bg-slate-800/80 backdrop-blur-md border border-white/10 p-1 rounded-full mt-4">
            <button 
              onClick={() => setMapMode("circuit")}
              className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${mapMode === "circuit" ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              Circuit Mode
            </button>
            <button 
              onClick={() => setMapMode("district")}
              className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${mapMode === "district" ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-white"}`}
            >
              District Mode
            </button>
          </div>
        </div>

        {/* 50/50 Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8 w-full min-h-[600px] h-[70vh]">
          
          {/* Left: Interactive Map */}
          <div className="relative flex-1 rounded-3xl border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur-xl shadow-2xl flex flex-col">
            
            {/* Zoom Controls */}
            <div className="absolute left-6 bottom-6 z-20 flex flex-col gap-2 bg-slate-800/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
              <button onClick={handleZoomIn} className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <div className="h-px w-full bg-white/10 my-0.5" />
              <button onClick={handleZoomOut} className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                <Minus className="w-5 h-5" />
              </button>
              <div className="h-px w-full bg-white/10 my-0.5" />
              <button onClick={handleReset} className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
                <Crosshair className="w-5 h-5" />
              </button>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
              {mapConfig ? (
                <motion.div 
                  className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center"
                  animate={{ scale: zoom, x: pan.x, y: pan.y }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <div className="relative w-full" style={{ aspectRatio: mapConfig.viewBox.split(" ")[2] + " / " + mapConfig.viewBox.split(" ")[3] }}>
                    <svg
                      viewBox={mapConfig.viewBox}
                      className="absolute inset-0 w-full h-full drop-shadow-[0_0_40px_rgba(0,105,92,0.4)]"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* State Base */}
                      <path
                        d={mapConfig.path}
                        fill={THEME.primary}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="0.2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        opacity={mapMode === "district" ? 0.3 : 0.9}
                        className="transition-all duration-700"
                      />

                      {/* District Boundaries */}
                      <AnimatePresence>
                        {mapMode === "district" && mapConfig.districts && mapConfig.districts.map((dist, idx) => (
                          <motion.path
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            d={dist.path}
                            fill={hoveredDistrict === dist.name ? THEME.secondary : THEME.primary}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="0.15"
                            strokeLinejoin="round"
                            opacity={hoveredDistrict === dist.name ? 1 : 0.8}
                            className="transition-colors duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredDistrict(dist.name)}
                            onMouseLeave={() => setHoveredDistrict(null)}
                          />
                        ))}
                      </AnimatePresence>
                    </svg>

                    {/* Floating Particles Animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-30">
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
                          animate={{ 
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{ duration: 4 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                        />
                      ))}
                    </div>

                    {/* Markers */}
                    {clusters.map((cluster, i) => {
                      const isCluster = cluster.isCluster;
                      const count = cluster.destinations.length;
                      const dest = cluster.destinations[0];
                      
                      const isHovered = hoveredDest?.id === dest.id && !isCluster;
                      const isSelected = selectedDest?.id === dest.id && !isCluster;

                      const matchedCat = CATEGORY_MAP.find(c => c.matches ? c.matches.includes(dest.type) : c.id === dest.type) || CATEGORY_MAP[0];

                      return (
                        <div
                          key={isCluster ? `cluster-${i}` : dest.id}
                          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                          style={{ left: `${cluster.x}%`, top: `${cluster.y}%`, zIndex: isSelected ? 50 : isHovered ? 40 : 10 }}
                          onClick={() => isCluster ? setZoom(z => z * 1.5) : setSelectedDest(dest)}
                          onMouseEnter={() => !isCluster && setHoveredDest(dest)}
                          onMouseLeave={() => !isCluster && setHoveredDest(null)}
                        >
                          {/* Cluster Marker */}
                          {isCluster ? (
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              className="w-12 h-12 rounded-full bg-slate-900/90 text-white flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] border-2 border-white/20 backdrop-blur-md"
                            >
                              +{count}
                            </motion.div>
                          ) : (
                            /* Single Marker - Color-coded */
                            <div className="relative flex items-center justify-center">
                              {/* Pulse Animation */}
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: matchedCat.color }}
                                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.div 
                                className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${isSelected ? "border-2 border-white scale-110" : "border-2 border-transparent"}`}
                                whileHover={{ scale: 1.15 }}
                                style={{ backgroundColor: matchedCat.color }}
                              >
                                {matchedCat.icon}
                              </motion.div>
                            </div>
                          )}

                          {/* Airbnb-style Hover Tooltip */}
                          {!isCluster && isHovered && !isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 pointer-events-none z-50"
                            >
                              {dest.image && <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />}
                              <div className="p-3 bg-white">
                                <h4 className="text-slate-900 font-bold text-sm truncate">{dest.name}</h4>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium flex items-center justify-between">
                                  {matchedCat.label}
                                  <span className="flex items-center text-yellow-500"><Star className="w-3 h-3 mr-0.5 fill-current"/>4.8</span>
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <MapIcon className="w-16 h-16 opacity-20 mb-4" />
                  <p>Map data unavailable for this region.</p>
                </div>
              )}
              
              {/* Empty State */}
              {filteredDestinations.length === 0 && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-30 flex items-center justify-center">
                  <div className="text-center bg-slate-800/90 p-8 rounded-3xl border border-white/10 max-w-sm shadow-2xl">
                    <Compass className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Destinations Found</h3>
                    <p className="text-slate-400 text-sm mb-6">
                      Try exploring a different mood or category.
                    </p>
                    <button 
                      onClick={() => { setActiveCategory("all"); setActiveMood(null); setSearchQuery(""); }}
                      className="bg-accent text-slate-900 hover:bg-yellow-400 px-6 py-3 rounded-full text-sm font-bold transition-colors w-full"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details Panel / Overview Card */}
          <div className="flex-1 rounded-3xl border border-white/10 overflow-hidden bg-slate-800/50 backdrop-blur-xl shadow-2xl flex flex-col relative">
            <AnimatePresence mode="wait">
              {selectedDest ? (
                // Destination Details Panel
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute inset-0 overflow-y-auto flex flex-col bg-slate-900/80"
                >
                  <div className="relative h-72 shrink-0">
                    <img src={selectedDest.image || 'https://images.unsplash.com/photo-1448375240586-882707db888b'} alt={selectedDest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <button 
                      onClick={() => setSelectedDest(null)}
                      className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-8 right-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full">
                          {selectedDest.type.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" /> 4.8 (124 reviews)
                        </div>
                      </div>
                      <h2 className="text-4xl font-display font-bold text-white leading-tight">{selectedDest.name}</h2>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col gap-8 flex-1">
                    <p className="text-slate-300 text-base leading-relaxed">
                      {selectedDest.detailedDescription || selectedDest.shortDescription || "A beautiful destination waiting to be explored. Discover the hidden gems and breathtaking landscapes of this region."}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/10 transition-colors">
                        <Calendar className="w-6 h-6 text-accent shrink-0" />
                        <div>
                          <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Best Time</span>
                          <span className="text-base text-white font-medium">Oct - March</span>
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/10 transition-colors">
                        <Activity className="w-6 h-6 text-accent shrink-0" />
                        <div>
                          <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Activities</span>
                          <span className="text-base text-white font-medium">Trekking, Safari</span>
                        </div>
                      </div>
                    </div>

                    {/* Explore Nearby */}
                    {nearbyAttractions.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-white font-display text-xl font-bold mb-4 flex items-center gap-2">
                          <MapPinned className="w-5 h-5 text-accent" /> Nearby Attractions
                        </h4>
                        <div className="flex flex-col gap-4">
                          {nearbyAttractions.map(nearby => (
                            <div 
                              key={nearby.id} 
                              className="flex items-center gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/5 transition-all"
                              onClick={() => setSelectedDest(nearby)}
                            >
                              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                <img src={nearby.image} alt={nearby.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-base font-bold text-white group-hover:text-accent transition-colors">{nearby.name}</h5>
                                <p className="text-sm text-slate-400 capitalize">{nearby.type.replace('_', ' ')}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors mr-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-slate-900/90 backdrop-blur-md border-t border-white/10 shrink-0 sticky bottom-0">
                    <button 
                      onClick={() => navigate(selectedDest.mqtPackageSlug || `/destinations/${selectedDest.stateSlug}/${selectedDest.slug}`)}
                      className="w-full bg-accent hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg text-lg"
                    >
                      Plan Your Trip <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                // State Overview Card
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_40px_rgba(0,105,92,0.3)]">
                    <MapIcon className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="font-display text-4xl font-bold text-white mb-2">{stateModel.name} Overview</h3>
                  <p className="text-slate-400 text-lg mb-10 max-w-sm">
                    {mapMode === "district" 
                      ? "Hover over districts to view local highlights, or select a destination marker."
                      : "Discover incredible destinations, plan your journey, and explore the unexplored."}
                  </p>

                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-4xl font-bold text-white mb-1">{destinations.length}+</div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Destinations</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-4xl font-bold text-white mb-1">{mapConfig?.districts?.length || 33}</div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Districts</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-4xl font-bold text-white mb-1">{CATEGORY_MAP.length - 1}</div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Categories</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors cursor-default">
                      <div className="text-4xl font-bold text-white mb-1">12</div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-bold">Tour Circuits</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};
