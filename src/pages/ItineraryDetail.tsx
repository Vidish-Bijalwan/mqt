import { useEffect, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildBreadcrumbSchema, combineSchemas } from "@/lib/seo";
import { Map, Calendar, Sun, Check, MessageCircle, Zap, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import EnquirySection from "@/components/EnquirySection";
import InquiryBanner from "@/components/InquiryBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { getItineraryBySlug } from "@/data/itineraries";
import { getPackageGallery } from "@/data/packageGalleries";
import { ImmersiveItinerary } from "@/components/ImmersiveItinerary";
import { AudioGuide } from "@/components/AudioGuide";
import { Button } from "@/components/ui/button";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { getPackageWhatsAppUrl } from "@/lib/contact";

const ItineraryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { openPlanner } = useTripPlanner();

  const itinerary = useMemo(() => slug ? getItineraryBySlug(slug) : undefined, [slug]);

  useEffect(() => {
    if (itinerary) {
      window.scrollTo(0, 0);
    }
  }, [itinerary]);

  if (!itinerary) {
    return <Navigate to="/404" replace />;
  }

  // Get gallery for ImmersiveItinerary fallback
  const galleryEntries = getPackageGallery(itinerary.slug, itinerary.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80");
  
  // Build immersive itinerary day objects
  const itineraryDays = itinerary.dayWiseItinerary.map(day => ({
    day: day.day,
    title: day.title,
    description: day.description,
    gallery: galleryEntries,
  }));

  const canonicalPath = `/itineraries/${itinerary.slug}`;
  const schema = combineSchemas(
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: itinerary.packageName,
      description: itinerary.seoDescription,
      url: `https://www.myquicktrippers.com${canonicalPath}`,
      touristType: itinerary.categoryTags?.map((c) => ({
        "@type": "Audience",
        audienceType: c,
      })),
      offers: {
        "@type": "Offer",
        price: itinerary.pricing.startingPrice || 10000,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `https://www.myquicktrippers.com${canonicalPath}`,
      },
      provider: {
        "@type": "TravelAgency",
        name: "MyQuickTrippers",
        url: "https://www.myquicktrippers.com",
      },
      duration: `P${itinerary.days}D`,
    },
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Itineraries", path: "/itineraries" },
      { name: itinerary.packageName, path: canonicalPath },
    ])
  );

  return (
    <PageLayout>
      <SEO
        title={itinerary.seoTitle.replace(/\s*\|.*$/, "")}
        description={itinerary.seoDescription}
        canonical={canonicalPath}
        image={itinerary.image}
        schema={schema}
        rawTitle
      />

      <PageHero
        title={itinerary.packageName}
        backgroundImage={itinerary.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000"}
        breadcrumb={[
          { label: "Itineraries", href: "/itineraries" },
          { label: itinerary.region, href: `/itineraries?region=${encodeURIComponent(itinerary.region)}` },
          { label: itinerary.packageName }
        ]}
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              
              <AudioGuide 
                title={itinerary.packageName} 
                content={itinerary.shortDescription} 
              />

              {/* Overview */}
              <div>
                <h2 className="text-3xl font-display font-semibold mb-4">Tour Overview</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-6 pb-6 border-b border-border">
                  <span className="flex items-center gap-2"><Map className="w-4 h-4 text-primary" /> {itinerary.region}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {itinerary.duration}</span>
                  <span className="flex items-center gap-2"><Sun className="w-4 h-4 text-primary" /> Year Round</span>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed text-lg">
                  {itinerary.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {itinerary.categoryTags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights & Places */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="font-display text-xl font-semibold mb-4">Places Covered</h3>
                  <ul className="space-y-3">
                    {itinerary.placesCovered.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Map className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface rounded-xl p-6 border border-border shadow-sm">
                  <h3 className="font-display text-xl font-semibold mb-4">Quick Facts</h3>
                  <ul className="space-y-4 text-sm text-slate-600">
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Starting Point</span>
                      <span className="font-semibold text-right">{itinerary.startingPoint}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Ending Point</span>
                      <span className="font-semibold text-right">{itinerary.endingPoint}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Duration</span>
                      <span className="font-semibold text-right">{itinerary.duration}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50/50 rounded-xl p-6 border border-green-100 shadow-sm">
                  <h3 className="font-display text-xl font-semibold mb-4 text-green-900">Inclusions</h3>
                  <ul className="space-y-3">
                    {itinerary.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-green-800 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50/50 rounded-xl p-6 border border-red-100 shadow-sm">
                  <h3 className="font-display text-xl font-semibold mb-4 text-red-900">Exclusions</h3>
                  <ul className="space-y-3">
                    {itinerary.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-200 text-red-600 shrink-0 mt-0.5 text-xs font-bold">X</span>
                        <span className="text-sm font-body text-red-800 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Immersive Itinerary */}
              <ImmersiveItinerary days={itineraryDays} />
            </div>

            {/* Right: Pricing Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-background border border-border rounded-xl shadow-elevated overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Custom Quote</span>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-1 leading-tight">{itinerary.pricing.priceLabel}</h3>
                  <p className="text-[11px] text-muted-foreground mb-6 leading-tight">
                    {itinerary.pricing.priceDisclaimer}
                  </p>

                  <div className="space-y-3 mt-4">
                    {/* Trust strip */}
                    <div className="flex flex-col gap-1.5 mb-4">
                      {[
                        { icon: <Zap className="w-3.5 h-3.5 text-amber-500" />, text: 'Response within 2 hours' },
                        { icon: <ShieldCheck className="w-3.5 h-3.5 text-green-600" />, text: 'Free consultation' },
                        { icon: <MessageCircle className="w-3.5 h-3.5 text-amber-500" />, text: 'No payment upfront' },
                      ].map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                          {icon} {text}
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6 h-auto text-base font-semibold transition-transform hover:scale-[1.02] shadow-lg shadow-amber-500/20"
                      onClick={() => openPlanner(
                        { destination_interest: itinerary.packageName, trip_style: itinerary.categoryTags as any },
                        'itinerary_detail_sidebar'
                      )}
                    >
                      Get Custom Quote
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full py-6 h-auto text-base font-medium border-border hover:bg-[#25D366] hover:text-white transition-colors hover:border-[#25D366]"
                      onClick={() => window.open(getPackageWhatsAppUrl(itinerary.packageName), "_blank")}
                    >
                      WhatsApp Expert
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Response usually within 2 hours.
                  </p>
                </div>
                <div className="bg-surface p-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-amber-500">🛡️</span> Verified Itinerary
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquirySection />

      <InquiryBanner 
        title={`Plan your ${itinerary.packageName} today`}
        waMessage={`Hi! I want to customize the ${itinerary.packageName} itinerary.`}
      />

      <StickyMobileCTA 
        label="Get Custom Quote"
        whatsappText={`Hi! I want details and a quote for the ${itinerary.packageName} itinerary.`}
        isEnquiryOnly={true}
        onEnquireClick={() => {
          openPlanner(
            { destination_interest: itinerary.packageName, trip_style: itinerary.categoryTags as any },
            'itinerary_detail_mobile_cta'
          );
        }}
      />
    </PageLayout>
  );
};

export default ItineraryDetail;
