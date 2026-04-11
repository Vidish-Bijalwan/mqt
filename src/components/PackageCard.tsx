import { Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TourPackage } from "@/data/packages";

interface PackageCardProps {
  pkg: TourPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  const savings = pkg.originalPrice - pkg.price;

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={pkg.image}
          alt={`${pkg.title} - ${pkg.destination} tour package`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={250}
        />
        {pkg.badge && (
          <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {pkg.badge}
          </span>
        )}
        {pkg.discountBadge && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {pkg.discountBadge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Clock className="h-3.5 w-3.5" />
          <span>{pkg.duration.nights} Nights · {pkg.duration.days} Days</span>
        </div>

        <h3 className="font-body font-semibold text-base text-card-foreground mb-2 leading-snug">
          {pkg.title}
        </h3>

        <div className="border-t border-border pt-2 mb-2">
          <p className="text-xs text-muted-foreground">
            Includes: {pkg.includes.join(" | ")}
          </p>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(pkg.rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({pkg.rating})</span>
          <span className="text-xs text-muted-foreground">{pkg.reviewsCount} Reviews</span>
        </div>

        <div className="mb-4">
          <span className="font-body font-bold text-lg text-accent">From ₹{pkg.price.toLocaleString("en-IN")}</span>
          <span className="text-sm text-muted-foreground">/person</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
            <span className="text-xs text-success font-medium">Save ₹{savings.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 gradient-primary text-primary-foreground text-xs font-medium">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium">
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
