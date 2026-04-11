import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface AdminTestimonial {
  id: string;
  name: string;
  location?: string;
  destination?: string;
  tour?: string;
  rating: number;
  text: string;
  initials?: string;
  avatar_url?: string;
  date?: string;
  verified: boolean;
  source?: string;
  featured: boolean;
  approved: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export type AdminTestimonialInsert = Omit<AdminTestimonial, "id" | "created_at" | "updated_at">;

export async function listAdminTestimonials(filters?: {
  approved?: boolean;
  featured?: boolean;
  active?: boolean;
}): Promise<ServiceResponse<AdminTestimonial[]>> {
  try {
    let query = supabase
      .from("testimonials")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });

    if (filters?.approved !== undefined) query = query.eq("approved", filters.approved);
    if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);
    if (filters?.active !== undefined) query = query.eq("active", filters.active);

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as AdminTestimonial[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminTestimonialById(id: string): Promise<ServiceResponse<AdminTestimonial>> {
  try {
    const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as AdminTestimonial, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createAdminTestimonial(payload: AdminTestimonialInsert): Promise<ServiceResponse<AdminTestimonial>> {
  try {
    const { data, error } = await supabase.from("testimonials").insert([payload as any] as any).select().single();
    if (error) throw error;
    return { data: data as AdminTestimonial, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateAdminTestimonial(id: string, payload: Partial<AdminTestimonialInsert>): Promise<ServiceResponse<AdminTestimonial>> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      // @ts-ignore
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as AdminTestimonial, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteAdminTestimonial(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function toggleTestimonialApproval(id: string, approved: boolean): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase
      .from("testimonials")
      // @ts-ignore
      .update({ approved, updated_at: new Date().toISOString() } as any)
      .eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}
