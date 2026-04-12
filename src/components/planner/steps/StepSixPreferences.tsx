import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import type { BudgetPreference, StayPreference } from '../schema';

export function StepSixPreferences() {
  const { data, updateData, nextStep } = useTripPlanner();

  const budgetOptions: { id: BudgetPreference; label: string; desc: string }[] = [
    { id: 'budget', label: 'Budget', desc: 'Focus on value and essential comforts' },
    { id: 'comfortable', label: 'Comfortable', desc: 'Standard 3/4 star accommodations' },
    { id: 'premium', label: 'Premium', desc: 'High-end 4/5 star experiences' },
    { id: 'luxury', label: 'Luxury', desc: 'Ultra-premium, exclusive stays' }
  ];

  const stayOptions: { id: StayPreference; label: string }[] = [
    { id: 'standard', label: 'Standard Hotels' },
    { id: 'boutique', label: 'Boutique / Heritage' },
    { id: 'premium', label: 'Premium Resorts' },
    { id: 'luxury', label: 'Luxury / 5-Star' },
    { id: 'mix', label: 'Mix of Both' }
  ];

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          What level of comfort do you prefer?
        </h2>
        <p className="text-muted-foreground">Your budget and stay preferences help us find the perfect match.</p>
      </div>

      <div className="space-y-6">
        
        {/* Budget */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Overall Budget</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {budgetOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateData({ budget_preference: opt.id })}
                className={`
                  p-4 text-left rounded-xl transition-all duration-200 border-2
                  ${data.budget_preference === opt.id
                    ? 'border-primary bg-primary/5' 
                    : 'border-border bg-card hover:border-primary/50'
                  }
                `}
              >
                <div className="font-semibold text-foreground">{opt.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Stays */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Stay Style</label>
          <div className="flex flex-wrap gap-2">
            {stayOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateData({ stay_preference: opt.id })}
                className={`
                  px-4 py-2 text-sm font-medium rounded-full transition-all border
                  ${data.stay_preference === opt.id
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-transparent border-border text-foreground hover:border-primary/50'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-6 border-t border-border mt-8">
        <Button 
          onClick={handleNext} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          disabled={!data.budget_preference && !data.stay_preference} // Make it somewhat required
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
