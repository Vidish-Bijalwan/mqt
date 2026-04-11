import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Packages from "./pages/Packages.tsx";
import Kedarnath from "./pages/destinations/Kedarnath.tsx";
import Ladakh from "./pages/destinations/Ladakh.tsx";
import ValleyOfFlowers from "./pages/destinations/ValleyOfFlowers.tsx";
import Varanasi from "./pages/destinations/Varanasi.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhatsAppButton from "./components/WhatsAppButton.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WhatsAppButton />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/destinations/kedarnath" element={<Kedarnath />} />
          <Route path="/destinations/ladakh" element={<Ladakh />} />
          <Route path="/destinations/valley-of-flowers" element={<ValleyOfFlowers />} />
          <Route path="/destinations/varanasi" element={<Varanasi />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
