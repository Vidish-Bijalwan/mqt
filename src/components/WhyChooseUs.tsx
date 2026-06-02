import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";
import { Map, Settings, Star } from "lucide-react";

const REASONS = [
  {
    icon: <Map className="w-7 h-7 text-amber-600" />,
    iconBg: "from-amber-100 to-orange-50",
    iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    title: (
      <>
        Local Experts Across <span className="text-primary">India</span>
      </>
    ),
    desc: (
      <>
        Deep knowledge of every route, coast, and trail across all <strong className="text-gray-900 font-semibold">28 states</strong>. We've been there — we'll make sure you go right.
      </>
    ),
  },
  {
    icon: <Settings className="w-7 h-7 text-emerald-600" />,
    iconBg: "from-emerald-100 to-teal-50",
    iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    title: (
      <>
        <span className="text-emerald-600">100%</span> Customised for You
      </>
    ),
    desc: (
      <>
        No copy-paste itineraries. Every trip is built from scratch around your dates, budget, travel style, and group.
      </>
    ),
  },
  {
    icon: <Star className="w-7 h-7 text-blue-600" />,
    iconBg: "from-blue-100 to-indigo-50",
    iconShadow: "shadow-[0_0_20px_rgba(37,99,235,0.15)]",
    title: (
      <>
        Rated <span className="text-blue-600">4.9/5</span> by Real Travellers
      </>
    ),
    desc: (
      <>
        <strong className="text-gray-900 font-semibold">500+</strong> verified reviews from families, couples, and solo travellers across India. Not bots — real people, real trips.
      </>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="section-y relative overflow-hidden bg-gray-50">
      {/* Premium Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-amber-200/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] rounded-full bg-blue-200/20 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[30%] rounded-full bg-emerald-200/15 blur-[80px]" />
      </div>

      <div className="container-page relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-amber-200/50">
            Why MQT
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            Why Travellers Trust Us
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
            Three things we do differently from every other travel agency.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        >
          {REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group flex flex-col"
            >
              {/* Premium Gradient Icon */}
              <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${reason.iconBg} ${reason.iconShadow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                {reason.icon}
              </div>

              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {reason.title}
              </h3>
              <p className="text-base text-gray-500 leading-relaxed flex-1">
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
