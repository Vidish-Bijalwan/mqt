import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface Category {
  id: string;
  name: string;
  slug: string;
  summary: string;
  best_for: string[];
  hero_image_url?: string;
  featured: boolean;
  active: boolean;
  sort_order: number;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at?: string;
}

export type CategoryInsert = Omit<Category, "id" | "created_at" | "updated_at">;

export async function listCategories(search?: string): Promise<ServiceResponse<Category[]>> {
  try {
    let query = supabase.from("package_categories").select("*").order("sort_order").order("name");
    if (search) query = query.ilike("name", `%${search}%`);
    const { data, error } = await query;
    if (error) throw error;
    return { data: data as Category[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getCategoryById(id: string): Promise<ServiceResponse<Category>> {
  try {
    const { data, error } = await supabase.from("package_categories").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as Category, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createCategory(payload: CategoryInsert): Promise<ServiceResponse<Category>> {
  try {
    const { data, error } = await supabase.from("package_categories").insert([payload]).select().single();
    if (error) throw error;
    return { data: data as Category, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateCategory(id: string, payload: Partial<CategoryInsert>): Promise<ServiceResponse<Category>> {
  try {
    const { data, error } = await supabase
      .from("package_categories")
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as Category, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteCategory(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("package_categories").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getCategoryCount(): Promise<number> {
  const { count } = await supabase.from("package_categories").select("*", { count: "exact", head: true });
  return count ?? 0;
}
