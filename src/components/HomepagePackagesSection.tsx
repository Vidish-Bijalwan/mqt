import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";
import type { Variants } from "framer-motion";
import PackageCard from "./PackageCard";
import { packageMenuData } from "@/data/packageMenuData";
import { getGeneralWhatsAppUrl } from "@/lib/contact";
import { useState } from "react";
import { CinematicSection } from "./ui/CinematicSection";

const TOP_4_PACKAGES = (() => {
  const allGroups = packageMenuData;
  const picks: { pkg: any; cat: any }[] = [];

  const pilgrimage = allGroups.flatMap((g) => g.categories).find((c) => c.slug === "pilgrimage-tours");
  if (pilgrimage?.featuredPackages[0]) picks.push({ pkg: pilgrimage.featuredPackages[0], cat: pilgrimage });

  const honeymoon = allGroups.flatMap((g) => g.categories).find((c) => c.slug === "honeymoon-journeys");
  if (honeymoon?.featuredPackages[1]) picks.push({ pkg: honeymoon.featuredPackages[1], cat: honeymoon });

  const adventure = allGroups.flatMap((g) => g.categories).find((c) => c.slug === "adventure-tours");
  if (adventure?.featuredPackages[0]) picks.push({ pkg: adventure.featuredPackages[0], cat: adventure });

  const family = allGroups.flatMap((g) => g.categories).find((c) => c.slug === "family-holidays");
  if (family?.featuredPackages[0]) picks.push({ pkg: family.featuredPackages[0], cat: family });

  return picks;
})();

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

const CATEGORIES = [
  { id: "all", label: "Popular" },
  { id: "honeymoon-journeys", label: "Honeymoon" },
  { id: "family-holidays", label: "Family" },
  { id: "adventure-tours", label: "Adventure" },
  { id: "pilgrimage-tours", label: "Pilgrimage" },
];

const HomepagePackagesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const displayPackages =
    activeCategory === "all"
      ? TOP_4_PACKAGES
      : (() => {
          const catGroup = packageMenuData.flatMap((g) => g.categories).find((c) => c.slug === activeCategory);
          if (!catGroup) return [];
          return catGroup.featuredPackages.slice(0, 4).map((pkg) => ({ pkg, cat: catGroup }));
        })();

  return (
    <CinematicSection variant="adventure" className="section-y">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between section-header mb-8 md:mb-12">
        <div className="section-intro">
          <div className="flex items-center gap-2 mb-2">
             <Sparkles className="w-4 h-4 text-emerald-600" />
             <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">Handpicked for you</span>
          </div>
          <h2 className="section-heading text-4xl md:text-5xl">Most Booked Packages</h2>
          <p className="section-subheading mt-2">Expertly crafted itineraries loved by our travellers.</p>
        </div>
        
        <div className="flex flex-col items-start sm:items-end gap-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 max-w-[calc(100vw-2rem)] sm:max-w-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border shadow-sm ${
                  activeCategory === cat.id
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <Link
            to="/packages"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline underline-offset-4"
          >
            View All 50+ Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:mx-0 md:px-0 md:gap-6 md:pb-0 items-stretch"
      >
        {displayPackages.map(({ pkg, cat }) => (
          <motion.div
            key={pkg.slug}
            variants={cardVariants}
            className="snap-center shrink-0 w-[min(88vw,340px)] md:w-auto md:max-w-none flex h-full"
          >
            <PackageCard pkg={pkg} categoryLabel={cat.name} categorySlug={cat.slug} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 sm:hidden flex justify-center">
         <Link
            to="/packages"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-emerald-700 border border-emerald-200 px-6 py-3 rounded-full shadow-sm"
          >
            View All Packages <ArrowRight className="w-4 h-4" />
          </Link>
      </div>

      <div className="mt-12 md:mt-16 bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto backdrop-blur-sm">
        <div className="text-center sm:text-left">
           <h4 className="font-display font-bold text-slate-900 text-lg md:text-xl">Can&apos;t find what you need?</h4>
           <p className="text-sm text-slate-600 mt-1">Chat with our experts and we&apos;ll build a custom trip just for you.</p>
        </div>
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:bg-[#20ba59] transition-all"
        >
          WhatsApp Us Now
        </a>
      </div>
    </CinematicSection>
  );
};

export default HomepagePackagesSection;
