import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    emoji: '💬',
    title: 'Tell Us Your Dream',
    desc: 'Share your destination, travel style, and dates',
    cta: true,
  },
  {
    emoji: '📋',
    title: 'We Build Your Itinerary',
    desc: 'Custom plan crafted by our travel experts within 2 hours',
    cta: false,
  },
  {
    emoji: '✅',
    title: 'Review & Confirm',
    desc: 'Approve the plan and pay securely — no upfront payment required',
    cta: false,
  },
  {
    emoji: '🏔',
    title: 'Journey Begins!',
    desc: 'Relax — our team handles everything from here',
    cta: false,
  },
];

const HowItWorks = () => {
  const { openPlanner } = useTripPlanner();

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading mx-auto">Four simple steps to your dream journey</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-primary/20 z-0" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="text-center relative z-10 group"
              >
                <div className="w-22 h-22 mx-auto rounded-full bg-surface-2 flex items-center justify-center text-4xl mb-4 relative w-24 h-24 border-4 border-background shadow-card transition-shadow group-hover:shadow-elevated">
                  {step.emoji}
                </div>
                <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Step {i + 1}
                </span>
                <h3 className="font-body font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>

                {step.cta && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openPlanner(undefined, 'how_it_works')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Start Planning <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
