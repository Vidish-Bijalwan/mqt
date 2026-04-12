import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getPackageImage } from "@/lib/imageMap";

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
          <p className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">Recommendations</p>
          <h2 className="section-heading">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => {
            const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
            return (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.categories[0]}/${pkg.slug}`}
                onClick={() => track("package_click", { slug: pkg.slug, source: "you_may_also_like" })}
                className="group bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImgWithFallback
                    src={src}
                    fallbackSrc={fallbackSrc}
                    alt={`${pkg.title} tour package`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {pkg.badge && (
                    <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full z-10">
                      {pkg.badge}
                    </span>
                  )}
                  {pkg.trending && (
                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
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
                  <h3 className="font-body font-semibold text-sm text-card-foreground mb-2 leading-snug">{pkg.title}</h3>
                  <div className="pt-2 border-t border-border/50">
                    <span className="text-[12px] text-muted-foreground font-body italic">Pricing on enquiry</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;
