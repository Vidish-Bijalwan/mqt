import { useEffect, useState } from "react";
import { MessageCircle, Phone, Mail, Instagram } from "lucide-react";
import { 
  getGeneralWhatsAppUrl, 
  getPhoneUrl, 
  getEmailUrl, 
  getInstagramUrl 
} from "@/lib/contact";

export const FloatingContactBar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contacts = [
    {
      id: 'whatsapp',
      icon: <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} fill="currentColor" />,
      url: getGeneralWhatsAppUrl(),
      label: "WhatsApp Us",
      bgClass: "bg-[#25D366]",
    },
    {
      id: 'phone',
      icon: <Phone className="w-6 h-6 text-white" fill="currentColor" />,
      url: getPhoneUrl(),
      label: "Call Us",
      bgClass: "bg-blue-600",
    },
    {
      id: 'email',
      icon: <Mail className="w-6 h-6 text-white" />,
      url: getEmailUrl("Tour Enquiry - MyQuickTrippers"),
      label: "Email Us",
      bgClass: "bg-red-500",
    },
    {
      id: 'instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
      url: getInstagramUrl(),
      label: "Follow Instagram",
      bgClass: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    }
  ];

  return (
    <div 
      className={`fixed z-[100] ${
        isMobile 
          ? "bottom-4 left-0 right-0 flex justify-center w-full px-4" 
          : "right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4"
      }`}
    >
      <div 
        className={`flex ${isMobile ? "flex-row gap-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-2xl border border-white/40" : "flex-col gap-4"}`}
      >
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-center w-[52px] h-[52px] rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:scale-110 transition-all duration-300 ${contact.bgClass}`}
            aria-label={contact.label}
          >
            {contact.icon}
            
            {/* Tooltip */}
            <span 
              className={`absolute whitespace-nowrap bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isMobile 
                  ? "bottom-full mb-3 left-1/2 -translate-x-1/2" 
                  : "right-full mr-4 top-1/2 -translate-y-1/2"
              }`}
            >
              {contact.label}
              {/* Tooltip Arrow */}
              <div 
                className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                  isMobile 
                    ? "-bottom-1 left-1/2 -translate-x-1/2" 
                    : "-right-1 top-1/2 -translate-y-1/2"
                }`}
              />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
