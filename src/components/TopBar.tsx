import { Phone, Mail, Clock, MessageCircle } from "lucide-react";

const TopBar = () => {
  return (
    <div className="hidden lg:block bg-primary text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between py-2 text-sm font-body">
        <div className="flex items-center gap-6">
          <a href="tel:+917668741373" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span>+91-7668741373</span>
          </a>
          <a href="mailto:myquicktrippers@gmail.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>myquicktrippers@gmail.com</span>
          </a>
          <span className="flex items-center gap-1.5 text-primary-foreground/80">
            <Clock className="h-3.5 w-3.5" />
            <span>Mon–Sat 9AM–7PM</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/917668741373?text=Hi!%20I'm%20interested%20in%20booking%20a%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp Chat</span>
          </a>
          <span className="text-primary-foreground/80">Premium Trips</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
