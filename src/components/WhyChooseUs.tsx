import { Mountain, Compass, User, Shield, Wallet, Star } from "lucide-react";
import travelersImg from "@/assets/travelers-group.jpg";

const features = [
  { icon: Compass, title: "Destination Experts Across India", desc: "Deep local knowledge of every route, coast, and trail" },
  { icon: Compass, title: "100% Customised", desc: "No copy-paste itineraries — every trip built from scratch" },
  { icon: User, title: "Expert Trip Advisors", desc: "Real people, not bots — available Mon–Sat 9AM–7PM" },
  { icon: Shield, title: "Safety First", desc: "Verified hotels, vetted guides, emergency support 24/7" },
  { icon: Wallet, title: "Price Transparency", desc: "No hidden charges — full breakdown before you pay" },
  { icon: Star, title: "Rated 4.9/5", desc: "500+ verified reviews from real travellers" },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="section-heading mb-8">Why Travellers Trust <span className="text-primary">MQT</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-foreground text-sm">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image with floating card */}
          <div className="relative">
            <img
              src={travelersImg}
              alt="Happy group of travellers exploring India"
              className="rounded-xl shadow-card w-full"
              loading="lazy"
              width={800}
              height={600}
            />
            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-elevated p-5 border border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-primary">200+</p>
                  <p className="text-xs text-muted-foreground">Trips</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Clients</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-accent">4.9⭐</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-primary">5+</p>
                  <p className="text-xs text-muted-foreground">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
