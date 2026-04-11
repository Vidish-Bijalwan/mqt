import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--gradient-gold)" }} />

      <div className="container mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Start Your Journey
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
            Ready to Explore?
          </h2>
          <p className="font-body text-base text-muted-foreground mb-10 leading-relaxed">
            Let us craft your perfect luxury itinerary. Subscribe to receive exclusive deals,
            curated travel guides, and early access to our newest destinations.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 px-5 py-3.5 bg-background border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>

          <p className="font-body text-xs text-muted-foreground mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
