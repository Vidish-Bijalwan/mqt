import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Inbox, MapPin, Package, BookOpen, Globe, HelpCircle, ArrowRight, TrendingUp, Users, CheckCircle, Clock, Database } from "lucide-react";
import { getEnquiryStats } from "@/services/adminEnquiryService";
import { seedDatabaseFromClient } from "@/services/seedService";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

async function fetchDashboardStats() {
  const [enquiryStats, destCount, pkgCount, blogCount, testimonialCount] = await Promise.all([
    getEnquiryStats(),
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("active", true),
  ]);
  return {
    enquiries: enquiryStats.data ?? { total: 0, newCount: 0, contacted: 0, quoted: 0, converted: 0, closed: 0 },
    destinations: destCount.count ?? 0,
    packages: pkgCount.count ?? 0,
    publishedBlogs: blogCount.count ?? 0,
    approvedTestimonials: testimonialCount.count ?? 0,
  };
}

async function fetchRecentEnquiries() {
  const { data } = await supabase
    .from("enquiries")
    .select("id, name, destination, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  converted: "bg-emerald-100 text-emerald-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchDashboardStats,
    staleTime: 60_000,
  });

  const { data: recentEnquiries, isLoading: enquiriesLoading } = useQuery({
    queryKey: ["admin-recent-enquiries"],
    queryFn: fetchRecentEnquiries,
    staleTime: 30_000,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your live operating overview for MyQuickTrippers.</p>
      </div>

      {/* KPI Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <>
          {/* Seeding Banner — shown when content counts are 0 */}
          {!statsLoading && stats?.destinations === 0 && stats?.packages === 0 && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
              <Database size={20} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-amber-800 text-sm">Database is empty — static data not yet migrated</p>
                <p className="text-amber-700 text-xs mt-1">Click <strong>"Migrate Static Data"</strong> in Quick Actions below to push all packages, destinations, blogs and testimonials into the database in one click. This is a one-time operation.</p>
              </div>
            </div>
          )}

          {/* Enquiry Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Leads", value: stats?.enquiries.total, icon: Inbox, color: "text-gray-700", bg: "bg-gray-50" },
              { label: "New", value: stats?.enquiries.newCount, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Contacted", value: stats?.enquiries.contacted, icon: Users, color: "text-yellow-600", bg: "bg-yellow-50" },
              { label: "Quoted", value: stats?.enquiries.quoted, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Converted", value: stats?.enquiries.converted, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-gray-100`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</span>
                  <stat.icon size={16} className={stat.color} />
                </div>
                <div className={`text-3xl font-display font-bold ${stat.color}`}>{stat.value ?? 0}</div>
              </div>
            ))}
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Destinations", value: stats?.destinations, icon: MapPin, path: "/admin/content/destinations" },
              { label: "Packages", value: stats?.packages, icon: Package, path: "/admin/content/packages" },
              { label: "Blog Posts", value: stats?.publishedBlogs, icon: BookOpen, path: "/admin/content/blog" },
              { label: "Testimonials", value: stats?.approvedTestimonials, icon: CheckCircle, path: "/admin/content/testimonials" },
            ].map((stat) => (
              <Link key={stat.label} to={stat.path} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-primary/30 hover:shadow-sm transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <div className="text-2xl font-display font-bold text-gray-800">{stat.value ?? 0}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs text-primary font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div>
            {enquiriesLoading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : !recentEnquiries?.length ? (
              <div className="p-8 text-center text-gray-400 text-sm">No enquiries yet.</div>
            ) : (
              <ul>
                {(recentEnquiries as any[]).map((enq) => (
                  <li key={enq.id} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{enq.name}</p>
                      <p className="text-xs text-gray-400">{enq.destination}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusColors[enq.status] ?? "bg-gray-100 text-gray-500"}`}>
                      {enq.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { label: "Add New State", path: "/admin/content/states/new", icon: Globe },
              { label: "Add Destination", path: "/admin/content/destinations/new", icon: MapPin },
              { label: "Add Package", path: "/admin/content/packages/new", icon: Package },
              { label: "Write Blog Post", path: "/admin/content/blog/new", icon: BookOpen },
              { label: "Upload Media", path: "/admin/media", icon: HelpCircle },
              { label: "Review Enquiries", path: "/admin/enquiries", icon: Inbox },
            ].map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
              >
                <action.icon size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
                {action.label}
                <ArrowRight size={12} className="ml-auto text-gray-300 group-hover:text-primary" />
              </Link>
            ))}
            
            <button
              onClick={async () => {
                toast.loading("Seeding Database...");
                const errors = await seedDatabaseFromClient();
                if (errors.length > 0) {
                  toast.error(`Completed with ${errors.length} errors. Check console.`);
                } else {
                  toast.success("Database fully seeded from static files!");
                  setTimeout(() => window.location.reload(), 1500);
                }
              }}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors group"
            >
              <Database size={16} className="text-amber-500" />
              Migrate Static Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
