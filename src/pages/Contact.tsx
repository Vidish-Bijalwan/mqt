import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 81711 58569",
    href: "tel:+918171158569",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@myquicktrippers.com",
    href: "mailto:info@myquicktrippers.com",
  },
  {
    icon: MapPin,
    label: "Based In",
    value: "Uttarakhand, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 4 hours",
    href: null,
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          Get In Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-foreground mb-6"
        >
          Plan Your <span className="gold-gradient-text italic">Dream Trip</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Tell us your dream destination and dates. Our travel experts will craft a personalised luxury itinerary just for you — at no extra charge.
        </motion.p>
        <div className="gold-divider mt-8" />
      </section>

      {/* Contact Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                Reach Us Directly
              </h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="p-3 border border-primary/20 text-primary shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-body text-base text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-base text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 glass-card">
                <p className="font-heading text-xl text-foreground mb-2">WhatsApp Us</p>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Most Indian travellers prefer WhatsApp. Message us directly for the fastest response.
                </p>
                <a
                  href="https://wa.me/918171158569?text=Hi%20MyQuickTrippers%2C%20I%27d%20like%20to%20plan%20a%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#25D366] text-white font-body text-sm uppercase tracking-[0.15em] hover:bg-[#20BA5A] transition-colors duration-300"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {submitted ? (
                <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border border-primary/40 flex items-center justify-center mb-6 mx-auto">
                    <Send size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading text-3xl text-foreground mb-3">Message Sent!</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 4 hours with a custom itinerary.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-8">Send Us a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Full Name *</label>
                      <input required type="text" placeholder="Rahul Sharma" className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Phone / WhatsApp *</label>
                      <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Email *</label>
                    <input required type="email" placeholder="rahul@example.com" className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Destination of Interest</label>
                    <select className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select a destination</option>
                      <option>Kedarnath</option>
                      <option>Ladakh</option>
                      <option>Valley of Flowers</option>
                      <option>Varanasi</option>
                      <option>Char Dham Yatra</option>
                      <option>Multiple Destinations</option>
                      <option>Not decided yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Travel Dates & Group Size</label>
                    <input type="text" placeholder="e.g. June 2026, 4 people" className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground block mb-2">Message</label>
                    <textarea rows={4} placeholder="Tell us about your dream trip..." className="w-full px-4 py-3 bg-secondary border border-border text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
                    <Send size={15} />
                    Send Enquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
