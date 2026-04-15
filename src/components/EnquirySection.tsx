import { motion } from 'framer-motion';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, MessageCircle, Phone, Zap, Lock, ShieldCheck } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Zap, text: 'Response in 2 hours' },
  { icon: ShieldCheck, text: 'Free consultation' },
  { icon: Lock, text: 'No payment upfront' },
];

const EnquirySection = () => {
  const { openPlanner } = useTripPlanner();

  return (
    <section className="section-padding bg-background" id="enquiry">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal className="text-center">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <MessageCircle className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="section-heading mb-3">Plan Your Perfect Trip</h2>
          <p className="section-subheading mx-auto mb-8">
            Answer a few questions and our travel experts will craft a personalised itinerary — no forms, no back-and-forth.
          </p>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 20px 50px -10px rgba(27,108,168,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openPlanner(undefined, 'enquiry_section')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 gradient-primary text-primary-foreground text-lg font-semibold px-10 py-5 rounded-2xl shadow-xl shadow-primary/25 mb-5 transition-all"
          >
            Start Planning My Trip <ArrowRight className="w-5 h-5" />
          </motion.button>

          <p className="text-sm text-muted-foreground mb-8">Takes less than 60 seconds · No signup required</p>

          {/* Secondary — WhatsApp */}
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">Prefer to talk directly?</p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917668741373?text=Hi!%20I'm%20interested%20in%20planning%20a%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#128C7E] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href="tel:+917668741373"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnquirySection;
