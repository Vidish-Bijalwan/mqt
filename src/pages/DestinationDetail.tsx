import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EnquirySection from "@/components/EnquirySection";
import { GalleryComponent } from "@/components/ui/Explore/GalleryComponent";
import { destinationsData } from "@/data/destinations";
import { getStateBySlug } from "@/data/india-states";
import { Helmet } from "react-helmet-async";
import { MapPin, Calendar, CreditCard, Tag } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";

const DestinationDetail = () => {
  const { stateSlug, slug } = useParams<{ stateSlug: string; slug: string }>();

  const destination = useMemo(() => {
    return destinationsData.find((d) => d.slug === slug && d.stateSlug === stateSlug);
  }, [slug, stateSlug]);

  const stateData = useMemo(() => {
    return stateSlug ? getStateBySlug(stateSlug) : undefined;
  }, [stateSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!destination || !stateData) {
    return <Navigate to="/destinations" replace />;
  }

  const quickFacts = [
    { label: "State", value: stateData.name },
    { label: "Best Season", value: destination.bestTimeToVisit },
    { label: "Budget", value: `₹${destination.estimatedBudget?.budget_per_day_inr || 2000}/day` },
  ];

  const galleryImages = (destination.galleryImages || []).map(img => ({
    src: img.url,
    alt: img.alt || `${destination.name} scenery`
  }));

  return (
    <PageLayout>
      <Helmet>
        <title>{destination.name} Tourism & Highlights | MyQuickTrippers</title>
        <meta name="description" content={destination.shortDescription} />
      </Helmet>

      <PageHero
        title={destination.name}
        subtitle={destination.shortDescription}
        backgroundImage={destination.heroImage?.url || destination.image}
        breadcrumb={[
          { label: "Destinations", href: "/destinations" },
          { label: stateData.name, href: `/destinations/${stateData.slug}` },
          { label: destination.name }
        ]}
        quickFacts={quickFacts}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Overview
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                    {destination.detailedDescription || destination.shortDescription}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(destination.travelTips || []).map((h, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-surface border border-border/50 rounded-xl hover:bg-primary/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Tag className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {galleryImages.length > 0 && (
                <div>
                   <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-primary rounded-full" />
                    Capturing {destination.name}
                  </h2>
                  <GalleryComponent images={destination.galleryImages || []} destinationName={destination.name} />
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              <div className="bg-surface border border-border/50 rounded-3xl p-8 sticky top-24 shadow-sm">
                <h3 className="font-display text-2xl font-bold mb-6">Quick Details</h3>
                
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location</p>
                      <p className="font-semibold text-foreground">{stateData.name}, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Best Time to Visit</p>
                      <p className="font-semibold text-foreground">{destination.bestTimeToVisit}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CreditCard className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Trip Budget</p>
                      <p className="font-semibold text-foreground">₹{destination.estimatedBudget?.budget_per_day_inr || 2000}+ a day</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Tag className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Trip Vibe</p>
                      <p className="font-semibold text-foreground">{(destination.popularActivities || []).slice(0,3).map(a => a.name).join(" • ")}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-border/50">
                  <button 
                    onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Check Availability
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium italic">
                    * Guaranteed best price for custom group tours
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <EnquirySection />

      <InquiryBanner
        title={`Custom tour to ${destination.name}?`}
        subtitle="Book now and get exclusive airport transfers and local guide support included."
      />
    </PageLayout>
  );
};

export default DestinationDetail;
