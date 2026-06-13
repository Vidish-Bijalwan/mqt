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
import { FloatingOrbs, DotPattern, HanddrawnSwoosh, CompassWatermark } from "@/components/SectionDivider";

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
        {/* Global floating orbs and dots for the entire page */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <FloatingOrbs />
          <DotPattern />
        </div>

        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Trust Strip */}
        <TrustStrip />

        {/* Section 3: Travel Style Selector */}
        <div className="relative">
          <HanddrawnSwoosh className="top-10 left-[10%] w-[120px] sm:w-[200px]" />
          <TravelStyleSelector />
        </div>

        {/* Section 3.5: Destinations Grid */}
        <div className="relative">
          <CompassWatermark className="top-1/4 right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px]" />
          <DestinationGrid />
        </div>

        {/* Section 4: Featured Packages */}
        <div className="relative">
          <HomepagePackagesSection />
        </div>

        {/* Section 5: Why MQT */}
        <WhyChooseUs />

        {/* Section 6: Testimonials */}
        <TestimonialsSection />

        {/* Blog teaser */}
        <BlogPreview />

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
