import { MessageCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const BottomNav = () => {
  const { track } = useAnalytics();

  const handleWhatsApp = () => {
    track("whatsapp_click", { source: "sticky_mobile_cta" });
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href="https://wa.me/917668741373?text=Hi!%20I'm%20interested%20in%20planning%20a%20trip."
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-[#25D366] text-white font-bold text-[17px] shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:bg-[#20bd5a] transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
        Plan My Trip on WhatsApp
      </a>
    </nav>
  );
};

export default BottomNav;
