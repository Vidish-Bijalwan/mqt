import { MessageCircle, Phone, Compass } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTripPlanner } from "@/contexts/TripPlannerContext";

interface StickyMobileCTAProps {
  isEnquiryOnly?: boolean;
  label?: string;
  whatsappText?: string;
  onEnquireClick?: () => void;
}

const StickyMobileCTA = ({
  isEnquiryOnly,
  label = "Get Custom Quote",
  whatsappText = "Hi! I'm interested in this trip. Please share a tailored quote.",
  onEnquireClick,
}: StickyMobileCTAProps) => {
  const { track } = useAnalytics();
  const { openPlanner } = useTripPlanner();

  const handleWhatsApp = () => {
    track("whatsapp_click", { source: "sticky_mobile_cta" });
  };

  const handleEnquire = () => {
    track("enquiry_open", { source: "sticky_mobile_cta" });
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      openPlanner({}, 'sticky_mobile');
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border shadow-elevated flex items-center gap-2 px-4 py-3">
      {/* Info Block */}
      <div className="flex-1 min-w-0">
        <p className="font-body font-bold text-accent text-[15px] leading-tight">
          Request Pricing
        </p>
        <p className="text-[11px] text-muted-foreground font-body">Tailored for your dates</p>
      </div>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/917668741373?text=${encodeURIComponent(whatsappText)}`}
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
        <Compass className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
};

export default StickyMobileCTA;
