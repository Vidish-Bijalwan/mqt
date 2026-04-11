import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { getRecentlyViewed } from "@/lib/personalization";
import { tourPackages } from "@/data/packages";
import { destinationsData } from "@/data/destinations";
import type { TourPackage } from "@/data/packages";
import type { DestinationData } from "@/data/destinations";
import { useAnalytics } from "@/hooks/useAnalytics";

interface RecentlyViewedProps {
  /** Exclude a slug from the list (e.g. current page) */
  excludeSlug?: string;
  title?: string;
}

type RecentItem = { type: "package"; data: TourPackage } | { type: "destination"; data: DestinationData };

const RecentlyViewed = ({ excludeSlug, title = "Recently Viewed" }: RecentlyViewedProps) => {
  const [items, setItems] = useState<RecentItem[]>([]);
  const { track } = useAnalytics();

  useEffect(() => {
    const slugs = getRecentlyViewed().filter((s) => s !== excludeSlug);
    const resolved: RecentItem[] = [];

    for (const slug of slugs) {
      const pkg = tourPackages.find((p) => p.slug === slug);
      if (pkg) { resolved.push({ type: "package", data: pkg }); continue; }
      const dest = destinationsData.find((d) => d.slug === slug);
      if (dest) { resolved.push({ type: "destination", data: dest }); }
    }

    setItems(resolved.slice(0, 4));
  }, [excludeSlug]);

  if (items.length === 0) return null;

  return (
    <section className="py-10 px-4 bg-surface">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {items.map((item, i) => {
            const isPackage = item.type === "package";
            const pkg = isPackage ? (item.data as TourPackage) : null;
            const dest = !isPackage ? (item.data as DestinationData) : null;
            const href = isPackage
              ? `/packages/${pkg!.categories[0]}/${pkg!.slug}`
              : `/destinations/${dest!.stateSlug}/${dest!.slug}`;
            const title = isPackage ? pkg!.title : dest!.name;
            const image = isPackage ? pkg!.image : dest!.image;
            const sub = isPackage
              ? `${pkg!.duration.nights}N / ${pkg!.duration.days}D`
              : dest!.tagline ?? dest!.state;

            return (
              <Link
                key={i}
                to={href}
                onClick={() => track("recently_viewed_click", { slug: isPackage ? pkg!.slug : dest!.slug })}
                className="group flex-none w-52 bg-background rounded-xl border border-border overflow-hidden card-hover shadow-soft snap-start"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={208}
                    height={156}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='208' height='156' fill='%23e2e8f0'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="font-body font-semibold text-xs text-foreground leading-snug line-clamp-2">{title}</p>
                  <p className="font-body text-xs text-accent font-medium mt-1 truncate">{sub}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
