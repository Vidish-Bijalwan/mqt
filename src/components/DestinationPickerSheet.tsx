import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { X, Search, MapPin } from 'lucide-react';

const POPULAR_STATES = [
  "Kerala", "Rajasthan", "Goa", "Uttarakhand", 
  "Himachal Pradesh", "Jammu & Kashmir", "Andaman", "Sikkim",
  "Meghalaya", "Tamil Nadu", "Karnataka", "Maharashtra"
];

interface DestinationPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dest: string) => void;
  selectedDestination: string;
}

export function DestinationPickerSheet({ isOpen, onClose, onSelect, selectedDestination }: DestinationPickerSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const dragControls = useDragControls();
  const sheetY = useMotionValue(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSearchQuery(''); // Reset on open
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const filteredStates = POPULAR_STATES.filter(state => 
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h3 className="text-xl font-bold text-gray-900">Where to?</h3>
              <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 shrink-0">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search states or destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium placeholder:font-normal placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="px-5 pb-8 overflow-y-auto flex-1 overscroll-contain">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Popular Destinations</p>
              
              <div className="flex flex-wrap gap-2.5">
                {filteredStates.length > 0 ? (
                  filteredStates.map(state => {
                    const isSelected = selectedDestination === state;
                    return (
                      <button
                        key={state}
                        onClick={() => {
                          onSelect(state);
                          setTimeout(onClose, 200); // Small delay for visual feedback
                        }}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-600/40 hover:bg-blue-50'
                        }`}
                      >
                        <MapPin size={14} className={isSelected ? 'text-blue-200' : 'text-gray-400'} />
                        {state}
                      </button>
                    )
                  })
                ) : (
                  <div className="w-full text-center py-6">
                    <p className="text-gray-500 text-sm">No destinations found matching "{searchQuery}".<br/>You can still search for it!</p>
                    <button 
                      onClick={() => { onSelect(searchQuery); onClose(); }}
                      className="mt-4 text-blue-600 font-semibold text-sm underline hover:text-blue-800"
                    >
                      Use "{searchQuery}" anyway
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Safe Area padding for iOS */}
            <div className="pb-[env(safe-area-inset-bottom,0px)] bg-white" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
