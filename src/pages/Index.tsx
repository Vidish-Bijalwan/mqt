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

import { SEO } from "@/components/SEO";

const Index = () => {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "MyQuickTrippers",
    "url": "https://www.myquicktrippers.com",
    "logo": "https://www.myquicktrippers.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7668741373",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meerut",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "priceRange": "₹₹",
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-19:00"
  });

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <SEO 
        title="Premium India Tour Packages 2026 | MyQuickTrippers Meerut" 
        description="Book curated India tour packages for Kedarnath, Ladakh, Kashmir, Kerala & more. Expert guides, best prices, free quotes. Trusted by 500+ travellers. Call now."
        canonical=""
        image="/og-image.jpg"
        schema={schema}
      />
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
