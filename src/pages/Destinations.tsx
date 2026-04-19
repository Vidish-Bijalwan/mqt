import { useEffect, useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import { indiaStates, getStatesByRegion } from "@/data/india-states";
import { StateCard } from "@/components/ui/Cards/StateCard";
import { Region } from "@/types/models";
import { Helmet } from "react-helmet-async";
import destHero from "@/assets/dest-ladakh.jpg";
import { StateMapContainer } from "@/components/ui/Map/StateMapContainer";
import { IndiaStateMap } from "@/components/ui/Map/IndiaStateMap";

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
    window.scrollTo(0, 0);
  }, []);

  const displayedStates = useMemo(() => getStatesByRegion(activeRegion), [activeRegion]);

  return (
    <PageLayout>
      <Helmet>
        <title>Explore Indian States & Union Territories | MyQuickTrippers</title>
        <meta name="description" content="Discover the beauty of India. Explore all 36 states and union territories, from the Himalayas to the Indian Ocean. Plan your perfect journey with MQT." />
        <meta name="keywords" content="india tourism, indian states, travel destination india, north india tours, south india travel" />
      </Helmet>

      <PageHero
        title="Find Your Perfect Destination"
        subtitle="From the spiritual heights of the Himalayas to the golden beaches of the South, explore India state by state."
        backgroundImage={destHero}
        breadcrumb={[{ label: "Destinations" }]}
      />

      {/* Interactive Map Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <StateMapContainer>
            <IndiaStateMap />
          </StateMapContainer>
        </div>
      </section>

      <section className="section-padding bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight">Explore by Region</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a region to begin your adventure across the diverse landscapes of India.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16 px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-3xl border border-border/50 sticky top-24 z-30 max-w-fit mx-auto shadow-sm">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 uppercase tracking-tighter ${
                  activeRegion === region
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* States Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedStates.map((state) => (
              <StateCard key={state.id} state={state} />
            ))}
          </div>

          {displayedStates.length === 0 && (
            <div className="text-center py-32 bg-surface/30 rounded-3xl border border-dashed border-border mt-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                 </svg>
              </div>
              <p className="text-xl font-display font-medium text-foreground">No states found in this region</p>
              <p className="text-muted-foreground mt-2">Try selecting a different region or search globally.</p>
              <button 
                onClick={() => setActiveRegion("All")}
                className="mt-6 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest"
              >
                Show All States
              </button>
            </div>
          )}
        </div>
      </section>

      <InquiryBanner
        title="Can't decide which state to explore?"
        subtitle="Our travel specialists can help you craft the perfect itinerary based on your interests and budget."
        ctaText="Plan My Trip"
      />
    </PageLayout>
  );
};

export default Destinations;
