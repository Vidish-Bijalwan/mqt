import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TripPlannerData, INITIAL_PLANNER_DATA } from '../components/planner/schema';
import { useSmartTrigger } from '../hooks/useSmartTrigger';
import { useLocation } from 'react-router-dom';

interface TripPlannerContextType {
  isOpen: boolean;
  currentStep: number;
  data: TripPlannerData;
  hasCompleted: boolean;
  hasResumeData: boolean;     // true if partial data was saved
  resumeStep: number;         // the step to resume from

  openPlanner: (initialData?: Partial<TripPlannerData>, trigger?: string) => void;
  closePlanner: () => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<TripPlannerData>) => void;
  completePlanner: () => void;
  resetPlanner: () => void;
  resumePlanner: () => void;  // jump to saved step

  teaserVisible: boolean;
  dismissTeaser: () => void;
  triggerSource: string | null;
}

const TripPlannerContext = createContext<TripPlannerContextType | undefined>(undefined);

function detectResumeStep(data: TripPlannerData): number {
  if (data.contact_name) return 8;
  if (data.special_requirements !== undefined && data.intent_type === 'custom_trip') return 7;
  if (data.budget_preference || data.stay_preference) return 6;
  if (data.group_size.adults > 1 || data.group_size.children > 0) return 5;
  if (data.travel_month) return 4;
  if (data.destination_interest || data.state_interest) return 3;
  if (data.trip_style.length > 0) return 2;
  if (data.intent_type) return 1;
  return 0;
}

export function TripPlannerProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [hasResumeData, setHasResumeData] = useState(false);
  const [resumeStep, setResumeStep] = useState(0);

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

  const { teaserVisible, dismissTeaser, triggerSource, setTeaserVisible } = useSmartTrigger(
    isOpen,
    hasCompleted,
    { scrollDepthThreshold: 40, timeThreshold: 30, interactionThreshold: 2, packagePageDelay: 10, cooldownHours: 2 }
  );

  // On mount: check completion + detect resume data
  useEffect(() => {
    if (localStorage.getItem('MQT_PLANNER_COMPLETED') === 'true') {
      setHasCompleted(true);
      return;
    }
    const saved = localStorage.getItem('MQT_PLANNER_DATA');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = { ...INITIAL_PLANNER_DATA, ...parsed };
        const step = detectResumeStep(merged);
        if (step > 0) {
          setHasResumeData(true);
          setResumeStep(step);
        }
      } catch {}
    }
  }, []);

  // Persist partial data on change
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
    setCurrentStep(0); // always start at hook/resume prompt
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

  const resumePlanner = () => {
    setCurrentStep(resumeStep);
  };

  const completePlanner = () => {
    setHasCompleted(true);
    setHasResumeData(false);
    localStorage.setItem('MQT_PLANNER_COMPLETED', 'true');
    localStorage.removeItem('MQT_PLANNER_DATA');
    setCurrentStep(9); // success state
  };

  const resetPlanner = () => {
    setData({ ...INITIAL_PLANNER_DATA, source_page: location.pathname });
    setCurrentStep(0);
    setHasCompleted(false);
    setHasResumeData(false);
    setResumeStep(0);
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
        hasResumeData,
        resumeStep,
        openPlanner,
        closePlanner,
        setStep,
        nextStep,
        prevStep,
        updateData,
        completePlanner,
        resetPlanner,
        resumePlanner,
        teaserVisible,
        dismissTeaser,
        triggerSource,
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
