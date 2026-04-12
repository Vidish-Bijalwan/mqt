import { NavLink, useLocation } from 'react-router-dom';
import { Home, Package, MapPin, Compass, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTripPlanner } from '@/contexts/TripPlannerContext';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/packages', label: 'Packages', icon: Package, exact: false },
  { to: '/destinations', label: 'Explore', icon: MapPin, exact: false },
  { special: true, label: 'Plan Trip', icon: Compass },
  { to: '/blog', label: 'Blog', icon: BookOpen, exact: false },
];

const BottomNav = () => {
  const { openPlanner } = useTripPlanner();
  const location = useLocation();

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[80] bg-background/97 backdrop-blur-xl border-t border-border safe-pb">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;

          if (item.special) {
            return (
              <motion.button
                key="plan-trip"
                whileTap={{ scale: 0.92 }}
                onClick={() => openPlanner(undefined, 'bottom_nav')}
                className="flex flex-col items-center gap-0.5 relative -mt-4"
              >
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/40 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </span>
                <span className="text-[10px] font-semibold text-primary mt-0.5">Plan Trip</span>
              </motion.button>
            );
          }

          const active = isActive(item.to!, item.exact!);

          return (
            <NavLink
              key={item.to}
              to={item.to!}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
            >
              <span className="relative">
                <Icon className={`w-5 h-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
                {active && (
                  <motion.span
                    layoutId="bottom-nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </span>
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
