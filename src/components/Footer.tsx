import { Link } from "react-router-dom";
import { Mountain, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-dark text-dark-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Mountain className="h-7 w-7 text-accent" />
              <span className="font-display text-xl font-semibold">MyQuickTrippers</span>
            </Link>
            <p className="text-sm text-dark-foreground/60 mb-4 italic">"Your Himalayan Journey, Perfectly Crafted"</p>
            <div className="space-y-2 text-sm text-dark-foreground/70">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-3.5 w-3.5" /> +91-9876543210
              </a>
              <a href="mailto:info@myquicktrippers.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-3.5 w-3.5" /> info@myquicktrippers.com
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-dark-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-dark-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-dark-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-dark-foreground/10 flex items-center justify-center hover:bg-success transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-body font-semibold text-sm text-dark-foreground mb-4 tracking-wide uppercase">Destinations</h4>
            <ul className="space-y-2 text-sm text-dark-foreground/60">
              <li><Link to="/destinations/uttarakhand/kedarnath" className="hover:text-accent transition-colors">Kedarnath Yatra</Link></li>
              <li><Link to="/destinations/ladakh/ladakh" className="hover:text-accent transition-colors">Ladakh Tour</Link></li>
              <li><Link to="/destinations/uttarakhand/valley-of-flowers" className="hover:text-accent transition-colors">Valley of Flowers</Link></li>
              <li><Link to="/destinations/jammu-and-kashmir/kashmir" className="hover:text-accent transition-colors">Kashmir Tour</Link></li>
              <li><Link to="/destinations/himachal-pradesh/manali" className="hover:text-accent transition-colors">Manali Tour</Link></li>
              <li><Link to="/destinations/uttar-pradesh/varanasi" className="hover:text-accent transition-colors">Varanasi Tour</Link></li>
              <li><Link to="/destinations/uttarakhand/char-dham" className="hover:text-accent transition-colors">Char Dham Yatra</Link></li>
              <li><Link to="/destinations" className="text-accent hover:underline">View All →</Link></li>
            </ul>
          </div>

          {/* Tour Types */}
          <div>
            <h4 className="font-body font-semibold text-sm text-dark-foreground mb-4 tracking-wide uppercase">Tour Types</h4>
            <ul className="space-y-2 text-sm text-dark-foreground/60">
              <li><Link to="/packages/honeymoon" className="hover:text-accent transition-colors">Honeymoon Packages</Link></li>
              <li><Link to="/packages/family" className="hover:text-accent transition-colors">Family Tour Packages</Link></li>
              <li><Link to="/packages/adventure" className="hover:text-accent transition-colors">Adventure Packages</Link></li>
              <li><Link to="/packages/pilgrimage" className="hover:text-accent transition-colors">Pilgrimage Tours</Link></li>
              <li><Link to="/packages/solo" className="hover:text-accent transition-colors">Solo Travel</Link></li>
              <li><Link to="/packages/luxury" className="hover:text-accent transition-colors">Luxury Packages</Link></li>
              <li><Link to="/packages/weekend" className="hover:text-accent transition-colors">Weekend Getaways</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body font-semibold text-sm text-dark-foreground mb-4 tracking-wide uppercase">Services</h4>
            <ul className="space-y-2 text-sm text-dark-foreground/60">
              <li><Link to="/services/custom-itinerary" className="hover:text-accent transition-colors">Custom Itinerary</Link></li>
              <li><Link to="/services/hotel-booking" className="hover:text-accent transition-colors">Hotel Booking</Link></li>
              <li><Link to="/services/flight-booking" className="hover:text-accent transition-colors">Flight Booking</Link></li>
              <li><Link to="/services/cab-booking" className="hover:text-accent transition-colors">Cab Booking</Link></li>
              <li><Link to="/services/travel-insurance" className="hover:text-accent transition-colors">Travel Insurance</Link></li>
              <li><Link to="/services/visa-assistance" className="hover:text-accent transition-colors">Visa Assistance</Link></li>
              <li><Link to="/services/trek-booking" className="hover:text-accent transition-colors">Trek Booking</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-semibold text-sm text-dark-foreground mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-2 text-sm text-dark-foreground/60">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Blog / Journal</Link></li>
              <li><Link to="/testimonials" className="hover:text-accent transition-colors">Testimonials</Link></li>
              <li><Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-accent transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-foreground/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-dark-foreground/50">
          <span>© 2025 MyQuickTrippers. All Rights Reserved.</span>
          <span>Designed with ❤ for Himalayan explorers</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
