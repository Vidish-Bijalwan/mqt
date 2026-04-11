import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

// Admin Imports
import { ProtectedRoute } from "./components/admin/ProtectedRoute.tsx";
import { AdminLayout } from "./components/admin/AdminLayout.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminEnquiries from "./pages/admin/AdminEnquiries.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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

        {/* Fallback routes for unbuilt service/legal pages pointing to NotFound for now */}
        <Route path="/services/*" element={<NotFound />} />
        <Route path="/terms" element={<NotFound />} />
        <Route path="/privacy" element={<NotFound />} />
        <Route path="/refund" element={<NotFound />} />
        
        {/* Admin Public Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected Workspace */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
            <Route path="/admin/content" element={
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                <p className="text-gray-500 font-medium">Content Manager coming soon...</p>
              </div>
            } />
            <Route path="/admin/media" element={<AdminMedia />} />
          </Route>
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
