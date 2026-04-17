import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    // Show close button after 30 seconds
    const timer = setTimeout(() => {
      setCanClose(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 relative overflow-hidden"
      >
        {/* Shimmer gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSweep 4s infinite linear'
          }}
        />

        <div className="container mx-auto px-4 min-h-[52px] md:min-h-[60px] py-3 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
          
          {/* Left Portion */}
          <div className="flex items-center gap-2 text-white font-bold text-[13px] tracking-wide uppercase">
            <Flame className="w-4 h-4 text-white" fill="currentColor" />
            Limited Drops: Exclusive Zone Packages Now Live
          </div>

          {/* Center Portion - Packages */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide max-w-full">
            {[
              { name: 'Harshil', link: '/packages/exclusive/harshil-valley-4-day-package' },
              { name: 'Gangotri', link: '/packages/pilgrimage/gangotri-4-day-package' },
              { name: 'Nelang', link: '/packages/exclusive/nelang-valley-day-trip' },
              { name: 'Darang', link: '/packages/exclusive/darang-village-day-trip' }
            ].map((pkg) => (
              <Link 
                key={pkg.name} 
                to={pkg.link}
                className="whitespace-nowrap px-4 py-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white rounded-full text-[11px] font-bold tracking-wider transition-colors shadow-sm"
              >
                {pkg.name}
              </Link>
            ))}
          </div>

          {/* Right Portion */}
          <div className="flex items-center gap-4">
            <Link to="/packages?category=exclusive" className="text-white text-[13px] font-bold hover:underline underline-offset-4 decoration-2 transition-all whitespace-nowrap">
              View Collection →
            </Link>
            
            {canClose && (
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close alert"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <style>{`
        @keyframes shimmerSweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </AnimatePresence>
  );
};
