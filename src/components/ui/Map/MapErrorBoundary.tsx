import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class MapErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Interactive Map Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex-col flex items-center justify-center p-8 bg-surface/50 border border-border/50 rounded-3xl min-h-[400px]">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <Leaf className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-2xl font-bold mb-3 text-foreground text-center">Interactive Map Unavailable</h3>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            We're having trouble loading the interactive map right now. You can still explore destinations using the region filters below.
          </p>
          <button 
             onClick={() => window.location.reload()}
             className="px-6 py-3 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
