import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { DestinationGuideContent } from "@/data/destination-seo-content";
import type { TourPackage } from "@/data/packages";

const LAST_UPDATED = "June 2026";

interface DestinationSeoSectionsProps {
  destinationName: string;
  stateName: string;
  guide: DestinationGuideContent;
  relatedPackages?: TourPackage[];
}

export function DestinationSeoSections({
  destinationName,
  stateName,
  guide,
  relatedPackages = [],
}: DestinationSeoSectionsProps) {
  return (
    <section className="mt-12 space-y-10 border-t border-border/50 pt-10">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/50 bg-surface p-6">
          <h2 className="font-display text-xl font-bold mb-2">
            Best time to visit {destinationName}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{guide.bestTimeSummary}</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-surface p-6">
          <h2 className="font-display text-xl font-bold mb-2">
            How many days for {destinationName}?
          </h2>
          <p className="text-muted-foreground leading-relaxed">{guide.recommendedDays}</p>
        </div>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold mb-4">
          Plan your {destinationName} trip — FAQs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {guide.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {relatedPackages.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">
            {stateName} tour packages
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedPackages.map((pkg) => (
              <li key={pkg.slug}>
                <Link
                  to={`/packages/${pkg.categories[0] || "all"}/${pkg.slug}`}
                  className="block rounded-xl border border-border/50 p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <span className="font-semibold text-foreground">{pkg.title}</span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {pkg.duration.days} days · from ₹
                    {pkg.price.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
