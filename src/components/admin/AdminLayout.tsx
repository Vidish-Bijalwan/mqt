import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Inbox, Image as ImageIcon, Settings, LogOut, Map } from "lucide-react";

export const AdminLayout = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} />, end: true },
    { label: "Enquiries", path: "/admin/enquiries", icon: <Inbox size={20} /> },
    { label: "Content", path: "/admin/content", icon: <Map size={20} /> },
    { label: "Media Storage", path: "/admin/media", icon: <ImageIcon size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-body">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white min-h-[auto] md:min-h-screen flex flex-col">
        <div className="p-6">
          <div className="text-xl font-display font-bold">MQT<span className="text-emerald-400">.</span>Admin</div>
          <p className="text-gray-400 text-xs mt-1 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors w-full text-left"
          >
            <LogOut size={20} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm shrink-0">
          <h1 className="font-semibold text-gray-800">MyQuickTrippers Workspace</h1>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};
