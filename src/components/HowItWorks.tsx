import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const fetchHowItWorks = async () => {
  const { data, error } = await supabase
    .from("how_it_works")
    .select("*")
    .eq("active", true)
    .order("step_number", { ascending: true });
  if (error) throw error;
  return data;
};

const defaultSteps = [
  {
    step_number: 1,
    title: 'Tell Us Your Dream',
    description: 'Share your destination, travel style, and dates',
  },
  {
    step_number: 2,
    title: 'We Build Your Itinerary',
    description: 'Custom plan crafted by our travel experts within 2 hours',
  },
  {
    step_number: 3,
    title: 'Review & Confirm',
    description: 'Approve the plan and pay securely — no upfront payment required',
  },
  {
    step_number: 4,
    title: 'Journey Begins!',
    description: 'Relax — our team handles everything from here',
  },
];

const getEmojiForStep = (index: number) => {
  const emojis = ['💬', '📋', '✅', '🏔'];
  return emojis[index % emojis.length];
};

const HowItWorks = () => {
  const { openPlanner } = useTripPlanner();
  const { data: querySteps } = useQuery({
    queryKey: ["public-how-it-works"],
    queryFn: fetchHowItWorks,
  });

  const steps = querySteps && querySteps.length > 0 ? querySteps : defaultSteps;

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

          {steps.map((step: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="text-center relative z-10 group"
              >
                <div className="w-22 h-22 mx-auto rounded-full bg-surface-2 flex items-center justify-center text-4xl mb-4 relative w-24 h-24 border-4 border-background shadow-card transition-shadow group-hover:shadow-elevated">
                  {getEmojiForStep(i)}
                </div>
                <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Step {step.step_number || i + 1}
                </span>
                <h3 className="font-body font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                {i === 0 && (
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
