import { motion } from 'framer-motion';

interface PlannerProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function PlannerProgressBar({ currentStep, totalSteps }: PlannerProgressBarProps) {
  // If we are on success step (totalSteps + 1), it goes to 100%
  const clampedStep = Math.min(Math.max(currentStep, 0), totalSteps);
  const progressPercentage = (clampedStep / totalSteps) * 100;

  return (
    <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden relative">
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
