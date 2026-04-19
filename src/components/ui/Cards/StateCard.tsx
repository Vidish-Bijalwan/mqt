import React from "react";
import { Link } from "react-router-dom";
import { StateModel } from "@/types/models";
import { SmartImage } from "../SmartImage";
import { getStateImage } from "@/lib/imageMap";

interface StateCardProps {
  state: StateModel;
}

export const StateCard: React.FC<StateCardProps> = ({ state }) => {
  const { src, fallbackSrc } = getStateImage(state.slug, 'card', state.image);

  return (
    <Link
      to={`/destinations/${state.slug}`}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 card-hover shadow-lg block h-[400px]"
    >
      <SmartImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={state.name}
        fallbackColor={state.colorHex}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest text-white uppercase border border-white/20">
            {state.type}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/20 backdrop-blur-md text-[10px] font-bold tracking-widest text-primary-foreground uppercase border border-primary/20">
            {state.region}
          </span>
        </div>
        
        <h3 className="font-display text-3xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
          {state.name}
        </h3>
        
        <p className="font-body text-sm text-white/80 line-clamp-2 mb-6 group-hover:text-white transition-colors duration-300">
          {state.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-tighter">Capital</span>
              <span className="text-xs text-white font-medium">{state.quickFacts.capital}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-tighter">Places</span>
              <span className="text-xs text-white font-medium">{state.quickFacts.topPlacesCount}+</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 shadow-lg shadow-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};
