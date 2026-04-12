import { motion } from 'framer-motion';
import { useTripPlanner } from '../../contexts/TripPlannerContext';
import { MapPin, Users, Calendar, Wallet } from 'lucide-react';

export function PlannerSummarySidebar() {
  const { data, currentStep } = useTripPlanner();

  const getStyleLabel = () => {
    if (data.trip_style.length === 0) return 'Not selected';
    return data.trip_style.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
  };

  const hasDest = data.destination_interest || data.state_interest || data.region_interest;
  const destLabel = data.destination_interest || data.state_interest || data.region_interest || 'Anywhere';

  const groupCount = data.group_size.adults + data.group_size.children;
  
  if (currentStep === 0) return null; // Don't show summary on the hook step

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex flex-col w-72 bg-muted/30 border-l border-border p-6 h-full space-y-6"
    >
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground mb-1">Trip Summary</h3>
        <p className="text-sm text-muted-foreground">We're building your perfect plan.</p>
      </div>

      <div className="space-y-4 flex-1">
        
        {/* Destination */}
        <div className={`p-3 rounded-xl border transition-colors ${hasDest ? 'bg-card border-border shadow-sm' : 'bg-transparent border-dashed border-border'}`}>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className={`w-4 h-4 ${hasDest ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Destination</span>
          </div>
          <p className="font-medium text-sm text-foreground ml-6">
            {currentStep > 2 ? destLabel : '...'}
          </p>
        </div>

        {/* Details Cluster */}
        <div className="space-y-3 p-3 rounded-xl bg-card border border-border shadow-sm">
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
               <Calendar className="w-4 h-4 text-primary" />
             </div>
             <div>
               <p className="text-xs text-muted-foreground">Timing</p>
               <p className="text-sm font-medium text-foreground">
                 {currentStep > 3 ? (data.travel_month || (data.date_flexibility ? 'Flexible' : 'Not set')) : '...'}
               </p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
               <Users className="w-4 h-4 text-primary" />
             </div>
             <div>
               <p className="text-xs text-muted-foreground">Travelers</p>
               <p className="text-sm font-medium text-foreground">
                 {currentStep > 4 ? `${groupCount} people` : '...'}
               </p>
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
               <Wallet className="w-4 h-4 text-primary" />
             </div>
             <div>
               <p className="text-xs text-muted-foreground">Style</p>
               <p className="text-sm font-medium text-foreground line-clamp-1">
                 {currentStep > 1 ? getStyleLabel() : '...'}
               </p>
             </div>
          </div>

        </div>

      </div>

      <div className="pt-4 border-t border-border">
         <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 border border-white" />
              <div className="w-6 h-6 rounded-full bg-gray-300 border border-white" />
            </div>
            <p className="text-xs text-muted-foreground">Trusted by 10,000+ travelers</p>
         </div>
      </div>
    </motion.div>
  );
}
