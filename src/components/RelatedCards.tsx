import { Link } from "react-router-dom";
import { Clock, Star, MapPin } from "lucide-react";
import type { TourPackage, Destination } from "@/data/packages";
import { destinationsData as destinationsFull } from "@/data/destinations";
import type { DestinationModel } from "@/types/models";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";
import { getPackageImage, getStateImage } from "@/lib/imageMap";

interface RelatedPackageCardsProps {
  type: "package";
  items: TourPackage[];
  title?: string;
}

interface RelatedDestinationCardsProps {
  type: "destination";
  items: (Destination | DestinationModel)[];
  title?: string;
}

type RelatedCardsProps = RelatedPackageCardsProps | RelatedDestinationCardsProps;

const RelatedCards = (props: RelatedCardsProps) => {
  const { type, title } = props;

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {title && (
          <div className="text-center mb-8">
            <h2 className="section-heading">{title}</h2>
          </div>
        )}

        {type === "package" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(props as RelatedPackageCardsProps).items.map((pkg) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.categories?.[0] || 'tour'}/${pkg.slug}`}
                className="group bg-card rounded-xl overflow-hidden border border-border card-hover shadow-soft block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {(() => {
                    const { src, fallbackSrc } = getPackageImage(pkg.slug, 'card', pkg.image);
                    return (
                      <ImgWithFallback
                        src={src}
                        fallbackSrc={fallbackSrc}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    );
                  })()}
                  {pkg.badge && (
                    <span className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{pkg.duration.nights}N · {pkg.duration.days}D</span>
                  </div>
                  <h3 className="font-body font-semibold text-sm text-card-foreground mb-2 leading-snug">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground font-body italic mt-1 pb-[2px]">
                      Pricing on enquiry
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {pkg.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {type === "destination" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(props as RelatedDestinationCardsProps).items.map((dest) => {
              const slug = dest.slug;
              const stateSlug = "stateSlug" in dest ? (dest as DestinationModel).stateSlug : destinationsFull.find(d => d.slug === slug)?.stateSlug || "india";
              const name = dest.name;
              const image = (dest as DestinationModel).heroImage?.url || "default.jpg";
              const count = "packagesCount" in dest ? dest.packagesCount : 0;

              return (
                <Link
                  key={slug}
                  to={`/destinations/${stateSlug}/${slug}`}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] block card-hover shadow-soft"
                >
                  {(() => {
                    const { src, fallbackSrc } = getStateImage(slug, 'card', image);
                    return (
                      <ImgWithFallback
                        src={src}
                        fallbackSrc={fallbackSrc}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    );
                  })()}
                  <div className="absolute inset-0 gradient-hero" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg font-semibold text-background">{name}</h3>
                    {count && (
                      <p className="text-xs text-background/70 font-body mt-0.5">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {count} packages available
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedCards;
