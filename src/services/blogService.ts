import { supabase, type DbBlogPost } from "@/lib/supabase";
import { blogPosts, type BlogPost } from "@/data/blog";
import { resolveImageSource } from "@/lib/storage";
import type { ServiceResponse } from "./enquiryService";

// Mapper to map snake_case DB row back to camelCase Domain Model
const mapDbToDomain = (row: DbBlogPost): BlogPost => {
  const fallbackObj = blogPosts.find(p => p.slug === row.slug);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    metaDescription: row.meta_description,
    category: row.category,
    tags: row.tags || [],
    author: {
      name: row.author_name,
      role: row.author_role,
      initials: row.author_initials,
    },
    date: row.date,
    readTime: row.read_time,
    excerpt: row.excerpt,
    image: resolveImageSource("blog-images", row.image_url, fallbackObj?.image || ""),
  content: row.content as any,
  relatedPackageSlugs: row.related_package_slugs || [],
    relatedDestinationSlugs: row.related_destination_slugs || [],
    relatedBlogSlugs: row.related_blog_slugs || [],
    featured: row.featured,
  };
};

export async function getBlogPosts(limit?: number): Promise<ServiceResponse<BlogPost[]>> {
  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    if (!data || data.length === 0) throw new Error("No data found");

    return { data: data.map(mapDbToDomain), error: null };
  } catch (err) {
    console.warn("[BlogService] Falling back to static data", err);
    let fallback = [...blogPosts];
    if (limit) fallback = fallback.slice(0, limit);
    return { data: fallback, error: null };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<ServiceResponse<BlogPost>> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Not found");

    return { data: mapDbToDomain(data), error: null };
  } catch (err) {
    console.warn(`[BlogService] Falling back to static data for slug: ${slug}`, err);
    const fallback = blogPosts.find((p) => p.slug === slug);
    if (!fallback) return { data: null, error: new Error("Not found in static either") };
    return { data: fallback, error: null };
  }
}
