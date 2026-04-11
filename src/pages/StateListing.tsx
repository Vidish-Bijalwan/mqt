import { useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import EnquirySection from "@/components/EnquirySection";
import InquiryBanner from "@/components/InquiryBanner";
import RelatedCards from "@/components/RelatedCards";
import { getStateBySlug } from "@/data/india-states";
import { destinationsData } from "@/data/destinations";
import { useAnalytics } from "@/hooks/useAnalytics";

const StateListing = () => {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const { track } = useAnalytics();

  const stateData = useMemo(() => {
    return stateSlug ? getStateBySlug(stateSlug) : undefined;
  }, [stateSlug]);

  const stateDestinations = useMemo(() => {
    if (!stateData) return [];
    return destinationsData.filter((d) => d.stateSlug === stateData.slug);
  }, [stateData]);

  useEffect(() => {
    if (stateData) {
      document.title = `Explore ${stateData.name} | MyQuickTrippers`;
      window.scrollTo(0, 0);
      track("page_view", { type: "state_listing", slug: stateData.slug });
    }
  }, [stateData, track]);

  if (!stateData) {
    return <Navigate to="/404" replace />;
  }

  // If there are no configured destinations yet, that's fine, we will show an empty message
  const hasDestinations = stateDestinations.length > 0;

  return (
    <PageLayout>
      <PageHero
        title={`Explore ${stateData.name}`}
        subtitle={stateData.introOverview}
        backgroundImage={stateData.image}
        breadcrumb={[
          { label: "Destinations", href: "/destinations" },
          { label: stateData.name }
        ]}
      />

      <section className="section-padding bg-background border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-semibold mb-6">About {stateData.name}</h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed">
            {stateData.shortDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-surface px-6 py-4 rounded-xl border border-border">
              <span className="block text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Best Season</span>
              <span className="font-body font-bold text-foreground">{stateData.quickFacts.bestSeason}</span>
            </div>
            <div className="bg-surface px-6 py-4 rounded-xl border border-border">
              <span className="block text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Travel Themes</span>
              <span className="font-body font-bold text-foreground">{stateData.quickFacts.travelThemes.join(", ")}</span>
            </div>
            <div className="bg-surface px-6 py-4 rounded-xl border border-border">
              <span className="block text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Capital</span>
              <span className="font-body font-bold text-foreground">{stateData.quickFacts.capital}</span>
            </div>
          </div>
        </div>
      </section>

      {hasDestinations ? (
        <RelatedCards
          type="destination"
          items={stateDestinations}
          title={`Top Destinations in ${stateData.name}`}
        />
      ) : (
        <section className="section-padding bg-background text-center">
          <h3 className="text-2xl font-display font-semibold mb-3">More Content Coming Soon</h3>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            We are working on adding beautifully crafted travel guides for {stateData.name}. 
            In the meantime, request a custom itinerary directly from our experts!
          </p>
        </section>
      )}

      <EnquirySection />

      <InquiryBanner
        title={`Planning a trip to ${stateData.name}?`}
        subtitle="Share your requirements and we'll create the perfect custom itinerary for you."
        ctaText="Request Custom Itinerary"
        waMessage={`Hi! I want to plan a trip to ${stateData.name}. Please help me with an itinerary.`}
      />
    </PageLayout>
  );
};

export default StateListing;
