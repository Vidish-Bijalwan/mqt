import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TripPlannerData, INITIAL_PLANNER_DATA } from '../components/planner/schema';
import { useSmartTrigger } from '../hooks/useSmartTrigger';
import { useLocation } from 'react-router-dom';

interface TripPlannerContextType {
  isOpen: boolean;
  currentStep: number;
  data: TripPlannerData;
  hasCompleted: boolean;
  
  openPlanner: (initialData?: Partial<TripPlannerData>, trigger?: string) => void;
  closePlanner: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<TripPlannerData>) => void;
  completePlanner: () => void;
  resetPlanner: () => void;
  
  teaserVisible: boolean;
  dismissTeaser: () => void;
  triggerSource: string | null;
}

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

export function TripPlannerProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  // Try to load partial data if not completed
  const [data, setData] = useState<TripPlannerData>(() => {
    const saved = localStorage.getItem('MQT_PLANNER_DATA');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PLANNER_DATA, ...parsed };
      } catch {
        return INITIAL_PLANNER_DATA;
      }
    }
    return INITIAL_PLANNER_DATA;
  });

  const { teaserVisible, dismissTeaser, triggerSource, setTeaserVisible } = useSmartTrigger(isOpen, hasCompleted);

  // Check if completed previously
  useEffect(() => {
    if (localStorage.getItem('MQT_PLANNER_COMPLETED') === 'true') {
      setHasCompleted(true);
    }
  }, []);

  // Save partial data whenever it changes
  useEffect(() => {
    if (!hasCompleted) {
      localStorage.setItem('MQT_PLANNER_DATA', JSON.stringify(data));
    }
  }, [data, hasCompleted]);

  const openPlanner = (initialData?: Partial<TripPlannerData>, trigger?: string) => {
    if (initialData) {
      setData(prev => ({ ...prev, ...initialData, source_page: location.pathname }));
    } else {
      setData(prev => ({ ...prev, source_page: location.pathname }));
    }
    setIsOpen(true);
    setTeaserVisible(false);
  };

  const closePlanner = () => {
    setIsOpen(false);
  };

  const updateData = (updates: Partial<TripPlannerData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const setStep = (step: number) => setCurrentStep(step);
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

  const completePlanner = () => {
    setHasCompleted(true);
    localStorage.setItem('MQT_PLANNER_COMPLETED', 'true');
    localStorage.removeItem('MQT_PLANNER_DATA');
    // We stay open conceptually, but next 'close' will shut it forever for auto-triggers.
  };

  const resetPlanner = () => {
    setData({ ...INITIAL_PLANNER_DATA, source_page: location.pathname });
    setCurrentStep(0);
    setHasCompleted(false);
    localStorage.removeItem('MQT_PLANNER_COMPLETED');
    localStorage.removeItem('MQT_PLANNER_DATA');
  };

  return (
    <TripPlannerContext.Provider
      value={{
        isOpen,
        currentStep,
        data,
        hasCompleted,
        openPlanner,
        closePlanner,
        setStep,
        nextStep,
        prevStep,
        updateData,
        completePlanner,
        resetPlanner,
        teaserVisible,
        dismissTeaser,
        triggerSource
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
}

export function useTripPlanner() {
  const context = useContext(TripPlannerContext);
  if (context === undefined) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
}
