import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { TripPlannerProvider } from "@/contexts/TripPlannerContext";
import { TripPlannerModal } from "@/components/planner/TripPlannerModal";
import { PlannerTeaser } from "@/components/planner/PlannerTeaser";
import { ResumePlannerPopup } from "@/components/planner/ResumePlannerPopup";
import RetentionNudge from "@/components/RetentionNudge";
import CookieConsent from "@/components/CookieConsent";

// Public Pages
import Index from "./pages/Index.tsx";
const Destinations = React.lazy(() => import('./pages/Destinations.tsx'));
const StateListing = React.lazy(() => import('./pages/StateListing.tsx'));
const DestinationDetail = React.lazy(() => import('./pages/DestinationDetail.tsx'));
const Packages = React.lazy(() => import('./pages/Packages.tsx'));
const PackageDetail = React.lazy(() => import('./pages/PackageDetail.tsx'));
const HelicopterPackages = React.lazy(() => import('./pages/HelicopterPackages.tsx'));
const About = React.lazy(() => import('./pages/About.tsx'));
const Contact = React.lazy(() => import('./pages/Contact.tsx'));
const Blog = React.lazy(() => import('./pages/Blog.tsx'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail.tsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.tsx'));
const CancellationPolicy = React.lazy(() => import("./pages/CancellationPolicy.tsx"));
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail.tsx"));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy.tsx'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService.tsx'));
const UserProfile = React.lazy(() => import('./pages/UserProfile.tsx'));
const Login = React.lazy(() => import('./pages/Login.tsx'));

// Admin Infrastructure
const ProtectedRoute = React.lazy(() => import('./components/admin/ProtectedRoute.tsx').then(module => ({ default: module.ProtectedRoute })));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout.tsx').then(module => ({ default: module.AdminLayout })));

// Admin Pages — Core
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin.tsx'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard.tsx'));
const AdminEnquiries = React.lazy(() => import('./pages/admin/AdminEnquiries.tsx'));
const AdminMedia = React.lazy(() => import('./pages/admin/AdminMedia.tsx'));
const AdminReviews = React.lazy(() => import('./pages/admin/content/AdminReviews.tsx'));
const ContentHub = React.lazy(() => import('./pages/admin/ContentHub.tsx'));

// Admin Pages — Content CRUD
const AdminStates = React.lazy(() => import('./pages/admin/content/AdminStates.tsx'));
const StateForm = React.lazy(() => import('./pages/admin/content/StateForm.tsx'));
const AdminCategories = React.lazy(() => import('./pages/admin/content/AdminCategories.tsx'));
const CategoryForm = React.lazy(() => import('./pages/admin/content/CategoryForm.tsx'));
const AdminFAQs = React.lazy(() => import('./pages/admin/content/AdminFAQs.tsx').then(module => ({ default: module.AdminFAQs })));
const FAQForm = React.lazy(() => import('./pages/admin/content/AdminFAQs.tsx').then(module => ({ default: module.FAQForm })));
const SiteSettings = React.lazy(() => import('./pages/admin/content/SiteSettings.tsx'));

const AdminDestinations = React.lazy(() => import('./pages/admin/content/AdminDestinations.tsx').then(module => ({ default: module.AdminDestinations })));
const DestinationForm = React.lazy(() => import('./pages/admin/content/AdminDestinations.tsx').then(module => ({ default: module.DestinationForm })));
const AdminPackages = React.lazy(() => import('./pages/admin/content/AdminPackages.tsx').then(module => ({ default: module.AdminPackages })));
const PackageForm = React.lazy(() => import('./pages/admin/content/AdminPackages.tsx').then(module => ({ default: module.PackageForm })));
const AdminBlog = React.lazy(() => import('./pages/admin/content/AdminBlog.tsx').then(module => ({ default: module.AdminBlog })));
const BlogForm = React.lazy(() => import('./pages/admin/content/AdminBlog.tsx').then(module => ({ default: module.BlogForm })));
const AdminTestimonials = React.lazy(() => import('./pages/admin/content/AdminTestimonials.tsx').then(module => ({ default: module.AdminTestimonials })));
const TestimonialForm = React.lazy(() => import('./pages/admin/content/AdminTestimonials.tsx').then(module => ({ default: module.TestimonialForm })));
const AdminHomepage = React.lazy(() => import('./pages/admin/content/AdminHomepage.tsx'));

