import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { checkIsAdmin, signOut } from "@/lib/auth";
import type { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  isAdmin: false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1. Fetch initial active session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (mounted) {
          setSession(session);
          setUser(session?.user || null);
          setIsAdmin(checkIsAdmin(session?.user || null));
        }
      } catch (error) {
        console.error("Auth context initialisation error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    getInitialSession();

    // 2. Continuous real-time Sync (login, logout, refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (mounted) {
          setSession(newSession);
          setUser(newSession?.user || null);
          setIsAdmin(checkIsAdmin(newSession?.user || null));
          setIsLoading(false); // Make sure to turn off loading when sync fires
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    await signOut();
    // The onAuthStateChange event will handle clearing the React states immediately
  };

  const value = {
    session,
    user,
    isLoading,
    isAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
