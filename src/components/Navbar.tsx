import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinationsData } from "@/data/destinations";
import { experienceCategories } from "@/data/experiences";

const Navbar = () => {
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/97 shadow-elevated backdrop-blur-xl py-2"
          : "bg-background py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Mountain className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <div>
            <span className="font-display text-xl font-semibold text-foreground">MyQuickTrippers</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>

          {/* Destinations Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("destinations")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Destinations <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "destinations" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 animate-fade-in" style={{ animationDelay: "0s" }}>
                <div className="bg-background rounded-lg shadow-elevated border border-border p-6 min-w-[500px]">
                  <h4 className="font-body font-semibold text-sm text-primary mb-3 tracking-wide uppercase">Popular Destinations</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {destinationsData.slice(0, 8).map((dest) => (
                      <Link
                        key={dest.slug}
                        to={`/destinations/${dest.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <img src={dest.image} alt="" className="w-8 h-8 rounded-md object-cover" />
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 mt-4 flex gap-4">
                    <Link to="/destinations" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                      View All Destinations →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tour Packages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("packages")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Tour Packages <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "packages" && (
              <div className="absolute left-0 top-full pt-2 animate-fade-in">
                <div className="bg-background rounded-lg shadow-elevated border border-border py-2 min-w-[220px]">
                  {experienceCategories.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/packages/${item.slug}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-surface hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-border"></div>
                  <Link to="/packages" className="block px-4 py-2 text-sm font-medium text-primary hover:bg-surface transition-colors">
                    View All Packages
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to="/blog" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="default" size="sm" className="gradient-primary text-primary-foreground font-medium">
            <Link to="/contact">Get Free Quote</Link>
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
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[56px] bg-background z-40 overflow-y-auto animate-fade-in">
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
              {mobileAccordion === "dest" && (
                <div className="pb-3 pl-4 space-y-2 mt-2">
                  {destinationsData.map((dest) => (
                    <Link key={dest.slug} to={`/destinations/${dest.slug}`} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                      {dest.name}
                    </Link>
                  ))}
                  <Link to="/destinations" className="block py-1.5 text-sm font-medium text-primary mt-2" onClick={() => setMobileOpen(false)}>
                    View All Destinations
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Tour Packages Accordion */}
            <div className="border-b border-border">
              <button
                className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                onClick={() => setMobileAccordion(mobileAccordion === "pkg" ? null : "pkg")}
              >
                Tour Packages <ChevronDown className={`h-4 w-4 transition-transform ${mobileAccordion === "pkg" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "pkg" && (
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
              )}
            </div>

            <Link to="/about" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link to="/blog" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Contact</Link>

            <div className="pt-4 space-y-3">
              <Button asChild className="w-full gradient-primary text-primary-foreground font-medium" onClick={() => setMobileOpen(false)}>
                <Link to="/contact">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-primary text-primary" onClick={() => setMobileOpen(false)}>
                <a href="tel:+919876543210"><Phone className="h-4 w-4 mr-2" /> Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
