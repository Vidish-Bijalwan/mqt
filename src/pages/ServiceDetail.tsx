import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Plane, Hotel, Navigation, Shield, Award, MapPin, CheckCircle2, Clock, Star, PhoneCall, ChevronRight } from 'lucide-react';

const serviceData: Record<string, any> = {
  'custom-itinerary': {
    icon: Navigation,
    title: 'Custom Itinerary',
    image: '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
    description: 'We craft entirely bespoke journeys tailored to your specific interests, pace, and preferences. No cookie-cutter tours—just your dream trip brought to life.',
    features: ['1-on-1 Consultation', 'Personalized Routing', 'Exclusive Experiences', 'Flexible Pacing']
  },
  'hotel-booking': {
    icon: Hotel,
    title: 'Hotel Booking',
    image: '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
    description: 'Unlock exclusive rates and VIP perks at handpicked luxury, boutique, and heritage properties across India and globally.',
    features: ['Best Rate Guarantee', 'Complimentary Upgrades', 'Carefully Vetted Properties', '24/7 Check-in Support']
  },
  'flight-booking': {
    icon: Plane,
    title: 'Flight Booking',
    image: '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
    description: 'Seamless domestic and international flight ticketing round the clock. We manage changes, delays, and special requests so you never have to wait on hold.',
    features: ['Global Network Support', 'Baggage Allowances Handled', 'Swift Cancellations', 'Corporate Rates']
  },
  'cab-booking': {
    icon: MapPin,
    title: 'Cab Booking',
    image: '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
    description: 'Reliable, premium chauffeur-driven vehicles for airport transfers, city tours, or multi-day intercity travels with verified professional drivers.',
    features: ['Premium Fleet', 'Verified Drivers', 'Sanitized Vehicles', 'GPS Tracking']
  },
  'travel-insurance': {
    icon: Shield,
    title: 'Travel Insurance',
    image: '/tourism/India_Central/Incredible_India/013_red-fort-delhi1-attr-hero_govt.jpg',
    description: 'Comprehensive coverage shielding you from medical emergencies, trip cancellations, lost baggage, and unexpected delays. Travel with absolute peace of mind.',
    features: ['Medical Coverage', 'Lost Baggage Claim', 'Trip Cancellation', 'Instant Policy Delivery']
  },
  'visa-assistance': {
    icon: Award,
    title: 'Visa Assistance',
    image: '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
    description: 'End-to-end support for business and tourist visas. Our experts painstakingly verify your documents to ensure the highest approval success rates.',
    features: ['Document Verification', 'Form Filling Assistance', 'Interview Prep', 'Real-time Tracking']
  },
  'trek-booking': {
    icon: Navigation,
    title: 'Trek Booking',
    image: '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
    description: 'Expert-led trekking expeditions through the Himalayas and Western Ghats. We provide top-tier equipment, safety protocols, and certified mountain guides.',
    features: ['Certified Guides', 'High-altitude Safety', 'Premium Equipment Provided', 'Eco-friendly Camps']
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  
  const service = useMemo(() => {
    if (slug && serviceData[slug]) {
      return serviceData[slug];
    }
    const rawTitle = slug?.replace(/-/g, ' ') || 'Service';
    return {
      icon: Navigation,
      title: rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1),
      image: '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
      description: 'At MyQuickTrippers, we pride ourselves on offering seamless services designed exactly for your journey. Explore the world with complete confidence.',
      features: ['24/7 Support', 'Best Prices', 'Dedicated Advisor', 'Premium Quality']
    };
  }, [slug]);

  const Icon = service.icon;

  return (
    <PageLayout>
      {/* Dynamic Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-6 flex justify-center"
          >
             <div className="p-4 bg-accent/20 rounded-full backdrop-blur-sm border border-accent/40 text-accent">
               <Icon className="w-12 h-12" />
             </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90"
          >
            {service.description}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Features Left Column */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-gray-100 mb-6">Why Choose Our {service.title}?</h2>
            <p className="text-slate-900 dark:text-gray-100/70 mb-8 leading-relaxed">
              When it comes to your travel arrangements, precision and reliability aren't just preferences—they are absolute necessities. By booking your {service.title.toLowerCase()} through MyQuickTrippers, you unlock unparalleled value, bypassing hidden fees and unreliable operators.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-muted/30 p-4 rounded-xl border border-border">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-slate-900 dark:text-gray-100/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Right Column */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="flex gap-4 p-6 bg-white dark:bg-card rounded-2xl shadow-lg border border-border/50">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-gray-100 text-lg mb-2">Round-the-clock Support</h3>
                <p className="text-slate-900 dark:text-gray-100/70 text-sm">We don't operate 9-to-5. Travel emergencies happen anytime, and our dedicated agents are always on standby.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 bg-white dark:bg-card rounded-2xl shadow-lg border border-border/50">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-gray-100 text-lg mb-2">Premium Network</h3>
                <p className="text-slate-900 dark:text-gray-100/70 text-sm">Through our extensive network of B2B providers, our rates and quality standard strictly outmatch public booking platforms.</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Global Action CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mt-24 p-10 md:p-14 bg-slate-900 dark:bg-slate-950 text-white rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to lock it in?</h2>
            <p className="text-white/80 mb-8 text-lg">Leave the heavy lifting to us. Speak directly to an expert advisor and get your {service.title.toLowerCase()} finalized in minutes.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
                Make an Enquiry <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="tel:+917668741373" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-2 border border-white/20">
                <PhoneCall className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </PageLayout>
  );
}
