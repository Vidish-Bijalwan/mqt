import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { TripPlannerProvider } from "@/contexts/TripPlannerContext";
import { TripPlannerModal } from "@/components/planner/TripPlannerModal";
import { PlannerTeaser } from "@/components/planner/PlannerTeaser";
import { ResumePlannerPopup } from "@/components/planner/ResumePlannerPopup";

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

import { AdminDestinations, DestinationForm } from "./pages/admin/content/AdminDestinations.tsx";
import { AdminPackages, PackageForm } from "./pages/admin/content/AdminPackages.tsx";
import { AdminBlog, BlogForm } from "./pages/admin/content/AdminBlog.tsx";
import { AdminTestimonials, TestimonialForm } from "./pages/admin/content/AdminTestimonials.tsx";
import AdminHomepage from "./pages/admin/content/AdminHomepage.tsx";

// Section Management Imports
import { AdminTravelRoutes } from "./pages/admin/content/AdminTravelRoutes.tsx";
import { TravelRouteForm } from "./pages/admin/content/TravelRouteForm.tsx";
import { AdminFestivals } from "./pages/admin/content/AdminFestivals.tsx";
import { FestivalForm } from "./pages/admin/content/FestivalForm.tsx";
import { AdminDiscoveryVibes } from "./pages/admin/content/AdminDiscoveryVibes.tsx";
import { DiscoveryVibeForm } from "./pages/admin/content/DiscoveryVibeForm.tsx";
import { AdminDomesticInternational } from "./pages/admin/content/AdminDomesticInternational.tsx";
import { DomesticInternationalForm } from "./pages/admin/content/DomesticInternationalForm.tsx";
import { AdminTravelExperiences } from "./pages/admin/content/AdminTravelExperiences.tsx";
import { TravelExperienceForm } from "./pages/admin/content/TravelExperienceForm.tsx";
import { AdminWhyChooseUs } from "./pages/admin/content/AdminWhyChooseUs.tsx";
import { WhyChooseUsForm } from "./pages/admin/content/WhyChooseUsForm.tsx";
import { AdminHowItWorks } from "./pages/admin/content/AdminHowItWorks.tsx";
import { HowItWorksForm } from "./pages/admin/content/HowItWorksForm.tsx";
import { AdminNewsletter } from "./pages/admin/content/AdminNewsletter.tsx";
import { AdminTrustStrip } from "./pages/admin/content/AdminTrustStrip.tsx";

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

            {/* Destinations */}
            <Route path="/admin/content/destinations" element={<AdminDestinations />} />
            <Route path="/admin/content/destinations/new" element={<DestinationForm />} />
            <Route path="/admin/content/destinations/:id/edit" element={<DestinationForm />} />

            {/* Categories */}
            <Route path="/admin/content/categories" element={<AdminCategories />} />
            <Route path="/admin/content/categories/new" element={<CategoryForm />} />
            <Route path="/admin/content/categories/:id/edit" element={<CategoryForm />} />

            {/* Packages */}
            <Route path="/admin/content/packages" element={<AdminPackages />} />
            <Route path="/admin/content/packages/new" element={<PackageForm />} />
            <Route path="/admin/content/packages/:id/edit" element={<PackageForm />} />

            {/* Blog */}
            <Route path="/admin/content/blog" element={<AdminBlog />} />
            <Route path="/admin/content/blog/new" element={<BlogForm />} />
            <Route path="/admin/content/blog/:id/edit" element={<BlogForm />} />

            {/* Testimonials */}
            <Route path="/admin/content/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/content/testimonials/new" element={<TestimonialForm />} />
            <Route path="/admin/content/testimonials/:id/edit" element={<TestimonialForm />} />

            {/* FAQs */}
            <Route path="/admin/content/faqs" element={<AdminFAQs />} />
            <Route path="/admin/content/faqs/new" element={<FAQForm />} />
            <Route path="/admin/content/faqs/:id/edit" element={<FAQForm />} />

            {/* Homepage & Settings */}
            <Route path="/admin/content/homepage" element={<AdminHomepage />} />
            <Route path="/admin/content/site-settings" element={<SiteSettings />} />

            {/* Travel Routes */}
            <Route path="/admin/content/travel-routes" element={<AdminTravelRoutes />} />
            <Route path="/admin/content/travel-routes/new" element={<TravelRouteForm />} />
            <Route path="/admin/content/travel-routes/:id/edit" element={<TravelRouteForm />} />

            {/* Festivals */}
            <Route path="/admin/content/festivals" element={<AdminFestivals />} />
            <Route path="/admin/content/festivals/new" element={<FestivalForm />} />
            <Route path="/admin/content/festivals/:id/edit" element={<FestivalForm />} />

            {/* Discovery Vibes */}
            <Route path="/admin/content/discovery-vibes" element={<AdminDiscoveryVibes />} />
            <Route path="/admin/content/discovery-vibes/new" element={<DiscoveryVibeForm />} />
            <Route path="/admin/content/discovery-vibes/:id/edit" element={<DiscoveryVibeForm />} />

            {/* Domestic & International */}
            <Route path="/admin/content/domestic-international" element={<AdminDomesticInternational />} />
            <Route path="/admin/content/domestic-international/new" element={<DomesticInternationalForm />} />
            <Route path="/admin/content/domestic-international/:id/edit" element={<DomesticInternationalForm />} />

            {/* Travel Experiences */}
            <Route path="/admin/content/travel-experiences" element={<AdminTravelExperiences />} />
            <Route path="/admin/content/travel-experiences/new" element={<TravelExperienceForm />} />
            <Route path="/admin/content/travel-experiences/:id/edit" element={<TravelExperienceForm />} />

            {/* Why Choose Us */}
            <Route path="/admin/content/why-choose-us" element={<AdminWhyChooseUs />} />
            <Route path="/admin/content/why-choose-us/new" element={<WhyChooseUsForm />} />
            <Route path="/admin/content/why-choose-us/:id/edit" element={<WhyChooseUsForm />} />

            {/* How It Works */}
            <Route path="/admin/content/how-it-works" element={<AdminHowItWorks />} />
            <Route path="/admin/content/how-it-works/new" element={<HowItWorksForm />} />
            <Route path="/admin/content/how-it-works/:id/edit" element={<HowItWorksForm />} />

            {/* Newsletter */}
            <Route path="/admin/content/newsletter" element={<AdminNewsletter />} />

            {/* Trust Strip */}
            <Route path="/admin/content/trust-strip" element={<AdminTrustStrip />} />

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
        <BrowserRouter>
          <TripPlannerProvider>
            <Toaster />
            <Sonner />
            <AnimatedRoutes />
            <TripPlannerModal />
            <PlannerTeaser />
            <ResumePlannerPopup />
          </TripPlannerProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
