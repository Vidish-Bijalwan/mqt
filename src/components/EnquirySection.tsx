import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const EnquirySection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    adults: "2",
    children: "0",
    tourType: "",
    budget: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Enquiry submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="section-padding bg-background" id="enquiry">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <div>
            <h2 className="section-heading mb-2">Plan Your Perfect Trip</h2>
            <p className="section-subheading mb-8">Fill in your details and our travel experts will craft a personalised itinerary for you</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-foreground mb-1">Destination *</label>
                  <select id="destination" name="destination" required value={formData.destination} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                    <option value="">Select destination</option>
                    <option>Kedarnath</option><option>Ladakh</option><option>Kashmir</option>
                    <option>Valley of Flowers</option><option>Varanasi</option><option>Manali</option>
                    <option>Rishikesh</option><option>Char Dham</option><option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="travelDate" className="block text-sm font-medium text-foreground mb-1">Travel Date</label>
                  <input id="travelDate" name="travelDate" type="date" value={formData.travelDate} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium text-foreground mb-1">Adults</label>
                  <input id="adults" name="adults" type="number" min="1" max="20" value={formData.adults} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="children" className="block text-sm font-medium text-foreground mb-1">Children</label>
                  <input id="children" name="children" type="number" min="0" max="10" value={formData.children} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-1">Budget Range</label>
                  <select id="budget" name="budget" value={formData.budget} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                    <option value="">Select budget</option>
                    <option>Under ₹10,000</option><option>₹10,000 – ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option><option>₹50,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="tourType" className="block text-sm font-medium text-foreground mb-1">Tour Type</label>
                  <select id="tourType" name="tourType" value={formData.tourType} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                    <option value="">Select type</option>
                    <option>Honeymoon</option><option>Family</option><option>Solo</option>
                    <option>Group</option><option>Pilgrimage</option><option>Adventure</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-foreground mb-1">Special Requirements</label>
                <textarea id="requirements" name="requirements" rows={3} value={formData.requirements} onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm font-body bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Any special requests..." />
              </div>

              <Button type="submit" size="lg" className="w-full gradient-accent text-accent-foreground font-semibold text-base py-6 h-auto hover:scale-[1.01] transition-transform">
                Send Enquiry — Get Callback in 2 Hours
              </Button>

              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Your data is 100% secure</span>
                <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> Avg response: under 2 hours</span>
              </div>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Call Us</h4>
                  <a href="tel:+919876543210" className="text-primary font-medium text-lg">+91-9876543210</a>
                  <p className="text-xs text-muted-foreground mt-1">Mon–Sat, 9AM–7PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-success flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">WhatsApp Us</h4>
                  <p className="text-sm text-muted-foreground">Quick reply within 30 minutes</p>
                  <a
                    href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20booking%20a%20tour."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium text-sm hover:underline"
                  >
                    Open WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Email</h4>
                  <a href="mailto:info@myquicktrippers.com" className="text-primary font-medium">info@myquicktrippers.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Office</h4>
                  <p className="text-sm text-muted-foreground">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-2 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Office Hours</h4>
                  <p className="text-sm text-muted-foreground">Mon–Sat: 9:00 AM – 7:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sun: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
