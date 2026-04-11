import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, Phone, Mail, Home } from "lucide-react";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { motion, AnimatePresence } from "framer-motion";

const FloatingElements = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <FloatingWhatsApp />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-card"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 gradient-primary">
        <div className="grid grid-cols-4 gap-0">
          <a href="tel:+919876543210" className="flex flex-col items-center justify-center py-2.5 text-primary-foreground hover:bg-primary-dark transition-colors">
            <Phone className="h-5 w-5" />
            <span className="text-[10px] mt-0.5 font-medium">Call</span>
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-2.5 text-primary-foreground hover:bg-primary-dark transition-colors">
            <MessageCircle className="h-5 w-5" />
            <span className="text-[10px] mt-0.5 font-medium">WhatsApp</span>
          </a>
          <a href="#enquiry" className="flex flex-col items-center justify-center py-2.5 text-primary-foreground hover:bg-primary-dark transition-colors">
            <Mail className="h-5 w-5" />
            <span className="text-[10px] mt-0.5 font-medium">Enquire</span>
          </a>
          <a href="/" className="flex flex-col items-center justify-center py-2.5 text-primary-foreground hover:bg-primary-dark transition-colors">
            <Home className="h-5 w-5" />
            <span className="text-[10px] mt-0.5 font-medium">Home</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingElements;
