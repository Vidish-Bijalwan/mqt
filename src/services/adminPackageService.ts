import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface AdminPackage {
  id: string;
  title: string;
  slug: string;
  category_id?: string;
  destination?: string;
  state?: string;
  short_description?: string;
  overview?: string;
  duration_label?: string;
  best_season?: string;
  group_suitability?: string;
  hotel_category_hint?: string;
  customizable: boolean;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  image_url?: string;
  badge?: string;
  featured: boolean;
  active: boolean;
  trending: boolean;
  popularity_score: number;
  seo_title?: string;
  seo_description?: string;
  sort_order: number;
  // Admin-only internal fields (never shown publicly)
  internal_base_price?: number;
  internal_notes?: string;
  created_at: string;
  updated_at?: string;
}

export type AdminPackageInsert = Omit<AdminPackage, "id" | "created_at" | "updated_at">;

export async function listAdminPackages(filters?: {
  search?: string;
  category_id?: string;
  featured?: boolean;
  active?: boolean;
}): Promise<ServiceResponse<AdminPackage[]>> {
  try {
    let query = supabase
      .from("packages")
      .select("id, title, slug, destination, state, category_id, image_url, featured, active, trending, popularity_score, sort_order, badge, duration_label, created_at")
      .order("sort_order")
      .order("title");

    if (filters?.search) query = query.ilike("title", `%${filters.search}%`);
    if (filters?.category_id) query = query.eq("category_id", filters.category_id);
    if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);
    if (filters?.active !== undefined) query = query.eq("active", filters.active);

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as AdminPackage[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminPackageById(id: string): Promise<ServiceResponse<AdminPackage>> {
  try {
    const { data, error } = await supabase.from("packages").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as AdminPackage, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createAdminPackage(payload: AdminPackageInsert): Promise<ServiceResponse<AdminPackage>> {
  try {
    const { data, error } = await supabase.from("packages").insert([payload as any] as any).select().single();
    if (error) throw error;
    return { data: data as AdminPackage, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateAdminPackage(id: string, payload: Partial<AdminPackageInsert>): Promise<ServiceResponse<AdminPackage>> {
  try {
    const { data, error } = await supabase
      .from("packages")
      // @ts-ignore
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as AdminPackage, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteAdminPackage(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}
