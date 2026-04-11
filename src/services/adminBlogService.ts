import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  image_url?: string;
  author_name?: string;
  author_role?: string;
  author_initials?: string;
  read_time?: string;
  tags?: string[];
  date?: string;
  published: boolean;
  featured: boolean;
  meta_description?: string;
  seo_title?: string;
  related_destination_slugs?: string[];
  related_package_slugs?: string[];
  related_blog_slugs?: string[];
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export type AdminBlogInsert = Omit<AdminBlogPost, "id" | "created_at" | "updated_at">;

export async function listAdminBlogPosts(filters?: {
  search?: string;
  published?: boolean;
  featured?: boolean;
}): Promise<ServiceResponse<AdminBlogPost[]>> {
  try {
    let query = supabase
      .from("blog_posts")
      .select("id, slug, title, category, excerpt, image_url, author_name, published, featured, date, read_time, sort_order, created_at")
      .order("sort_order")
      .order("created_at", { ascending: false });

    if (filters?.search) query = query.ilike("title", `%${filters.search}%`);
    if (filters?.published !== undefined) query = query.eq("published", filters.published);
    if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);

    const { data, error } = await query;
    if (error) throw error;
    return { data: data as AdminBlogPost[], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function getAdminBlogPostById(id: string): Promise<ServiceResponse<AdminBlogPost>> {
  try {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (error) throw error;
    return { data: data as AdminBlogPost, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function createAdminBlogPost(payload: AdminBlogInsert): Promise<ServiceResponse<AdminBlogPost>> {
  try {
    const { data, error } = await supabase.from("blog_posts").insert([payload as any] as any).select().single();
    if (error) throw error;
    return { data: data as AdminBlogPost, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function updateAdminBlogPost(id: string, payload: Partial<AdminBlogInsert>): Promise<ServiceResponse<AdminBlogPost>> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      // @ts-ignore
      .update({ ...payload, updated_at: new Date().toISOString() } as any)
      .eq("id", id).select().single();
    if (error) throw error;
    return { data: data as AdminBlogPost, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteAdminBlogPost(id: string): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return { data: true, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}
