import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface AdminDestination {
  id: string;
  name: string;
  slug: string;
  state_ut_id?: string;
  tagline?: string;
  state?: string;
  short_description?: string;
  overview?: string[];
  best_season?: string;
  ideal_duration?: string;
  difficulty?: "Easy" | "Moderate" | "Challenging";
  image_url?: string;
  hero_image_url?: string;
  highlights?: Array<{ emoji: string; title: string; desc: string }>;
  travel_tips?: string[];
  related_destinations?: string[];
  popularity_score?: number;
  trending: boolean;
  featured: boolean;
  active: boolean;
  seo_title?: string;
  seo_description?: string;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export type AdminDestinationInsert = Omit<AdminDestination, "id" | "created_at" | "updated_at">;

export async function listAdminDestinations(filters?: {
  search?: string;
  state_ut_id?: string;
  featured?: boolean;
  active?: boolean;
}): Promise<ServiceResponse<AdminDestination[]>> {
  try {
    let query = supabase
      .from("destinations")
      .select("id, name, slug, state, state_ut_id, tagline, image_url, featured, active, trending, popularity_score, sort_order, created_at")
      .order("sort_order")
      .order("name");

    if (filters?.search) query = query.ilike("name", `%${filters.search}%`);
    if (filters?.state_ut_id) query = query.eq("state_ut_id", filters.state_ut_id);
    if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);
    if (filters?.active !== undefined) query = query.eq("active", filters.active);

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as AdminDestination[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminDestinationById(id: string): Promise<ServiceResponse<AdminDestination>> {
  try {
    const { data, error } = await supabase.from("destinations").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as AdminDestination, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createAdminDestination(payload: AdminDestinationInsert): Promise<ServiceResponse<AdminDestination>> {
  try {
    const { data, error } = await supabase.from("destinations").insert([payload as any] as any).select().single();
    if (error) throw error;
    return { data: data as AdminDestination, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateAdminDestination(id: string, payload: Partial<AdminDestinationInsert>): Promise<ServiceResponse<AdminDestination>> {
  try {
    const { data, error } = await supabase
      .from("destinations")
      // @ts-ignore
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as AdminDestination, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteAdminDestination(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}
