import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Globe, MapPin, Package, BookOpen, MessageSquare, HelpCircle, Home, Settings, Map, Plus, ArrowRight, Compass, Flower2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

async function fetchContentCounts() {
  const [states, destinations, categories, packages, blogs, testimonials, faqs, travelRoutes, festivals] = await Promise.all([
    supabase.from("states_uts").select("*", { count: "exact", head: true }),
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("package_categories").select("*", { count: "exact", head: true }),
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("travel_routes").select("*", { count: "exact", head: true }),
    supabase.from("festivals").select("*", { count: "exact", head: true }),
  ]);
  return {
    states: states.count ?? 0,
    destinations: destinations.count ?? 0,
    categories: categories.count ?? 0,
    packages: packages.count ?? 0,
    blogs: blogs.count ?? 0,
    testimonials: testimonials.count ?? 0,
    faqs: faqs.count ?? 0,
    travelRoutes: travelRoutes.count ?? 0,
    festivals: festivals.count ?? 0,
  };
}

const contentModules = (counts: Record<string, number>) => [
  {
    label: "States & UTs",
    icon: Globe,
    description: "Manage all Indian states and union territories powering destination browsing.",
    path: "/admin/content/states",
    newPath: "/admin/content/states/new",
    count: counts.states,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Destinations",
    icon: MapPin,
    description: "Curate all travel destinations with content, imagery, and SEO metadata.",
    path: "/admin/content/destinations",
    newPath: "/admin/content/destinations/new",
    count: counts.destinations,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Categories",
    icon: Map,
    description: "Configure package categories like Family Holidays, Heritage Trails, etc.",
    path: "/admin/content/categories",
    newPath: "/admin/content/categories/new",
    count: counts.categories,
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Packages",
    icon: Package,
    description: "Build and manage tour packages with itineraries, highlights, and metadata.",
    path: "/admin/content/packages",
    newPath: "/admin/content/packages/new",
    count: counts.packages,
    color: "bg-orange-50 text-orange-600",
  },
  {
    label: "Blog",
    icon: BookOpen,
    description: "Write and publish travel articles, guides, and editorial content.",
    path: "/admin/content/blog",
    newPath: "/admin/content/blog/new",
    count: counts.blogs,
    color: "bg-pink-50 text-pink-600",
  },
  {
    label: "Testimonials",
    icon: MessageSquare,
    description: "Moderate customer reviews and control which appear on the public site.",
    path: "/admin/content/testimonials",
    newPath: "/admin/content/testimonials/new",
    count: counts.testimonials,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    label: "FAQs",
    icon: HelpCircle,
    description: "Manage frequently asked questions scoped to different sections of the site.",
    path: "/admin/content/faqs",
    newPath: "/admin/content/faqs/new",
    count: counts.faqs,
    color: "bg-cyan-50 text-cyan-600",
  },
  {
    label: "Travel Routes",
    icon: Compass,
    description: "Manage popular itinerary routes and travel paths featured on the homepage.",
    path: "/admin/content/travel-routes",
    newPath: "/admin/content/travel-routes/new",
    count: counts.travelRoutes,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Festivals",
    icon: Flower2,
    description: "Manage Indian festivals and celebrations throughout the year.",
    path: "/admin/content/festivals",
    newPath: "/admin/content/festivals/new",
    count: counts.festivals,
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "Homepage",
    icon: Home,
    description: "Control hero content, featured blocks, and section visibility.",
    path: "/admin/content/homepage",
    newPath: null,
    count: null,
    color: "bg-teal-50 text-teal-600",
  },
  {
    label: "Site Settings",
    icon: Settings,
    description: "Edit global site identity, contact details, social links, and SEO defaults.",
    path: "/admin/content/site-settings",
    newPath: null,
    count: null,
    color: "bg-gray-100 text-gray-600",
  },
];

export default function ContentHub() {
  const { data: counts, isLoading } = useQuery({
    queryKey: ["content-counts"],
    queryFn: fetchContentCounts,
    staleTime: 60_000,
  });

  const modules = contentModules(counts ?? { states: 0, destinations: 0, categories: 0, packages: 0, blogs: 0, testimonials: 0, faqs: 0, travelRoutes: 0, festivals: 0 });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Content Manager</h1>
        <p className="text-sm text-gray-500 mt-1">Central hub for managing all content that powers the public website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => (
          <div key={mod.label} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.color}`}>
                <mod.icon size={20} />
              </div>
              {mod.count !== null && (
                <span className="text-2xl font-display font-bold text-gray-700">
                  {isLoading ? "—" : mod.count}
                </span>
              )}
            </div>
            <h2 className="font-semibold text-gray-900 mb-1">{mod.label}</h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">{mod.description}</p>
            <div className="flex items-center gap-2">
              <Link
                to={mod.path}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                View All <ArrowRight size={12} />
              </Link>
              {mod.newPath && (
                <Link
                  to={mod.newPath}
                  className="flex items-center justify-center w-9 h-9 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Plus size={16} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
