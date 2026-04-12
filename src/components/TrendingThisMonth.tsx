import { Link } from "react-router-dom";
import { Flame, Clock, Star } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getPackageImage } from "@/lib/imageMap";

interface TrendingThisMonthProps {
  packages: TourPackage[];
  title?: string;
}

const TrendingThisMonth = ({ packages, title = "Trending This Month" }: TrendingThisMonthProps) => {
  const { track } = useAnalytics();

  if (packages.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Flame className="h-6 w-6 text-orange-500" />
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground font-body mt-0.5">Most booked packages right now</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 snap-x -mx-4 px-4 scrollbar-hide">
          {packages.map((pkg, idx) => {
            const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
            return (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.categories[0]}/${pkg.slug}`}
                onClick={() => track("package_click", { slug: pkg.slug, source: "trending_this_month" })}
                className="group flex-none w-72 bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft snap-start block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImgWithFallback
                    src={src}
                    fallbackSrc={fallbackSrc}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
                    <Flame className="h-3 w-3" /> #{idx + 1} Trending
                  </span>
                  {pkg.seatsLeft && pkg.seatsLeft < 6 && (
                    <span className="absolute bottom-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-1 rounded-full z-10">
                      Only {pkg.seatsLeft} seats left!
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{pkg.duration.nights}N · {pkg.duration.days}D</span>
                    <span className="ml-auto flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {pkg.rating}
                    </span>
                  </div>
                  <h3 className="font-body font-semibold text-sm text-card-foreground leading-snug mb-2">{pkg.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground font-body italic mt-1 pb-[2px]">Pricing on enquiry</span>
                    {pkg.lastBookedHours && (
                      <span className="text-xs text-muted-foreground">Booked {pkg.lastBookedHours}h ago</span>
                    )}
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

export default TrendingThisMonth;