// Section Management Imports
const AdminTravelRoutes = React.lazy(() => import('./pages/admin/content/AdminTravelRoutes.tsx').then(module => ({ default: module.AdminTravelRoutes })));
const TravelRouteForm = React.lazy(() => import('./pages/admin/content/TravelRouteForm.tsx').then(module => ({ default: module.TravelRouteForm })));
const AdminFestivals = React.lazy(() => import('./pages/admin/content/AdminFestivals.tsx').then(module => ({ default: module.AdminFestivals })));
const FestivalForm = React.lazy(() => import('./pages/admin/content/FestivalForm.tsx').then(module => ({ default: module.FestivalForm })));
const AdminDiscoveryVibes = React.lazy(() => import('./pages/admin/content/AdminDiscoveryVibes.tsx').then(module => ({ default: module.AdminDiscoveryVibes })));
const DiscoveryVibeForm = React.lazy(() => import('./pages/admin/content/DiscoveryVibeForm.tsx').then(module => ({ default: module.DiscoveryVibeForm })));
const AdminDomesticInternational = React.lazy(() => import('./pages/admin/content/AdminDomesticInternational.tsx').then(module => ({ default: module.AdminDomesticInternational })));
const DomesticInternationalForm = React.lazy(() => import('./pages/admin/content/DomesticInternationalForm.tsx').then(module => ({ default: module.DomesticInternationalForm })));
const AdminTravelExperiences = React.lazy(() => import('./pages/admin/content/AdminTravelExperiences.tsx').then(module => ({ default: module.AdminTravelExperiences })));
const TravelExperienceForm = React.lazy(() => import('./pages/admin/content/TravelExperienceForm.tsx').then(module => ({ default: module.TravelExperienceForm })));
const AdminWhyChooseUs = React.lazy(() => import('./pages/admin/content/AdminWhyChooseUs.tsx').then(module => ({ default: module.AdminWhyChooseUs })));
const WhyChooseUsForm = React.lazy(() => import('./pages/admin/content/WhyChooseUsForm.tsx').then(module => ({ default: module.WhyChooseUsForm })));
const AdminHowItWorks = React.lazy(() => import('./pages/admin/content/AdminHowItWorks.tsx').then(module => ({ default: module.AdminHowItWorks })));
const HowItWorksForm = React.lazy(() => import('./pages/admin/content/HowItWorksForm.tsx').then(module => ({ default: module.HowItWorksForm })));
const AdminNewsletter = React.lazy(() => import('./pages/admin/content/AdminNewsletter.tsx').then(module => ({ default: module.AdminNewsletter })));
const AdminTrustStrip = React.lazy(() => import('./pages/admin/content/AdminTrustStrip.tsx').then(module => ({ default: module.AdminTrustStrip })));

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

  // Route Change Listener for Google Analytics 4
  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("config", "G-G5MVEVQJPP", {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center p-4"><div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div></div>}>
        <Routes location={location} key={location.pathname}>
          {/* ── Public Routes ── */}
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:stateSlug" element={<StateListing />} />
          <Route path="/destinations/:stateSlug/:slug" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/helicopter" element={<HelicopterPackages />} />
          <Route path="/packages/:category" element={<Packages />} />
          <Route path="/packages/:category/:slug" element={<PackageDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/terms-conditions" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
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
              <Route path="/admin/reviews" element={<AdminReviews />} />
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
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <TripPlannerProvider>
              <Toaster />
              <Sonner />
              <RetentionNudge />
              <CookieConsent />
              <AnimatedRoutes />
              <TripPlannerModal />
              <PlannerTeaser />
              <ResumePlannerPopup />
            </TripPlannerProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
