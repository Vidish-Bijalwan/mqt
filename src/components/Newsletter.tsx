import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const fetchNewsletterSettings = async () => {
  const { data, error } = await supabase
    .from("newsletter_settings")
    .select("*")
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const defaultSettings = {
  heading: "Get Exclusive Travel Deals & Insider Guides",
  subheading: "Join 5,000+ travellers who receive our monthly newsletter",
  success_message: "Thank you! Check your inbox for a free travel guide.",
  button_text: "Subscribe Now →",
  bullets: ["✅ No spam, ever", "📧 Monthly, not daily", "🎁 Free travel guide on signup"]
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data: settingsData } = useQuery({
    queryKey: ["public-newsletter-settings"],
    queryFn: fetchNewsletterSettings,
  });

  const settings = settingsData || defaultSettings;
  const bulletsResponse = settings.bullets || ["✅ No spam, ever", "📧 Monthly, not daily", "🎁 Free travel guide on signup"];
  const parsedBullets = Array.isArray(bulletsResponse) ? bulletsResponse : 
    (typeof bulletsResponse === 'string' ? JSON.parse(bulletsResponse) : defaultSettings.bullets);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="gradient-primary py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary-foreground mb-3">
          {settings.heading}
        </h2>
        <p className="text-primary-foreground/80 text-sm mb-8">
          {settings.subheading}
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-primary-foreground">
            <Check className="h-5 w-5" />
            <span className="font-medium">{settings.success_message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm font-body bg-background text-foreground border-0 outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button type="submit" className="gradient-accent text-accent-foreground font-semibold px-6 py-3 h-auto whitespace-nowrap">
              {settings.button_text}
            </Button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-primary-foreground/70">
          {parsedBullets.map((b: string, i: number) => (
             <span key={i}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
