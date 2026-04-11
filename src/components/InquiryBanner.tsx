import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

interface InquiryBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  urgencyText?: string;
  /** WhatsApp pre-filled message */
  waMessage?: string;
  variant?: "primary" | "accent";
}

const InquiryBanner = ({
  title = "Ready to Plan Your Perfect Trip?",
  subtitle = "Talk to our Himalayan travel experts — free consultation, personalised itinerary, no advance payment required.",
  ctaText = "Get Free Quote",
  urgencyText,
  waMessage = "Hi! I'm interested in planning a trip.",
  variant = "primary",
}: InquiryBannerProps) => {
  const { track } = useAnalytics();

  const bg = variant === "accent"
    ? "gradient-accent"
    : "gradient-primary";

  return (
    <section className={`${bg} py-14 px-4`}>
      <div className="container mx-auto text-center">
        {urgencyText && (
          <p className="text-xs font-body font-semibold text-primary-foreground/70 uppercase tracking-widest mb-3">
            ⚡ {urgencyText}
          </p>
        )}
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-3 leading-tight">
          {title}
        </h2>
        <p className="font-body text-sm md:text-base text-primary-foreground/75 max-w-xl mx-auto mb-8">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 text-base shadow-elevated"
            onClick={() => track("cta_click", { source: "inquiry_banner", label: ctaText })}
          >
            <Link to="/contact">
              {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "inquiry_banner" })}
            className="flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-white/40 text-primary-foreground hover:bg-white/10 transition-all font-body font-medium text-base"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-primary-foreground/60">
          <span>✅ Response within 2 hours</span>
          <span>✅ No advance payment required</span>
          <span>✅ 100% free consultation</span>
        </div>
      </div>
    </section>
  );
};

export default InquiryBanner;
