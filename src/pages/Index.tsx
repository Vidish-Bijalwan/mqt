import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import DestinationGrid from "@/components/DestinationGrid";
import TravelStyleSelector from "@/components/TravelStyleSelector";
import HomepagePackagesSection from "@/components/HomepagePackagesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import BottomNav from "@/components/BottomNav";
import { ExclusiveAlertModal } from "@/components/ExclusiveAlertModal";
import { SEO } from "@/components/SEO";
import { buildTravelAgencySchema, combineSchemas } from "@/lib/seo";
import { SunriseGradient, TopographicMap, ForestGlow, PassportStamps } from "@/components/ui/CinematicBackgrounds";

const Index = () => {
  const schema = combineSchemas(buildTravelAgencySchema());

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden pb-[4.75rem] lg:pb-0">
      <SEO
        title="India Tour Packages 2026"
        description="Book curated India tour packages — Kerala, Kashmir, Rajasthan, Ladakh & Goa. Custom family, honeymoon & pilgrimage trips. Free quote from expert planners in Meerut."
        canonical="/"
        schema={schema}
      />

      <ExclusiveAlertModal />
      <Navbar />

      <main className="w-full overflow-x-hidden relative">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Trust Strip */}
        <TrustStrip />

        {/* Section 3: Travel Style Selector */}
        <SunriseGradient>
          <TravelStyleSelector />
        </SunriseGradient>

        {/* Section 3.5: Destinations Grid */}
        <TopographicMap>
          <DestinationGrid />
        </TopographicMap>

        {/* Section 4: Featured Packages */}
        <ForestGlow>
          <HomepagePackagesSection />
        </ForestGlow>

        {/* Section 5: Why MQT */}
        <WhyChooseUs />

        {/* Section 6: Testimonials */}
        <TestimonialsSection />

        {/* Blog teaser */}
        <PassportStamps>
          <BlogPreview />
        </PassportStamps>

        {/* Section 7: Final CTA */}
        <EnquirySection />
      </main>

      <Footer />
      <FloatingElements />
      <BottomNav />
    </div>
  );
};

export default Index;
