import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  backgroundImage?: { src: string; fallbackSrc: string } | string;
  /** Optional strip of quick facts displayed below subtitle */
  quickFacts?: { label: string; value: string }[];
  /** Badge text shown above the title (e.g. "Pilgrimage · Uttarakhand") */
  badge?: string;
  /** Overlay darkness: 0.4–0.75 */
  overlayOpacity?: number;
}

const PageHero = ({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
  quickFacts,
  badge,
  overlayOpacity = 0.58,
}: PageHeroProps) => {
  return (
    <section className="relative min-h-[320px] md:min-h-[420px] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        typeof backgroundImage === 'string' ? (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={500}
          />
        ) : (
          <ImgWithFallback
            src={backgroundImage.src}
            fallbackSrc={backgroundImage.fallbackSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            lazy={false}
          />
        )
      ) : (
        <div className="absolute inset-0 gradient-dark" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity * 0.6}) 0%, rgba(0,0,0,${overlayOpacity}) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-10 md:pb-14">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-background/60 mb-4 flex-wrap">
            <Link to="/" className="hover:text-background/90 flex items-center gap-1 transition-colors">
              <Home className="h-3 w-3" /> Home
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 shrink-0" />
                {item.href ? (
                  <Link to={item.href} className="hover:text-background/90 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-background/90 font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <span className="inline-block text-xs font-body font-semibold text-accent tracking-widest uppercase mb-3">
            🏔 {badge}
          </span>
        )}

        {/* Title */}
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-background leading-tight max-w-3xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-body text-sm md:text-base text-background/70 mt-3 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Quick Facts Strip */}
        {quickFacts && quickFacts.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-2">
                <span className="text-xs text-background/50 uppercase tracking-wide font-body">{fact.label}</span>
                <span className="text-sm font-semibold text-background font-body">{fact.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
