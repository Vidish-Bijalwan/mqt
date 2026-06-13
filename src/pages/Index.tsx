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
import { WaveDivider, FloatingOrbs, DotPattern } from "@/components/SectionDivider";

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

      <main className="w-full overflow-x-hidden">
        {/* Section 1: Hero — Peak-End Rule peak moment */}
        <HeroSection />

        {/* Section 2: Trust Strip — 3 numbers, dark bar */}
        <TrustStrip />

        {/* Section 3: Travel Style Selector — Hick's Law: 3 choices */}
        <TravelStyleSelector />

        {/* Organic wave transition from warm beige to cool slate */}
        <WaveDivider color="#f1f5f9" />

        {/* Section 3.5: Destinations Grid — with decorative background */}
        <div className="relative">
          <FloatingOrbs />
          <DotPattern />
          <DestinationGrid />
        </div>

        {/* Wave transition back to white for packages */}
        <WaveDivider color="#ffffff" flip />

        {/* Section 4: Featured Packages — with subtle background accents */}
        <div className="relative">
          <FloatingOrbs className="opacity-60" />
          <HomepagePackagesSection />
        </div>

        {/* Section 5: Why MQT — Miller's Law: 3 reasons */}
        <WhyChooseUs />

        {/* Section 6: Testimonials — social proof before final CTA */}
        <TestimonialsSection />

        {/* Blog teaser — lightweight, below fold, before final CTA */}
        <BlogPreview />

        {/* Section 7: Final CTA — Peak-End Rule end moment */}
        <EnquirySection />
      </main>

      <Footer />
      <FloatingElements />
      <BottomNav />
    </div>
  );
};

export default Index;
