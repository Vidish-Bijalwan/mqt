import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi, India",
    text: "The Kedarnath trek was life-changing. MyQuickTrippers arranged everything from helicopter transfers to luxury camping — absolutely divine experience.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    location: "Bangalore, India",
    text: "Our Ladakh road trip was seamless. Pangong Lake at sunrise is something words can't describe. The team handled every detail flawlessly.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    location: "Chennai, India",
    text: "Varanasi's ghats at dawn, the Ganga Aarti at night — MyQuickTrippers turned a spiritual journey into a luxury retreat. Unforgettable!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Traveler Stories
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
            Words From Our Guests
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-card p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6 flex-1 italic">
                "{t.text}"
              </p>
              <footer>
                <p className="font-heading text-lg text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  {t.location}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
