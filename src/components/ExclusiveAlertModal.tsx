import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/contact";

export const ExclusiveAlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    // Check localStorage for the 24-hour rule
    const LAST_SEEN_KEY = 'mqt_exclusive_alert_last_seen';
    const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
    const now = Date.now();

    if (!lastSeen || (now - parseInt(lastSeen, 10)) > 24 * 60 * 60 * 1000) {
      // 3 second delay before showing
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem(LAST_SEEN_KEY, now.toString());
      }, 3000);
      
      // Show close button after 8 seconds of modal being open
      const closeTimer = setTimeout(() => {
        setShowCloseButton(true);
      }, 11000); // 3s + 8s
      
      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, []);

  if (!isOpen) return null;

  const packages = [
    { name: "Harshil Valley", duration: "4 Days", fillPercent: 65, link: "/packages/exclusive/harshil-valley-4-day-package" },
    { name: "Gangotri Dham", duration: "4 Days", fillPercent: 78, link: "/packages/pilgrimage/gangotri-4-day-package" },
    { name: "Nelang Valley (ILP)", duration: "1 Day", fillPercent: 82, link: "/packages/exclusive/nelang-valley-day-trip" },
    { name: "Darang Village (ILP)", duration: "1 Day", fillPercent: 60, link: "/packages/exclusive/darang-village-day-trip" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Blurred Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => showCloseButton && setIsOpen(false)}
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[480px] bg-[#0F172A] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-[#F59E0B]/30 flex flex-col"
        >
          {showCloseButton && (
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="relative h-[200px] w-full shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1280" 
              alt="Exclusive Mountain Destination" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = ''; e.currentTarget.className="w-full h-full bg-gradient-to-b from-gray-800 to-[#0F172A]" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block bg-[#F59E0B] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-lg">
                Exclusive Drop
              </span>
              <h2 className="text-white text-2xl font-display font-bold leading-tight drop-shadow-md">
                India's Most Restricted Frontiers
              </h2>
            </div>
          </div>

          {/* Body Section */}
          <div className="p-6 pt-0">
            <p className="text-[14px] font-medium text-[#94A3B8] mb-6 leading-relaxed">
              We've unlocked highly limited permits for Harshil Valley, Gangotri, Nelang Valley & Darang. Bookings are open but filling rapidly.
            </p>

            <div className="space-y-4 mb-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{pkg.name}</span>
                      <span className="bg-[#1E293B] text-gray-300 text-[10px] px-2 py-0.5 rounded font-mono tracking-wider">{pkg.duration}</span>
                    </div>
                    <Link to={pkg.link} onClick={() => setIsOpen(false)} className="text-[#F59E0B] text-[12px] font-semibold hover:underline">
                      View Package →
                    </Link>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706]" style={{ width: `${pkg.fillPercent}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4">
              <a 
                href={getWhatsAppUrl("Hi MQT! I'm interested in the new exclusive packages. Can you share availability?")}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold flex items-center justify-center transition-colors shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Check Availability on WhatsApp
              </a>
              <div className="text-center">
                <Link 
                  to="/packages" 
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-[#94A3B8] hover:text-white transition-colors"
                >
                  Explore All Packages
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
