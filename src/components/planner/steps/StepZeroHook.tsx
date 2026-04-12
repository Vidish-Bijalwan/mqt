import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { ArrowRight, Map, Star, ShieldCheck } from 'lucide-react';

export function StepZeroHook() {
  const { nextStep } = useTripPlanner();

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
          <Map className="w-10 h-10 text-primary relative z-10" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground">
          Get your perfect India trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">under 60 seconds</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Answer a few quick questions, and we'll craft a personalized itinerary just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left mt-8">
        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
          <Star className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
          <p className="text-sm text-foreground font-medium">Personalized recommendations</p>
        </div>
        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
          <Map className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-foreground font-medium">Expert-curated itineraries</p>
        </div>
        <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
          <p className="text-sm text-foreground font-medium">Free travel consultation</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={nextStep}
        className="w-full sm:w-auto mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-xl font-medium shadow-xl shadow-primary/25 flex items-center justify-center gap-3 transition-colors"
      >
        Let's get started <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
