import { useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

const MONTHS = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

interface MonthPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (month: string) => void;
  selectedMonth: string;
}

export function MonthPickerSheet({ isOpen, onClose, onSelect, selectedMonth }: MonthPickerSheetProps) {
  const dragControls = useDragControls();
  const sheetY = useMotionValue(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const currentMonthIndex = new Date().getMonth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-[111] flex flex-col bg-white rounded-t-3xl max-h-[85vh] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            style={{ y: sheetY }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose();
              } else {
                sheetY.set(0);
              }
            }}
          >
            {/* Drag Handle */}
            <div 
              className="flex justify-center p-3 cursor-grab active:cursor-grabbing shrink-0"
              onPointerDown={e => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            <div className="px-5 pb-4 shrink-0 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={24} /> When are you traveling?
                </h3>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-6 overflow-y-auto flex-1 overscroll-contain">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MONTHS.map((month, index) => {
                  const isPast = index < currentMonthIndex && currentMonthIndex !== 11; // Allow selecting next year's early months if late in year
                  const isCurrent = index === currentMonthIndex;
                  const isSelected = selectedMonth === month;
                  
                  return (
                    <button
                      key={month}
                      onClick={() => {
                        onSelect(month);
                        setTimeout(onClose, 200);
                      }}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/50 shadow-[0_0_0_2px_rgba(37,99,235,0.2)]' 
                          : isCurrent
                          ? 'border-blue-200 bg-white hover:border-blue-300'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-2.5 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          This Month
                        </span>
                      )}
                      <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                        {month.substring(0, 3)}
                      </span>
                      <span className={`text-[10px] font-medium mt-1 uppercase tracking-wider ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}>
                         {month}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => { onSelect("Flexible"); onClose(); }}
                className={`w-full mt-4 p-4 rounded-2xl border flex items-center justify-center gap-2 font-medium transition-colors ${
                  selectedMonth === "Flexible"
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                I'm flexible with dates
              </button>
            </div>
            
            {/* Safe Area padding for iOS */}
            <div className="pb-[env(safe-area-inset-bottom,0px)] bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
