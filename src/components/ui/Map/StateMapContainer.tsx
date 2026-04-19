import React from "react";
import { cn } from "@/lib/utils";

interface StateMapContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const StateMapContainer: React.FC<StateMapContainerProps> = ({
  children,
  className,
  title = "Explore the Map of India",
  subtitle = "Click on a state to discover popular travel destinations and packages.",
}) => {
  return (
    <div className={cn("w-full bg-surface/30 rounded-[3rem] border border-border/50 p-8 md:p-12 overflow-hidden", className)}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
            {subtitle}
          </p>
        </div>

        <div className="relative w-full aspect-[4/5] max-w-[650px] mx-auto group">
          {/* Glassmorphism Background for Map */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -z-10 scale-90 opacity-50" />
          
          <div className="w-full h-full relative z-10 transition-transform duration-1000 group-hover:scale-[1.02]">
            {children}
          </div>

          {/* Map Compass/Legend decoration */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 opacity-60">
             <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                <span className="text-[10px] font-bold">N</span>
             </div>
             <div className="h-20 w-[1px] bg-gradient-to-b from-border to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};
