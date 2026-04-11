import { useState } from "react";
import PackageCard from "./PackageCard";
import { tourPackages } from "@/data/packages";

const tabs = ["All", "Honeymoon", "Family", "Adventure", "Pilgrimage", "Solo", "Luxury"];

const PackagesSection = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeTab === "All"
    ? tourPackages
    : tourPackages.filter((pkg) =>
        pkg.categories.includes(activeTab.toLowerCase())
      );

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">Popular Tour Packages</h2>
          <p className="section-subheading mx-auto">
            Handpicked packages for every type of traveller — from sacred pilgrimages to thrilling adventures
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setShowAll(false); }}
              className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all ${
                activeTab === tab
                  ? "gradient-primary text-primary-foreground shadow-card"
                  : "bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {!showAll && filtered.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-body font-medium hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Load More Packages
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;
