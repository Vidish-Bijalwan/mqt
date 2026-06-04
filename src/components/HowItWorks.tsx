import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MessageCircle, ClipboardList, CheckCircle2, Plane } from 'lucide-react';

const steps = [
  {
    step_number: 1,
    title: 'Tell Us Your Dream',
    description: 'Share your destination, travel style, and dates.',
    Icon: MessageCircle
  },
  {
    step_number: 2,
    title: 'We Build Your Itinerary',
    description: 'Custom plan crafted by our experts within 2 hours.',
    Icon: ClipboardList
  },
  {
    step_number: 3,
    title: 'Review & Confirm',
    description: 'Approve your custom itinerary and we handle everything from here.',
    Icon: CheckCircle2
  },
  {
    step_number: 4,
    title: 'Journey Begins!',
    description: 'Relax and enjoy your trip with our 24/7 on-ground support.',
    Icon: Plane
  },
];

const HowItWorks = () => {

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-slate-900 text-white w-full overflow-hidden">
      <div className="container-page w-full">
        <ScrollReveal className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-white">How It Works</h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-2">Four simple steps to your dream journey</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative w-full">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-white/20 z-0" />

          {steps.map((step: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="text-center relative z-10 group"
              >
                <div className="mx-auto rounded-full bg-slate-800 flex items-center justify-center text-primary relative w-20 h-20 sm:w-24 sm:h-24 border-4 border-slate-900 shadow-lg transition-all group-hover:shadow-primary/20 group-hover:border-slate-800 mb-3 sm:mb-4">
                  <step.Icon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" strokeWidth={1.5} />
                </div>
                <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Step {step.step_number || i + 1}
                </span>
                <h3 className="font-body font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/70 max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
