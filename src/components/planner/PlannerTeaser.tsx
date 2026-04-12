import { motion, AnimatePresence } from 'framer-motion';
import { useTripPlanner } from '../../contexts/TripPlannerContext';
import { Sparkles, X, MapPin } from 'lucide-react';

export function PlannerTeaser() {
  const { teaserVisible, dismissTeaser, openPlanner, triggerSource } = useTripPlanner();

  const handleOpen = () => {
    openPlanner(undefined, triggerSource || 'teaser');
  };

  return (
    <AnimatePresence>
      {teaserVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-72 md:w-80 shadow-2xl rounded-2xl overflow-hidden border border-border bg-background/95 backdrop-blur shadow-primary/10"
        >
          <div className="p-4 relative">
            <button 
              onClick={dismissTeaser}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm">
                  {triggerSource === 'exit_intent' 
                    ? "Before you go..." 
                    : "Plan your dream trip"}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {triggerSource === 'exit_intent'
                    ? "Let's save your ideas and build a custom itinerary."
                    : "Get personalized recommendations in under 60 seconds."}
                </p>
              </div>
            </div>

            <button 
              onClick={handleOpen}
              className="w-full relative group overflow-hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Planning <MapPin className="w-3.5 h-3.5" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
