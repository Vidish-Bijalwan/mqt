const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <a href="#" className="font-heading text-2xl font-semibold gold-gradient-text">
              MyQuickTrippers
            </a>
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
              Luxury travel experiences across India — from the mighty Himalayas to sacred temples and pristine valleys. Your journey starts here.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg text-foreground mb-4">Destinations</h4>
            <ul className="space-y-2">
              {["Kedarnath", "Valley of Flowers", "Ladakh", "Varanasi"].map((d) => (
                <li key={d}>
                  <a href="#destinations" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {d}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Our Team", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#about" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a href="#contact" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-border mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} MyQuickTrippers. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Twitter", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                aria-label={`Follow MyQuickTrippers on ${social}`}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
