import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Destinations from "./pages/Destinations.tsx";
import DestinationDetail from "./pages/DestinationDetail.tsx";
import Packages from "./pages/Packages.tsx";
import PackageDetail from "./pages/PackageDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          
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

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
