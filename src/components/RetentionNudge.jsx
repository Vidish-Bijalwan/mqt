import { useState, useEffect, useRef } from "react";
import { X, Sparkles, MessageCircle } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

const RetentionNudge = () => {
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const startTime = useRef(Date.now());
  const clicks = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile, only show after scrolling 50%
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsScrolled(scrolled > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const trackClick = () => { clicks.current += 1; };
    window.addEventListener("click", trackClick);

    const checker = setInterval(() => {
      if (showNudge || nudgeDismissed) return;
      
      const consent = localStorage.getItem('mqt_cookie_consent');
      if (consent === 'declined') return;

      const timeOnPage = (Date.now() - startTime.current) / 1000;
      
      if (timeOnPage > 20 && clicks.current < 5) {
        setShowNudge(true);
      }
    }, 15000);

    return () => {
      window.removeEventListener("click", trackClick);
      clearInterval(checker);
    };
  }, [showNudge, nudgeDismissed]);

  if (!showNudge || nudgeDismissed) return null;

  return (
    <>
      {/* Mobile: Sticky Bottom Bar (only shows after 50% scroll) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 pb-safe z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-in-out ${isScrolled ? 'translate-y-0' : 'translate-y-[120%]'}`}>
        <button 
          onClick={() => setNudgeDismissed(true)}
          className="absolute -top-3 right-4 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-slate-900 leading-tight">Need a custom itinerary?</p>
            <p className="text-[11px] text-slate-500 truncate">Our experts can plan it for free.</p>
          </div>
          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNudgeDismissed(true)}
            className="shrink-0 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-emerald-700"
          >
            Chat Now
          </a>
        </div>
      </div>

      {/* Desktop: Compact Floating Pill (Bottom Right, avoiding WhatsApp icon) */}
      <div className="hidden md:flex fixed bottom-24 right-6 z-40 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-4 max-w-[280px] animate-in slide-in-from-bottom-8 fade-in duration-500">
        <button 
          onClick={() => setNudgeDismissed(true)}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3 pt-1">
          <div className="mt-0.5">
            <span className="text-2xl">💡</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight mb-0.5">Still deciding?</h4>
              <p className="text-xs text-slate-500 leading-snug pr-4">
                Chat with an expert to customise a trip matching your exact budget and dates.
              </p>
            </div>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setNudgeDismissed(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors self-start"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Ask an Expert
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetentionNudge;
