import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Calendar } from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

export function StepFourDates() {
  const { data, updateData, nextStep } = useTripPlanner();
  
  const handleSelectMonth = (month: string) => {
    updateData({ travel_month: month, date_flexibility: true });
    nextStep();
  };

  const handleFlexible = () => {
    updateData({ travel_month: null, date_flexibility: true });
    nextStep();
  };

  const currentMonthIndex = new Date().getMonth();

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="text-center md:text-center space-y-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">
          When are you traveling?
        </h2>
        <p className="text-gray-500">Prices vary by season, let us know your timeframe.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {MONTHS.map((month, index) => {
          const isCurrent = index === currentMonthIndex;
          const isSelected = data.travel_month === month;
          
          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={month}
              onClick={() => handleSelectMonth(month)}
              className={`relative flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border-2 transition-all ${
                isSelected 
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10' 
                  : isCurrent
                  ? 'border-blue-200 bg-white hover:border-blue-400'
                  : 'border-gray-100 bg-white hover:border-blue-400 hover:bg-gray-50/50'
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-3 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-white">
                  This Month
                </span>
              )}
              <span className={`font-semibold text-base md:text-lg ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                {month.substring(0, 3)}
              </span>
              <span className={`text-[10px] md:text-xs font-medium mt-1 uppercase tracking-wider ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}>
                 {month}
              </span>
              {isSelected && (
                <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
              )}
            </motion.button>
          );
        })}
      </div>
      
      <div className="pt-2">
        <button 
          onClick={handleFlexible}
          className="w-full p-4 md:p-5 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 font-medium transition-colors border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-600"
        >
          <Calendar className="w-5 h-5 text-gray-400" />
          <span>I'm entirely flexible with dates</span>
        </button>
      </div>
    </div>
  );
}
