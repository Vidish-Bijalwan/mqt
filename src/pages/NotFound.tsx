import { Link } from "react-router-dom";
import { ArrowLeft, Home, Compass } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center bg-background section-padding text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            <Compass className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-accent mb-4">404</h1>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">You've ventured off the map!</h2>
          <p className="font-body text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            The page you are looking for has been moved, deleted, or possibly never existed. Let's get you back on a known trail.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 gradient-primary text-white rounded-lg font-semibold transition-transform hover:scale-[1.02]"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-surface border border-border text-foreground hover:bg-surface-2 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Previous Page
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
