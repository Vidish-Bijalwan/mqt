import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { 
  Heart, 
  Mountain, 
  Palmtree, 
  Castle, 
  Camera, 
  UsersRound,
  Map,
  Leaf
} from 'lucide-react';
import type { TravelStyle } from '../schema';
import { listCategories } from '../../../services/categoryService';

interface StyleCardProps {
  id: TravelStyle;
  label: string;
  icon: React.ReactNode;
  colorClass: string;
}

export function StepTwoStyle() {
  const { data, updateData, nextStep } = useTripPlanner();
  const [styles, setStyles] = useState<StyleCardProps[]>([]);

  useEffect(() => {
    const fetchStyles = async () => {
      const fallback: StyleCardProps[] = [
        { id: 'family', label: 'Family & Friends', icon: <UsersRound className="w-8 h-8" />, colorClass: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
        { id: 'honeymoon', label: 'Honeymoon', icon: <Heart className="w-8 h-8" />, colorClass: 'text-pink-500 bg-pink-50 border-pink-200' },
        { id: 'adventure', label: 'Adventure / Trek', icon: <Mountain className="w-8 h-8" />, colorClass: 'text-orange-500 bg-orange-50 border-orange-200' },
        { id: 'beach', label: 'Beach Getaway', icon: <Palmtree className="w-8 h-8" />, colorClass: 'text-sky-500 bg-sky-50 border-sky-200' },
        { id: 'heritage', label: 'Heritage & Culture', icon: <Castle className="w-8 h-8" />, colorClass: 'text-amber-600 bg-amber-50 border-amber-200' },
        { id: 'wildlife', label: 'Nature & Wildlife', icon: <Leaf className="w-8 h-8" />, colorClass: 'text-green-500 bg-green-50 border-green-200' },
      ];

      try {
        const { data: dbCategories } = await listCategories();
        if (dbCategories && dbCategories.length > 0) {
          const dynamicStyles: StyleCardProps[] = dbCategories
            .filter(c => c.active)
            .map(c => ({
              id: c.slug as TravelStyle,
              label: c.name,
              icon: <Map className="w-8 h-8" />,
              colorClass: 'text-blue-500 bg-blue-50 border-blue-200' // Default fallback color
            }));
          // For now, let's just stick to the visually richer static list if possible
          // In real production, we'd map db slugs to these richer definitions
          setStyles(fallback); 
        } else {
          setStyles(fallback);
        }
      } catch (e) {
        setStyles(fallback);
      }
    };
    fetchStyles();
  }, []);

  const toggleStyle = (id: TravelStyle) => {
    let newStyles = [...data.trip_style];
    if (newStyles.includes(id)) {
      newStyles = newStyles.filter(s => s !== id);
    } else {
      if (newStyles.length < 2) {
        newStyles.push(id);
      } else {
        newStyles = [newStyles[1], id];
      }
    }
    updateData({ trip_style: newStyles });
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto">
      <div className="text-center md:text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">
          What is your travel purpose?
        </h2>
        <p className="text-gray-500">Select up to 2 travel styles that match your vibe.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {styles.map((style) => {
          const isSelected = data.trip_style.includes(style.id);
          return (
            <motion.button
              key={style.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleStyle(style.id)}
              className={`
                relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 transition-all group overflow-hidden
                ${isSelected 
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10' 
                  : 'border-gray-100 bg-white hover:border-blue-300 hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 border
                ${isSelected ? 'bg-blue-600 text-white border-blue-600' : style.colorClass}
              `}>
                {style.icon}
              </div>
              
              <span className={`text-sm md:text-base font-bold text-center ${isSelected ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                {style.label}
              </span>
              
              {isSelected && (
                <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={() => nextStep()} 
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          disabled={data.trip_style.length === 0}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
