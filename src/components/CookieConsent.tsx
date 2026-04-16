import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mqt_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('mqt_cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('mqt_cookie_consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 pointer-events-none"
        >
          <div className="bg-background border border-border shadow-2xl rounded-2xl p-5 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1">We use cookies 🍪</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, serve personalized recommendations using our AI models, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies as described in our <Link to="/privacy-policy" className="text-primary underline underline-offset-2">Privacy Policy</Link>.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0 w-full md:w-auto">
              <Button variant="outline" onClick={decline} className="flex-1 md:flex-none">
                Decline Essential
              </Button>
              <Button onClick={accept} className="flex-1 md:flex-none">
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}