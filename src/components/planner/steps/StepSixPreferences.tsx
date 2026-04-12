import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Star, Crown, Gem } from 'lucide-react';
import type { BudgetPreference } from '../schema';

export function StepSixPreferences() {
  const { data, updateData, nextStep } = useTripPlanner();

  const budgetOptions: { id: BudgetPreference; label: string; desc: string; icon: any; color: string }[] = [
    { 
      id: 'comfortable', 
      label: 'Standard', 
      desc: 'Comfortable 3 & 4-star stays with reliable service',
      icon: Star,
      color: 'text-blue-500 bg-blue-50 border-blue-200' 
    },
    { 
      id: 'premium', 
      label: 'Premium', 
      desc: 'High-end 4 & 5-star experiences with luxury touches',
      icon: Crown,
      color: 'text-purple-500 bg-purple-50 border-purple-200'
    },
    { 
      id: 'luxury', 
      label: 'Luxury', 
      desc: 'Ultra-premium, exclusive 5-star properties & resorts',
      icon: Gem,
      color: 'text-amber-500 bg-amber-50 border-amber-200'
    }
  ];

  const handleSelect = (id: BudgetPreference) => {
    updateData({ budget_preference: id });
    nextStep();
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="text-center md:text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">
          Trip Standard
        </h2>
        <p className="text-gray-500">Select the level of comfort for your accommodations</p>
      </div>

      <div className="space-y-4">
        {budgetOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = data.budget_preference === opt.id;
          
          return (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`
                w-full p-5 md:p-6 text-left rounded-2xl transition-all duration-200 border-2 relative overflow-hidden group
                ${isSelected
                  ? 'border-blue-600 bg-blue-50/30 shadow-md ring-4 ring-blue-600/10' 
                  : 'border-gray-100 bg-white hover:border-blue-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-start gap-4 md:gap-5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${opt.color} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg md:text-xl mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                    {opt.label}
                  </h3>
                  <p className={`text-sm md:text-base font-medium ${isSelected ? 'text-blue-600/80' : 'text-gray-500'}`}>
                    {opt.desc}
                  </p>
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-1/2 -translate-y-1/2 right-6 w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
              )}
            </motion.button>
          )
        })}
      </div>
      
      <div className="flex justify-center pt-4">
        <button 
          onClick={() => handleSelect('not_sure')}
          className="text-sm font-medium text-gray-500 hover:text-blue-600 underline underline-offset-4"
        >
          I'm not sure yet, I'll decide later
        </button>
      </div>
    </div>
  );
}
