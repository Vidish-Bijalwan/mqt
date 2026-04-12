import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';

export function StepSevenJourneyDetails() {
  const { data, updateData, nextStep } = useTripPlanner();

  const handleNext = () => {
    nextStep();
  };

  const paces = [
    { id: 'relaxed', label: 'Relaxed', desc: 'Slower pace, more free time' },
    { id: 'balanced', label: 'Balanced', desc: 'Mix of sightseeing and leisure' },
    { id: 'packed', label: 'Packed', desc: 'See as much as possible' },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          Tell us about your journey.
        </h2>
        <p className="text-muted-foreground">Since you're planning a custom trip, let's get the logistics right.</p>
      </div>

      <div className="space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="departure">Departure City (Starting Point)</Label>
            <Input 
              id="departure"
              placeholder="e.g. New Delhi"
              value={data.departure_city || ''}
              onChange={(e) => updateData({ departure_city: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="duration">Trip Duration</Label>
            <Input 
              id="duration"
              type="number"
              placeholder="Number of days"
              value={data.trip_duration_days || ''}
              onChange={(e) => updateData({ trip_duration_days: parseInt(e.target.value) || null })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="mustVisits">Must-Visit Places / Experiences (Optional)</Label>
          <Textarea 
            id="mustVisits"
            placeholder="e.g. Taj Mahal at sunrise, houseboat in Kerala..."
            className="resize-none"
            rows={3}
            value={data.must_visit_places || ''}
            onChange={(e) => updateData({ must_visit_places: e.target.value })}
          />
        </div>

        <div className="space-y-3 pt-2">
          <Label>Preferred Travel Pace</Label>
          <div className="flex flex-wrap gap-3">
            {paces.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateData({ travel_pace: opt.id })}
                className={`
                  flex-1 p-3 text-left rounded-lg transition-all border
                  ${data.travel_pace === opt.id
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-transparent hover:bg-muted'
                  }
                `}
              >
                <div className="font-semibold text-sm text-foreground">{opt.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.desc}</div>
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
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
