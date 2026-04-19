import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

// Miller's Law: 3 reasons — not 6, not 8. THREE.
// Law of Similarity: all 3 cards identical visual treatment.
// Von Restorff: numbered highlights stand out.
const REASONS = [
  {
    num: "01",
    icon: "🏔",
    title: "Local Experts Across India",
    desc: "Deep knowledge of every route, coast, and trail across all 28 states. We've been there — we'll make sure you go right.",
  },
  {
    num: "02",
    icon: "🎯",
    title: "100% Customised for You",
    desc: "No copy-paste itineraries. Every trip is built from scratch around your dates, budget, travel style, and group.",
  },
  {
    num: "03",
    icon: "⭐",
    title: "Rated 4.9/5 by Real Travellers",
    desc: "500+ verified reviews from families, couples, and solo travellers across India. Not bots — real people, real trips.",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  // EASE_SMOOTH is typed as [number,number,number,number] in motion.ts — required by Framer Motion
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="section-y bg-white reveal-section">
      <div className="container-page">

        {/* Section header */}
        <div className="text-center mb-12">
          <span className="section-eyebrow">WHY MQT</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Why Travellers Trust Us
          </h2>
          <p className="text-base text-gray-500 max-w-md mx-auto">
            Three things we do differently from every other travel agency.
          </p>
        </div>

        {/* 3 numbered reason cards — Law of Similarity: identical card shell */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {REASONS.map((reason) => (
            <motion.div
              key={reason.num}
              variants={cardVariants}
              className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
            >
              {/* Von Restorff: large number stands out — nothing else is this large */}
              <span
                className="absolute top-6 right-7 font-display font-bold text-gray-100 group-hover:text-primary/10 transition-colors"
                style={{ fontSize: "4rem", lineHeight: 1 }}
                aria-hidden
              >
                {reason.num}
              </span>

              {/* Icon */}
              <span className="text-3xl mb-5 block">{reason.icon}</span>

              {/* Law of Proximity: title and desc grouped, number separated */}
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-snug">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
