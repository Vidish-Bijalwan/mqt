import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "918171158569";
const WHATSAPP_MESSAGE = "Hi MyQuickTrippers! I'd like to plan a trip. Can you help me?";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  // Show the chat bubble popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat bubble popup */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="relative max-w-[220px]"
          >
            <div className="bg-white text-gray-800 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl text-sm font-body leading-relaxed">
              <p className="font-semibold text-[#075E54] mb-1">MyQuickTrippers 🏔️</p>
              <p>Hi! Ready to plan your dream trip? Chat with us on WhatsApp!</p>
            </div>
            {/* Tail */}
            <div className="absolute -bottom-2 right-3 w-4 h-4 bg-white clip-bubble shadow-xl" 
                 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} 
            />
            <button
              onClick={() => setShowBubble(false)}
              aria-label="Close WhatsApp chat bubble"
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <X size={10} className="text-gray-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MyQuickTrippers on WhatsApp"
        id="whatsapp-float-btn"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
        <MessageCircle size={28} className="text-white fill-white relative z-10" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
