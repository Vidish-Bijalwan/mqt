import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EnquirySection from "@/components/EnquirySection";
import { GalleryComponent } from "@/components/ui/Explore/GalleryComponent";
import { destinationsData } from "@/data/destinations";
import { getStateBySlug } from "@/data/india-states";
import { SEO } from "@/components/SEO";
import { DestinationSeoSections } from "@/components/DestinationSeoSections";
import { getDestinationGuideContent } from "@/data/destination-seo-content";
import { tourPackages } from "@/data/packages";
import { getEnrichedDestinationContent } from "@/lib/destinationContent";
import {
  buildFaqSchema,
  buildBreadcrumbSchema,
  combineSchemas,
  formatSeoDescription,
} from "@/lib/seo";
import { MapPin, Calendar, CreditCard, Tag, Compass, Route, ExternalLink } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useValidatedImage } from "@/hooks/useValidatedImage";
import { getDestinationImage } from "@/lib/imageMap";
import { getDestinationTourismImage } from "@/data/destinationImagesMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioGuide } from "@/components/AudioGuide";
import type { ImageRecord } from "@/types/models";

const DestinationDetail = () => {
  const { stateSlug, slug } = useParams<{ stateSlug: string; slug: string }>();

  const destination = useMemo(() => {
    return destinationsData.find((d) => d.slug === slug && d.stateSlug === stateSlug);
  }, [slug, stateSlug]);

  const stateData = useMemo(() => {
    return stateSlug ? getStateBySlug(stateSlug) : undefined;
  }, [stateSlug]);

  const content = useMemo(() => {
    if (!destination || !stateData) return null;
    return getEnrichedDestinationContent(destination, stateData.name);
  }, [destination, stateData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { data: dbDestination } = useQuery({
    queryKey: ["destination-override", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data } = await supabase
        .from("destinations")
        .select("hero_image_url, image_url")
        .eq("slug", slug)
        .single();
      return data as { hero_image_url?: string; image_url?: string } | null;
    },
    enabled: !!slug && !!destination,
    staleTime: 60000,
  });

  const rawPrimary = destination?.heroImage?.url || destination?.image || "";
  const finalPrimary =
    (dbDestination && (dbDestination.hero_image_url || dbDestination.image_url)) ||
    rawPrimary;
  const { src: activeHeroImg } = useValidatedImage(
    finalPrimary,
    destination?.slug || slug || "destination"
  );

  const galleryRecords: ImageRecord[] = useMemo(() => {
    if (!destination) return [];
    const resolvedHero =
      activeHeroImg || getDestinationImage(destination.slug, "hero").src;
    const tourism = getDestinationTourismImage(destination.slug);
    const fromDb = (destination.galleryImages || [])
      .filter((img) => img.url && !img.url.includes("/india_tourism/"))
      .map((img, i) => ({
        ...img,
        url: img.url.startsWith("http") || img.url.startsWith("/tourism")
          ? img.url
          : getDestinationImage(destination.slug, "card").src,
        alt: img.alt || `${destination.name} — view ${i + 1}`,
      }));
    if (fromDb.length >= 2) return fromDb.slice(0, 6);
    const pool = [resolvedHero, tourism, getDestinationImage(destination.stateSlug, "hero").src].filter(
      Boolean
    ) as string[];
    const unique = [...new Set(pool)];
    return unique.slice(0, 4).map((url, i) => ({
      url,
      alt: `${destination.name} — ${i === 0 ? "main view" : `gallery ${i + 1}`}`,
      credit: "India Tourism / MQT",
      license: "CC BY-SA",
    }));
  }, [destination, activeHeroImg]);

  if (!destination || !stateData || !content) {
    return <Navigate to="/destinations" replace />;
  }

  const quickFacts = [
    { label: "State", value: stateData.name },
    { label: "Best Season", value: destination.bestTimeToVisit },
    { label: "Type", value: destination.type?.replace(/_/g, " ") || "Destination" },
  ];

  const canonicalPath = `/destinations/${stateData.slug}/${destination.slug}`;
  const guide = getDestinationGuideContent(
    destination.name,
    stateData.name,
    destination.bestTimeToVisit
  );
  const stateToken = stateData.name.split(" ")[0].toLowerCase();
  const relatedPackages = tourPackages
    .filter(
      (p) =>
        p.state.toLowerCase().includes(stateToken) ||
        p.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
        destination.name.toLowerCase().includes(p.destination.toLowerCase())
    )
    .slice(0, 6);

  const seoDescription = formatSeoDescription(content.seoDescription);

  const schema = combineSchemas(
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: destination.name,
      description: content.shortDescription,
      containedInPlace: { "@type": "AdministrativeArea", name: stateData.name },
    },
    buildFaqSchema(guide.faqs),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
      { name: stateData.name, path: `/destinations/${stateData.slug}` },
      { name: destination.name, path: canonicalPath },
    ])
  );

  const audioScript = [
    content.shortDescription,
    ...content.overviewParagraphs.slice(0, 2),
  ].join(" ");

  return (
    <PageLayout>
      <SEO
        title={content.seoTitle}
        description={seoDescription}
        canonical={canonicalPath}
        image={activeHeroImg}
        schema={schema}
      />

      <PageHero
        title={destination.name}
        subtitle={content.shortDescription}
        backgroundImage={activeHeroImg}
        breadcrumb={[
          { label: "Destinations", href: "/destinations" },
          { label: stateData.name, href: `/destinations/${stateData.slug}` },
          { label: destination.name },
        ]}
        quickFacts={quickFacts}
      />

      <div className="container mx-auto px-4 py-8">
        <AudioGuide title={destination.name} content={audioScript} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-0.5 h-auto">
                <TabsTrigger value="overview" className="py-3 font-medium text-xs sm:text-sm">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="attractions" className="py-3 font-medium text-xs sm:text-sm">
                  Attractions
                </TabsTrigger>
                <TabsTrigger value="practical" className="py-3 font-medium text-xs sm:text-sm">
                  How to Reach
                </TabsTrigger>
                <TabsTrigger value="itineraries" className="py-3 font-medium text-xs sm:text-sm">
                  Tours
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-4">
                <div className="prose prose-slate max-w-none space-y-4">
                  {content.overviewParagraphs.map((para, i) => (
                    <p key={i} className="text-muted-foreground text-base leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                {destination.historicalContext && (
                  <div className="mt-6 p-5 bg-muted/40 rounded-2xl border border-border/50">
                    <h3 className="font-display text-lg font-semibold mb-2">Heritage & context</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {destination.historicalContext}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="attractions" className="pt-4">
                <div className="grid grid-cols-1 gap-4">
                  {content.attractions.map((spot, i) => (
                    <div
                      key={i}
                      className="p-5 bg-surface border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{spot.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {spot.description}
                          </p>
                          {spot.duration && (
                            <p className="text-xs text-primary font-medium mt-2">{spot.duration}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h3 className="font-display text-lg font-semibold mb-3">Travel tips</h3>
                  <ul className="space-y-2">
                    {content.travelTips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="practical" className="pt-4 space-y-6">
                <div className="grid sm:grid-cols-1 gap-4">
                  <div className="p-4 rounded-xl border border-border/50 bg-surface">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      By air
                    </p>
                    <p className="text-sm text-foreground">{content.howToReach.byAir}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/50 bg-surface">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      By train
                    </p>
                    <p className="text-sm text-foreground">{content.howToReach.byTrain}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/50 bg-surface">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      By road
                    </p>
                    <p className="text-sm text-foreground">{content.howToReach.byRoad}</p>
                  </div>
                </div>
                {destination.estimatedBudget && (
                  <p className="text-sm text-muted-foreground">
                    Typical budget from ₹{destination.estimatedBudget.budget_per_day_inr}/day (budget) to ₹
                    {destination.estimatedBudget.luxury_per_day_inr}/day (luxury) per person excluding flights.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="itineraries" className="pt-4 space-y-6">
                {relatedPackages.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" />
                      Packages including {destination.name}
                    </h3>
                    <ul className="space-y-3">
                      {relatedPackages.map((pkg) => (
                        <li key={pkg.slug}>
                          <Link
                            to={`/packages/${pkg.categories[0] || "all"}/${pkg.slug}`}
                            className="block p-4 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                          >
                            <span className="font-semibold text-foreground">{pkg.title}</span>
                            <span className="block text-xs text-muted-foreground mt-1">
                              {pkg.duration?.days ?? "—"}D / {pkg.duration?.nights ?? "—"}N · {pkg.state}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.relatedItineraries.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                      <Route className="w-5 h-5 text-primary" />
                      Multi-day itineraries
                    </h3>
                    <ul className="space-y-3">
                      {content.relatedItineraries.map((it) => (
                        <li key={it.slug}>
                          <Link
                            to={`/itineraries/${it.slug}`}
                            className="block p-4 rounded-xl border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                          >
                            <span className="font-semibold text-foreground group-hover:text-primary">
                              {it.packageName}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-1">
                              {it.duration} · {it.placesCovered.join(" → ")}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-primary mt-2 font-medium">
                              View day-wise plan <ExternalLink className="w-3 h-3" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {relatedPackages.length === 0 && content.relatedItineraries.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Request a custom itinerary — our planners build {destination.name} routes with hotels,
                    transport, and activities matched to your dates.
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {galleryRecords.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-primary rounded-full" />
                  Capturing {destination.name}
                </h2>
                <GalleryComponent images={galleryRecords} destinationName={destination.name} />
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {content.highlights.map((h, i) => (
                <div
                  key={i}
                  className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-medium text-foreground"
                >
                  {h}
                </div>
              ))}
            </div>

            <DestinationSeoSections
              destinationName={destination.name}
              stateName={stateData.name}
              guide={guide}
              relatedPackages={relatedPackages}
            />
          </div>

          <div className="space-y-8">
            <div className="bg-surface border border-border/50 rounded-3xl p-8 sticky top-24 shadow-sm">
              <h3 className="font-display text-2xl font-bold mb-6">Quick Details</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Location
                    </p>
                    <p className="font-semibold text-foreground">
                      {stateData.name}, India
                      {destination.altitude_meters
                        ? ` · ~${destination.altitude_meters} m`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Best time
                    </p>
                    <p className="font-semibold text-foreground">{destination.bestTimeToVisit}</p>
                    {destination.avoidMonths?.length ? (
                      <p className="text-xs text-muted-foreground mt-1">
                        Avoid: {destination.avoidMonths.join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CreditCard className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Packages
                    </p>
                    <p className="font-semibold text-foreground">
                      {relatedPackages.length}+ curated options
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Tag className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      Trip vibe
                    </p>
                    <p className="font-semibold text-foreground">
                      {(destination.popularActivities || [])
                        .slice(0, 3)
                        .map((a) => a.name)
                        .join(" · ") || content.highlights[0]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border/50">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Check Availability
                </button>
                <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium italic">
                  Guaranteed best price for custom group tours
                </p>
              </div>
            </div>

            {relatedPackages[0] && (
              <Link
                to={`/packages/${relatedPackages[0].categories[0] || "all"}/${relatedPackages[0].slug}`}
                className="block rounded-2xl overflow-hidden border border-border/50 group"
              >
                <SmartImage
                  src={relatedPackages[0].image}
                  alt={relatedPackages[0].title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  location={destination.name}
                />
                <div className="p-4 bg-surface">
                  <p className="text-xs text-primary font-bold uppercase">Featured package</p>
                  <p className="font-semibold text-sm mt-1">{relatedPackages[0].title}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <EnquirySection />

      <InquiryBanner
        title={`Custom tour to ${destination.name}?`}
        subtitle="Book now and get exclusive airport transfers and local guide support included."
      />
    </PageLayout>
  );
};

export default DestinationDetail;
