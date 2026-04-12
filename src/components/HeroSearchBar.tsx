import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DestinationPickerSheet } from './DestinationPickerSheet';
import { MonthPickerSheet } from './MonthPickerSheet';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

const POPULAR_TAGS = ["Kerala", "Rajasthan", "Goa", "Andaman", "Himalayas", "Varanasi"];

export function HeroSearchBar() {
  const navigate = useNavigate();
  const { openPlanner } = useTripPlanner();

  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [travellers, setTravellers] = useState('');
  const [tourType, setTourType] = useState('');

  const [isDestSheetOpen, setDestSheetOpen] = useState(false);
  const [isMonthSheetOpen, setMonthSheetOpen] = useState(false);

  const handleSearch = () => {
    // If user filled it out, we might want to pass these params or just open planner with intent
    if (destination || month) {
      // Just an example, maybe we navigate to filtered packages or open planner
      navigate("/packages");
    } else {
      openPlanner({ intent_type: 'custom_trip' }, 'hero_search');
    }
  };

  return (
    <div className="w-full relative z-20">
      <div className="bg-white rounded-2xl md:rounded-[32px] p-2 md:p-3 shadow-2xl flex flex-col md:flex-row gap-2 border border-white/50 backdrop-blur-xl">
        
        <div className="grid grid-cols-2 md:flex md:flex-1 gap-2">
          {/* Destination Card */}
          <button 
            onClick={() => setDestSheetOpen(true)}
            className="flex-1 flex items-center gap-3 bg-gray-50 hover:bg-blue-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <MapPin className="text-blue-600 w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Where</p>
              <p className={`text-sm md:text-base font-semibold truncate ${destination ? 'text-gray-900' : 'text-gray-400'}`}>
                {destination || 'Search destinations'}
              </p>
            </div>
          </button>

          {/* Month Card */}
          <button 
            onClick={() => setMonthSheetOpen(true)}
            className="flex-1 flex items-center gap-3 bg-gray-50 hover:bg-blue-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Calendar className="text-amber-600 w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">When</p>
              <p className={`text-sm md:text-base font-semibold truncate ${month ? 'text-gray-900' : 'text-gray-400'}`}>
                {month || 'Select dates'}
              </p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-1 gap-2">
          {/* Travellers */}
          <div className="flex-1 relative bg-gray-50 hover:bg-blue-50/50 rounded-xl md:rounded-2xl border border-gray-100 transition-colors overflow-hidden">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 pointer-events-none">
              <Users className="text-green-600 w-4 h-4" />
            </div>
            <select 
              value={travellers}
              onChange={e => setTravellers(e.target.value)}
              className="w-full h-full pl-14 pr-3 py-3 md:py-4 bg-transparent outline-none appearance-none font-semibold text-gray-900 text-sm md:text-base cursor-pointer"
            >
              <option value="" disabled>Who</option>
              <option value="1">1 Person</option>
              <option value="2">2 People (Couple)</option>
              <option value="3-4">3-4 People</option>
              <option value="5+">5+ People (Group)</option>
            </select>
          </div>

          {/* Tour Type */}
          <div className="flex-1 relative bg-gray-50 hover:bg-blue-50/50 rounded-xl md:rounded-2xl border border-gray-100 transition-colors overflow-hidden">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 pointer-events-none">
              <Compass className="text-purple-600 w-4 h-4" />
            </div>
            <select 
              value={tourType}
              onChange={e => setTourType(e.target.value)}
              className="w-full h-full pl-14 pr-3 py-3 md:py-4 bg-transparent outline-none appearance-none font-semibold text-gray-900 text-sm md:text-base cursor-pointer"
            >
              <option value="" disabled>Type</option>
              <option value="luxury">Luxury</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="family">Family</option>
              <option value="heritage">Heritage</option>
              <option value="wildlife">Wildlife</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl px-6 py-4 md:py-0 md:min-w-[140px] flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
        >
          <Search className="w-5 h-5" />
          <span className="md:hidden">Search Packages</span>
        </button>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 px-4">
        <span className="text-xs text-white/80 font-medium mr-2">Trending:</span>
        {POPULAR_TAGS.map(tag => (
          <button 
            key={tag}
            onClick={() => setDestination(tag)}
            className="text-[10px] md:text-xs font-semibold px-3 py-1.5 bg-black/20 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md outline-none transition-colors border border-white/10"
          >
            {tag}
          </button>
        ))}
      </div>

      <DestinationPickerSheet 
        isOpen={isDestSheetOpen} 
        onClose={() => setDestSheetOpen(false)} 
        onSelect={setDestination} 
        selectedDestination={destination} 
      />
      
      <MonthPickerSheet 
        isOpen={isMonthSheetOpen} 
        onClose={() => setMonthSheetOpen(false)} 
        onSelect={setMonth} 
        selectedMonth={month} 
      />
    </div>
  );
}
