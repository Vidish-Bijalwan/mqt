import { motion } from 'framer-motion';
import { useTripPlanner } from '@/contexts/TripPlannerContext';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight, Waves, Mountain, Landmark, Flame, Heart, Compass } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const fetchDiscoveryVibes = async () => {
  const { data, error } = await supabase
    .from("discovery_vibes")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data;
};

const iconMap: Record<string, any> = {
  Waves,
  Mountain,
  Landmark,
  Flame,
  Heart,
  Compass
};

const defaultVibes = [
  {
    id: 'beach',
    style_id: 'beach',
    label: 'Beach Escape',
    tagline: 'Sun, sand & serenity',
    description: 'Goa, Andaman, Lakshadweep — pristine shores await.',
    icon_name: "Waves",
    gradient_classes: 'from-cyan-500/80 to-blue-600/80',
    bg_image_url: '/tourism/Andaman_Nicobar/Destinations/003_image_govt.jpg',
  },
  {
    id: 'adventure',
    style_id: 'adventure',
    label: 'Mountain Adventure',
    tagline: 'Above the clouds',
    description: 'Ladakh, Spiti Valley, Kashmir — epic Himalayan journeys.',
    icon_name: "Mountain",
    gradient_classes: 'from-emerald-600/80 to-teal-700/80',
    bg_image_url: '/tourism/India_Central/Incredible_India/017_hidimba-temple-manali-himachal-pradesh-1-attr-hero_govt.jpg',
  },
  {
    id: 'heritage',
    style_id: 'heritage',
    label: 'Heritage & Culture',
    tagline: 'Stories carved in stone',
    description: 'Rajasthan, Varanasi, Hampi — timeless India unfolds.',
    icon_name: "Landmark",
    gradient_classes: 'from-amber-500/80 to-orange-600/80',
    bg_image_url: '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg',
  },
  {
    id: 'pilgrimage',
    style_id: 'pilgrimage',
    label: 'Pilgrimage Tours',
    tagline: 'Sacred India awaits',
    description: 'Kedarnath, Varanasi, Char Dham — devotion & divinity.',
    icon_name: "Flame",
    gradient_classes: 'from-rose-500/80 to-red-700/80',
    bg_image_url: '/tourism/India_Central/Incredible_India/021_ganga-ghat-haridwar-uttarakhand-1-attr-hero_govt.jpg',
  },
  {
    id: 'honeymoon',
    style_id: 'honeymoon',
    label: 'Honeymoon Journeys',
    tagline: 'Romance, reimagined',
    description: 'Kashmir, Kerala, Udaipur — where love stories are written.',
    icon_name: "Heart",
    gradient_classes: 'from-pink-500/80 to-rose-600/80',
    bg_image_url: '/tourism/India_Central/Incredible_India/016_dal-lake-srinagar-jammu--kashmir-2-attr-hero_govt.jpg',
  },
];

const DiscoverySection = () => {
  const { openPlanner } = useTripPlanner();

  const { data } = useQuery({
    queryKey: ["public-discovery-vibes"],
    queryFn: fetchDiscoveryVibes,
  });

  const vibes = data && data.length > 0 ? data : defaultVibes;

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Not sure where to go?</p>
          <h2 className="section-heading">Find Your Travel Vibe</h2>
          <p className="section-subheading mx-auto mt-2">
            Pick a mood, and we'll build your perfect itinerary around it.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {vibes.map((vibe: any, i: number) => {
            const Icon = iconMap[vibe.icon_name || "Compass"] || Compass;
            
            const matchedDefault = defaultVibes.find(
              (v) => v.id === vibe.id || v.id === vibe.style || v.style_id === vibe.style_id || v.style_id === vibe.style
            );

            let finalImageUrl = vibe.bg_image_url || 
                                vibe.background_image_url ||
                                matchedDefault?.bg_image_url ||
                                '/tourism/India_Central/Incredible_India/020_city-palace-udaipur-rajasthan-2-new-attr-hero_govt.jpg';

            if (finalImageUrl.startsWith('india_tourism')) {
              finalImageUrl = `/tourism/${finalImageUrl.split('/').slice(1).join('/')}`;
            } else if (finalImageUrl.startsWith('unsplash')) {
              finalImageUrl = '/logo.png';
            }

            return (
              <ScrollReveal key={vibe.id} delay={i * 0.12}>
                <motion.button
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openPlanner({ trip_style: [vibe.style_id as any] }, 'discovery_section')}
                  className="group relative w-full h-64 md:h-80 rounded-2xl overflow-hidden text-left cursor-pointer border border-white/10 shadow-card"
                >
                  {/* BG Image */}
                  <img
                    src={finalImageUrl}
                    alt={vibe.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${vibe.gradient_classes || 'from-black/80 to-transparent'} opacity-75 group-hover:opacity-85 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">{vibe.tagline}</p>
                    <h3 className="font-display text-2xl font-bold text-white mb-1.5">{vibe.label}</h3>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{vibe.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                      Plan this trip <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DiscoverySection;
