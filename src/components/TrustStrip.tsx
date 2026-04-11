import { Shield, CheckCircle, Wallet, Phone, RefreshCw, FileText } from "lucide-react";

const badges = [
  { icon: Shield, title: "100% Safe Travel", desc: "Verified hotels & trusted local partners" },
  { icon: CheckCircle, title: "Verified Local Guides", desc: "Expert guides with deep regional knowledge" },
  { icon: Wallet, title: "Best Price Guarantee", desc: "No hidden costs, transparent pricing" },
  { icon: Phone, title: "24/7 Customer Support", desc: "Always available when you need us" },
  { icon: RefreshCw, title: "Free Cancellation", desc: "Flexible cancellation on select packages" },
  { icon: FileText, title: "Customised Itineraries", desc: "Every trip built from scratch for you" },
];

const TrustStrip = () => {
  return (
    <section className="bg-surface py-10 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => (
            <div key={badge.title} className="text-center group">
              <badge.icon className="h-8 w-8 mx-auto mb-2 text-primary group-hover:text-accent transition-colors" />
              <h3 className="font-body font-semibold text-sm text-foreground">{badge.title}</h3>
              <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
