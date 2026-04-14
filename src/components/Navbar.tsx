import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinationsData } from "@/data/destinations";
import { experienceCategories } from "@/data/experiences";
import DestinationsMegaMenu from "./navigation/DestinationsMegaMenu";
import TourPackagesMegaMenu from "./navigation/TourPackagesMegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { useTripPlanner } from "@/contexts/TripPlannerContext";

const Navbar = () => {
  const { openPlanner } = useTripPlanner();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={`sticky top-0 z-50 transition-all duration-300 navbar-glass ${
        scrolled ? "scrolled py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="MyQuickTrippers Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col justify-center">
            <span className="font-display text-xl font-bold text-foreground tracking-tight leading-none">MQT</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-muted-foreground font-body mt-0.5 font-semibold">MyQuickTrippers</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center gap-1"
        >
          <motion.div variants={staggerItem}>
            <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
          </motion.div>

          {/* Destinations Mega Menu */}
          <motion.div
            variants={staggerItem}
            className="relative"
            onMouseEnter={() => setActiveDropdown("destinations")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Destinations <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {activeDropdown === "destinations" && (
                <DestinationsMegaMenu />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tour Packages Dropdown */}
          <motion.div
            variants={staggerItem}
            className="relative"
            onMouseEnter={() => setActiveDropdown("packages")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Tour Packages <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {activeDropdown === "packages" && (
                <TourPackagesMegaMenu />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Link to="/blog" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </motion.div>
        </motion.div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button onClick={() => openPlanner()} variant="default" size="sm" className="gradient-primary text-primary-foreground font-medium">
            Get Free Quote
          </Button>
          <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <a href="tel:+919876543210"><Phone className="h-3.5 w-3.5 mr-1" /> Call Now</a>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[56px] bg-background z-40 overflow-y-auto"
          >
            <div className="p-4 space-y-1">
              <Link to="/" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Home</Link>

              {/* Mobile Destinations Accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                  onClick={() => setMobileAccordion(mobileAccordion === "dest" ? null : "dest")}
                >
                  Destinations <ChevronDown className={`h-4 w-4 transition-transform ${mobileAccordion === "dest" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileAccordion === "dest" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-4 space-y-2 mt-2">
                        {destinationsData.map((dest) => (
                          <Link key={dest.slug} to={`/destinations/${dest.stateSlug || "india"}/${dest.slug}`} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                            {dest.name}
                          </Link>
                        ))}
                        <Link to="/destinations" className="block py-1.5 text-sm font-medium text-primary mt-2" onClick={() => setMobileOpen(false)}>
                          View All Destinations
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Tour Packages Accordion */}
              <div className="border-b border-border">
                <button
                  className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                  onClick={() => setMobileAccordion(mobileAccordion === "pkg" ? null : "pkg")}
                >
                  Tour Packages <ChevronDown className={`h-4 w-4 transition-transform ${mobileAccordion === "pkg" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileAccordion === "pkg" && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-4 space-y-2 mt-2">
                        {experienceCategories.map((item) => (
                          <Link key={item.slug} to={`/packages/${item.slug}`} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                            {item.title}
                          </Link>
                        ))}
                        <Link to="/packages" className="block py-1.5 text-sm font-medium text-primary mt-2" onClick={() => setMobileOpen(false)}>
                          View All Packages
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/about" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>About Us</Link>
              <Link to="/blog" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link to="/contact" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Contact</Link>

              <div className="pt-4 space-y-3">
                <Button onClick={() => { setMobileOpen(false); openPlanner(); }} className="w-full gradient-primary text-primary-foreground font-medium">
                  Get Free Quote
                </Button>
                <Button asChild variant="outline" className="w-full border-primary text-primary" onClick={() => setMobileOpen(false)}>
                  <a href="tel:+919876543210"><Phone className="h-4 w-4 mr-2" /> Call Now</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
