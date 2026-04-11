import { supabase, type DbEnquiryInsert } from "@/lib/supabase";

export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
}

// Basic client-side rate limiting (prevents rapid double clicks / simple scripts)
const SUBMISSION_COOLDOWN_MS = 10000; // 10 seconds
let lastSubmissionTime = 0;

export async function submitEnquiry(enquiry: DbEnquiryInsert, honeypotValue: string): Promise<ServiceResponse<boolean>> {
  // 1. Spam Prevention: Honeypot Check
  if (honeypotValue) {
    console.warn("Spam blocked by honeypot");
    // Return early but simulate success to confuse bots
    return { data: true, error: null };
  }

  // 2. Spam Prevention: Client Rate Limit
  const now = Date.now();
  if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
    return { 
      data: null, 
      error: new Error("Please wait a moment before submitting another enquiry.") 
    };
  }

  // 3. Validation
  if (!enquiry.name || !enquiry.phone || !enquiry.email || !enquiry.destination) {
    return {
      data: null,
      error: new Error("Missing required fields"),
    };
  }

  try {
    const { error } = await supabase
      .from("enquiries")
      .insert([enquiry]);

    if (error) throw error;

    lastSubmissionTime = Date.now();
    return { data: true, error: null };
  } catch (error) {
    console.error("[EnquiryService] Error submitting enquiry:", error);
    return { data: null, error: error as Error };
  }
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Admin Dashboard API Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * Requires valid authenticated session.
 */
export async function getEnquiries(): Promise<ServiceResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("[EnquiryService] Error fetching enquiries:", error);
    return { data: null, error: error as Error };
  }
}

export async function updateEnquiryStatus(id: string, status: "new" | "contacted" | "converted"): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase
      .from("enquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
      
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    console.error("[EnquiryService] Error updating enquiry:", error);
    return { data: null, error: error as Error };
  }
}
