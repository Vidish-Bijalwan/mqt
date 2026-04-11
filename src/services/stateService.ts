import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface StateUT {
  id: string;
  name: string;
  slug: string;
  type: "State" | "Union Territory";
  region: string;
  short_description?: string;
  best_season?: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export type StateUTInsert = Omit<StateUT, "id" | "created_at" | "updated_at">;

export async function listStates(filters?: {
  region?: string;
  type?: string;
  search?: string;
}): Promise<ServiceResponse<StateUT[]>> {
  try {
    let query = supabase.from("states_uts").select("*").order("sort_order").order("name");
    if (filters?.region) query = query.eq("region", filters.region);
    if (filters?.type) query = query.eq("type", filters.type);
    if (filters?.search) query = query.ilike("name", `%${filters.search}%`);
    const { data, error } = await query;
    if (error) throw error;
    return { data: data as StateUT[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getStateById(id: string): Promise<ServiceResponse<StateUT>> {
  try {
    const { data, error } = await supabase.from("states_uts").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as StateUT, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createState(payload: StateUTInsert): Promise<ServiceResponse<StateUT>> {
  try {
    const { data, error } = await supabase.from("states_uts").insert([payload] as any).select().single();
    if (error) throw error;
    return { data: data as StateUT, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateState(id: string, payload: Partial<StateUTInsert>): Promise<ServiceResponse<StateUT>> {
  try {
    const { data, error } = await supabase
      .from("states_uts")
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return { data: data as StateUT, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteState(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("states_uts").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getStateCount(): Promise<number> {
  const { count } = await supabase.from("states_uts").select("*", { count: "exact", head: true });
  return count ?? 0;
}
