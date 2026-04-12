import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EnquirySection from "@/components/EnquirySection";
import contactHero from "@/assets/dest-varanasi.jpg";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | MQT";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Get in Touch"
        subtitle="Have questions? Our travel experts are available 24/7 to help you plan your next adventure or support your current journey."
        backgroundImage={contactHero}
        breadcrumb={[{ label: "Contact Us" }]}
      />

      {/* Embed the shared enquiry form component */}
      <div className="pb-10 pt-4">
        <EnquirySection />
      </div>

    </PageLayout>
  );
};

export default Contact;
