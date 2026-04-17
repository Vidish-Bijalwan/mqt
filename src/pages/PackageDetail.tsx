import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import EnquirySection from "@/components/EnquirySection";
import InquiryBanner from "@/components/InquiryBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TrendingBadge from "@/components/TrendingBadge";
import GalleryGrid from "@/components/GalleryGrid";
import RecentlyViewed from "@/components/RecentlyViewed";
import YouMayAlsoLike from "@/components/YouMayAlsoLike";
import PackageRecommendations from "@/components/PackageRecommendations";
import PackageReviews from "@/components/PackageReviews";
import { tourPackages } from "@/data/packages";
import { getSimilarPackages } from "@/lib/recommendations";
import { addRecentlyViewed } from "@/lib/personalization";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Check, Star, Download, Map, Calendar, Sun, Zap, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JourneyVisualizer, TransportType } from "@/components/JourneyVisualizer";
import { AlertBadge } from "@/components/AlertBadge";
import { LiveCountdownTimer } from "@/components/LiveCountdownTimer";
import { getPackageWhatsAppUrl } from "@/lib/contact";

import { SEO } from "@/components/SEO";

const PackageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { track } = useAnalytics();
  const { openPlanner } = useTripPlanner();

  const pkg = useMemo(() => tourPackages.find((p) => p.slug === slug), [slug]);
  const similarPackages = useMemo(() => pkg ? getSimilarPackages(pkg, tourPackages, 3) : [], [pkg]);

  useEffect(() => {
    if (pkg) {
      window.scrollTo(0, 0);
      addRecentlyViewed(pkg.slug);
      track("page_view", { type: "package", slug: pkg.slug });
    }
  }, [pkg, track]);

  if (!pkg) {
    return <Navigate to="/404" replace />;
  }

  const gallery = [
    { src: pkg.image, alt: pkg.title },
    { src: pkg.image, alt: `${pkg.destination} sightseeing` },
    { src: pkg.image, alt: `${pkg.destination} experiences` },
  ];

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TourPackage",
    "name": pkg.title,
    "description": pkg.overview || "Experience an unforgettable journey.",
    "offers": {
      "@type": "Offer",
      "price": pkg.internalBasePrice || 10000,
      "priceCurrency": "INR"
    },
    "url": `https://www.myquicktrippers.com/packages/${pkg.categories[0] || 'all'}/${pkg.slug}`,
    "image": pkg.image,
    "provider": {
      "@type": "Organization",
      "name": "MyQuickTrippers"
    },
    "duration": `P${pkg.duration?.days || 1}D`,
    "touristType": pkg.categories
  });

  const visualizerStops = pkg.itineraryHighlights?.map((day, i) => ({
    id: `day-${i}`,
    day: i + 1,
    location: pkg.destination,
    title: day,
    description: "Enjoy this part of the journey carefully curated by MQT.",
    imageUrl: gallery[i % gallery.length]?.src || pkg.image,
    transportToNext: (i % 2 === 0 ? "car" : "trek") as TransportType
  })) || [];

  return (
    <PageLayout>
      <SEO 
        title={pkg.seoTitle || `${pkg.title} 2026 | MyQuickTrippers`}
        description={pkg.seoDescription || `Book ${pkg.title} packages. Includes ${pkg.highlights?.slice(0, 2).join(', ')}. Get free quote today.`}
        canonical={`/packages/${pkg.categories[0] || 'all'}/${pkg.slug}`}
        image={pkg.image}
        schema={schema}
      />
      <PageHero
        title={pkg.title}
        backgroundImage={pkg.image}
        badge={pkg.badge || undefined}
        breadcrumb={[
          { label: "Packages", href: "/packages" },
          { label: pkg.categories[0], href: `/packages?category=${pkg.categories[0]}` },
          { label: pkg.title }
        ]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Overview */}
              <div>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  {pkg.alertBadgeType && <AlertBadge type={pkg.alertBadgeType as any} seatsLeft={pkg.seatsLeft} />}
                  {pkg.trending && !pkg.isAlertPackage && <TrendingBadge type="trending" />}
                  {pkg.seatsLeft && pkg.seatsLeft <= 5 && !pkg.isAlertPackage && <TrendingBadge type="limited" value={pkg.seatsLeft} />}
                  {pkg.discountExpiry && !pkg.isAlertPackage && <TrendingBadge type="expiry" value={pkg.discountExpiry} />}
                </div>

                {pkg.requiresIlp && (
                  <div className="bg-[#111827] border-l-4 border-[#F59E0B] p-4 rounded-r-xl mb-8 shadow-sm">
                    <p className="text-[#F59E0B] font-bold uppercase text-[11px] tracking-widest mb-1.5 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" /> Inner Line Permit Required
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      IMPORTANT: {pkg.destination} is a restricted area. Only Indian nationals holding valid government-issued photo ID are permitted entry. Entry is strictly 9 AM to 5 PM. MQT arranges your ILP as part of this package.
                    </p>
                  </div>
                )}

                {pkg.seasonCloseDate && pkg.isAlertPackage && (
                  <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center sm:flex-row justify-between gap-6">
                    <div>
                      <h4 className="font-bold text-slate-900">Booking Season Ending Soon</h4>
                      <p className="text-sm text-slate-500 mt-1">Due to weather operations, this package closes shortly.</p>
                    </div>
                    <LiveCountdownTimer targetDate={pkg.seasonCloseDate} />
                  </div>
                )}

                <h2 className="text-3xl font-display font-semibold mb-4">Tour Overview</h2>
                <div className="flex items-center gap-6 text-sm text-muted-foreground font-body mb-6 pb-6 border-b border-border">
                  <span className="flex items-center gap-2"><Map className="w-4 h-4 text-primary" /> {pkg.destination}, {pkg.state}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {pkg.duration.nights}N / {pkg.duration.days}D</span>
                  <span className="flex items-center gap-2"><Sun className="w-4 h-4 text-primary" /> {pkg.season}</span>
                  <span className="flex items-center gap-1 font-medium text-foreground ml-auto">
                    <Star className="w-4 h-4 fill-accent text-accent" /> {pkg.rating} ({pkg.reviewsCount} reviews)
                  </span>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {pkg.overview || "Experience an unforgettable journey with our carefully crafted itinerary..."}
                </p>
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface rounded-xl p-6 border border-border">
                  <h3 className="font-display text-xl font-semibold mb-4">Highlights</h3>
                  <ul className="space-y-3">
                    {pkg.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface rounded-xl p-6 border border-border">
                  <h3 className="font-display text-xl font-semibold mb-4">Inclusions</h3>
                  <ul className="space-y-3">
                    {pkg.inclusions ? pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-foreground leading-relaxed">{item}</span>
                      </li>
                    )) : pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm font-body text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Journey Visualizer */}
              {visualizerStops.length > 0 && (
                <div className="pt-4">
                  <JourneyVisualizer stops={visualizerStops} />
                </div>
              )}
              
              {/* Itinerary */}
              {pkg.itineraryHighlights && (
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-6">Brief Itinerary</h3>
                  <div className="space-y-4">
                    {pkg.itineraryHighlights.map((day, i) => (
                      <div key={i} className="flex gap-4 p-4 border border-border rounded-lg bg-background">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                          D{i+1}
                        </div>
                        <div className="flex items-center">
                          <p className="font-body font-medium">{day}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pricing Card (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-background border border-border rounded-xl shadow-elevated overflow-hidden">
                <div className="p-6">
                  {pkg.isAlertPackage ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Limited Seats</span>
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded">HIGH DEMAND</span>
                      </div>
                      
                      <h3 className="font-display text-xl font-bold mb-3 leading-tight">{pkg.title}</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {pkg.dayTrip ? 'Prices for guided day excursion including permits.' : 'Select your preferred accommodation tier for the full package.'}
                      </p>

                      <div className="space-y-4 mt-4">
                        {/* Removed Pricing Blocks per requirements. Showing value props instead, tailored for Exclusive packages */}
                        <div className="border border-slate-200 rounded-xl p-4">
                            <h4 className="font-bold text-slate-800 text-sm">Bespoke Guidance</h4>
                            <p className="text-[12px] text-slate-500 mt-0.5">All our restricted zone packages include specialized transport, permits, and expert guides.</p>
                        </div>
                        <div className="border border-[#F59E0B] bg-amber-50/50 rounded-xl p-4 shadow-sm relative">
                            <div className="absolute -top-2.5 right-3 bg-[#F59E0B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Dynamic Pricing</div>
                            <h4 className="font-bold text-slate-800 text-sm">Custom Quote Required</h4>
                            <p className="text-[12px] text-slate-500 mt-0.5">Due to the exclusive nature of this package, pricing is provided upon consultation via WhatsApp to match your exact group size and travel dates.</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button 
                          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 h-auto text-base font-semibold transition-transform hover:scale-[1.02] shadow-lg shadow-green-600/20"
                          onClick={() => window.open(getPackageWhatsAppUrl(pkg.title), "_blank")}
                        >
                          Check Availability on WhatsApp
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trip Customization</span>
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">AVAILABLE</span>
                      </div>
                  
                  <h3 className="font-display text-xl font-bold mb-3 leading-tight">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Share your requirements and we will send you a tailored itinerary with a custom quote.
                  </p>

                  <div className="space-y-3 mt-4">
                    {/* Trust strip */}
                    <div className="flex flex-col gap-1.5 mb-4">
                      {[
                        { icon: <Zap className="w-3.5 h-3.5 text-primary" />, text: 'Response within 2 hours' },
                        { icon: <ShieldCheck className="w-3.5 h-3.5 text-green-600" />, text: 'Free consultation' },
                        { icon: <MessageCircle className="w-3.5 h-3.5 text-primary" />, text: 'No payment upfront' },
                      ].map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                          {icon} {text}
                        </div>
                      ))}
                    </div>
                        <Button 
                          className="w-full gradient-primary text-white py-6 h-auto text-base font-semibold transition-transform hover:scale-[1.02] shadow-lg shadow-primary/20"
                          onClick={() => openPlanner(
                            { destination_interest: pkg.destination, trip_style: pkg.categories as any },
                            'package_detail_sidebar'
                          )}
                        >
                          Get Custom Quote
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full py-6 h-auto text-base font-medium border-border hover:bg-[#25D366] hover:text-white transition-colors hover:border-[#25D366]"
                          onClick={() => window.open(getPackageWhatsAppUrl(pkg.title), "_blank")}
                        >
                          WhatsApp Expert
                        </Button>
                      </div>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        Response usually within 2 hours.
                      </p>
                    </>
                  )}
                </div>
                <div className="bg-surface p-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-orange-500">🔥</span> Popular
                  </div>
                  <span className="text-xs text-muted-foreground">Booked {pkg.bookingCount} times</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryGrid images={gallery} title="Tour Gallery" />

      <section className="container mx-auto px-4 py-8">
        <PackageReviews packageSlug={pkg.slug} />
      </section>

      {/* Cross-Sell & Upsell Funnel Elements ML powered */}
      <PackageRecommendations packageId={pkg.id} topN={4} />
      <RecentlyViewed excludeSlug={pkg.slug} />

      <EnquirySection />

      <InquiryBanner 
        title={`Plan your ${pkg.title} today`}
        waMessage={`Hi! I want to book the ${pkg.title} package.`}
      />

      <StickyMobileCTA 
        label={pkg.isAlertPackage ? "Check WhatsApp" : "Get Custom Quote"}
        whatsappText={`Hi! I want details and a quote for the ${pkg.title} package.`}
        isEnquiryOnly={pkg.isAlertPackage ? false : true}
        onEnquireClick={() => {
          if (pkg.isAlertPackage) {
            window.open(getPackageWhatsAppUrl(pkg.title), "_blank");
          } else {
            openPlanner(
              { destination_interest: pkg.destination, trip_style: pkg.categories as any },
              'package_detail_mobile_cta'
            );
          }
        }}
      />
    </PageLayout>
  );
};

export default PackageDetail;
