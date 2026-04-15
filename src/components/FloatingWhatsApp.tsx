import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { track } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowTooltip(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Auto show tooltip after 5 seconds if visible
    const timer = setTimeout(() => {
      if (window.scrollY > 300) {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div 
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="hidden md:flex items-center bg-white shadow-elevated rounded-lg p-3 text-sm font-body border border-border relative shadow-lg"
              >
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-border rotate-45 transform" />
                <div className="pr-2">
                  <p className="font-semibold text-foreground">Need help planning?</p>
                  <p className="text-xs text-muted-foreground">Chat with our expert now!</p>
                </div>
                <button 
                  onClick={() => setShowTooltip(false)}
                  className="text-muted-foreground hover:text-foreground ml-2 p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href="https://wa.me/917668741373?text=Hi!%20I'm%20exploring%20MyQuickTrippers%20and%20need%20some%20help."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "floating_widget" })}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] z-50 cursor-pointer"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
