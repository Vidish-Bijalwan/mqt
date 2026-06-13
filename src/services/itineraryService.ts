import { supabase, type DbItinerary, type DbItineraryDay } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type AdminItinerary = DbItinerary;
export type AdminItineraryDay = DbItineraryDay;

export type AdminItineraryInsert = Omit<AdminItinerary, "id" | "created_at" | "updated_at">;
export type AdminItineraryDayInsert = Omit<AdminItineraryDay, "id" | "created_at">;

// ─────────────────────────────────────────────────────────────────────────────
// Itinerary CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function listAdminItineraries(filters?: {
  search?: string;
  region?: string;
  active?: boolean;
  featured?: boolean;
}): Promise<ServiceResponse<AdminItinerary[]>> {
  try {
    let query = supabase
      .from("itineraries")
      .select("*")
      .order("sort_order")
      .order("package_name");

    if (filters?.search) query = query.ilike("package_name", `%${filters.search}%`);
    if (filters?.region) query = query.eq("region", filters.region);
    if (filters?.active !== undefined) query = query.eq("active", filters.active);
    if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as unknown as AdminItinerary[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminItineraryBySlug(slug: string): Promise<ServiceResponse<AdminItinerary | null>> {
  try {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return { data: (data as unknown as AdminItinerary) ?? null, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminItineraryById(id: string): Promise<ServiceResponse<AdminItinerary>> {
  try {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { data: data as unknown as AdminItinerary, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createAdminItinerary(
  payload: AdminItineraryInsert
): Promise<ServiceResponse<AdminItinerary>> {
  try {
    const { data, error } = await supabase
      .from("itineraries")
      .insert([payload] as any)
      .select()
      .single();
    if (error) throw error;
    return { data: data as unknown as AdminItinerary, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateAdminItinerary(
  id: string,
  payload: Partial<AdminItineraryInsert>
): Promise<ServiceResponse<AdminItinerary>> {
  try {
    const { data, error } = await supabase
      .from("itineraries")
      // @ts-ignore
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { data: data as unknown as AdminItinerary, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteAdminItinerary(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("itineraries").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminItineraryCount(): Promise<number> {
  const { count } = await supabase
    .from("itineraries")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Day-wise CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function listItineraryDays(
  itineraryId: string
): Promise<ServiceResponse<AdminItineraryDay[]>> {
  try {
    const { data, error } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("itinerary_id", itineraryId)
      .order("day_number");
    if (error) throw error;
    return { data: data as unknown as AdminItineraryDay[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

/**
 * Replace ALL days for an itinerary atomically.
 * Deletes existing rows then bulk-inserts the provided array.
 */
export async function replaceItineraryDays(
  itineraryId: string,
  days: Array<{ day_number: number; title: string; description: string }>
): Promise<ServiceResponse<boolean>> {
  try {
    // 1. Delete existing
    const { error: delError } = await supabase
      .from("itinerary_days")
      .delete()
      .eq("itinerary_id", itineraryId);
    if (delError) throw delError;

    // 2. Insert new rows (if any)
    if (days.length === 0) return { data: true, error: null };
    const rows = days.map((d) => ({
      itinerary_id: itineraryId,
      day_number: d.day_number,
      title: d.title,
      description: d.description,
    }));
    const { error: insError } = await supabase
      .from("itinerary_days")
      .insert(rows as any);
    if (insError) throw insError;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public-facing read (DB-first, falls back to static array)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch active itinerary from Supabase by slug.
 * Returns null if not found so the caller can fall back to the static list.
 */
export async function getPublicItineraryBySlug(slug: string): Promise<{
  itinerary: AdminItinerary | null;
  days: AdminItineraryDay[];
}> {
  try {
    const { data: it, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single();
    if (error || !it) return { itinerary: null, days: [] };

    const { data: days } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("itinerary_id", (it as any).id)
      .order("day_number");

    return {
      itinerary: it as unknown as AdminItinerary,
      days: (days ?? []) as unknown as AdminItineraryDay[],
    };
  } catch {
    return { itinerary: null, days: [] };
  }
}

/**
 * Fetch all active itineraries from Supabase (no days).
 * Returns empty array on error so callers can fall back to static data.
 */
export async function getPublicItineraries(): Promise<AdminItinerary[]> {
  try {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .order("package_name");
    if (error) return [];
    return (data ?? []) as unknown as AdminItinerary[];
  } catch {
    return [];
  }
}
