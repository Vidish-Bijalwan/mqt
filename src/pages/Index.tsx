import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import PackagesSection from "@/components/PackagesSection";
import DestinationExplorer from "@/components/DestinationExplorer";
import DomesticInternational from "@/components/DomesticInternational";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <PackagesSection />
        <DestinationExplorer />
        <DomesticInternational />
        <WhyChooseUs />
        <HowItWorks />
        <TestimonialsSection />
        <EnquirySection />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
};

export default Index;
