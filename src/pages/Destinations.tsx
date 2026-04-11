import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import RelatedCards from "@/components/RelatedCards";
import { destinationsData } from "@/data/destinations";
import destHero from "@/assets/dest-ladakh.jpg";

const Destinations = () => {
  useEffect(() => {
    document.title = "Explore Destinations | MyQuickTrippers";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Find Your Perfect Destination"
        subtitle="From the spiritual heights of Kedarnath to the serene lakes of Kashmir, explore our handpicked Himalayan and exotic destinations."
        backgroundImage={destHero}
        breadcrumb={[{ label: "Destinations" }]}
      />

      <RelatedCards
        type="destination"
        items={destinationsData}
        title="All Destinations"
      />

      <InquiryBanner
        title="Not sure where to go?"
        subtitle="Tell us your preferences and our experts will suggest the perfect destination for your next holiday."
        ctaText="Get Free Suggestions"
      />
    </PageLayout>
  );
};

export default Destinations;
