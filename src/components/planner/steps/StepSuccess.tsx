import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';

export function StepSuccess() {
  const { data, resetPlanner, closePlanner } = useTripPlanner();

  // Simple confetti effect could go here
  
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-10 px-4 animate-in fade-in zoom-in-95 duration-500">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
        </motion.div>
      </motion.div>

      <div className="space-y-3">
        <h2 className="text-3xl font-display font-semibold text-foreground">
          Your travel plan is in motion!
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Thanks, {data.contact_name?.split(' ')[0] || 'there'}. Our experts are reviewing your preferences and will reach out shortly with personalized recommendations.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-6 w-full max-w-sm mt-6 border border-border">
        <p className="text-sm text-foreground font-medium mb-2">What happens next?</p>
        <ul className="text-sm text-muted-foreground space-y-2 text-left">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span> 
            Expert reviews your profile
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span> 
            We design an initial itinerary
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span> 
            We drop you a message on WhatsApp or Call
          </li>
        </ul>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => {
          resetPlanner();
          closePlanner();
        }}
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground w-full max-w-sm p-3 rounded-xl border border-border hover:bg-muted dark:hover:bg-muted/50 hover:text-foreground transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Plan Another Trip</span>
      </motion.button>
    </div>
  );
}
