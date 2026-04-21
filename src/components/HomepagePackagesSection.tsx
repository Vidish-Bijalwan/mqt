import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion"; import type { Variants } from "framer-motion";
import PackageCard from "./PackageCard";
import { packageMenuData } from "@/data/packageMenuData";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

// Pull the 4 most-booked packages — one from each of the top categories
// Miller's Law: 4 cards only. Hick's Law: no category filter on homepage.
const TOP_4_PACKAGES = (() => {
  const allGroups = packageMenuData;
  const picks: { pkg: any; cat: any }[] = [];

  // Char Dham (pilgrimage) — highest season demand
  const pilgrimage = allGroups
    .flatMap((g) => g.categories)
    .find((c) => c.slug === "pilgrimage-tours");
  if (pilgrimage?.featuredPackages[0]) {
    picks.push({ pkg: pilgrimage.featuredPackages[0], cat: pilgrimage });
  }

  // Kashmir (honeymoon / family) — most enquired
  const honeymoon = allGroups
    .flatMap((g) => g.categories)
    .find((c) => c.slug === "honeymoon-journeys");
  if (honeymoon?.featuredPackages[1]) {
    picks.push({ pkg: honeymoon.featuredPackages[1], cat: honeymoon });
  }

  // Ladakh (adventure) — high-intent alpha demo
  const adventure = allGroups
    .flatMap((g) => g.categories)
    .find((c) => c.slug === "adventure-tours");
  if (adventure?.featuredPackages[0]) {
    picks.push({ pkg: adventure.featuredPackages[0], cat: adventure });
  }

  // Rajasthan (heritage/family) — year-round
  const family = allGroups
    .flatMap((g) => g.categories)
    .find((c) => c.slug === "family-holidays");
  if (family?.featuredPackages[0]) {
    picks.push({ pkg: family.featuredPackages[0], cat: family });
  }

  return picks;
})();

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  // Use pre-typed tuple from motion.ts — Framer Motion requires [n,n,n,n] not number[]
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

const HomepagePackagesSection = () => {
  return (
    <section className="section-y bg-gray-50 reveal-section">
      <div className="container-page">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="section-eyebrow">HANDPICKED FOR YOU</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Most Booked Packages
            </h2>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4 shrink-0"
          >
            View All 50+ Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 cards — Miller's Law */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 gap-4 md:grid md:grid-cols-2 xl:grid-cols-4 md:mx-0 md:px-0 md:pb-0 items-stretch"
        >
          {TOP_4_PACKAGES.map(({ pkg, cat }) => (
            <motion.div 
              key={pkg.slug} 
              variants={cardVariants}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] md:w-auto md:max-w-none flex"
            >
              <PackageCard
                pkg={pkg}
                categoryLabel={cat.name}
                categorySlug={cat.slug}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Goal-Gradient Effect: "can't find it? one message away" */}
        <div className="text-center mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Can't find what you need?{" "}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#25D366] hover:underline underline-offset-4"
            >
              WhatsApp us
            </a>{" "}
            — we'll build a custom trip just for you.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HomepagePackagesSection;
