import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MessageCircle, ClipboardList, CheckCircle2, Plane } from 'lucide-react';

const steps = [
  {
    step_number: 1,
    title: 'Tell Us Your Dream',
    description: 'Share your destination, travel style, and dates.',
    Icon: MessageCircle,
  },
  {
    step_number: 2,
    title: 'We Build Your Itinerary',
    description: 'Custom plan from our experts within 2 hours.',
    Icon: ClipboardList,
  },
  {
    step_number: 3,
    title: 'Review & Confirm',
    description: 'Approve your itinerary — we handle the rest.',
    Icon: CheckCircle2,
  },
  {
    step_number: 4,
    title: 'Journey Begins!',
    description: '24/7 on-ground support on your trip.',
    Icon: Plane,
  },
];

const HowItWorks = () => {
  return (
    <section className="section-y-compact bg-slate-900 text-white w-full overflow-hidden">
      <div className="container-page w-full">
        <ScrollReveal className="section-header-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-1.5 sm:mb-2 text-white">
            How It Works
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            Four simple steps to your dream journey
          </p>
        </ScrollReveal>

        <div className="steps-compact-mobile relative w-full">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-white/20 z-0" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.step_number} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative z-10 flex items-start gap-3 sm:flex-col sm:items-center sm:text-center sm:gap-0 rounded-xl sm:rounded-none bg-white/5 sm:bg-transparent p-3 sm:p-0 border border-white/10 sm:border-0"
              >
                <div className="shrink-0 rounded-full bg-slate-800 flex items-center justify-center w-11 h-11 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 sm:border-4 border-slate-700 sm:border-slate-900 shadow-md sm:mb-3">
                  <step.Icon className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-400" strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0 pt-0.5 sm:pt-0">
                  <span className="inline-block bg-white/10 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-1 sm:mb-2">
                    Step {step.step_number}
                  </span>
                  <h3 className="font-body font-bold text-sm sm:text-base md:text-lg text-white mb-0.5 sm:mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 sm:text-white/70 leading-relaxed sm:max-w-xs sm:mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
