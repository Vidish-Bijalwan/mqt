import { Link } from "react-router-dom";
import { Star, Clock, Flame } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";

interface PackageCardProps {
  pkg: TourPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  const savings = pkg.originalPrice - pkg.price;
  const { track } = useAnalytics();

  return (
    <Link
      to={`/packages/${pkg.categories[0]}/${pkg.slug}`}
      onClick={() => track("package_click", { slug: pkg.slug, source: "package_card" })}
      className="bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft group block"
    >
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
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {pkg.badge && (
            <span className="gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {pkg.badge}
            </span>
          )}
          {pkg.trending && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Flame className="h-3 w-3" /> Trending
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {pkg.discountBadge && (
            <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {pkg.discountBadge}
            </span>
          )}
          {pkg.seatsLeft && pkg.seatsLeft <= 5 && (
            <span className="bg-foreground/80 backdrop-blur-sm text-background text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
              Only {pkg.seatsLeft} left!
            </span>
          )}
        </div>
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
          <p className="text-xs text-muted-foreground line-clamp-1">
            Includes: {pkg.includes.join(" | ")}
          </p>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(pkg.rating) ? "fill-accent text-accent" : "text-border"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1 font-medium">{pkg.rating}</span>
          <span className="text-xs text-muted-foreground">({pkg.reviewsCount})</span>
        </div>

        <div className="mb-4">
          <span className="font-body font-bold text-lg text-accent">₹{pkg.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-muted-foreground ml-1">/person</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
            <span className="text-xs text-success font-medium">Save ₹{savings.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="flex-1 text-center py-2 rounded-md gradient-primary text-primary-foreground text-xs font-medium cursor-pointer transition-transform hover:scale-[1.02]">
            View Details
          </span>
          <span className="flex-1 text-center py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs font-medium cursor-pointer transition-colors">
            Enquire Now
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;
