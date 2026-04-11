import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Award, MapPin, Heart } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Travellers" },
  { value: "50+", label: "Curated Packages" },
  { value: "10+", label: "Years Experience" },
  { value: "20+", label: "Destinations" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    desc: "Born from a love of India's landscapes, we craft journeys that go beyond tourism — immersive experiences that stay with you forever.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every accommodation, guide, and itinerary is handpicked and vetted. We accept nothing less than excellence for our travellers.",
  },
  {
    icon: Users,
    title: "Expert Local Team",
    desc: "Our guides are locals who live and breathe these destinations — bringing you stories, routes, and experiences no guidebook can offer.",
  },
  {
    icon: MapPin,
    title: "Authentic Destinations",
    desc: "We focus on experiences that are meaningful — spiritual, adventurous, cultural — not just checkbox tourism.",
  },
];

const About = () => {
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-4 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-foreground mb-6"
        >
          About <span className="gold-gradient-text italic">MyQuickTrippers</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We are India's premier luxury travel company, specialising in curated Himalayan journeys and cultural experiences across the subcontinent's most breathtaking destinations.
        </motion.p>
        <div className="gold-divider mt-8" />
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary" ref={statsRef}>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <p className="font-heading text-4xl md:text-5xl gold-gradient-text mb-2">{stat.value}</p>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4 text-center">Who We Are</p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-8 text-center">
            Built by Travellers, for Travellers
          </h2>
          <div className="space-y-5 text-muted-foreground font-body text-base leading-relaxed">
            <p>
              MyQuickTrippers was founded with a single belief: that India's greatest landscapes deserve to be experienced with care, comfort, and deep local knowledge. Far too many travellers rush through Kedarnath, Ladakh, or Varanasi without truly connecting with what makes these places extraordinary.
            </p>
            <p>
              We started as a small team of passionate Himalayan travellers from Uttarakhand — people who had guided friends and family through these mountains, temples, and valleys for years. Word spread, and what began as personal itineraries grew into India's most trusted boutique travel company.
            </p>
            <p>
              Today, MyQuickTrippers serves hundreds of travellers every year — from honeymooners seeking Himalayan seclusion to families on their first Char Dham yatra, to solo adventurers chasing Ladakh's untamed roads. Every journey is planned, not packaged.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary" ref={valuesRef}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">What Drives Us</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Our Core Values</h2>
            <div className="gold-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="glass-card p-8"
              >
                <val.icon className="text-primary mb-4" size={28} />
                <h3 className="font-heading text-2xl text-foreground mb-3">{val.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
