import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import DestinationGrid from "@/components/DestinationGrid";
import TravelStyleSelector from "@/components/TravelStyleSelector";
import HomepagePackagesSection from "@/components/HomepagePackagesSection";
import IndianCraftsCarousel from "@/components/IndianCraftsCarousel";
import HowItWorks from "@/components/HowItWorks";
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
import { useEffect } from "react";

// IntersectionObserver scroll reveal — apply Goal-Gradient Effect
// Each section fading in as user scrolls creates sense of progress
const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Stagger children
          const children = entry.target.querySelectorAll(".reveal-child");
          children.forEach((child, index) => {
            (child as HTMLElement).style.transitionDelay = `${index * 80}ms`;
            child.classList.add("revealed");
          });
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal-section").forEach((el) => observer.observe(el));
  return observer;
};

const Index = () => {
  const schema = combineSchemas(buildTravelAgencySchema());

  // Set up scroll reveal after mount
  useEffect(() => {
    const observer = setupReveal();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <SEO
        title="India Tour Packages 2026"
        description="Book curated India tour packages — Kerala, Kashmir, Rajasthan, Ladakh & Goa. Custom family, honeymoon & pilgrimage trips. Free quote from expert planners in Meerut."
        canonical="/"
        schema={schema}
      />

      <ExclusiveAlertModal />
      <Navbar />

      {/*
        HOMEPAGE — 7 SECTIONS MAXIMUM (Hick's Law + Miller's Law)
        1. Hero        — emotional peak, 2 CTAs (Peak-End + Fitts's)
        2. TrustStrip  — 3 numbers (Miller's Law + Von Restorff)
        3. TravelStyle — 3 travel style choices (Hick's Law + Progressive Disclosure)
        4. Packages    — 4 featured packages (Miller's Law + Goal-Gradient)
        5. WhyMQT      — 3 reasons (Miller's + Aesthetic-Usability)
        6. Testimonials — social proof (Aesthetic-Usability + Peak-End)
        7. FinalCTA    — emotional end moment (Peak-End + Goal-Gradient)

        Removed from homepage (moved to own pages — Progressive Disclosure):
        - DestinationExplorer → /destinations
        - DiscoverySection    → /destinations
        - TravelRoutes        → /packages
        - FestivalsOfIndia    → /destinations
        - DomesticInternational → removed (redundant)
        - TravelExperiences   → /packages
        - HowItWorks          → /about
        - BlogPreview         → kept below final CTA (lightweight)
        - Newsletter          → moved to footer
      */}

      <main>
        {/* Section 1: Hero — Peak-End Rule peak moment */}
        <HeroSection />

        {/* Section 2: Trust Strip — 3 numbers, dark bar */}
        <TrustStrip />

        {/* Section 3: How It Works — 3 steps */}
        <HowItWorks />

            {/* Section 3: Travel Style Selector — Hick's Law: 3 choices */}
            <TravelStyleSelector />

            {/* Section 3.5: Destinations Grid */}
            <DestinationGrid />

            {/* Section 4: Featured Packages — Miller's Law: 4 only */}
            <HomepagePackagesSection />

            {/* Section 4.5: Indian Crafts Carousel */}
            <IndianCraftsCarousel />

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
