import { motion } from "framer-motion";
import { getGeneralWhatsAppUrl, getPhoneUrl, getEmailUrl, getInstagramUrl } from "@/lib/contact";

// Peak-End Rule: this is the LAST thing users see — must be memorable.
// Goal-Gradient Effect: "one message away" framing.
// Fitts's Law: massive CTA button, impossible to miss.
const EnquirySection = () => {
  return (
    <section className="relative py-24 md:py-32 text-center overflow-hidden reveal-section" id="enquiry">

      {/* Background image — emotional, aspirational */}
      <div
        className="final-cta-bg"
        style={{
          backgroundImage: `url('/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg')`,
        }}
      />
      {/* Dark overlay — readable text */}
      <div className="final-cta-overlay" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 container-page max-w-2xl mx-auto"
      >
        {/* Goal-Gradient: "one step away" framing */}
        <span className="section-eyebrow text-amber-400">YOU'RE ONE MESSAGE AWAY</span>

        <h2
          className="font-display font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
        >
          Your Dream India Trip
          <br />
          Starts with a WhatsApp
        </h2>

        <p className="text-white/75 text-base leading-relaxed mb-10 max-w-lg mx-auto">
          No forms. No waiting. Just tell us where you want to go and we'll plan
          everything — permits, hotels, guides, and memories.
        </p>

        {/* Primary CTA — Fitts's Law: massive, impossible to miss */}
        <motion.a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
          className="inline-flex items-center justify-center gap-3 font-bold text-white rounded-2xl mb-6 transition-colors"
          style={{
            height: 64,
            padding: "0 48px",
            fontSize: 18,
            background: "#25D366",
            boxShadow: "0 16px 48px rgba(37,211,102,0.4)",
            textDecoration: "none",
          }}
          id="final-cta-whatsapp"
        >
          {/* WhatsApp icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Start Planning on WhatsApp
        </motion.a>

        {/* Doherty Threshold: immediate visual state on click ↑ */}

        {/* Secondary contact alternatives — Law of Proximity: grouped */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/60">
          <span>Or reach us on</span>
          <a
            href={getPhoneUrl()}
            className="text-white/80 hover:text-amber-400 transition-colors font-medium"
          >
            📞 Call
          </a>
          <a
            href={getEmailUrl("Tour Enquiry")}
            className="text-white/80 hover:text-amber-400 transition-colors font-medium"
          >
            ✉ Email
          </a>
          <a
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-amber-400 transition-colors font-medium"
          >
            📷 Instagram
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default EnquirySection;
