import { motion } from 'framer-motion';
import { useTripPlanner } from '../../../contexts/TripPlannerContext';
import { Minus, Plus } from 'lucide-react';

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
    <div className="flex items-center justify-between p-4 md:p-5 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:border-gray-200 transition-colors">
      <div>
        <h4 className="font-bold text-gray-900 text-lg">{label}</h4>
        <p className="text-sm text-gray-500 font-medium">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => updateCount(type, -1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:hover:bg-gray-50 border border-gray-200"
          disabled={value <= (type === 'adults' ? 1 : 0)}
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="w-8 text-center font-bold text-gray-900 text-xl">{value}</span>
        <button 
          onClick={() => updateCount(type, 1)}
          className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-xl mx-auto">
      <div className="text-center md:text-center space-y-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">
          Who's traveling?
        </h2>
        <p className="text-gray-500">Add the number of people in your party.</p>
      </div>

      <div className="space-y-3">
        <Stepper label="Adults" description="Ages 12 or above" type="adults" value={adults} />
        <Stepper label="Children" description="Ages 2 to 11" type="children" value={children} />
        <Stepper label="Infants" description="Under 2 years" type="infants" value={infants} />
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={handleNext}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
