import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { getRecentlyViewed } from "@/lib/personalization";
import { tourPackages } from "@/data/packages";
import { destinationsData } from "@/data/destinations";
import type { TourPackage } from "@/data/packages";
import type { DestinationData } from "@/data/destinations";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getPackageImage, getDestinationImage } from "@/lib/imageMap";

interface RecentlyViewedProps {
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
      if (dest) resolved.push({ type: "destination", data: dest });
    }
    setItems(resolved.slice(0, 4));
  }, [excludeSlug]);

  if (items.length === 0) return null;

  return (
    <section className="py-10 px-4 bg-surface">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">{title}</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-hide">
          {items.map((item, i) => {
            const isPackage = item.type === "package";
            const pkg = isPackage ? (item.data as TourPackage) : null;
            const dest = !isPackage ? (item.data as DestinationData) : null;
            const href = isPackage
              ? `/packages/${pkg!.categories[0]}/${pkg!.slug}`
              : `/destinations/${dest!.stateSlug}/${dest!.slug}`;
            const label = isPackage ? pkg!.title : dest!.name;
            const sub = isPackage
              ? `${pkg!.duration.nights}N / ${pkg!.duration.days}D`
              : dest!.tagline ?? dest!.state;
            const { src, fallbackSrc } = isPackage
              ? getPackageImage(pkg!.slug, 'card', pkg!.image)
              : getDestinationImage(dest!.slug, 'card', dest!.image);

            return (
              <Link
                key={i}
                to={href}
                onClick={() => track("recently_viewed_click", { slug: isPackage ? pkg!.slug : dest!.slug })}
                className="group flex-none w-52 bg-background rounded-xl border border-border overflow-hidden card-hover shadow-soft snap-start"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImgWithFallback
                    src={src}
                    fallbackSrc={fallbackSrc}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="font-body font-semibold text-xs text-foreground leading-snug line-clamp-2">{label}</p>
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
