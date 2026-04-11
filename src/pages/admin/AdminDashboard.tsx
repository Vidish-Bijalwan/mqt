import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  // For now, immediately redirect the main dashboard to the enquiries tab 
  // since that is the primary high-value action area.
  return <Navigate to="/admin/enquiries" replace />;
}
