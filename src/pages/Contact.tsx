import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import InquiryBanner from "@/components/InquiryBanner";
import EnquirySection from "@/components/EnquirySection";
import contactHero from "@/assets/dest-varanasi.jpg";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/contact";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    document.title = "Contact Us | MQT";
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I am ${formData.name}. Phone: ${formData.phone}. Message: ${formData.message}`;
    window.open(`https://wa.me/917668741373?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <PageLayout>
      <PageHero
        title="Get in Touch"
        subtitle="Have questions? Our travel experts are available 24/7 to help you plan your next adventure or support your current journey."
        backgroundImage={contactHero}
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="section-padding bg-surface/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Contact Information */}
            <div>
              <span className="section-eyebrow">REACH OUT</span>
              <h2 className="font-display text-3xl font-bold mb-6">We're here to help</h2>
              <p className="text-muted-foreground mb-8">
                Whether you want to customize a tour package or need help with bookings, our team is ready to assist you.
              </p>

              <div className="space-y-6">
                <a href={getGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-soft hover:-translate-y-1 transition-transform group">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-success group-hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6 text-success group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">WhatsApp Us</h3>
                    <p className="text-sm text-muted-foreground mb-1">Fastest response time (24/7)</p>
                    <span className="text-success font-semibold text-sm block mt-1">+91 76687 41373</span>
                  </div>
                </a>

                <a href="tel:+917668741373" className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-soft hover:-translate-y-1 transition-transform group">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Call Us</h3>
                    <p className="text-sm text-muted-foreground mb-1">Mon-Sat from 9am to 7pm</p>
                    <span className="text-primary font-semibold text-sm block mt-1">+91 76687 41373</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-soft">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Office Location</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      MyQuickTrippers<br />
                      Meerut, Uttar Pradesh<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-elevated">
              <h3 className="font-display text-2xl font-bold mb-2">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">Fill this out and we'll reply via WhatsApp instantly.</p>
              
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">How can we help?</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                    placeholder="I want to plan a 5-day trip to Manali..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-md hover:shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" /> Send Request
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Embed the shared enquiry form component at the bottom */}
      <EnquirySection />

    </PageLayout>
  );
};

export default Contact;
