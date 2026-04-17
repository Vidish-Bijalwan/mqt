/**
 * Unified Contact Handler
 * Routes all CTAs to the designated centralized communication channels.
 */

// Contact Details
export const CONTACT_PHONE = "+91-7668741373";
export const CONTACT_WHATSAPP = "917668741373";
export const CONTACT_EMAIL = "hello@myquicktrippers.com";
export const CONTACT_INSTAGRAM = "MQT_myquicktrippers";

/**
 * Generate a WhatsApp URL with a prefilled message.
 */
export const getWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a Phone Call URL.
 */
export const getPhoneUrl = (): string => {
  return `tel:${CONTACT_PHONE.replace(/-/g, '')}`;
};

/**
 * Generate an Email mailto link with prefilled subject.
 */
export const getEmailUrl = (subject: string): string => {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
};

/**
 * Generate Instagram profile link.
 */
export const getInstagramUrl = (): string => {
  return `https://www.instagram.com/${CONTACT_INSTAGRAM}`;
};

/**
 * Generate package-specific WhatsApp URL.
 */
export const getPackageWhatsAppUrl = (packageName: string): string => {
  const msg = `Hi MQT Team! I'm interested in the ${packageName}. Please share availability and pricing details.`;
  return getWhatsAppUrl(msg);
};

/**
 * Generate Festival-specific WhatsApp URL.
 */
export const getFestivalWhatsAppUrl = (festivalName: string, city: string): string => {
  const msg = `Hi MQT! I'm interested in planning a trip to attend ${festivalName} in ${city}. Can you help?`;
  return getWhatsAppUrl(msg);
};

/**
 * General Enquiry WhatsApp URL.
 */
export const getGeneralWhatsAppUrl = (): string => {
  return getWhatsAppUrl("Hi MQT Team! I found you on myquicktrippers.com and I'm interested in booking a tour package. Can you help me?");
};
