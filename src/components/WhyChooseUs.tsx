import { User, Shield, Wallet, Star, Compass, CheckCircle } from "lucide-react";
import travelersImg from "@/assets/travelers-group.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const iconMap: Record<string, any> = {
  Compass,
  User,
  Shield,
  Wallet,
  Star,
  CheckCircle,
};

const fetchWhyChooseUs = async () => {
  const { data, error } = await supabase
    .from("why_choose_us")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
};

const WhyChooseUs = () => {
  const { data: features } = useQuery({
    queryKey: ["public-why-choose-us"],
    queryFn: fetchWhyChooseUs,
  });

  const displayFeatures = features || [
    { icon_name: "Compass", title: "Destination Experts Across India", description: "Deep local knowledge of every route, coast, and trail" },
    { icon_name: "Compass", title: "100% Customised", description: "No copy-paste itineraries — every trip built from scratch" },
    { icon_name: "User", title: "Expert Trip Advisors", description: "Real people, not bots — available Mon–Sat 9AM–7PM" },
    { icon_name: "Shield", title: "Safety First", description: "Verified hotels, vetted guides, emergency support 24/7" },
    { icon_name: "Wallet", title: "Price Transparency", description: "No hidden charges — full breakdown before you pay" },
    { icon_name: "Star", title: "Rated 4.9/5", description: "500+ verified reviews from real travellers" },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="section-heading mb-8">Why Travellers Trust <span className="text-primary">MQT</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayFeatures.map((f: any) => {
                const IconComponent = iconMap[f.icon_name || "CheckCircle"] || CheckCircle;
                return (
                  <div key={f.title} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-foreground text-sm">{f.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                );
              })}
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
