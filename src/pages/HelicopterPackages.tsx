import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { SEO } from '@/components/SEO';
import { getPackageWhatsAppUrl } from '@/lib/contact';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Map, MapPin } from 'lucide-react';

const HelicopterPackages = () => {
  const [activeTab, setActiveTab] = useState<'twodham' | 'chardham'>('twodham');

  type RouteConfig = {
    title: string;
    helipad: string;
    description: string;
    price: string;
    videoSearchTerm: string;
    videoUrl: string;
    flightTime?: string;
    altitude?: string;
    duration?: string;
    season?: string;
  };

  const routes: Record<string, RouteConfig> = {
    twodham: {
      title: "Do Dham Helicopter Package",
      helipad: "Sahastradhara (Dehradun) to Dehradun",
      description: "Fast-track your pilgrimage to Kedarnath and Badrinath. Depart from Dehradun and complete the Do Dham yatra in VIP comfort, bypassing days of strenuous road travel.",
      price: "₹1,20,000 / person",
      duration: "2 Days / 1 Night",
      videoSearchTerm: "Do Dham Helicopter Yatra",
      videoUrl: "" 
    },
    chardham: {
      title: "Char Dham Yatra Helicopter",
      helipad: "Sahastradhara (Dehradun) to Dehradun",
      duration: "5 Days / 4 Nights",
      description: "The ultimate premium pilgrimage circuit: Yamunotri, Gangotri, Kedarnath, and Badrinath. Depart from Dehradun cleanly skipping the strenuous multi-day road journeys. VIP darshan included at all shrines.",
      price: "₹2,35,000 / person",
      videoSearchTerm: "Char Dham helicopter package Dehradun",
      videoUrl: "" 
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Premium Helicopter Packages 2026 | Kedarnath & Char Dham"
        description="Book VIP helicopter packages for Kedarnath, Char Dham, and Valley of Flowers. Official DGCA-approved routes from Phata, Sersi, and Dehradun. Limited seats available."
      />
      
      <div className="relative pt-32 pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg" alt="Helicopter" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Premium Helicopter Journeys</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bypass days of strenuous travel. Experience the high Himalayas from the sky and arrive at India's most remote locations in minutes with our VIP helicopter charters and shuttles.
          </p>
          <div className="bg-[#111827] border border-[#F59E0B]/30 rounded-xl p-4 md:p-6 mb-8 max-w-2xl mx-auto shadow-[0_0_30px_rgba(245,158,11,0.1)]">
            <p className="text-[#F59E0B] font-bold text-sm uppercase tracking-widest mb-1">⚠️ Priority Booking Alert</p>
            <p className="text-sm text-gray-300">Helicopter seats are issued by DGCA in limited numbers per day per helipad. Book minimum 30 days in advance. Peak season (May-June, Sep-Oct) books out 60 days in advance.</p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-background relative z-20 -mt-10 rounded-t-[40px]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Route Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            {[
              { id: 'twodham', label: 'Do Dham Yatra' },
              { id: 'chardham', label: 'Char Dham Yatra' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-4 rounded-full font-bold transition-all text-sm uppercase tracking-wider w-full md:w-auto ${
                  activeTab === tab.id 
                    ? 'bg-[#F59E0B] text-white shadow-lg scale-105'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-6">
                    {activeTab === 'chardham' ? 'VIP Charter' : 'Shuttle Service'}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
                    {routes[activeTab].title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {routes[activeTab].description}
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#F59E0B]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Base Helipad</p>
                        <p className="font-semibold text-slate-900">{routes[activeTab].helipad}</p>
                      </div>
                    </div>
                    {routes[activeTab].flightTime && (
                      <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-[#F59E0B]" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Flight Time</p>
                          <p className="font-semibold text-slate-900">{routes[activeTab].flightTime}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-8 mb-8">
                    <p className="text-sm text-gray-500 font-medium mb-1">Starting From</p>
                    <p className="text-3xl font-bold text-[#F59E0B]">{routes[activeTab].price}</p>
                  </div>

                  <Button 
                    className="w-full sm:w-auto min-w-[280px] bg-[#25D366] hover:bg-[#20bd5a] text-white py-6 h-auto text-lg font-bold shadow-lg shadow-green-600/20"
                    onClick={() => window.open(getPackageWhatsAppUrl(routes[activeTab].title), "_blank")}
                  >
                    Check Live Availability on WhatsApp
                  </Button>
                </div>

                <div className="h-full min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden bg-slate-100 relative group border border-slate-200">
                   {/* We embed a video if available or a striking placeholder image */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-[#F59E0B] flex items-center justify-center mb-4 text-white shadow-xl">
                        ▶
                      </div>
                      <p className="font-bold text-slate-900">Watch: {routes[activeTab].videoSearchTerm}</p>
                      <p className="text-sm text-slate-500 mt-2">Visualizer coming soon...</p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default HelicopterPackages;
