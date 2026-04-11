import { Star } from "lucide-react";
import { testimonials } from "@/data/packages";

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">What Our Travellers Say</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
            <span className="font-body font-semibold text-foreground ml-2">4.9 out of 5</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Based on 500+ verified reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-xl p-6 border border-border shadow-soft">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · {t.tour} · {t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
