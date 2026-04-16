import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Inbox, Image as ImageIcon, LogOut,
  Globe, Package, MapPin, BookOpen, MessageSquare, HelpCircle,
  Home, Settings, Map, ChevronRight, Menu, X, Flag, Compass, Flower2, Grid3x3, Lightbulb, HelpingHand, Mail, Waves, Smile, ScrollText
} from "lucide-react";

const sidebarGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Enquiries", path: "/admin/enquiries", icon: Inbox },
      { label: "Reviews", path: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "States & UTs", path: "/admin/content/states", icon: Globe },
      { label: "Destinations", path: "/admin/content/destinations", icon: MapPin },
      { label: "Categories", path: "/admin/content/categories", icon: Map },
      { label: "Packages", path: "/admin/content/packages", icon: Package },
      { label: "Blog", path: "/admin/content/blog", icon: BookOpen },
      { label: "Testimonials", path: "/admin/content/testimonials", icon: MessageSquare },
      { label: "FAQs", path: "/admin/content/faqs", icon: HelpCircle },
      { label: "Travel Routes", path: "/admin/content/travel-routes", icon: Compass },
      { label: "Festivals", path: "/admin/content/festivals", icon: Flower2 },
      { label: "Discovery Vibes", path: "/admin/content/discovery-vibes", icon: Waves },
      { label: "Domestic/International", path: "/admin/content/domestic-international", icon: Flag },
      { label: "Travel Experiences", path: "/admin/content/travel-experiences", icon: Lightbulb },
      { label: "Why Choose Us", path: "/admin/content/why-choose-us", icon: Smile },
      { label: "How It Works", path: "/admin/content/how-it-works", icon: ScrollText },
      { label: "Newsletter", path: "/admin/content/newsletter", icon: Mail },
      { label: "Trust Strip", path: "/admin/content/trust-strip", icon: HelpingHand },
      { label: "Homepage", path: "/admin/content/homepage", icon: Home },
      { label: "Site Settings", path: "/admin/content/site-settings", icon: Settings },
    ],
  },
  {
    label: "Media",
    items: [
      { label: "Media Library", path: "/admin/media", icon: ImageIcon },
    ],
  },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* Brand */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
        <div>
          <div className="text-lg font-display font-bold tracking-tight">
            MQT<span className="text-emerald-400">.</span>Admin
          </div>
          <p className="text-gray-400 text-[11px] mt-0.5 truncate max-w-[160px]">{user?.email}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sidebarGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-3 mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={16} className="shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight size={14} className="text-emerald-400" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
};

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-gray-950 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 left-0 w-60 z-50 lg:hidden"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 lg:px-8 shrink-0 sticky top-0 z-20">
          <button
            className="lg:hidden mr-3 text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Flag size={14} />
            <span className="text-gray-600 font-medium">MQT Admin Workspace</span>
          </div>
          <div className="ml-auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
            >
              View Live Site →
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
