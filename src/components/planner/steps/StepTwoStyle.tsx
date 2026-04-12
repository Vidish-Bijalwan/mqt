import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { 
  Heart, 
  Mountain, 
  Users, 
  Palmtree, 
  Castle, 
  Camera, 
  Crown, 
  Coffee, 
  User, 
  UsersRound,
  Map
} from 'lucide-react';
import type { TravelStyle } from '../schema';
import { listCategories } from '../../../services/categoryService';

interface StyleCardProps {
  id: TravelStyle;
  label: string;
  icon: React.ReactNode;
}

export function StepTwoStyle() {
  const { data, updateData, nextStep } = useTripPlanner();
  const [styles, setStyles] = useState<StyleCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStyles = async () => {
      const fallback: StyleCardProps[] = [
        { id: 'family', label: 'Family Holiday', icon: <UsersRound className="w-5 h-5" /> },
        { id: 'honeymoon', label: 'Honeymoon', icon: <Heart className="w-5 h-5" /> },
        { id: 'adventure', label: 'Adventure', icon: <Mountain className="w-5 h-5" /> },
        { id: 'beach', label: 'Beach Escape', icon: <Palmtree className="w-5 h-5" /> },
        { id: 'heritage', label: 'Heritage', icon: <Castle className="w-5 h-5" /> },
        { id: 'wildlife', label: 'Wildlife', icon: <Camera className="w-5 h-5" /> },
      ];

      try {
        const { data: dbCategories } = await listCategories();
        if (dbCategories && dbCategories.length > 0) {
          const dynamicStyles: StyleCardProps[] = dbCategories
            .filter(c => c.active)
            .map(c => ({
              id: c.slug as TravelStyle,
              label: c.name,
              icon: <Map className="w-5 h-5" /> // Default icon for DB driven
            }));
          setStyles(dynamicStyles);
        } else {
          setStyles(fallback);
        }
      } catch (e) {
        setStyles(fallback);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStyles();
  }, []);

  const toggleStyle = (id: TravelStyle) => {
    let newStyles = [...data.trip_style];
    if (newStyles.includes(id)) {
      newStyles = newStyles.filter(s => s !== id);
    } else {
      // Allow max 2 selections to keep it focused
      if (newStyles.length < 2) {
        newStyles.push(id);
      } else {
        newStyles = [newStyles[1], id];
      }
    }
    updateData({ trip_style: newStyles });
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          What kind of journey are you planning?
        </h2>
        <p className="text-muted-foreground">Select up to 2 travel styles.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {styles.map((style) => {
          const isSelected = data.trip_style.includes(style.id);
          return (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleStyle(style.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-full border transition-colors font-medium
                ${isSelected 
                  ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20' 
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-muted'
                }
              `}
            >
              <span className={isSelected ? "text-primary-foreground" : "text-muted-foreground"}>
                {style.icon}
              </span>
              <span>{style.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-end pt-6 border-t border-border mt-8">
        <Button 
          onClick={handleNext} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={data.trip_style.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
