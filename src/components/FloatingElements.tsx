import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { FloatingContactBar } from "./FloatingContactBar";
import { motion, AnimatePresence } from "framer-motion";

// Cognitive Load fix: remove all mobile floating elements
// Desktop: keep single scroll-to-top + FloatingContactBar (WhatsApp only)
// Fitts's Law: scroll-to-top appears top-right on desktop only
const FloatingElements = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Trigger only after 600px scroll — user needs it, not before
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* FloatingContactBar: WhatsApp-only on desktop */}
      <FloatingContactBar />

      {/* Scroll to Top — desktop only, top-right, appears late */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden lg:flex fixed bottom-8 right-20 z-40 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm text-white items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingElements;
