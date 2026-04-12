import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripPlanner } from '../../contexts/TripPlannerContext';
import { usePersonalization, getPersonalizedHeadline } from '../../hooks/usePersonalization';
import { Sparkles, X, MapPin, ChevronRight, Mountain, Heart, Users } from 'lucide-react';

type TeaserLayer = 'collapsed' | 'expanded';

const QUICK_PICKS = [
  { label: 'Family Holiday', style: 'family', icon: <Users className="w-4 h-4" /> },
  { label: 'Honeymoon', style: 'honeymoon', icon: <Heart className="w-4 h-4" /> },
  { label: 'Adventure', style: 'adventure', icon: <Mountain className="w-4 h-4" /> },
];

export function PlannerTeaser() {
  const { teaserVisible, dismissTeaser, openPlanner, triggerSource } = useTripPlanner();
  const personalization = usePersonalization();
  const [layer, setLayer] = useState<TeaserLayer>('collapsed');

  const { title, subtitle } = getPersonalizedHeadline(personalization);

  const handleExpand = () => setLayer('expanded');

  const handleQuickPick = (style: string) => {
    openPlanner({ trip_style: [style as any] }, 'teaser_quick_pick');
  };

  const handleStartPlanning = () => {
    openPlanner(undefined, triggerSource || 'teaser');
  };

  const handleDismiss = () => {
    setLayer('collapsed');
    dismissTeaser();
  };

  return (
    <AnimatePresence>
      {teaserVisible && (
        <>
          {/* ── MOBILE: Bottom Sheet ── */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="lg:hidden fixed bottom-16 left-0 right-0 z-[85] bg-background border-t border-border rounded-t-2xl shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-border rounded-full" />
            </div>

            <div className="px-5 pb-6 pt-2">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base">{title}</h3>
                </div>
                <button
                  data-dismiss
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>

              <AnimatePresence mode="wait">
                {layer === 'collapsed' ? (
                  <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <button
                      onClick={handleExpand}
                      className="w-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all"
                    >
                      <MapPin className="w-4 h-4" /> Start Planning
                    </button>
                    <button data-dismiss onClick={handleDismiss} className="w-full text-center text-xs text-muted-foreground mt-2 hover:text-foreground transition-colors py-1">
                      No thanks
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="expanded" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quick pick — what kind of trip?</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {QUICK_PICKS.map(pick => (
                        <button
                          key={pick.style}
                          onClick={() => handleQuickPick(pick.style)}
                          className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-xs font-medium text-foreground"
                        >
                          <span className="text-primary">{pick.icon}</span>
                          {pick.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleStartPlanning}
                      className="w-full text-center text-sm text-primary font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all"
                    >
                      Explore all options <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── DESKTOP: Floating Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="hidden lg:block fixed bottom-8 right-8 z-[85] w-80 rounded-2xl overflow-hidden border border-border bg-background"
            style={{ boxShadow: '0 20px 60px -10px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04)' }}
          >
            {/* Header gradient strip */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-blue-400 to-primary" />

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-tight max-w-[170px]">
                    {title}
                  </h3>
                </div>
                <button
                  data-dismiss
                  onClick={handleDismiss}
                  className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{subtitle}</p>

              <AnimatePresence mode="wait">
                {layer === 'collapsed' ? (
                  <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1.5">
                    <button
                      onClick={handleExpand}
                      className="w-full relative group overflow-hidden rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5" /> Start Planning
                      <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                    <button data-dismiss onClick={handleDismiss} className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1">
                      No thanks
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="expanded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">What kind of trip?</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {QUICK_PICKS.map(pick => (
                        <button
                          key={pick.style}
                          onClick={() => handleQuickPick(pick.style)}
                          className="flex flex-col items-center gap-1 px-1.5 py-2.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-[11px] font-medium text-foreground"
                        >
                          <span className="text-primary">{pick.icon}</span>
                          {pick.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleStartPlanning}
                      className="w-full text-center text-xs text-primary font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all"
                    >
                      More options <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
