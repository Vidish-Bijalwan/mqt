import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { ArrowRight, Map, Star, ShieldCheck, RotateCcw } from 'lucide-react';

export function StepZeroHook() {
  const { nextStep, hasResumeData, resumeStep, resumePlanner, resetPlanner, data } = useTripPlanner();

  // Determine progress % for resume prompt
  const resumePercent = Math.round((resumeStep / 8) * 100);

  if (hasResumeData) {
    return (
      <div className="flex flex-col items-center text-center space-y-6 py-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
        >
          <RotateCcw className="w-9 h-9 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <h2 className="text-2xl md:text-4xl font-display font-semibold tracking-tight text-foreground">
            Welcome back!
          </h2>
          <p className="text-base text-muted-foreground max-w-sm mx-auto">
            You were{' '}
            <span className="font-semibold text-primary">{resumePercent}% through</span> planning
            {data.destination_interest ? ` your ${data.destination_interest} trip` : ' your trip'}.
            <br />
            Pick up where you left off?
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full max-w-xs bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${resumePercent}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-primary rounded-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={resumePlanner}
            className="flex-1 bg-primary text-primary-foreground text-base px-6 py-3.5 rounded-xl font-medium shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-colors hover:bg-primary/90"
          >
            Resume Planning <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { resetPlanner(); nextStep(); }}
            className="flex-1 border border-border text-muted-foreground text-sm px-6 py-3.5 rounded-xl font-medium hover:bg-muted/50 transition-colors"
          >
            Start Fresh
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
          <Map className="w-10 h-10 text-primary relative z-10" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground break-words w-full leading-tight">
          Get your perfect India trip in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
            under 60 seconds
          </span>
        </h2>
        <p className="text-lg text-muted-foreground w-full max-w-lg mx-auto break-words px-2">
          Answer a few quick questions, and we'll craft a personalized itinerary just for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-left"
      >
        {[
          { icon: <Star className="w-5 h-5 text-yellow-500" />, text: 'Personalized recommendations' },
          { icon: <Map className="w-5 h-5 text-blue-500" />, text: 'Expert-curated itineraries' },
          { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, text: 'Free travel consultation' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl"
          >
            <span className="mt-0.5 shrink-0">{item.icon}</span>
            <p className="text-sm text-foreground font-medium">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={nextStep}
        className="w-full sm:w-auto mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-xl font-medium shadow-xl shadow-primary/25 flex items-center justify-center gap-3 transition-colors"
      >
        Let's get started <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
