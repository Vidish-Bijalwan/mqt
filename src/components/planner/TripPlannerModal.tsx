import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform } from 'framer-motion';
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

export function TripPlannerModal() {
  const {
    isOpen,
    closePlanner,
    currentStep,
    prevStep,
    data,
    hasCompleted,
  } = useTripPlanner();

  const dragControls = useDragControls();
  const sheetY = useMotionValue(0);
  const overlayOpacity = useTransform(sheetY, [0, 300], [1, 0]);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderStep = () => {
    if (hasCompleted || currentStep >= 7) return <StepSuccess />;
    switch (currentStep) {
      case 0: return <StepZeroHook />;
      case 1: return <StepThreeDestination />;
      case 2: return <StepFourDates />;
      case 3: return <StepFiveGroup />;
      case 4: return <StepSixPreferences />;
      case 5: return <StepTwoStyle />;
      case 6: return <StepEightContact />;
      default: return <StepZeroHook />;
    }
  };

  const totalSteps = 6;
  const isStepZeroOrSuccess = currentStep === 0 || hasCompleted;

  const stepVariants = {
    initial: { opacity: 0, x: 20, scale: 0.99 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.99 },
  };

  return (
    <AnimatePresence>
      {/* ───────── BACKDROP ───────── */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ opacity: overlayOpacity }}
        onClick={closePlanner}
        className="fixed inset-0 z-[100] bg-black/75"
      />

      {/* ───────── MOBILE: Full-Screen Bottom Sheet ───────── */}
      <motion.div
        key="mobile-sheet"
        className="lg:hidden fixed inset-x-0 bottom-0 z-[101] flex flex-col bg-background rounded-t-3xl h-[85vh] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
        style={{ y: sheetY }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 150 || info.velocity.y > 600) {
            closePlanner();
          } else {
            sheetY.set(0);
          }
        }}
      >
        {/* Drag handle */}
        <div
          ref={dragHandleRef}
          className="flex justify-center py-3 shrink-0 cursor-grab active:cursor-grabbing"
          onPointerDown={e => dragControls.start(e)}
        >
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Progress bar */}
        {currentStep > 0 && !hasCompleted && (
          <div className="shrink-0">
            <PlannerProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <div className="flex justify-between items-center px-4 py-2">
              <button
                onClick={prevStep}
                className="p-2 -ml-1 rounded-full hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <button
                onClick={closePlanner}
                className="p-2 -mr-1 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 0 / Success close button */}
        {isStepZeroOrSuccess && (
          <div className="absolute top-3 right-4 z-20">
            <button
              onClick={closePlanner}
              className="p-2 rounded-full hover:bg-muted text-foreground transition-colors bg-muted/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable step content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22 }}
              className="px-5 py-4 pb-10 min-h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ───────── DESKTOP: Centered Dialog ───────── */}
      <div className="hidden lg:flex fixed inset-0 z-[101] items-center justify-center p-6">
        <motion.div
          key="desktop-modal"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
        >
          {/* Progress + nav header */}
          {currentStep > 0 && !hasCompleted && (
            <div className="absolute top-0 left-0 right-0 z-20">
              <PlannerProgressBar currentStep={currentStep} totalSteps={totalSteps} />
              <div className="flex justify-between items-center px-6 py-3">
                <button
                  onClick={prevStep}
                  className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
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

          {isStepZeroOrSuccess && (
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={closePlanner}
                className="p-2 rounded-full hover:bg-muted text-foreground transition-colors bg-background/60 backdrop-blur"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Split layout */}
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex-1 relative overflow-y-auto ${currentStep > 0 ? 'pt-16' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col p-8 xl:p-12"
                >
                  <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                    {renderStep()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <PlannerSummarySidebar />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
