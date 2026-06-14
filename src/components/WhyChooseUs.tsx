import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";
import { Map, Settings, Star, CheckCircle2 } from "lucide-react";
import { CinematicSection } from "./ui/CinematicSection";

const REASONS = [
  {
    icon: <Map className="w-7 h-7 text-amber-600" />,
    iconBg: "bg-amber-100",
    iconShadow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    title: (
      <>
        Local Experts Across <span className="text-amber-700">India</span>
      </>
    ),
    desc: (
      <>
        Deep knowledge of every route, coast, and trail across all <strong className="text-slate-800 font-bold">28 states</strong>. We've been there—we'll make sure you go right.
      </>
    ),
  },
  {
    icon: <Settings className="w-7 h-7 text-emerald-600" />,
    iconBg: "bg-emerald-100",
    iconShadow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    title: (
      <>
        <span className="text-emerald-700">100%</span> Customised
      </>
    ),
    desc: <>No copy-paste itineraries. Every trip is built from scratch around your dates, budget, travel style, and group size.</>,
  },
  {
    icon: <Star className="w-7 h-7 text-blue-600" />,
    iconBg: "bg-blue-100",
    iconShadow: "shadow-[0_0_20px_rgba(37,99,235,0.15)]",
    title: (
      <>
        Rated <span className="text-blue-700">4.9/5</span> by Travellers
      </>
    ),
    desc: (
      <>
        <strong className="text-slate-800 font-bold">500+</strong> verified reviews from families, couples, and solo travellers across India.
      </>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
    <CinematicSection variant="trust" className="section pb-24">
      <div className="section-header-center section-intro-center mb-10 md:mb-16">
        <span className="section-eyebrow text-sky-700">The MQT Difference</span>
        <h2 className="section-heading text-4xl md:text-5xl">Why Travellers Trust Us</h2>
        <p className="section-subheading mx-auto mt-4 text-lg">
          Three things we do differently from every other travel agency.
        </p>
      </div>

      {/* The background band that wraps the cards */}
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="absolute inset-0 bg-sky-50/80 backdrop-blur-md rounded-[2.5rem] border border-sky-100/50 shadow-sm" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10"
        >
          {REASONS.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white rounded-3xl p-8 border border-white shadow-soft hover:shadow-elevated hover:-translate-y-2 transition-all duration-500 group flex flex-col"
            >
              <div
                className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center ${reason.iconBg} ${reason.iconShadow} transition-transform duration-500 group-hover:scale-110`}
              >
                {reason.icon}
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight">
                {reason.title}
              </h3>
              <p className="text-base text-slate-600 leading-relaxed font-medium">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dense horizontal trust strip */}
      <div className="mt-12 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-4 bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-full shadow-sm max-w-4xl mx-auto">
           {[
             "Local Experts",
             "Custom Routes",
             "Verified Reviews",
             "24/7 WhatsApp Support"
           ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                 <span className="text-sm font-bold text-slate-700 tracking-wide uppercase">{item}</span>
              </div>
           ))}
        </div>
      </div>
    </CinematicSection>
  );
};

export default WhyChooseUs;
