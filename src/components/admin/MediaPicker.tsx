import { useState } from "react";
import { Folder, X } from "lucide-react";
import { MEDIA_BUCKETS, type MediaBucket } from "@/services/adminMediaService";
import { MediaBrowser } from "@/pages/admin/AdminMedia";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  defaultBucket?: MediaBucket;
}

export function MediaPicker({ open, onOpenChange, onSelect, defaultBucket = "site-assets" }: MediaPickerProps) {
  const [bucket, setBucket] = useState<MediaBucket>(defaultBucket);
  const [folder, setFolder] = useState<string>("");
  const [search, setSearch] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Select Media</h2>
            <p className="text-xs text-gray-500">Choose an existing asset or upload a new one.</p>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 min-h-0 bg-gray-50/50">
          {/* Sidebar */}
          <div className="w-48 lg:w-64 border-r border-gray-100 p-4 overflow-y-auto flex-shrink-0 bg-white">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Buckets</h3>
            <nav className="space-y-1">
              {MEDIA_BUCKETS.map((b) => (
                <button
                  key={b}
                  onClick={() => { setBucket(b); setFolder(""); setSearch(""); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    bucket === b 
                      ? "bg-blue-50 text-blue-700 border-blue-100 border" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <Folder size={16} className={bucket === b ? "text-blue-500" : "text-gray-400"} />
                  {b.replace("-images", "").replace("-", " ")}
                </button>
              ))}
            </nav>
          </div>

          {/* Media Browser Engine */}
          <div className="flex-1 overflow-hidden relative">
            <MediaBrowser 
              bucket={bucket} 
              folder={folder} 
              search={search} 
              onSearchChange={setSearch}
              selectable={true}
              onSelect={(url) => {
                // Return just the relative path from the bucket so it works properly
                // Since getPublicUrl gives the absolute path, we slice it or we could return absolute.
                // For Supabase, if the app expects "bucket-name/folder/file.jpg", we might need logic.
                // But generally absolute URL is safer for saving if our rendering allows it.
                // Or we can extract it.
                // The prompt for getPublicUrl returns standard full URL: `https://[ref].supabase.co/storage/v1/object/public/[bucket]/[path]`
                
                // For simplicity, we return the URL back to the form
                onSelect(url);
                onOpenChange(false);
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
