import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";
import { Map, Settings, Star } from "lucide-react";

const REASONS = [
  {
    icon: <Map className="w-6 h-6 text-amber-600" />,
    iconBg: "from-amber-100 to-orange-50",
    iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    title: (
      <>
        Local Experts Across <span className="text-primary">India</span>
      </>
    ),
    desc: (
      <>
        Deep knowledge of every route, coast, and trail across all{" "}
        <strong className="text-gray-900 font-semibold">28 states</strong>. We&apos;ve been there — we&apos;ll make sure you go right.
      </>
    ),
  },
  {
    icon: <Settings className="w-6 h-6 text-emerald-600" />,
    iconBg: "from-emerald-100 to-teal-50",
    iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    title: (
      <>
        <span className="text-emerald-600">100%</span> Customised for You
      </>
    ),
    desc: <>No copy-paste itineraries. Every trip is built from scratch around your dates, budget, travel style, and group.</>,
  },
  {
    icon: <Star className="w-6 h-6 text-blue-600" />,
    iconBg: "from-blue-100 to-indigo-50",
    iconShadow: "shadow-[0_0_20px_rgba(37,99,235,0.15)]",
    title: (
      <>
        Rated <span className="text-blue-600">4.9/5</span> by Real Travellers
      </>
    ),
    desc: (
      <>
        <strong className="text-gray-900 font-semibold">500+</strong> verified reviews from families, couples, and solo travellers across India.
      </>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="section-compact relative overflow-hidden bg-gradient-to-b from-amber-50/40 to-white w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-amber-200/20 blur-[80px]" />
        <div className="absolute -bottom-20 -right-16 w-40 h-40 rounded-full bg-blue-200/20 blur-[80px]" />
      </div>

      <div className="container-page relative z-10">
        <div className="section-header-center section-intro-center">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-100/50 text-amber-800 text-xs font-bold tracking-widest uppercase shadow-sm border border-amber-200/50">
            Why MQT
          </span>
          <h2 className="section-heading">Why Travellers Trust Us</h2>
          <p className="section-subheading mx-auto">
            Three things we do differently from every other travel agency.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 grid-gap"
        >
          {REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative bg-white rounded-2xl card-pad border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgb(0,0,0,0.08)] md:hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div
                className={`mb-5 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${reason.iconBg} ${reason.iconShadow}`}
              >
                {reason.icon}
              </div>

              <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
