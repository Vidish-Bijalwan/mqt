import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { Plane, Hotel, Navigation, Shield, Award, MapPin } from 'lucide-react';

const serviceIcons: Record<string, any> = {
  'custom-itinerary': Navigation,
  'hotel-booking': Hotel,
  'flight-booking': Plane,
  'cab-booking': MapPin,
  'travel-insurance': Shield,
  'visa-assistance': Award,
  'trek-booking': Navigation
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const Icon = slug && serviceIcons[slug] ? serviceIcons[slug] : Navigation;
  const rawTitle = slug?.replace(/-/g, ' ') || 'Service';
  const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);

  return (
    <PageLayout>
      <PageHero title={title} subtitle="Premium End-to-End Travel Experiences" />
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center flex flex-col items-center justify-center">
        <Icon className="w-24 h-24 text-accent mb-6 opacity-80" />
        <h2 className="text-3xl font-display font-bold text-dark-foreground mb-4">World-Class {title} Details</h2>
        <p className="text-dark-foreground/70 text-lg mb-8 max-w-2xl">
          At MyQuickTrippers, we pride ourselves on offering seamless {rawTitle} designed exactly for your journey. From exclusive partnerships to 24/7 dedicated support, you can trust our expert advisors to craft the perfect memory.
        </p>
        <Link to="/contact" className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-all">
          Enquire Now
        </Link>
      </div>
    </PageLayout>
  );
}
