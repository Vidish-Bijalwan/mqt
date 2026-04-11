import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Pages
import Index from "./pages/Index.tsx";
import Destinations from "./pages/Destinations.tsx";
import StateListing from "./pages/StateListing.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import Packages from "./pages/Packages.tsx";
import PackageDetail from "./pages/PackageDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

// Admin Infrastructure
import { ProtectedRoute } from "./components/admin/ProtectedRoute.tsx";
import { AdminLayout } from "./components/admin/AdminLayout.tsx";

// Admin Pages — Core
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminEnquiries from "./pages/admin/AdminEnquiries.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import ContentHub from "./pages/admin/ContentHub.tsx";

// Admin Pages — Content CRUD
import AdminStates from "./pages/admin/content/AdminStates.tsx";
import StateForm from "./pages/admin/content/StateForm.tsx";
import AdminCategories from "./pages/admin/content/AdminCategories.tsx";
import CategoryForm from "./pages/admin/content/CategoryForm.tsx";
import { AdminFAQs, FAQForm } from "./pages/admin/content/AdminFAQs.tsx";
import SiteSettings from "./pages/admin/content/SiteSettings.tsx";

// Placeholder stubs for remaining content routes — to be built next
const Stub = ({ title }: { title: string }) => (
  <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
    <p className="text-gray-400 font-medium">{title} — coming next.</p>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Index />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:stateSlug" element={<StateListing />} />
        <Route path="/destinations/:stateSlug/:slug" element={<DestinationDetail />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:category" element={<Packages />} />
        <Route path="/packages/:category/:slug" element={<PackageDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/services/*" element={<NotFound />} />
        <Route path="/terms" element={<NotFound />} />
        <Route path="/privacy" element={<NotFound />} />
        <Route path="/refund" element={<NotFound />} />

        {/* ── Admin: Public ── */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ── Admin: Protected Workspace ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>

            {/* Core */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="/admin/media" element={<AdminMedia />} />
            <Route path="/admin/content" element={<ContentHub />} />

            {/* States & UTs */}
            <Route path="/admin/content/states" element={<AdminStates />} />
            <Route path="/admin/content/states/new" element={<StateForm />} />
            <Route path="/admin/content/states/:id/edit" element={<StateForm />} />

            {/* Destinations (stubs → full form next) */}
            <Route path="/admin/content/destinations" element={<Stub title="Destinations" />} />
            <Route path="/admin/content/destinations/new" element={<Stub title="New Destination Form" />} />
            <Route path="/admin/content/destinations/:id/edit" element={<Stub title="Edit Destination" />} />

            {/* Categories */}
            <Route path="/admin/content/categories" element={<AdminCategories />} />
            <Route path="/admin/content/categories/new" element={<CategoryForm />} />
            <Route path="/admin/content/categories/:id/edit" element={<CategoryForm />} />

            {/* Packages (stubs → full form next) */}
            <Route path="/admin/content/packages" element={<Stub title="Packages" />} />
            <Route path="/admin/content/packages/new" element={<Stub title="New Package Form" />} />
            <Route path="/admin/content/packages/:id/edit" element={<Stub title="Edit Package" />} />

            {/* Blog (stubs → full form next) */}
            <Route path="/admin/content/blog" element={<Stub title="Blog" />} />
            <Route path="/admin/content/blog/new" element={<Stub title="New Post" />} />
            <Route path="/admin/content/blog/:id/edit" element={<Stub title="Edit Post" />} />

            {/* Testimonials (stubs → full form next) */}
            <Route path="/admin/content/testimonials" element={<Stub title="Testimonials" />} />
            <Route path="/admin/content/testimonials/new" element={<Stub title="New Testimonial" />} />
            <Route path="/admin/content/testimonials/:id/edit" element={<Stub title="Edit Testimonial" />} />

            {/* FAQs */}
            <Route path="/admin/content/faqs" element={<AdminFAQs />} />
            <Route path="/admin/content/faqs/new" element={<FAQForm />} />
            <Route path="/admin/content/faqs/:id/edit" element={<FAQForm />} />

            {/* Homepage & Settings */}
            <Route path="/admin/content/homepage" element={<Stub title="Homepage Manager" />} />
            <Route path="/admin/content/site-settings" element={<SiteSettings />} />

          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
