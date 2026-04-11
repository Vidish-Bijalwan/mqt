import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import destKedarnath from "@/assets/dest-kedarnath.jpg";
import destLadakh from "@/assets/dest-ladakh.jpg";
import destValley from "@/assets/dest-valley-of-flowers.jpg";
import destVaranasi from "@/assets/dest-varanasi.jpg";
import destDubai from "@/assets/dest-dubai.jpg";
import destMaldives from "@/assets/dest-maldives.jpg";
import destPeru from "@/assets/dest-peru.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";
import { Clock, Users, Star, ArrowRight } from "lucide-react";

const packages = [
  {
    name: "Kedarnath Yatra",
    tagline: "Sacred Himalayan Pilgrimage",
    image: destKedarnath,
    duration: "5 Days / 4 Nights",
    groupSize: "2–12 people",
    price: "From ₹18,999",
    rating: 5,
    highlights: ["Helicopter option available", "Luxury tent camp", "Expert priest guide", "All meals included"],
    href: "/destinations/kedarnath",
  },
  {
    name: "Ladakh Adventure",
    tagline: "Land of High Passes",
    image: destLadakh,
    duration: "7 Days / 6 Nights",
    groupSize: "2–10 people",
    price: "From ₹22,999",
    rating: 5,
    highlights: ["Pangong Lake sunrise", "Nubra Valley dunes", "Ancient monasteries", "4x4 transfers"],
    href: "/destinations/ladakh",
  },
  {
    name: "Valley of Flowers Trek",
    tagline: "UNESCO World Heritage",
    image: destValley,
    duration: "6 Days / 5 Nights",
    groupSize: "2–8 people",
    price: "From ₹14,999",
    rating: 5,
    highlights: ["Expert botanist guide", "Premium camping", "Hemkund Sahib visit", "flower season timing"],
    href: "/destinations/valley-of-flowers",
  },
  {
    name: "Varanasi Spiritual Tour",
    tagline: "India's Eternal City",
    image: destVaranasi,
    duration: "3 Days / 2 Nights",
    groupSize: "2–15 people",
    price: "From ₹12,499",
    rating: 5,
    highlights: ["Private Ganga Aarti", "Old city walk", "Sunrise boat ride", "Temple circuit"],
    href: "/destinations/varanasi",
  },
  {
    name: "Dubai Luxury Escape",
    tagline: "Golden City of the Desert",
    image: destDubai,
    duration: "5 Days / 4 Nights",
    groupSize: "2–10 people",
    price: "From ₹55,999",
    rating: 5,
    highlights: ["5-star hotel", "Desert safari", "Burj Khalifa visit", "Visa assistance"],
    href: "/destinations/kedarnath",
  },
  {
    name: "Maldives Retreat",
    tagline: "Overwater Paradise",
    image: destMaldives,
    duration: "5 Days / 4 Nights",
    groupSize: "2–6 people",
    price: "From ₹89,999",
    rating: 5,
    highlights: ["Overwater villa", "Snorkelling tours", "Sunset cruise", "All inclusive option"],
    href: "/destinations/kedarnath",
  },
  {
    name: "Santorini Experience",
    tagline: "Greek Island Paradise",
    image: destSantorini,
    duration: "6 Days / 5 Nights",
    groupSize: "2–8 people",
    price: "From ₹1,10,999",
    rating: 5,
    highlights: ["Oia sunset view", "Wine tasting", "Private caldera tour", "Visa assistance"],
    href: "/destinations/kedarnath",
  },
  {
    name: "Peru Machu Picchu",
    tagline: "Lost City of the Incas",
    image: destPeru,
    duration: "9 Days / 8 Nights",
    groupSize: "2–10 people",
    price: "From ₹1,49,999",
    rating: 5,
    highlights: ["Machu Picchu permit", "Inca Trail option", "English-speaking guide", "Lima + Cusco"],
    href: "/destinations/kedarnath",
  },
];

const PackageCard = ({ pkg, index }: { pkg: typeof packages[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
      className="glass-card overflow-hidden hover-lift group cursor-pointer"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={pkg.image}
          alt={`${pkg.name} — ${pkg.tagline}. Luxury India travel package by MyQuickTrippers`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.1em]">
            {pkg.price}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary mb-1">{pkg.tagline}</p>
            <h3 className="font-heading text-2xl text-foreground">{pkg.name}</h3>
          </div>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: pkg.rating }).map((_, i) => (
              <Star key={i} size={12} className="fill-primary text-primary" />
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-4 text-muted-foreground">
          <span className="flex items-center gap-1.5 font-body text-xs">
            <Clock size={13} /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5 font-body text-xs">
            <Users size={13} /> {pkg.groupSize}
          </span>
        </div>

        <ul className="mb-5 space-y-1">
          {pkg.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 font-body text-xs text-muted-foreground">
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <a
          href="/contact"
          className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-primary hover:gap-3 transition-all duration-300"
        >
          Enquire Now <ArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  );
};

const Packages = () => {
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
          Curated Journeys
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-foreground mb-6"
        >
          All <span className="gold-gradient-text italic">Tour Packages</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          From sacred Himalayan pilgrimages to international luxury escapes — every package is personally curated and can be fully customised to your preferences.
        </motion.p>
        <div className="gold-divider mt-8" />
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20 py-16 border border-primary/20 px-8"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-4">Don't See What You Need?</p>
            <h2 className="font-heading text-4xl text-foreground mb-4">We Build Custom Itineraries</h2>
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Tell us your destination, dates, and group size. Our travel experts will craft a bespoke luxury itinerary crafted specifically for you — at no extra charge.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors duration-300"
            >
              Request Custom Package
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
