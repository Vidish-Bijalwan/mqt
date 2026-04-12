import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import { indiaStates, getStatesByRegion, Region } from "@/data/india-states";
import { getStateImage } from "@/lib/imageMap";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import destHero from "@/assets/dest-ladakh.jpg";

const REGIONS: ("All" | Region)[] = [
  "All",
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
  "North East India",
  "Islands & Union Territories",
];

const Destinations = () => {
  const [activeRegion, setActiveRegion] = useState<"All" | Region>("All");
  
  useEffect(() => {
    document.title = "Explore India by Region | MQT";
    window.scrollTo(0, 0);
  }, []);

  const displayedStates = getStatesByRegion(activeRegion);

  return (
    <PageLayout>
      <PageHero
        title="Find Your Perfect Destination"
        subtitle="From the spiritual heights of the Himalayas to the golden beaches of the South, explore India state by state."
        backgroundImage={destHero}
        breadcrumb={[{ label: "Destinations" }]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeRegion === region
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedStates.map((state) => (
              <Link
                key={state.id}
                to={`/destinations/${state.slug}`}
                className="group relative bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft block h-[320px]"
              >
                <div className="absolute inset-0">
                  {(() => {
                    const { src, fallbackSrc } = getStateImage(state.slug, 'card', state.image);
                    return (
                      <ImgWithFallback
                        src={src}
                        fallbackSrc={fallbackSrc}
                        alt={state.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">
                    {state.type}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
                    {state.name}
                  </h3>
                  <p className="font-body text-sm text-white/90 line-clamp-2 mb-4 group-hover:text-white transition-colors duration-300">
                    {state.shortDescription}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white text-sm font-semibold flex items-center gap-2">
                      Explore Destinations <span className="text-primary font-bold">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {displayedStates.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No destinations found for this region.</p>
            </div>
          )}
        </div>
      </section>

      <InquiryBanner
        title="Not sure where to go?"
        subtitle="Tell us your preferences and our experts will suggest the perfect destination for your next holiday."
        ctaText="Get Free Suggestions"
      />
    </PageLayout>
  );
};

export default Destinations;
