import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export type EnquiryStatus = "new" | "contacted" | "quoted" | "converted" | "closed";

export interface AdminEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  package_interest?: string | null;
  state_interest?: string | null;
  travellers_count?: number | null;
  travel_month?: string | null;
  travel_dates?: string | null;
  special_requirements?: string | null;
  contact_preference?: string | null;
  status: EnquiryStatus;
  source_page?: string | null;
  admin_notes?: string | null;
  assigned_to?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export async function listEnquiries(filters?: {
  status?: EnquiryStatus | "all";
  search?: string;
}): Promise<ServiceResponse<AdminEnquiry[]>> {
  try {
    let query = supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters?.search && filters.search.trim()) {
      const s = filters.search.trim();
      query = query.or(`name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,destination.ilike.%${s}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as AdminEnquiry[], error: null };
  } catch (error) {
    console.error("[EnquiryService] listEnquiries:", error);
    return { data: null, error: error as Error };
  }
}

export async function getEnquiryById(id: string): Promise<ServiceResponse<AdminEnquiry>> {
  try {
    const { data, error } = await supabase.from("enquiries").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as AdminEnquiry, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase
      .from("enquiries")
      .update({ status, updated_at: new Date().toISOString() } as any)
      .eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateEnquiryNotes(
  id: string,
  admin_notes: string
): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase
      .from("enquiries")
      .update({ admin_notes, updated_at: new Date().toISOString() } as any)
      .eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getEnquiryStats(): Promise<ServiceResponse<{
  total: number; newCount: number; contacted: number; quoted: number; converted: number; closed: number;
}>> {
  try {
    const { data, error } = await supabase.from("enquiries").select("status");
    if (error) throw error;
    const rows = data as { status: string }[];
    return {
      data: {
        total: rows.length,
        newCount: rows.filter(r => r.status === "new").length,
        contacted: rows.filter(r => r.status === "contacted").length,
        quoted: rows.filter(r => r.status === "quoted").length,
        converted: rows.filter(r => r.status === "converted").length,
        closed: rows.filter(r => r.status === "closed").length,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
