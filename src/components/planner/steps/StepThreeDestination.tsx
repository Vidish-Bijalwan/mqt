import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Search } from 'lucide-react';
import { ImgWithFallback } from '../../ui/ImgWithFallback';
import { getDestinationImage } from '../../../lib/imageMap';

const TOP_DESTINATIONS = [
  { name: 'Kerala', slug: 'kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600' },
  { name: 'Rajasthan', slug: 'rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=600' },
  { name: 'Goa', slug: 'goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600' },
  { name: 'Andaman', slug: 'andaman', image: 'https://images.unsplash.com/photo-1589394815804-964ce0ff96f8?auto=format&fit=crop&q=80&w=600' },
  { name: 'Himachal', slug: 'shimla', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600' },
  { name: 'Uttarakhand', slug: 'rishikesh', image: 'https://images.unsplash.com/photo-1582662993077-ca3594b9ea6e?auto=format&fit=crop&q=80&w=600' },
];

export function StepThreeDestination() {
  const { data, updateData, nextStep } = useTripPlanner();
  const [searchValue, setSearchValue] = useState(data.destination_interest || data.state_interest || '');

  const handleSelectRegion = (region: string) => {
    updateData({ destination_interest: region });
    nextStep();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      updateData({ destination_interest: searchValue });
      nextStep();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-gray-900">
          Where to?
        </h2>
        <p className="text-gray-500">Select a popular destination or search for anywhere in India.</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="e.g. Jaipur, Rajasthan or Munnar"
          className="w-full pl-12 pr-4 py-4 text-base rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-blue-600 focus:bg-white transition-colors"
        />
      </form>

      <div className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-2xl">
          {TOP_DESTINATIONS.map((dest) => {
            const isSelected = (data.destination_interest || '').toLowerCase() === dest.name.toLowerCase();
            return (
              <motion.button
                whileTap={{ scale: 0.96 }}
                key={dest.name}
                onClick={() => handleSelectRegion(dest.name)}
                className={`group relative h-28 md:h-32 w-full rounded-2xl overflow-hidden border-2 text-left ${isSelected ? 'border-blue-600 shadow-md ring-4 ring-blue-600/20' : 'border-transparent'}`}
              >
                <ImgWithFallback 
                  src={dest.image} 
                  fallbackSrc={getDestinationImage(dest.slug, 'card').fallbackSrc} 
                  alt={dest.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? '' : 'group-hover:scale-110'}`}
                  containerClassName="w-full h-full absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 pr-2">
                  <h3 className="text-white font-bold text-sm leading-tight group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button 
          onClick={() => handleSelectRegion('Open to suggestions')}
          className="text-sm font-medium text-gray-500 hover:text-blue-600 underline underline-offset-4"
        >
          I'm flexible / decided later
        </button>
      </div>
    </div>
  );
}
