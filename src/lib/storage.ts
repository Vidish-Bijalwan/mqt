import { supabase } from "./supabase";
import type { ServiceResponse } from "../services/enquiryService"; // Reuse simple error wrapper

export type StorageBucket = 
  | "destination-images"
  | "package-images"
  | "blog-images"
  | "testimonial-images"
  | "site-assets";

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  resize?: "cover" | "contain" | "fill";
  quality?: number; // 0 to 100
  format?: "origin" | "webp";
}

/**
 * Derives the public URL for an image hosted in Supabase Storage.
 * Fully supports Supabase Image Transformations for CDN resizing later.
 */
export function getPublicImageUrl(bucket: StorageBucket, path: string, options?: ImageTransformOptions): string {
  if (options) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path, {
      transform: {
        width: options.width,
        height: options.height,
        resize: options.resize || "cover",
        quality: options.quality || 80,
      }
    });
    return data.publicUrl;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized Image Resolver
 * ─────────────────────────────────────────────────────────────────────────────
 * Mappers should use this. It seamlessly checks if the source path is already
 * fully qualified, a local vite fallback, or a clean relative DB path requiring CDN lookup.
 */
export function resolveImageSource(bucket: StorageBucket, path: string | null | undefined, fallbackStr: string): string {
  if (!path) return fallbackStr;
  
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:image/")) {
    return path;
  }
  
  if (path.startsWith("/src/assets/") || path.includes("@/assets/")) {
    return path; // Still referencing a local Vite asset
  }

  // It is a real relative bucket path (e.g., 'uttarakhand/kedarnath/hero.webp')
  return getPublicImageUrl(bucket, path);
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Admin Upload / Delete Pipelines
 * ─────────────────────────────────────────────────────────────────────────────
 * Scaffolding for future authenticated Admin dashboard actions.
 * Uploads require user to be authenticated per RLS.
 */
export async function uploadImage(
  bucket: StorageBucket, 
  path: string, 
  file: File, 
  upsert = true
): Promise<ServiceResponse<{ path: string }>> {
  
  try {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: upsert,
      contentType: file.type // Automatically applies proper mime-type
    });

    if (error) throw error;
    
    return { data: { path: data.path }, error: null };
  } catch (error) {
    console.error(`[StorageService] Upload failed for ${path}:`, error);
    return { data: null, error: error as Error };
  }
}

export async function removeImage(bucket: StorageBucket, paths: string[]): Promise<ServiceResponse<boolean>> {
  try {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    
    if (error) throw error;
    return { data: true, error: null };
  } catch (error) {
    console.error(`[StorageService] Delete failed for ${paths.join(", ")}:`, error);
    return { data: null, error: error as Error };
  }
}
