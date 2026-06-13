import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[RouteErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground max-w-md mb-8">
            This page could not be displayed. Try refreshing, or return home and navigate again.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90"
            >
              Refresh
            </button>
            <Link
              to="/"
              className="px-6 py-3 border border-border font-semibold text-sm rounded-xl hover:bg-muted"
            >
              Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
