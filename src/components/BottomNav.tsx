import { NavLink, useLocation } from 'react-router-dom';
import { Home, Package, MapPin, Phone } from 'lucide-react';

// Jakob's Law: travel apps always have Home, Packages, Explore, Contact
// Fitts's Law: 4 equally-spaced items with adequate tap area (h-16)
// Removed compass FAB — TripPlannerModal accessible from hamburger menu
const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home, exact: true },
  { to: '/packages', label: 'Packages', icon: Package, exact: false },
  { to: '/destinations', label: 'Explore', icon: MapPin, exact: false },
  { to: '/contact', label: 'Contact', icon: Phone, exact: false },
];

const BottomNav = () => {
  const location = useLocation();

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 h-16 flex items-center justify-around shadow-[0_-2px_12px_rgba(0,0,0,0.07)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to, item.exact);

        return (
          <NavLink
            key={item.label}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 flex-1 h-full"
            aria-label={item.label}
          >
            <Icon
              className={`w-[22px] h-[22px] transition-colors ${
                active ? 'text-blue-700' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-[10px] font-medium transition-colors ${
                active ? 'text-blue-700' : 'text-gray-500'
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
