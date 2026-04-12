import { NavLink, useLocation } from 'react-router-dom';
import { Home, Package, MapPin, Search, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/packages', label: 'Packages', icon: Package, exact: false },
  { to: '/destinations', label: 'Explore', icon: MapPin, exact: false },
  { to: '/packages', label: 'Search', icon: Search, exact: false }, // Directing Search to packages page for now
];

const BottomNav = () => {
  const { openPlanner } = useTripPlanner();
  const location = useLocation();

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom,0px)] h-16 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, item.exact);

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex flex-col items-center justify-center gap-1 w-16"
            >
              <Icon className={`w-[22px] h-[22px] transition-colors ${active ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-blue-700' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Floating Action Button (compass) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => openPlanner(undefined, 'fab')}
        className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
        aria-label="Plan Custom Trip"
      >
        <Compass size={28} className="animate-pulse-slow" />
      </motion.button>
    </>
  );
};

export default BottomNav;
