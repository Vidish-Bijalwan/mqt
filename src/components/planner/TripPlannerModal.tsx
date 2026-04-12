import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripPlanner } from '../../contexts/TripPlannerContext';
import { X, ChevronLeft } from 'lucide-react';
import { PlannerProgressBar } from './PlannerProgressBar';
import { PlannerSummarySidebar } from './PlannerSummarySidebar';

// Steps
import { StepZeroHook } from './steps/StepZeroHook';
import { StepOneIntent } from './steps/StepOneIntent';
import { StepTwoStyle } from './steps/StepTwoStyle';
import { StepThreeDestination } from './steps/StepThreeDestination';
import { StepFourDates } from './steps/StepFourDates';
import { StepFiveGroup } from './steps/StepFiveGroup';
import { StepSixPreferences } from './steps/StepSixPreferences';
import { StepSevenJourneyDetails } from './steps/StepSevenJourneyDetails';
import { StepEightContact } from './steps/StepEightContact';
import { StepSuccess } from './steps/StepSuccess';

const TOTAL_STEPS = 8;

export function TripPlannerModal() {
  const { 
    isOpen, 
    closePlanner, 
    currentStep, 
    prevStep,
    data,
    hasCompleted
  } = useTripPlanner();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderStep = () => {
    if (hasCompleted || currentStep === 9) return <StepSuccess />;
    
    switch (currentStep) {
      case 0: return <StepZeroHook />;
      case 1: return <StepOneIntent />;
      case 2: return <StepTwoStyle />;
      case 3: return <StepThreeDestination />;
      case 4: return <StepFourDates />;
      case 5: return <StepFiveGroup />;
      case 6: return <StepSixPreferences />;
      case 7: 
        return data.intent_type === 'custom_trip' ? <StepSevenJourneyDetails /> : <StepEightContact />;
      case 8: return <StepEightContact />;
      default: return <StepZeroHook />;
    }
  };

  const getStepDirection = () => {
    // This could optionally track previous vs next for sliding direction, but a simple fade+scale is cleaner for a wizard
    return {
      initial: { opacity: 0, scale: 0.98, x: 10 },
      animate: { opacity: 1, scale: 1, x: 0 },
      exit: { opacity: 0, scale: 0.98, x: -10 }
    };
  };

  const variants = getStepDirection();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 md:p-6 lg:p-8">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          onClick={closePlanner}
          className="absolute inset-0 bg-background/80"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-5xl bg-background sm:rounded-2xl shadow-elevated border border-border overflow-hidden flex flex-col"
        >
          {/* Header Controls */}
          {currentStep > 0 && !hasCompleted && (
            <div className="absolute top-0 left-0 right-0 z-20">
              <PlannerProgressBar currentStep={currentStep} totalSteps={data.intent_type === 'custom_trip' ? 8 : 7} />
              <div className="flex justify-between items-center px-4 py-3">
                <button 
                  onClick={prevStep}
                  className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
                <button 
                  onClick={closePlanner}
                  className="p-2 -mr-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Special Header for Step 0 or Success */}
          {(currentStep === 0 || hasCompleted) && (
            <div className="absolute top-4 right-4 z-20">
              <button 
                onClick={closePlanner}
                className="p-2 rounded-full hover:bg-muted text-foreground transition-colors bg-background/50 backdrop-blur"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Main Layout Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Form Area */}
            <div className={`flex-1 relative overflow-y-auto ${currentStep > 0 ? 'pt-16' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col p-6 md:p-10"
                >
                  <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                     {renderStep()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar (Desktop Only) */}
            <PlannerSummarySidebar />
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
