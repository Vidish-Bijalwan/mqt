import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface SiteSettings {
  id?: string;
  site_name: string;
  support_email: string;
  support_phone: string;
  whatsapp_number: string;
  office_address: string;
  office_hours: string;
  logo_path?: string;
  footer_logo_path?: string;
  default_seo_title: string;
  default_seo_description: string;
  social_facebook?: string;
  social_instagram?: string;
  social_youtube?: string;
  social_twitter?: string;
  updated_at?: string;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  payload: Record<string, unknown>;
  active: boolean;
  sort_order: number;
  updated_at?: string;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<ServiceResponse<SiteSettings>> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();
    if (error && error.code !== "PGRST116") throw error;
    return { data: data as SiteSettings, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function upsertSiteSettings(payload: Partial<SiteSettings>): Promise<ServiceResponse<SiteSettings>> {
  try {
    const { data: existing } = await supabase.from("site_settings").select("id").limit(1).single();
    let result;
    const existingId = (existing as any)?.id;
    if (existingId) {
      result = await supabase
        .from("site_settings")
        .update({ ...payload, updated_at: new Date().toISOString() } as any)
        .eq("id", existingId)
        .select()
        .single();
    } else {
      result = await supabase
        .from("site_settings")
        .insert([{ ...payload, updated_at: new Date().toISOString() }] as any)
        .select()
        .single();
    }
    if (result.error) throw result.error;
    return { data: result.data as SiteSettings, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

// ─── Homepage Sections ──────────────────────────────────────────────────────

export async function listHomepageSections(): Promise<ServiceResponse<HomepageSection[]>> {
  try {
    const { data, error } = await supabase
      .from("homepage_sections")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return { data: data as HomepageSection[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function upsertHomepageSection(
  section_key: string,
  payload: Partial<HomepageSection>
): Promise<ServiceResponse<HomepageSection>> {
  try {
    const { data: existing } = await supabase
      .from("homepage_sections")
      .select("id")
      .eq("section_key", section_key)
      .single();

    let result;
    const existingId = (existing as any)?.id;
    if (existingId) {
      result = await supabase
        .from("homepage_sections")
        .update({ ...payload, updated_at: new Date().toISOString() } as any)
        .eq("id", existingId)
        .select()
        .single();
    } else {
      result = await supabase
        .from("homepage_sections")
        .insert([{ ...payload, section_key, updated_at: new Date().toISOString() }] as any)
        .select()
        .single();
    }
    if (result.error) throw result.error;
    return { data: result.data as HomepageSection, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}
