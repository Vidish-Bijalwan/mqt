import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Map, MapPin, Compass, Sparkles } from 'lucide-react';
import type { TripIntent } from '../schema';

interface IntentCardProps {
  id: TripIntent;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function StepOneIntent() {
  const { data, updateData, nextStep } = useTripPlanner();

  const intents: IntentCardProps[] = [
    {
      id: 'ideal_package',
      title: 'Find My Ideal Package',
      description: 'Get matched with our best curated itineraries.',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      id: 'custom_trip',
      title: 'Plan a Custom Trip',
      description: 'Design a tailor-made journey from scratch.',
      icon: <Map className="w-6 h-6" />
    },
    {
      id: 'know_destination',
      title: 'I Know My Destination',
      description: 'I have a specific place in mind.',
      icon: <MapPin className="w-6 h-6" />
    },
    {
      id: 'need_suggestions',
      title: 'I Need Suggestions',
      description: 'Inspire me with where to go.',
      icon: <Compass className="w-6 h-6" />
    }
  ];

  const handleSelect = (id: TripIntent) => {
    updateData({ intent_type: id });
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          What are you looking for today?
        </h2>
        <p className="text-muted-foreground">Let's start by pointing you in the right direction.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {intents.map((intent) => {
          const isSelected = data.intent_type === intent.id;
          return (
            <motion.button
              key={intent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(intent.id)}
              className={`
                relative p-5 text-left rounded-xl transition-all duration-200 border-2 overflow-hidden group
                ${isSelected 
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="relative z-10">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'}
                `}>
                  {intent.icon}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{intent.title}</h3>
                <p className="text-sm text-muted-foreground">{intent.description}</p>
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
