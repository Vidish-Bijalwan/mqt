const steps = [
  { emoji: "💬", title: "Tell Us Your Dream", desc: "Share your destination, dates, and budget" },
  { emoji: "📋", title: "We Build Your Itinerary", desc: "Custom plan crafted by our travel experts" },
  { emoji: "✅", title: "Review & Confirm", desc: "Approve the plan, pay securely online" },
  { emoji: "🏔", title: "Journey Begins!", desc: "Relax — we handle everything from here" },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading mx-auto">Four simple steps to your dream Himalayan journey</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-primary/30" />

          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-surface-2 flex items-center justify-center text-4xl mb-4 relative z-10 border-4 border-background shadow-card">
                {step.emoji}
              </div>
              <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Step {i + 1}
              </span>
              <h3 className="font-body font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
