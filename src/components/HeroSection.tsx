import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-kedarnath.jpg";

const stats = [
  { icon: "🏔", label: "200+ Trips Completed" },
  { icon: "⭐", label: "4.9 Rated" },
  { icon: "😊", label: "500+ Happy Travellers" },
  { icon: "📅", label: "5+ Years Experience" },
];

const popularTags = ["Kedarnath", "Ladakh", "Valley of Flowers", "Kashmir", "Varanasi"];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="Majestic Kedarnath Temple with snow-capped Himalayan peaks at sunrise"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 gradient-hero" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-16 pb-32">
        <p className="text-accent font-body font-medium text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          🏔 Himalayan Travel Experts Since 2019
        </p>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-background leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Discover the Soul<br className="hidden md:block" /> of the Himalayas
        </h1>

        <p className="font-body text-base md:text-lg text-background/70 max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Handcrafted journeys to Kedarnath, Ladakh, Valley of Flowers and beyond — built around you, not a template.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Button size="lg" className="gradient-accent text-accent-foreground font-semibold px-8 text-base hover:scale-[1.02] transition-transform">
            Explore Packages
          </Button>
          <Button size="lg" variant="outline" className="border-background/40 text-background hover:bg-background/10 font-medium px-8 text-base">
            Plan Custom Trip →
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-2 text-background/80 text-sm">
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
              {i < stats.length - 1 && <span className="hidden md:inline text-background/30 ml-4">|</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Search Widget */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4">
        <div className="container mx-auto -mb-12">
          <div className="bg-background rounded-xl shadow-elevated p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                  <option value="">Destination</option>
                  <option>Kedarnath</option>
                  <option>Ladakh</option>
                  <option>Kashmir</option>
                  <option>Valley of Flowers</option>
                  <option>Varanasi</option>
                  <option>Manali</option>
                </select>
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="date" className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                  <option value="">Travellers</option>
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3–4 People</option>
                  <option>5+ People</option>
                </select>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                  <option value="">Tour Type</option>
                  <option>Honeymoon</option>
                  <option>Family</option>
                  <option>Adventure</option>
                  <option>Pilgrimage</option>
                  <option>Solo</option>
                </select>
              </div>
              <Button className="gradient-primary text-primary-foreground font-semibold py-3 h-auto text-sm">
                <Search className="h-4 w-4 mr-2" /> Search Packages
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs text-muted-foreground font-medium">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-surface-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
