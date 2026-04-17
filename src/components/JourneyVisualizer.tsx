import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Plane, Car, Train, MapPin, Navigation, Clock } from "lucide-react";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";

export type TransportType = "flight" | "car" | "train" | "trek";

export interface JourneyStop {
  id: string;
  day: number;
  location: string;
  title: string;
  description: string;
  imageUrl: string;
  transportToNext?: TransportType;
  transportDuration?: string;
}

interface JourneyVisualizerProps {
  stops: JourneyStop[];
}

const getTransportIcon = (type?: TransportType) => {
  switch(type) {
    case 'flight': return <Plane className="w-4 h-4" />;
    case 'train': return <Train className="w-4 h-4" />;
    case 'trek': return <MapPin className="w-4 h-4" />;
    case 'car': 
    default: return <Car className="w-4 h-4" />;
  }
};

export const JourneyVisualizer = ({ stops }: JourneyVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStop, setActiveStop] = useState<string | null>(null);

  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Calculate the width of the connected line based on scroll
  const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

  if (!stops || stops.length === 0) return null;

  return (
    <div className="w-full bg-[#FAFAFA] rounded-3xl p-6 md:p-10 border border-black/[0.04] shadow-sm relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">Visualize Your Journey</h3>
          <p className="text-slate-500 mt-1 text-sm">Swipe to explore your path from start to finish</p>
        </div>
        <div className="hidden md:flex items-center justify-center p-3 rounded-full bg-white shadow-sm border border-slate-100">
          <Navigation className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-10 pt-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide relative z-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* The Animated Connector Line */}
        <div className="absolute top-[88px] left-[180px] right-[180px] h-1.5 bg-slate-200 rounded-full hidden md:block">
           <motion.div 
             className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full origin-left"
             style={{ scaleX }}
           />
        </div>

        {stops.map((stop, i) => {
          const isLast = i === stops.length - 1;
          const isActive = activeStop === stop.id;

          return (
            <div key={stop.id} className="relative flex shrink-0 snap-center md:snap-start mr-6 md:mr-16">
              
              {/* Card Container */}
              <motion.div 
                className={`w-[280px] md:w-[320px] rounded-2xl bg-white border cursor-pointer transition-all duration-300 relative group
                  ${isActive ? 'border-amber-400 shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)]' : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'}
                `}
                whileHover={{ y: -4 }}
                onClick={() => setActiveStop(isActive ? null : stop.id)}
              >
                {/* Day Badge */}
                <div className="absolute -top-4 left-6 z-20">
                  <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Day {stop.day}
                  </div>
                </div>

                {/* Pin (for the line) */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-4 ${isActive ? 'bg-amber-500 border-amber-100' : 'bg-white border-slate-300 group-hover:border-amber-300'} transition-colors duration-300 shadow-sm`} />
                  <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-200" />
                </div>

                {/* Image Section */}
                <div className="relative h-[160px] w-full rounded-t-2xl overflow-hidden">
                  <ImgWithFallback 
                    src={stop.imageUrl}
                    fallbackSrc="/placeholder.svg"
                    alt={stop.location}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h4 className="text-white font-bold text-lg leading-tight">{stop.location}</h4>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h5 className="font-semibold text-slate-800 text-[15px] mb-2">{stop.title}</h5>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-slate-500 text-[13px] leading-relaxed"
                      >
                        {stop.description}
                      </motion.p>
                    ) : (
                      <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2">
                        {stop.description}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Transport Indicator to Next Stop */}
              {!isLast && stop.transportToNext && (
                <div className="hidden md:flex absolute top-[180px] -right-12 z-20 items-center justify-center">
                   <div className="flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                     <div className="bg-slate-100 rounded-full p-2 text-slate-600 shadow-sm border border-slate-200">
                       {getTransportIcon(stop.transportToNext)}
                     </div>
                     {stop.transportDuration && (
                       <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-slate-100">
                         <Clock className="w-3 h-3" /> {stop.transportDuration}
                       </span>
                     )}
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
