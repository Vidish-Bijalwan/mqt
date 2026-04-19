import { useEffect, useMemo, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EnquirySection from "@/components/EnquirySection";
import { getStateBySlug } from "@/data/india-states";
import { destinationsData } from "@/data/destinations";
import { DestinationCard } from "@/components/ui/Cards/DestinationCard";
import { DestinationFilterSystem } from "@/components/ui/Explore/DestinationFilterSystem";
import { Helmet } from "react-helmet-async";
import { StateDestinationMap } from "@/components/ui/Map/StateDestinationMap";
import { StateGallery } from "@/components/ui/StateGallery";
import { getStateImage } from "@/lib/imageMap";
import { Category, Season, BudgetTier } from "@/types/models";

const StateListing = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  
  const [filters, setFilters] = useState({
    search: "",
    category: "All" as "All" | Category,
    season: "All" as "All" | Season,
    budget: "All" as "All" | BudgetTier,
  });

  const stateData = useMemo(() => {
    return stateSlug ? getStateBySlug(stateSlug) : undefined;
  }, [stateSlug]);

  const filteredDestinations = useMemo(() => {
    if (!stateData) return [];
    
    return destinationsData.filter((dest) => {
      // Must belong to this state
      if (dest.stateSlug !== stateData.slug) return false;
      
      // Search match
      const searchMatch = dest.name.toLowerCase().includes(filters.search.toLowerCase());
      if (!searchMatch) return false;
      
      // Category match
      if (filters.category !== "All" && !dest.categories.includes(filters.category)) return false;
      
      // Season match
      if (filters.season !== "All" && !dest.bestSeasons.includes(filters.season)) return false;
      
      // Budget match
      if (filters.budget !== "All" && dest.budget !== filters.budget) return false;
      
      return true;
    });
  }, [stateData, filters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stateSlug]);

  if (!stateData) {
    return <Navigate to="/destinations" replace />;
  }

  const { src: heroImg } = getStateImage(stateData.slug, 'hero', stateData.image);

  return (
    <PageLayout>
      <Helmet>
        <title>{stateData.seo.title}</title>
        <meta name="description" content={stateData.seo.description} />
        <meta name="keywords" content={stateData.seo.keywords.join(", ")} />
      </Helmet>

      <PageHero
        title={stateData.name}
        subtitle={stateData.shortDescription}
        backgroundImage={heroImg}
        breadcrumb={[
          { label: "Destinations", href: "/destinations" },
          { label: stateData.name }
        ]}
        quickFacts={[
          { label: "Capital", value: stateData.capital },
          { label: "Best Season", value: stateData.bestTimeToVisit.primary },
          { label: "Famous For", value: stateData.themes.slice(0,2).join(", ") },
        ]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="font-display text-3xl font-bold mb-6 italic text-primary">Discover {stateData.name}</h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              {stateData.introOverview}
            </p>
          </div>

          <StateDestinationMap 
            stateId={stateData.id} 
            destinations={filteredDestinations} 
            stateModel={stateData} 
          />

          <DestinationFilterSystem
            filters={filters}
            setFilters={setFilters}
            totalResults={filteredDestinations.length}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-24 bg-surface/50 rounded-3xl border border-dashed border-border mt-8">
              <p className="text-xl font-display font-medium text-foreground">No destinations match your filters</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search criteria within {stateData.name}.</p>
              <button 
                onClick={() => setFilters({ search: "", category: "All", season: "All", budget: "All" })}
                className="mt-6 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── State Photo Gallery ── */}
      <StateGallery
        stateName={stateData.name}
        images={stateData.galleryImages || []}
        stateColor={stateData.colorPrimary}
      />

      <EnquirySection />

      <InquiryBanner
        title={`Planning a trip to ${stateData.name}?`}
        subtitle="Our travel experts will help you create a personalized itinerary with the best hotels and transfers."
        ctaText="Get Custom Quote"
      />
    </PageLayout>
  );
};

export default StateListing;
