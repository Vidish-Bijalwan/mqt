import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import domesticImg from "@/assets/domestic-tours.jpg";
import internationalImg from "@/assets/international-tours.jpg";

const DomesticInternational = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic */}
          <Link to="/packages?type=domestic" className="group relative rounded-xl overflow-hidden aspect-[16/9] min-h-[280px]">
            <ImgWithFallback
              src={domesticImg}
              fallbackSrc={domesticImg}
              alt="Explore incredible India - domestic tour packages"
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

          {/* International */}
          <Link to="/packages?type=international" className="group relative rounded-xl overflow-hidden aspect-[16/9] min-h-[280px]">
            <ImgWithFallback
              src={internationalImg}
              fallbackSrc={internationalImg}
              alt="International tour packages to Nepal, Bhutan and more"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              lazy={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent z-10" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <h3 className="font-display text-3xl font-semibold text-background mb-2">Beyond the Borders</h3>
              <p className="text-background/80 text-sm mb-4">Nepal, Bhutan, Sri Lanka, Maldives & more</p>
              <Button size="sm" className="gradient-accent text-accent-foreground font-medium">Browse International Tours →</Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomesticInternational;
