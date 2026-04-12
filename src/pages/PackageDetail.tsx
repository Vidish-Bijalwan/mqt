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
import { tourPackages } from "@/data/packages";
import { getSimilarPackages } from "@/lib/recommendations";
import { addRecentlyViewed } from "@/lib/personalization";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Check, Star, Download, Map, Calendar, Sun, Zap, ShieldCheck, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const PackageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { track } = useAnalytics();
  const { openPlanner } = useTripPlanner();

  const pkg = useMemo(() => tourPackages.find((p) => p.slug === slug), [slug]);
  const similarPackages = useMemo(() => pkg ? getSimilarPackages(pkg, tourPackages, 3) : [], [pkg]);

  useEffect(() => {
    if (pkg) {
      document.title = `${pkg.title} | MyQuickTrippers`;
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

  return (
    <PageLayout>
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
                  {pkg.trending && <TrendingBadge type="trending" />}
                  {pkg.seatsLeft && pkg.seatsLeft <= 5 && <TrendingBadge type="limited" value={pkg.seatsLeft} />}
                  {pkg.discountExpiry && <TrendingBadge type="expiry" value={pkg.discountExpiry} />}
                </div>

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
                      className="w-full py-6 h-auto text-base font-medium border-border"
                      onClick={() => window.open(`https://wa.me/919876543210?text=${encodeURIComponent(`Hi! I am interested in the ${pkg.title} trip. Please share itinerary options and pricing details.`)}`, "_blank")}
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

      {/* Cross-Sell & Upsell Funnel Elements */}
      <YouMayAlsoLike packages={similarPackages} title="Similar Packages" />
      <RecentlyViewed excludeSlug={pkg.slug} />

      <EnquirySection />

      <InquiryBanner 
        title={`Plan your ${pkg.title} today`}
        waMessage={`Hi! I want to book the ${pkg.title} package.`}
      />

      <StickyMobileCTA 
        label="Get Custom Quote"
        whatsappText={`Hi! I want details and a quote for the ${pkg.title} package.`}
        isEnquiryOnly={true}
        onEnquireClick={() => openPlanner(
          { destination_interest: pkg.destination, trip_style: pkg.categories as any },
          'package_detail_mobile_cta'
        )}
      />
    </PageLayout>
  );
};

export default PackageDetail;
