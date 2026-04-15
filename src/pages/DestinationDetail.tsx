import { useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { getStateImage, getDestinationImage, getCityImage } from "@/lib/imageMap";
import EnquirySection from "@/components/EnquirySection";
import FAQAccordion from "@/components/FAQAccordion";
import InquiryBanner from "@/components/InquiryBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GalleryGrid from "@/components/GalleryGrid";
import RelatedCards from "@/components/RelatedCards";
import { destinationsData } from "@/data/destinations";
import { getTopPackagesForDestination } from "@/lib/recommendations";
import { tourPackages } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";
import { setLastDestination } from "@/lib/personalization";
import { MapPin, Thermometer, CloudRain, CalendarDays } from "lucide-react";

import { getStateBySlug } from "@/data/india-states";
import { SEO } from "@/components/SEO";

const DestinationDetail = () => {
  const { stateSlug, slug } = useParams<{ stateSlug: string, slug: string }>();
  const { track } = useAnalytics();

  const destination = useMemo(() => destinationsData.find((d) => d.slug === slug), [slug]);
  const stateData = useMemo(() => stateSlug ? getStateBySlug(stateSlug) : undefined, [stateSlug]);

  useEffect(() => {
    if (destination && stateData) {
      document.title = `${destination.name} Tour Packages | MyQuickTrippers`;
      track('destination_view', { 
        destination: destination.name,
        state: stateData.name
      });
      setLastDestination(destination.slug);
      window.scrollTo(0, 0);
    }
  }, [destination, stateData, track]);

  if (!destination || !stateData) {
    return <Navigate to="/destinations" replace />;
  }

  const relatedPackages = getTopPackagesForDestination(destination.slug, tourPackages, 6);

  const seoTitle = `${destination.name} Tour Packages - Travel Guide & Itineraries`;
  const seoDesc = `Explore ${destination.name} in ${stateData.name} with MyQuickTrippers. Discover top attractions, best time to visit, and customizable tour packages.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.name,
    "description": destination.overview?.[0] || seoDesc,
    "touristType": [
      "Sightseeing",
      "Nature",
      "Culture"
    ]
  };

  // Build gallery using real seeded images with variant cascade
  const heroResolved = getDestinationImage(destination.slug, 'hero');
  const cardResolved = getDestinationImage(destination.slug, 'card');
  const gallery = [
    { src: heroResolved.src,  fallback: heroResolved.fallbackSrc,  alt: `${destination.name} main view` },
    { src: cardResolved.src,  fallback: cardResolved.fallbackSrc,  alt: `${destination.name} landscape` },
    { src: heroResolved.src,  fallback: heroResolved.fallbackSrc,  alt: `${destination.name} highlights` },
    { src: cardResolved.src,  fallback: cardResolved.fallbackSrc,  alt: `Explore ${destination.name}` },
    { src: heroResolved.src,  fallback: heroResolved.fallbackSrc,  alt: `${destination.name} culture` },
  ];

  const quickFacts = [
    { label: "Altitude", value: destination.altitude || "N/A" },
    { label: "Best Season", value: destination.bestSeason },
  ];

  return (
    <PageLayout>
      <SEO 
        title={seoTitle}
        description={seoDesc}
        canonical={`/destinations/${stateData.slug}/${destination.slug}`}
        schema={schema}
      />
      <PageHero 
        title={destination.name}
        subtitle={`Discover the beauty of ${destination.name}, ${stateData.name}`}
        backgroundImage={getStateImage(destination.slug, 'hero', destination.image)}
        badge={destination.tagline}
        quickFacts={quickFacts}
        breadcrumb={[
          { label: "Destinations", href: "/destinations" },
          ...(stateData ? [{ label: stateData.name, href: `/destinations/${stateData.slug}` }] : []),
          { label: destination.name }
        ]}
      />

      {/* About & Weather Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="section-heading text-left mb-4">About {destination.name}</h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                {destination.overview[0]} Explore our curated packages to experience the best of what {destination.name} has to offer.
              </p>
            </div>
            
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="font-display font-semibold text-xl mb-4">Travel Information</h3>
              <div className="space-y-4">
                {destination.bestTimeToVisit.slice(0, 3).map((season, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-body font-medium text-sm">{season.month}</p>
                      <p className="text-xs text-muted-foreground">{season.weather} • {season.crowd} Crowd</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      {relatedPackages.length > 0 && (
        <RelatedCards
          type="package"
          items={relatedPackages}
          title={`${destination.name} Tour Packages`}
        />
      )}

      {/* Gallery Section */}
      <GalleryGrid 
        images={gallery} 
        title={`Capturing ${destination.name}`} 
      />

      {/* FAQs */}
      {destination.faqs && destination.faqs.length > 0 && (
        <FAQAccordion 
          faqs={destination.faqs} 
          title={`FAQs about ${destination.name}`} 
        />
      )}

      <EnquirySection />

      <InquiryBanner 
        title={`Ready to explore ${destination.name}?`}
        waMessage={`Hi! I'm interested in booking a trip to ${destination.name}.`}
      />

      <StickyMobileCTA 
        label="Enquire Now" 
        whatsappText={`Hi! I want to plan a trip to ${destination.name}.`}
        onEnquireClick={() => {
          document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </PageLayout>
  );
};

export default DestinationDetail;
