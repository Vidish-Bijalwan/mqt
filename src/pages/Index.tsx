import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import PackagesSection from "@/components/PackagesSection";
import DestinationExplorer from "@/components/DestinationExplorer";
import DiscoverySection from "@/components/DiscoverySection";
import TravelRoutes from "@/components/TravelRoutes";
import FestivalsOfIndia from "@/components/FestivalsOfIndia";
import DomesticInternational from "@/components/DomesticInternational";
import TravelExperiences from "@/components/TravelExperiences";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import EnquirySection from "@/components/EnquirySection";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <PackagesSection />
        <DestinationExplorer />
        <DiscoverySection />
        {/* Popular itinerary routes — added per Part 4 spec */}
        <TravelRoutes />
        {/* Festivals of India — added per Part 5 spec */}
        <FestivalsOfIndia />
        <DomesticInternational />
        {/* Curated travel experiences — added per Part 6 spec */}
        <TravelExperiences />
        <WhyChooseUs />
        <HowItWorks />
        <TestimonialsSection />
        <EnquirySection />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
      <FloatingElements />
      <BottomNav />
    </div>
  );
};

export default Index;
