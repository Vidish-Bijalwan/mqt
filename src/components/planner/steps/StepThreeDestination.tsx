import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { MapPin, Search } from 'lucide-react';
import { getDestinations } from '../../../services/destinationService';

export function StepThreeDestination() {
  const { data, updateData, nextStep } = useTripPlanner();
  const [searchValue, setSearchValue] = useState(data.destination_interest || data.state_interest || '');
  const [popularRegions, setPopularRegions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data: dests } = await getDestinations(6);
        if (dests && dests.length > 0) {
          // get unique destination states/regions if possible, or just the destination names
          setPopularRegions(dests.map(d => d.name));
        } else {
          setPopularRegions(['Kerala', 'Rajasthan', 'Goa', 'Himachal', 'Andaman', 'Uttarakhand']);
        }
      } catch(e) {
        setPopularRegions(['Kerala', 'Rajasthan', 'Goa', 'Himachal', 'Andaman', 'Uttarakhand']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleSelectRegion = (region: string) => {
    setSearchValue(region);
    updateData({ region_interest: region, destination_interest: region });
  };

  const handleNext = () => {
    updateData({ destination_interest: searchValue });
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center sm:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
          Where would you like to travel?
        </h2>
        <p className="text-muted-foreground">Search for a state, city, or choose from popular destinations.</p>
      </div>

      <div className="space-y-6 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="e.g. Jaipur, Rajasthan or Kerala"
            className="pl-10 py-6 text-lg rounded-xl bg-background border-border"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Popular Regions</p>
          <div className="flex flex-wrap gap-2">
            {popularRegions.map((region) => (
              <button
                key={region}
                onClick={() => handleSelectRegion(region)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors
                  ${searchValue.toLowerCase() === region.toLowerCase() 
                    ? 'bg-primary/10 border-primary text-primary font-medium' 
                    : 'bg-muted/30 border-border text-foreground hover:bg-muted'
                  }
                `}
              >
                <MapPin className="w-3.5 h-3.5" />
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
        <button 
          onClick={() => {
            setSearchValue('');
            updateData({ destination_interest: 'Open to suggestions', region_interest: null, state_interest: null });
            nextStep();
          }}
          className="text-sm text-foreground hover:text-primary underline underline-offset-4"
        >
          Not sure yet? Need suggestions
        </button>
        <Button 
          onClick={handleNext} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          disabled={!searchValue.trim()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
