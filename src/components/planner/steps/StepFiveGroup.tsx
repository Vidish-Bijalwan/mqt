import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { Minus, Plus, Users } from 'lucide-react';

export function StepFiveGroup() {
  const { data, updateData, nextStep } = useTripPlanner();
  const { adults, children, infants } = data.group_size;

  const updateCount = (type: 'adults' | 'children' | 'infants', delta: number) => {
    const minValues = { adults: 1, children: 0, infants: 0 };
    const maxValues = { adults: 100, children: 20, infants: 20 };
    
    updateData({
      group_size: {
        ...data.group_size,
        [type]: Math.min(Math.max(data.group_size[type] + delta, minValues[type]), maxValues[type])
      }
    });
  };

  const handleNext = () => {
    nextStep();
  };

  const Stepper = ({ label, description, type, value }: any) => (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
      <div>
        <h4 className="font-semibold text-foreground">{label}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => updateCount(type, -1)}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          disabled={value <= (type === 'adults' ? 1 : 0)}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center font-semibold text-foreground text-lg">{value}</span>
        <button 
          onClick={() => updateCount(type, 1)}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          Who's travelling?
        </h2>
        <p className="text-muted-foreground">Select the number of people in your group.</p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto sm:mx-0">
        <Stepper label="Adults" description="Ages 12 or above" type="adults" value={adults} />
        <Stepper label="Children" description="Ages 2 to 11" type="children" value={children} />
        <Stepper label="Infants" description="Under 2 years" type="infants" value={infants} />
      </div>

      <div className="flex justify-end pt-6 border-t border-border mt-8">
        <Button 
          onClick={handleNext} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
