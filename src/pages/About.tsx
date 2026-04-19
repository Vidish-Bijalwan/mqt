import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import aboutHero from "@/assets/dest-valley-flowers.jpg";
import { Check, ShieldCheck, HeartPulse, Trophy } from "lucide-react";

const About = () => {
  useEffect(() => {
    document.title = "About Us | MQT";
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: "Service Excellence",
      desc: "Our core virtue. From our gracious smiles to meticulous attention to detail, we ensure every need is met seamlessly.",
      icon: Trophy
    },
    {
      title: "Trusted Network",
      desc: "Our handpicked properties and experienced on-ground partners ensure you get the most authentic and safe experience in every location.",
      icon: ShieldCheck
    },
    {
      title: "Commitment to Care",
      desc: "Tourism is our business, but your journey is a lifelong memory. We treat every traveler like family and ensure your memories are cherished forever.",
      icon: HeartPulse
    }
  ];

  return (
    <PageLayout>
      <PageHero
        title="About MyQuickTrippers"
        subtitle="Discover the incredible heritage, cultures, and landscapes of the Indian Subcontinent."
        backgroundImage={aboutHero}
        breadcrumb={[{ label: "About Us" }]}
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold mb-6">Our Story</h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-4 text-lg">
              India is a medley of fascinating colors and cultures, a canvas of architectural masterpieces, and an extravagant exuberance of royal splendor. Crowned by the mighty Himalayas in the north and surrounded by emerald oceans in the south, India offers a platter full of variety, packed in one country.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-4 text-lg">
              Born from a passion for this incredible land, MyQuickTrippers was founded to make travel across the Indian subcontinent accessible, safe, and deeply immersive. Whether you are seeking a serene backwater cruise in Kerala, a luxury desert camp in Rajasthan, or a profound pilgrimage to the Char Dhams, we build tailored itineraries that cater to every dream.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed text-lg">
              We specialize in deep, meaningful connections. We don't just book hotels and transports; we weave experiences with relentless precision. From initial inquiry to your journey's end, we provide 24/7 on-ground support so your only job is to create memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {values.map((v, i) => (
              <div key={i} className="bg-surface p-8 rounded-2xl border border-border text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm font-body">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Stats */}
      <section className="py-16 bg-surface-2 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border">
            <div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">5k+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">50+</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Destinations</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">98%</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">24/7</p>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="section-heading mb-8">Why Book With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              "Verified local partners at all destinations",
              "100% price transparency with zero hidden fees",
              "Personal tour advisor assigned to every booking",
              "Robust safety protocols and emergency network",
              "Customizable itineraries crafted just for you",
              "No advance payment required for initial inquiry"
            ].map((reason, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-border">
                <Check className="w-5 h-5 text-success shrink-0" />
                <span className="font-body font-medium text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InquiryBanner title="Start Your Journey With Us" />
    </PageLayout>
  );
};

export default About;
