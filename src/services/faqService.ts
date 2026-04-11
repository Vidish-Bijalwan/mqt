import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface FAQ {
  id: string;
  scope: "homepage" | "contact" | "packages" | "destination" | "category" | "booking" | "general";
  scope_slug?: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at?: string;
}

export type FAQInsert = Omit<FAQ, "id" | "created_at" | "updated_at">;

export async function listFAQs(scope?: string): Promise<ServiceResponse<FAQ[]>> {
  try {
    let query = supabase.from("faqs").select("*").order("scope").order("sort_order");
    if (scope && scope !== "all") query = query.eq("scope", scope);
    const { data, error } = await query;
    if (error) throw error;
    return { data: data as FAQ[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getFAQById(id: string): Promise<ServiceResponse<FAQ>> {
  try {
    const { data, error } = await supabase.from("faqs").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as FAQ, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createFAQ(payload: FAQInsert): Promise<ServiceResponse<FAQ>> {
  try {
    const { data, error } = await supabase.from("faqs").insert([payload] as any).select().single();
    if (error) throw error;
    return { data: data as FAQ, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateFAQ(id: string, payload: Partial<FAQInsert>): Promise<ServiceResponse<FAQ>> {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as FAQ, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteFAQ(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getFAQCount(): Promise<number> {
  const { count } = await supabase.from("faqs").select("*", { count: "exact", head: true });
  return count ?? 0;
}
