import { MessageCircle, Phone } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface StickyMobileCTAProps {
  price?: number;
  label?: string;
  whatsappText?: string;
  onEnquireClick?: () => void;
}

const StickyMobileCTA = ({
  price,
  label = "Enquire Now",
  whatsappText = "Hi! I'm interested in this tour package.",
  onEnquireClick,
}: StickyMobileCTAProps) => {
  const { track } = useAnalytics();

  const handleWhatsApp = () => {
    track("whatsapp_click", { source: "sticky_mobile_cta" });
  };

  const handleEnquire = () => {
    track("enquiry_open", { source: "sticky_mobile_cta" });
    onEnquireClick?.();
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-elevated flex items-center gap-2 px-4 py-3">
      {/* Price */}
      {price && (
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-body">Starting from</p>
          <p className="font-body font-bold text-accent text-lg leading-tight">
            ₹{price.toLocaleString("en-IN")}
            <span className="text-xs font-normal text-muted-foreground">/person</span>
          </p>
        </div>
      )}

      {/* WhatsApp */}
      <a
        href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-success text-success-foreground shrink-0"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      {/* Enquire / Book */}
      <button
        onClick={handleEnquire}
        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl gradient-accent text-accent-foreground font-body font-semibold text-sm"
      >
        <Phone className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
};

export default StickyMobileCTA;
