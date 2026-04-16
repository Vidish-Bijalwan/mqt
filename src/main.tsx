import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
    <Analytics />
  </AuthProvider>
);
