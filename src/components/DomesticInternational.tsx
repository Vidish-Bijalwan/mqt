import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";

const DomesticInternational = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic — Hampi Virupaksha Temple ruins */}
          <Link to="/packages?type=domestic" className="group relative rounded-xl overflow-hidden aspect-[16/9] min-h-[280px]">
            <ImgWithFallback
              src="https://images.unsplash.com/photo-1600100399617-a8a25bbd5e2d?auto=format&fit=crop&q=80&w=1200"
              fallbackSrc="https://images.unsplash.com/photo-1599661559684-25befc05586b?auto=format&fit=crop&q=80&w=800"
              alt="Hampi Virupaksha Temple ruins with boulder landscape, Karnataka, India — Explore Incredible India"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <h3 className="font-display text-3xl font-semibold text-background mb-2">Explore Incredible India</h3>
              <p className="text-background/80 text-sm mb-4">28+ states, 200+ handpicked destinations</p>
              <Button size="sm" className="gradient-accent text-accent-foreground font-medium">Browse Domestic Tours →</Button>
            </div>
          </Link>

          {/* International — Boudhanath Stupa Kathmandu */}
          <Link to="/packages?type=international" className="group relative rounded-xl overflow-hidden aspect-[16/9] min-h-[280px]">
            <ImgWithFallback
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200"
              fallbackSrc="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800"
              alt="Boudhanath Stupa Kathmandu with prayer flags at sunrise, Nepal — Beyond the Borders international tours"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <h3 className="font-display text-3xl font-semibold text-background mb-2">Beyond the Borders</h3>
              <p className="text-background/80 text-sm mb-4">Nepal, Bhutan, Sri Lanka, Maldives &amp; more</p>
              <Button size="sm" className="gradient-accent text-accent-foreground font-medium">Browse International Tours →</Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomesticInternational;
