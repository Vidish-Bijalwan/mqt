import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";

interface YouMayAlsoLikeProps {
  packages: TourPackage[];
  title?: string;
}

const YouMayAlsoLike = ({ packages, title = "You May Also Like" }: YouMayAlsoLikeProps) => {
  const { track } = useAnalytics();

  if (packages.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">
            Recommendations
          </p>
          <h2 className="section-heading">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              to={`/packages/${pkg.categories[0]}/${pkg.slug}`}
              onClick={() => track("package_click", { slug: pkg.slug, source: "you_may_also_like" })}
              className="group bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft block"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={`${pkg.title} tour package`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={250}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' fill='%23e2e8f0'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";
                  }}
                />
                {pkg.badge && (
                  <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                )}
                {pkg.trending && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    🔥 Trending
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{pkg.duration.nights}N · {pkg.duration.days}D</span>
                  <span className="ml-auto flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {pkg.rating}
                  </span>
                </div>
                <h3 className="font-body font-semibold text-sm text-card-foreground mb-2 leading-snug">
                  {pkg.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-body font-bold text-accent">
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-muted-foreground">/person</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{pkg.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
