import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Crown, Shield, Sparkles } from "lucide-react";

const experiences = [
  {
    icon: Crown,
    title: "Luxury Himalayan Stays",
    description: "Handpicked mountain lodges, heritage havelis, and glamping retreats with panoramic Himalayan views.",
  },
  {
    icon: Compass,
    title: "Guided Treks & Pilgrimages",
    description: "Expert-led journeys through sacred trails — Char Dham, Markha Valley, and hidden Himalayan paths.",
  },
  {
    icon: Sparkles,
    title: "Cultural Immersions",
    description: "Private Ganga Aarti experiences, monastery stays, local cuisine trails, and artisan workshops.",
  },
  {
    icon: Shield,
    title: "Seamless India Travel",
    description: "From helicopter transfers to permit handling — every detail managed so you focus on the journey.",
  },
];

const ExperiencesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experiences" className="section-padding bg-secondary">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Why MyQuickTrippers
          </p>
          <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
            Crafted With Passion
          </h2>
          <div className="gold-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8 text-center group hover-lift"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <exp.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-2xl text-foreground mb-3">{exp.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
