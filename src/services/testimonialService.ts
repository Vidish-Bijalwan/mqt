import { supabase, type DbTestimonial } from "@/lib/supabase";
import { allTestimonials } from "@/data/testimonials";
import type { ServiceResponse } from "./enquiryService";

// Helper to map TS data to Db shape for fallback
const mapStaticToDb = (t: any): DbTestimonial => ({
  id: t.id,
  name: t.name,
  location: t.location || "",
  tour: t.tour || "",
  destination: t.destination || "",
  date: t.date || "",
  rating: t.rating,
  text: t.text,
  initials: t.initials,
  verified: t.verified,
  source: (t.source as any) || "Direct",
  featured: true, // fallback to true for static
  active: true,
  sort_order: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export async function getTestimonials(limit?: number): Promise<ServiceResponse<DbTestimonial[]>> {
  try {
    let query = supabase
      .from("testimonials")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("No data found");

    return { data, error: null };
  } catch (err) {
    console.warn("[TestimonialService] Falling back to static data", err);
    // Fallback
    let fallback = allTestimonials.map(mapStaticToDb);
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}

export async function getTestimonialsByDestination(destination: string, limit?: number): Promise<ServiceResponse<DbTestimonial[]>> {
  try {
    let query = supabase
      .from("testimonials")
      .select("*")
      .eq("active", true)
      .ilike("destination", destination)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("No data found");

    return { data, error: null };
  } catch (err) {
    console.warn(`[TestimonialService] Falling back to static data for destination: ${destination}`, err);
    let fallback = allTestimonials
      .filter((t) => t.destination.toLowerCase() === destination.toLowerCase())
      .map(mapStaticToDb);
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}
