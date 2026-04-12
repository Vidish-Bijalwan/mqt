import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, X, ArrowRight, RotateCcw } from 'lucide-react';
import { useTripPlanner } from '../../contexts/TripPlannerContext';

export function ResumePlannerPopup() {
  const { resumeVisible, dismissResume, resumePlanner, startFresh, partialData } = useTripPlanner();
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss after 8s of no interaction
  useEffect(() => {
    if (resumeVisible) {
      autoDismissRef.current = setTimeout(() => {
        dismissResume();
      }, 8000);
    }
    return () => {
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    };
  }, [resumeVisible, dismissResume]);

  const destination = partialData?.destination_interest || partialData?.destinations?.[0] || null;
  const tripStyle = partialData?.trip_style?.[0] || null;
  const stepComplete = partialData?.currentStep || 1;
  const totalSteps = 6;
  const progressPct = Math.round((stepComplete / totalSteps) * 100);

  const summaryLine = destination
    ? `Trip to ${destination}`
    : tripStyle
    ? `${tripStyle.charAt(0).toUpperCase() + tripStyle.slice(1)} journey`
    : 'Your dream trip';

  return (
    <AnimatePresence>
      {resumeVisible && (
        <>
          {/* ── MOBILE: Bottom Sheet ── */}
          <motion.div
            key="resume-mobile"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[90] bg-background border-t border-border shadow-[0_-8px_32px_rgba(0,0,0,0.12)] rounded-t-2xl safe-pb"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>

            <div className="px-5 pt-2 pb-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                      Welcome back! 👋
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You were planning <span className="font-medium text-foreground">{summaryLine}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={dismissResume}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">{stepComplete} of {totalSteps} steps complete</span>
                  <span className="text-xs font-semibold text-primary">{progressPct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              {/* CTAs — stacked for mobile thumb reach */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={resumePlanner}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Resume Planning
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={startFresh}
                  className="w-full h-11 bg-muted text-muted-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-muted/80 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Fresh
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── DESKTOP: Centered Modal ── */}
          <>
            {/* Backdrop */}
            <motion.div
              key="resume-desktop-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={dismissResume}
              className="hidden lg:block fixed inset-0 z-[89] bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              key="resume-desktop"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="hidden lg:block fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-sm bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top accent strip */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-blue-400 to-accent" />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                          Welcome back! 👋
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          You were planning <span className="font-medium text-foreground">{summaryLine}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={dismissResume}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground">{stepComplete} of {totalSteps} steps complete</span>
                      <span className="text-xs font-semibold text-primary">{progressPct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={resumePlanner}
                      className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      Resume Planning
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={startFresh}
                      className="w-full h-10 text-muted-foreground text-sm font-medium flex items-center justify-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Start Fresh
                    </button>
                  </div>

                  {/* Auto-dismiss hint */}
                  <p className="text-center text-[10px] text-muted-foreground/60 mt-4">
                    Auto-dismisses in 8s
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        </>
      )}
    </AnimatePresence>
  );
}
