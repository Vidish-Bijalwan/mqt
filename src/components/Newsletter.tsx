import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
          Get Exclusive Travel Deals & Insider Guides
        </h2>
        <p className="text-primary-foreground/80 text-sm mb-8">
          Join 5,000+ travellers who receive our monthly newsletter
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-primary-foreground">
            <Check className="h-5 w-5" />
            <span className="font-medium">Thank you! Check your inbox for a free travel guide.</span>
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
              Subscribe Now →
            </Button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-primary-foreground/70">
          <span>✅ No spam, ever</span>
          <span>📧 Monthly, not daily</span>
          <span>🎁 Free travel guide on signup</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
