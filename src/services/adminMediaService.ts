import { supabase } from "@/lib/supabase";
import type { ServiceResponse } from "./enquiryService";

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
  bucket: string;
}

export const MEDIA_BUCKETS = [
  "site-assets",
  "destination-images",
  "package-images",
  "blog-images",
  "testimonial-images"
] as const;

export type MediaBucket = typeof MEDIA_BUCKETS[number];

export async function listBucketFiles(bucket: MediaBucket, folderPath: string = ""): Promise<ServiceResponse<MediaFile[]>> {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folderPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) throw error;
    
    // Filter out ".emptyFolderPlaceholder" if it exists, and any actual directories since we want files
    const files = data.filter(item => item.id !== null); // Actual files have IDs, folders usually don't or can be parsed differently.
    
    // We construct the public URL for each file
    const mapped: MediaFile[] = files.map(file => {
      const fullPath = folderPath ? `${folderPath}/${file.name}` : file.name;
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fullPath);
      
      return {
        id: file.id,
        name: file.name,
        size: file.metadata?.size || 0,
        type: file.metadata?.mimetype || 'image/webp',
        created_at: file.created_at,
        bucket: bucket,
        url: publicUrlData.publicUrl,
      };
    });

    return { data: mapped, error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function uploadFile(
  bucket: MediaBucket, 
  file: File, 
  folderPath: string = ""
): Promise<ServiceResponse<MediaFile>> {
  try {
    const path = folderPath ? `${folderPath}/${file.name}` : file.name;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { cacheControl: '3600', upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);

    return { 
      data: {
         id: uploadData.id || uploadData.path,
         name: file.name,
         bucket: bucket,
         size: file.size,
         type: file.type,
         created_at: new Date().toISOString(),
         url: publicUrlData.publicUrl
      }, 
      error: null 
    };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function deleteFile(bucket: MediaBucket, fileName: string, folderPath: string = ""): Promise<ServiceResponse<boolean>> {
  try {
     const path = folderPath ? `${folderPath}/${fileName}` : fileName;
     const { error } = await supabase.storage.from(bucket).remove([path]);
     if (error) throw error;
     return { data: true, error: null };
  } catch (e) {
     return { data: null, error: e as Error };
  }
}
