import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, User, ChevronDown } from "lucide-react";
import { useTripPlanner } from "@/contexts/TripPlannerContext";
import DestinationsMegaMenu from "./navigation/DestinationsMegaMenu";
import TourPackagesMegaMenu from "./navigation/TourPackagesMegaMenu";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { openPlanner } = useTripPlanner();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu exclusively on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
        scrolled ? "shadow-[0_4px_20px_rgb(0,0,0,0.05)] py-2.5 md:py-3" : "py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Home">
            <img 
              src="/logo.png" 
              alt="MyQuickTrippers" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col justify-center">
              <span className="font-display text-xl md:text-2xl font-bold text-[#111111] tracking-tight leading-none">MQT</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold mt-0.5 whitespace-nowrap">MyQuickTrippers</span>
            </div>
          </Link>

          {/* Desktop Nav (Center) */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 flex-1 px-8">
            <Link to="/" className={`text-[15px] font-semibold tracking-wide transition-colors duration-200 hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm ${location.pathname === "/" ? "text-amber-500" : "text-[#111111]"}`}>Home</Link>
            
            <div className="relative py-2" onMouseEnter={() => setActiveDropdown("destinations")} onMouseLeave={() => setActiveDropdown(null)}>
              <div className="flex items-center gap-1 cursor-pointer text-[15px] font-semibold tracking-wide text-[#111111] hover:text-amber-500 transition-colors duration-200">
                Destinations <ChevronDown className="h-3.5 w-3.5" />
              </div>
              <AnimatePresence>{activeDropdown === "destinations" && <DestinationsMegaMenu />}</AnimatePresence>
            </div>

            <div className="relative py-2" onMouseEnter={() => setActiveDropdown("packages")} onMouseLeave={() => setActiveDropdown(null)}>
              <div className="flex items-center gap-1 cursor-pointer text-[15px] font-semibold tracking-wide text-[#111111] hover:text-amber-500 transition-colors duration-200">
                Packages <ChevronDown className="h-3.5 w-3.5" />
              </div>
              <AnimatePresence>{activeDropdown === "packages" && <TourPackagesMegaMenu />}</AnimatePresence>
            </div>

            <Link to="/about" className={`text-[15px] font-semibold tracking-wide transition-colors duration-200 hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm ${location.pathname === "/about" ? "text-amber-500" : "text-[#111111]"}`}>About</Link>
            <Link to="/contact" className={`text-[15px] font-semibold tracking-wide transition-colors duration-200 hover:text-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm ${location.pathname === "/contact" ? "text-amber-500" : "text-[#111111]"}`}>Contact</Link>
          </nav>

          {/* Desktop CTA & Mobile controls (Right) */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* User Account / Login */}
            <Link to="/profile" className="hidden lg:flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-[#111111] hover:bg-gray-50 hover:border-amber-200 hover:text-amber-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" aria-label="User Account">
              <User className="h-4 w-4" />
            </Link>
            {/* Primary CTA (Visible on Desktop & Mobile!) */}
            <button
              onClick={() => openPlanner()}
              className="group flex items-center justify-center gap-1.5 px-5 md:px-6 py-2.5 md:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 text-white font-bold text-sm md:text-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              aria-label="Plan My Trip"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-[#111111] hover:text-amber-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`lg:hidden fixed inset-x-0 bottom-0 top-[65px] bg-white transition-all duration-300 ease-in-out z-40 overflow-y-auto border-t border-gray-100 ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-4 py-8 space-y-3">
            <Link to="/" className={`block px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname === "/" ? "bg-amber-50 text-amber-600" : "text-[#111111] hover:bg-gray-50"}`}>Home</Link>
            <Link to="/destinations" className={`block px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname.startsWith("/destinations") ? "bg-amber-50 text-amber-600" : "text-[#111111] hover:bg-gray-50"}`}>Destinations</Link>
            <Link to="/packages" className={`block px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname.startsWith("/packages") ? "bg-amber-50 text-amber-600" : "text-[#111111] hover:bg-gray-50"}`}>Packages</Link>
            <Link to="/about" className={`block px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname === "/about" ? "bg-amber-50 text-amber-600" : "text-[#111111] hover:bg-gray-50"}`}>About</Link>
            <Link to="/contact" className={`block px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname === "/contact" ? "bg-amber-50 text-amber-600" : "text-[#111111] hover:bg-gray-50"}`}>Contact</Link>
            <Link to="/profile" className={`flex items-center gap-3 px-5 py-4 text-lg font-bold rounded-xl transition-colors active:scale-[0.98] ${location.pathname === "/profile" ? "bg-amber-50 text-amber-600" : "text-amber-500 bg-amber-50 hover:bg-amber-100"}`}>
              <User className="h-5 w-5" /> My Account
            </Link>
          
          <div className="pt-8 px-5 mt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Contact Us Directly</p>
            <a href="tel:+917668741373" className="block text-[#111111] font-bold text-xl mb-2 hover:text-amber-500">+91 76687 41373</a>
            <a href="mailto:myquicktrippers@gmail.com" className="block text-gray-600 font-medium hover:text-amber-500">myquicktrippers@gmail.com</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
