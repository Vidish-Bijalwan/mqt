import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stateLocations } from "@/data/stateLocations";
import { indiaStates } from "@/data/india-states";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const IndiaStateMap: React.FC = () => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Find destination data for the hovered state
  const hoveredLocation = stateLocations.find(l => l.id === hoveredStateId);
  const hoveredStateData = hoveredLocation ? indiaStates.find(s => s.name === hoveredLocation.name) : undefined;

  const handleStateClick = (stateId: string) => {
    const loc = stateLocations.find(l => l.id === stateId);
    const state = loc ? indiaStates.find(s => s.name === loc.name) : undefined;
    if (state) {
      navigate(`/destinations/${state.slug}`);
    }
  };

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 622 753" // Standard viewBox for our generated stateLocations
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {stateLocations.map((loc) => {
          const isHovered = hoveredStateId === loc.id;
          const stateData = indiaStates.find(s => s.name === loc.name);
          const color = stateData?.colorHex || "#CBD5E1";

          return (
            <motion.path
              key={loc.id}
              d={loc.path}
              initial={{ fill: "#dbeafe", stroke: "#93c5fd", strokeWidth: 0.8 }}
              animate={{
                fill: isHovered ? color : "#dbeafe",
                stroke: isHovered ? "#FFFFFF" : "#93c5fd",
                strokeWidth: isHovered ? 2 : 0.8,
                scale: isHovered ? 1.01 : 1,
                zIndex: isHovered ? 50 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setHoveredStateId(loc.id)}
              onMouseLeave={() => setHoveredStateId(null)}
              onClick={() => handleStateClick(loc.id)}
              className="cursor-pointer transition-all outline-none"
            />
          );
        })}
      </svg>

      {/* Hover Info Card */}
      <AnimatePresence>
        {hoveredStateId && hoveredStateData && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-0 right-[-20px] md:right-[-40px] z-50 pointer-events-none"
          >
            <div className="bg-card/90 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl w-64">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 block">
                {hoveredStateData.region}
              </span>
              <h4 className="text-xl font-bold mb-1">{hoveredStateData.name}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-medium">
                {hoveredStateData.shortDescription}
              </p>
              
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-tighter">
                 <div className="flex flex-col">
                    <span className="text-muted-foreground">Destinations</span>
                    <span>{hoveredStateData.famousDestinations.length}+</span>
                 </div>
                 <div className="flex items-center text-primary gap-1">
                    Click to Explore →
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Legend (Mini) */}
      <div className="absolute bottom-[-20px] left-0 flex flex-wrap gap-4 opacity-50">
          <div className="flex items-center gap-1.5 grayscale">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Interactive</span>
          </div>
      </div>
    </div>
  );
};
