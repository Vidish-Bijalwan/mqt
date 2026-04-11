import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Multi-layer route guardian ensuring only users with "admin" roles access wrapped routes.
 */
export const ProtectedRoute = () => {
  const { user, isAdmin, isLoading } = useAuth();

  // 1. Loading Phase: Prevent flashing of unprotected UI while session fetches
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  // 2. Layer 1: No User -> Redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Layer 2: Authenticated, but not explicitly Admin -> Block Access
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          Your account does not have administrator privileges. Please contact support if you believe this is an error.
        </p>
      </div>
    );
  }

  // 4. Authorized: Render internal routes
  return <Outlet />;
};
