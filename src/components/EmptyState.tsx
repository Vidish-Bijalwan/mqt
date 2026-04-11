import { Link } from "react-router-dom";
import { SearchX, ArrowRight } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { getTrendingPackages } from "@/lib/recommendations";
import { tourPackages } from "@/data/packages";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  /** Override suggestion packages (defaults to top trending) */
  suggestions?: TourPackage[];
  /** Show suggestions section */
  showSuggestions?: boolean;
}

const EmptyState = ({
  title = "No packages found",
  subtitle = "Try adjusting your filters or browse our popular picks below.",
  suggestions,
  showSuggestions = true,
}: EmptyStateProps) => {
  const defaultSuggestions = suggestions ?? getTrendingPackages(tourPackages, 3);

  return (
    <div className="py-16 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-5">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="font-body text-muted-foreground text-sm max-w-md mx-auto mb-8">{subtitle}</p>

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-body font-medium text-sm hover:scale-[1.02] transition-transform"
      >
        Ask Our Experts <ArrowRight className="h-4 w-4" />
      </Link>

      {showSuggestions && defaultSuggestions.length > 0 && (
        <div className="mt-12">
          <p className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            🔥 Trending Packages
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {defaultSuggestions.map((pkg) => (
              <Link
                key={pkg.id}
                to={`/packages/${pkg.categories[0]}/${pkg.slug}`}
                className="group bg-card rounded-xl border border-border overflow-hidden card-hover shadow-soft text-left block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={300}
                    height={188}
                  />
                </div>
                <div className="p-3">
                  <p className="font-body font-semibold text-xs text-foreground leading-snug">{pkg.title}</p>
                  <p className="text-accent font-bold text-sm mt-1">₹{pkg.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
