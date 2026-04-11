import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinationsMega = {
  "Himalayan Highlights": [
    { name: "Kedarnath Yatra", href: "/destinations/kedarnath" },
    { name: "Valley of Flowers", href: "/destinations/valley-of-flowers" },
    { name: "Char Dham Yatra", href: "/destinations/char-dham" },
    { name: "Badrinath", href: "/destinations/badrinath" },
    { name: "Gangotri & Yamunotri", href: "/destinations/gangotri" },
    { name: "Kedarkantha Trek", href: "/destinations/kedarkantha" },
  ],
  "North India": [
    { name: "Ladakh & Leh", href: "/destinations/ladakh" },
    { name: "Kashmir", href: "/destinations/kashmir" },
    { name: "Himachal Pradesh", href: "/destinations/manali" },
    { name: "Spiti Valley", href: "/destinations/spiti" },
    { name: "Rishikesh & Haridwar", href: "/destinations/rishikesh" },
    { name: "Varanasi & Prayagraj", href: "/destinations/varanasi" },
  ],
  "Rest of India": [
    { name: "Rajasthan", href: "/destinations/rajasthan" },
    { name: "Kerala", href: "/destinations/kerala" },
    { name: "Goa", href: "/destinations/goa" },
    { name: "Andaman & Nicobar", href: "/destinations/andaman" },
    { name: "North East India", href: "/destinations/northeast" },
    { name: "South India", href: "/destinations/south-india" },
  ],
  "International": [
    { name: "Nepal", href: "/destinations/nepal" },
    { name: "Bhutan", href: "/destinations/bhutan" },
    { name: "Sri Lanka", href: "/destinations/srilanka" },
    { name: "Maldives", href: "/destinations/maldives" },
    { name: "Thailand", href: "/destinations/thailand" },
    { name: "Dubai", href: "/destinations/dubai" },
  ],
};

const tourTypes = [
  { name: "Honeymoon Packages", href: "/packages/honeymoon" },
  { name: "Family Tour Packages", href: "/packages/family" },
  { name: "Solo Travel Packages", href: "/packages/solo" },
  { name: "Pilgrimage Packages", href: "/packages/pilgrimage" },
  { name: "Adventure Packages", href: "/packages/adventure" },
  { name: "Group Tour Packages", href: "/packages/group" },
  { name: "Budget Packages", href: "/packages/budget" },
  { name: "Luxury Packages", href: "/packages/luxury" },
  { name: "Weekend Getaways", href: "/packages/weekend" },
];

const services = [
  { name: "Holiday Packages", href: "/services/holiday-packages" },
  { name: "Hotel Booking", href: "/services/hotel-booking" },
  { name: "Flight Booking", href: "/services/flight-booking" },
  { name: "Cab / Transfer Booking", href: "/services/cab-booking" },
  { name: "Trek Booking", href: "/services/trek-booking" },
  { name: "Travel Insurance", href: "/services/travel-insurance" },
  { name: "Visa Assistance", href: "/services/visa-assistance" },
  { name: "Customised Itinerary", href: "/services/custom-itinerary" },
];

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
                <div className="bg-background rounded-lg shadow-elevated border border-border p-6 grid grid-cols-4 gap-8 min-w-[720px]">
                  {Object.entries(destinationsMega).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-body font-semibold text-sm text-primary mb-3 tracking-wide uppercase">{category}</h4>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-4 border-t border-border pt-4 flex gap-4">
                    <Link to="/destinations" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                      View All Destinations →
                    </Link>
                    <Link to="/services/custom-itinerary" className="text-sm font-medium text-accent hover:text-accent-light transition-colors">
                      Custom Itinerary →
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
                  {tourTypes.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-surface hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "services" && (
              <div className="absolute left-0 top-full pt-2 animate-fade-in">
                <div className="bg-background rounded-lg shadow-elevated border border-border py-2 min-w-[220px]">
                  {services.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-surface hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
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
          <Button variant="default" size="sm" className="gradient-primary text-primary-foreground font-medium">
            Get Free Quote
          </Button>
          <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Phone className="h-3.5 w-3.5 mr-1" /> Call Now
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
                <div className="pb-3 pl-4 space-y-2">
                  {Object.entries(destinationsMega).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-2 mb-1">{cat}</p>
                      {items.map((item) => (
                        <Link key={item.name} to={item.href} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
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
                <div className="pb-3 pl-4 space-y-2">
                  {tourTypes.map((item) => (
                    <Link key={item.name} to={item.href} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services Accordion */}
            <div className="border-b border-border">
              <button
                className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                onClick={() => setMobileAccordion(mobileAccordion === "svc" ? null : "svc")}
              >
                Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileAccordion === "svc" ? "rotate-180" : ""}`} />
              </button>
              {mobileAccordion === "svc" && (
                <div className="pb-3 pl-4 space-y-2">
                  {services.map((item) => (
                    <Link key={item.name} to={item.href} className="block py-1.5 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link to="/blog" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link to="/contact" className="block py-3 text-foreground font-medium border-b border-border" onClick={() => setMobileOpen(false)}>Contact</Link>

            <div className="pt-4 space-y-3">
              <Button className="w-full gradient-primary text-primary-foreground font-medium">Get Free Quote</Button>
              <Button variant="outline" className="w-full border-primary text-primary">
                <Phone className="h-4 w-4 mr-2" /> Call Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
