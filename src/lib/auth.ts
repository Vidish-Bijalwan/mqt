import { supabase } from "./supabase";
import type { Session, User } from "@supabase/supabase-js";

/**
 * Validates whether the user object retains the explicit Admin role.
 */
export function checkIsAdmin(user: User | null): boolean {
  if (!user) return false;
  // SECURITY FIX: user_metadata is controllable by the user. app_metadata is strictly controlled by the backend.
  return user.app_metadata?.role === "admin";
}

/**
 * Simple Authentication Wrappers
 */
export async function getSession(): Promise<{ session: Session | null; error: Error | null }> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error("[Auth] Session fetch failed", error);
    return { session: null, error: error as Error };
  }
}

export async function signOut(): Promise<boolean> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Auth] Sign out failed", error);
    return false;
  }
  return true;
}
