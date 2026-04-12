import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { Calendar, CalendarCheck2, Globe2 } from 'lucide-react';

export function StepFourDates() {
  const { data, updateData, nextStep } = useTripPlanner();
  
  // Use a simple selection for the POC to avoid huge calendar dependencies, 
  // we could use react-day-picker if needed but standard form is better for conversion.
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const handleSelectMonth = (month: string) => {
    updateData({ travel_month: month, date_flexibility: true });
    nextStep();
  };

  const handleFlexible = () => {
    updateData({ travel_month: null, date_flexibility: true });
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          When are you planning to travel?
        </h2>
        <p className="text-muted-foreground">Select a preferred month or stay flexible.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleFlexible}
          className={`
            p-5 text-left rounded-xl transition-all duration-200 border-2
            ${data.date_flexibility && !data.travel_month
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-card hover:border-primary/50'
            }
          `}
        >
          <Globe2 className="w-6 h-6 mb-3 text-primary" />
          <h3 className="font-semibold text-lg text-foreground mb-1">Open & Flexible</h3>
          <p className="text-sm text-muted-foreground">Suggest the best time to go based on the destination.</p>
        </button>

        <div className="p-5 text-left rounded-xl border-2 border-border bg-card">
          <CalendarCheck2 className="w-6 h-6 mb-3 text-foreground" />
          <h3 className="font-semibold text-lg text-foreground mb-3">Preferred Month</h3>
          <div className="grid grid-cols-4 gap-2">
            {months.map(m => (
              <button
                key={m}
                onClick={() => handleSelectMonth(m)}
                className={`
                  py-2 text-xs font-medium rounded-md transition-colors
                  ${data.travel_month === m 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-foreground hover:bg-muted'
                  }
                `}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
