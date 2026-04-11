import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Users, Calendar, CheckCircle, ArrowRight } from "lucide-react";

interface DestinationPageProps {
  name: string;
  tagline: string;
  heroImage: string;
  description: string[];
  duration: string;
  groupSize: string;
  bestTime: string;
  price: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
}

const DestinationPage = ({
  name, tagline, heroImage, description, duration, groupSize,
  bestTime, price, highlights, itinerary, includes,
}: DestinationPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={heroImage}
          alt={`${name} — ${tagline}. Luxury India travel by MyQuickTrippers`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
        <div className="relative z-10 container mx-auto px-4 md:px-8 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3"
          >
            {tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl text-foreground"
          >
            {name}
          </motion.h1>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: Clock, label: "Duration", value: duration },
              { icon: Users, label: "Group Size", value: groupSize },
              { icon: Calendar, label: "Best Time", value: bestTime },
              { icon: ArrowRight, label: "Starting At", value: price },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-6 text-center">
                <stat.icon size={18} className="text-primary mx-auto mb-2" />
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-heading text-lg text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">Overview</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                About {name}
              </h2>
              <div className="space-y-4">
                {description.map((para, i) => (
                  <p key={i} className="font-body text-base text-muted-foreground leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Itinerary */}
              <div className="mt-12">
                <h2 className="font-heading text-3xl text-foreground mb-8">Sample Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((item, i) => (
                    <motion.div
                      key={item.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex gap-5"
                    >
                      <div className="shrink-0 w-12 h-12 border border-primary/30 flex items-center justify-center">
                        <span className="font-heading text-sm text-primary">{item.day}</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-foreground mb-1">{item.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Highlights */}
              <div className="glass-card p-6">
                <h3 className="font-heading text-xl text-foreground mb-4">Highlights</h3>
                <ul className="space-y-3">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                      <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes */}
              <div className="glass-card p-6">
                <h3 className="font-heading text-xl text-foreground mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 font-body text-sm text-muted-foreground">
                      <CheckCircle size={15} className="text-primary mt-0.5 shrink-0" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book CTA */}
              <div className="p-6 border border-primary/30 text-center">
                <p className="font-heading text-3xl gold-gradient-text mb-1">{price}</p>
                <p className="font-body text-xs text-muted-foreground mb-5">per person (customisable)</p>
                <a
                  href="/contact"
                  className="block w-full py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors duration-300 text-center"
                >
                  Book This Trip
                </a>
                <a
                  href="https://wa.me/918171158569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-3 py-3.5 border border-[#25D366] text-[#25D366] font-body text-sm uppercase tracking-[0.15em] hover:bg-[#25D366]/10 transition-colors duration-300 text-center"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationPage;
