import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  Folder, Image as ImageIcon, Upload, Trash2, Search, Link as LinkIcon, 
  CheckCircle2, X, RefreshCw, FileImage
} from "lucide-react";
import { 
  MEDIA_BUCKETS, MediaBucket, listBucketFiles, uploadFile, deleteFile, MediaFile 
} from "@/services/adminMediaService";
import { TOURISM_FALLBACKS } from "@/lib/imageMap";
import { useValidatedImage } from "@/hooks/useValidatedImage";
import { listStates } from "@/services/stateService";
import { listAdminDestinations } from "@/services/adminDestinationService";
import { tourPackages } from "@/data/packages";

const inputCls = "w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export type VirtualBucket = "platform-assets" | "virtual-states" | "virtual-destinations" | "virtual-packages";

export default function AdminMedia() {
  const [bucket, setBucket] = useState<MediaBucket | VirtualBucket>("platform-assets");
  const [folder, setFolder] = useState<string>("");
  const [search, setSearch] = useState("");
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-6 p-6">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all public assets, images, and content delivery bundles.</p>
        </div>
      </div>

      <div className="flex bg-white rounded-2xl border border-gray-100 overflow-hidden flex-1 shadow-sm h-full">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 p-4 flex flex-col bg-gray-50/50 flex-shrink-0">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Platform Visuals</h3>
          <nav className="space-y-1 mb-6">
            <button onClick={() => { setBucket("platform-assets"); setFolder(""); setSearch(""); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${bucket === "platform-assets" ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200" : "text-emerald-600 hover:bg-emerald-50 border border-transparent"}`}>
              <Folder size={16} /> Raw File Map
            </button>
            <button onClick={() => { setBucket("virtual-states"); setFolder(""); setSearch(""); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${bucket === "virtual-states" ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200" : "text-emerald-600 hover:bg-emerald-50 border border-transparent"}`}>
              <ImageIcon size={16} /> States & UTs
            </button>
            <button onClick={() => { setBucket("virtual-destinations"); setFolder(""); setSearch(""); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${bucket === "virtual-destinations" ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200" : "text-emerald-600 hover:bg-emerald-50 border border-transparent"}`}>
              <ImageIcon size={16} /> Destinations
            </button>
            <button onClick={() => { setBucket("virtual-packages"); setFolder(""); setSearch(""); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${bucket === "virtual-packages" ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200" : "text-emerald-600 hover:bg-emerald-50 border border-transparent"}`}>
              <ImageIcon size={16} /> Packages
            </button>
          </nav>

          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Cloud Storage</h3>
          <nav className="space-y-1">
            {MEDIA_BUCKETS.map((b) => (
              <button
                key={b}
                onClick={() => { setBucket(b); setFolder(""); setSearch(""); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  bucket === b 
                    ? "bg-white border-gray-200 text-gray-900 shadow-sm border" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                }`}
              >
                <Folder size={16} className={bucket === b ? "text-blue-500" : "text-gray-400"} />
                {b.replace("-images", "").replace("-", " ")}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
           {bucket === "platform-assets" ? (
             <PlatformFallbackBrowser search={search} onSearchChange={setSearch} />
           ) : bucket === "virtual-states" || bucket === "virtual-destinations" || bucket === "virtual-packages" ? (
             <VirtualContentBrowser type={bucket} search={search} onSearchChange={setSearch} />
           ) : (
             <MediaBrowser bucket={bucket as MediaBucket} folder={folder} search={search} onSearchChange={setSearch} />
           )}
        </div>
      </div>
    </div>
  );
}

// ─── Platform Fallback Browser (Local System) ──────────────────────────────

function PlatformFallbackBrowser({ search, onSearchChange }: { search: string, onSearchChange: (v: string) => void }) {
  const entries = Object.entries(TOURISM_FALLBACKS);
  const filtered = entries.filter(([slug]) => slug.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search states, UTs & locations..." 
              value={search} 
              onChange={e => onSearchChange(e.target.value)} 
              className={inputCls} 
            />
          </div>
        </div>
        <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          Showing verified system fallbacks
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-20">
          {filtered.map(([slug, imagePath]) => (
            <div key={slug} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:border-emerald-200 transition-all flex flex-col">
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <img src={imagePath} alt={slug} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <a title="Modify in Settings" href="/admin/content/states" className="text-xs font-semibold bg-white text-gray-800 px-3 py-1.5 rounded-full hover:bg-gray-100">Modify</a>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-700 truncate" title={slug}>{slug.replace(/-/g, ' ')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate uppercase">System Mapped Asset</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Virtual Content Browser (States, Destinations, Packages) ────────────

function VirtualThumb({ item, type }: { item: any, type: string }) {
   const primarySrc = type === 'virtual-packages' ? item.image : (item.hero_image_url || item.image_url);
   const { src, onError } = useValidatedImage(primarySrc, item.slug || item.id);
   return <img src={src} onError={onError} alt={item.name || item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />;
}

function VirtualContentBrowser({ type, search, onSearchChange }: { type: VirtualBucket, search: string, onSearchChange: (v: string) => void }) {
  const { data: items, isLoading } = useQuery({
    queryKey: ["media-virtual", type, search],
    queryFn: async () => {
       if (type === "virtual-states") {
          return listStates({ search }).then(r => r.data || []);
       } else if (type === "virtual-destinations") {
          return listAdminDestinations({ search }).then(r => r.data || []);
       } else if (type === "virtual-packages") {
          return tourPackages.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search.toLowerCase()));
       }
       return [];
    },
    staleTime: 60_000,
  });

  const getEditLink = (item: any) => {
    if (type === "virtual-states") return `/admin/content/states/${item.id}/edit`;
    if (type === "virtual-destinations") return `/admin/content/destinations/${item.id}/edit`;
    return `/admin/content/packages`;
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder={`Search ${type.split('-')[1]}...`} value={search} onChange={e => onSearchChange(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 font-bold uppercase tracking-wider rounded-lg border border-emerald-100">
          Auto-Synced {type.split('-')[1]} Library
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
             {Array.from({length: 12}).map((_, i) => <div key={i} className="aspect-[4/3] bg-gray-100 rounded-xl animate-pulse"/>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-20">
            {items?.map((item: any) => (
              <div key={item.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:border-emerald-200 transition-all flex flex-col">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <VirtualThumb item={item} type={type} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <a title="Modify Location" href={getEditLink(item)} className="text-xs font-semibold bg-white text-gray-800 px-3 py-1.5 rounded-full hover:bg-gray-100 shadow-xl">Edit Entry</a>
                  </div>
                </div>
                <div className="p-3 bg-white relative z-10">
                  <p className="text-xs font-bold text-gray-800 truncate" title={item.name || item.title}>{item.name || item.title}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5 truncate uppercase font-semibold">Active Engine Render</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Browser Component (Supabase) ──────────────────────────────────────────────

function MediaBrowser({ bucket, folder, search, onSearchChange, onSelect, selectable = false }: {
  bucket: MediaBucket;
  folder: string;
  search: string;
  onSearchChange?: (v: string) => void;
  onSelect?: (url: string) => void;
  selectable?: boolean;
}) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);

  const { data: files, isLoading, isRefetching } = useQuery({
    queryKey: ["media-files", bucket, folder],
    queryFn: () => listBucketFiles(bucket, folder).then(r => r.data ?? []),
    staleTime: 60_000,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadFile(bucket, file, folder),
    onSuccess: (res) => {
      if (res.error) throw res.error;
      queryClient.invalidateQueries({ queryKey: ["media-files", bucket] });
      toast.success("File uploaded successfully");
    },
    onError: () => toast.error("Upload failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (name: string) => deleteFile(bucket, name, folder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media-files", bucket] });
      setDeleteTarget(null);
      toast.success("File deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadMutation.mutate(e.target.files[0]);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const filtered = files?.filter(f => f.name.toLowerCase().includes(search.toLowerCase())) ?? [];

  return (
    <div className="flex flex-col h-full bg-white relative">
       {/* Header Bar */}
       <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0 bg-white">
          <div className="flex items-center gap-3">
             <div className="relative w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={`Search in ${bucket}...`} 
                  value={search} 
                  onChange={e => onSearchChange?.(e.target.value)} 
                  className={inputCls} 
                />
             </div>
             {isRefetching && <RefreshCw size={14} className="animate-spin text-gray-400" />}
          </div>
          <div>
            <input type="file" ref={fileInputRef} onChange={handleFileDrop} className="hidden" accept="image/*" />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadMutation.isPending}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {uploadMutation.isPending ? <RefreshCw size={16} className="animate-spin"/> : <Upload size={16}/>}
              {uploadMutation.isPending ? "Uploading..." : "Upload Asset"}
            </button>
          </div>
       </div>

       {/* Grid Area */}
       <div className="flex-1 overflow-y-auto p-6 relative">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {Array.from({length: 10}).map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse"/>)}
            </div>
          ) : !files?.length ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
               <FileImage size={40} className="mb-3 opacity-20" />
               <p className="font-medium text-sm">No files in {bucket}</p>
               <p className="text-xs mt-1">Upload files to see them here.</p>
            </div>
          ) : filtered.length === 0 ? (
             <div className="p-8 text-center text-gray-400 text-sm">No files match your search.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-20">
              {filtered.map(file => (
                <div key={file.id} className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:border-blue-200 transition-all flex flex-col">
                  <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                     {file.type.startsWith('image/') ? (
                       <div className="aspect-w-1 aspect-h-1">
                       <img src={file.url.startsWith('india_tourism') ? `/tourism/${file.url.split('/').slice(1).join('/')}` : file.url} alt={file.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                       </div>
                     ) : (
                       <ImageIcon size={32} className="text-gray-300" />
                     )}
                     
                     {/* Overlay Actions */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {selectable ? (
                          <button onClick={() => onSelect?.(file.url)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors tooltip-trigger" title="Select this asset">
                            <CheckCircle2 size={18} />
                          </button>
                        ) : (
                           <>
                             <button onClick={() => copyUrl(file.url)} className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                               <LinkIcon size={16} />
                             </button>
                             <button onClick={() => setDeleteTarget(file)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                               <Trash2 size={16} />
                             </button>
                           </>
                        )}
                     </div>
                  </div>
                  <div className="p-3">
                     <p className="text-xs font-medium text-gray-700 truncate" title={file.name}>{file.name}</p>
                     <p className="text-[10px] text-gray-400 mt-0.5 uppercase">{(file.size / 1024).toFixed(1)} KB • {file.type.split('/')[1] || "IMG"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
       </div>

       {/* Delete Dialog */}
       {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete File?</h3>
            <p className="text-sm text-gray-500 mb-6 break-words">Are you sure you want to delete <span className="font-mono text-xs">{deleteTarget.name}</span>? This could break live website links.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600">Cancel</button>
              <button 
                onClick={() => deleteMutation.mutate(deleteTarget.name)} 
                disabled={deleteMutation.isPending} 
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm & Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// We also export the internal browser as a standalone component for the MediaPicker modal logic.
export { MediaBrowser };
