import { useState, useMemo, useRef } from "react";
import { uploadImage, getPublicImageUrl, type StorageBucket } from "@/lib/storage";
import { UploadCloud, Image as ImageIcon, CheckCircle, XCircle, Copy, Check } from "lucide-react";

type AssetTemplateType = 
  | "state-hero" 
  | "destination-hero" 
  | "destination-gallery" 
  | "package-hero" 
  | "blog-cover" 
  | "testimonial-avatar" 
  | "site-asset";

export default function AdminMedia() {
  const [bucket, setBucket] = useState<StorageBucket>("destination-images");
  const [templateType, setTemplateType] = useState<AssetTemplateType>("destination-hero");
  
  // Dynamic Slug Fields
  const [stateSlug, setStateSlug] = useState("");
  const [destSlug, setDestSlug] = useState("");
  const [packageSlug, setPackageSlug] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [uuid, setUuid] = useState("");
  const [assetName, setAssetName] = useState("");
  
  // File State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  // Post-flight State
  const [successPath, setSuccessPath] = useState("");
  const [successBucket, setSuccessBucket] = useState<StorageBucket>("destination-images");
  const [copied, setCopied] = useState(false);

  // Auto-generate safe Kebab-case slugs
  const toKebab = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const generatedPath = useMemo(() => {
    switch(templateType) {
      case "state-hero":
        return `states/${toKebab(stateSlug || "state")}/hero.webp`;
      case "destination-hero":
        return `destinations/${toKebab(stateSlug || "state")}/${toKebab(destSlug || "destination")}/hero.webp`;
      case "destination-gallery":
        return `destinations/${toKebab(stateSlug || "state")}/${toKebab(destSlug || "destination")}/${toKebab(assetName || "gallery-1")}.webp`;
      case "package-hero":
        return `packages/${toKebab(packageSlug || "package")}/hero.webp`;
      case "blog-cover":
        return `blog/${toKebab(blogSlug || "post")}/cover.webp`;
      case "testimonial-avatar":
        return `testimonials/${toKebab(uuid || "uuid")}/avatar.webp`;
      case "site-asset":
        return `branding/${toKebab(assetName || "item")}.webp`;
      default:
        return "";
    }
  }, [templateType, stateSlug, destSlug, packageSlug, blogSlug, uuid, assetName]);

  // Adjust default bucket when template changes
  const handleTemplateChange = (val: AssetTemplateType) => {
    setTemplateType(val);
    if(val.includes("destination") || val.includes("state")) setBucket("destination-images");
    if(val.includes("package")) setBucket("package-images");
    if(val.includes("blog")) setBucket("blog-images");
    if(val.includes("testimonial")) setBucket("testimonial-images");
    if(val.includes("site")) setBucket("site-assets");
  };

  const validateFile = (selectedFile: File) => {
    setUploadError("");
    const allowedTypes = ['image/webp', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadError("Invalid file type. Only WebP, JPG, and PNG are allowed.");
      return false;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadError("File is too large. Maximum size is 5MB.");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (validateFile(selected)) {
        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));
        // Reset success state when picking new file
        setSuccessPath("");
      } else {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const finalPath = generatedPath.replace('.webp', ''); // keep original extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    const savePath = `${finalPath}.${ext === 'jpg' ? 'jpeg' : ext}`;

    const { data, error } = await uploadImage(bucket, savePath, file, true);

    if (error) {
      setUploadError(`Upload failed: ${error.message}`);
    } else if (data) {
      setSuccessPath(data.path);
      setSuccessBucket(bucket);
      setFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    
    setIsUploading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Media Storage Cloud</h2>
        <p className="text-gray-500 text-sm">Upload strictly modeled imagery into public Supabase CDN buckets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Col: Target Configurator */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-gray-800 border-b pb-2">1. Define Target</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Asset Type</label>
              <select 
                value={templateType} 
                onChange={e => handleTemplateChange(e.target.value as AssetTemplateType)}
                className="w-full text-sm border-gray-300 rounded-lg py-2 cursor-pointer focus:ring-primary focus:border-primary"
              >
                <option value="state-hero">State Hero</option>
                <option value="destination-hero">Destination Hero</option>
                <option value="destination-gallery">Destination Gallery</option>
                <option value="package-hero">Package Hero</option>
                <option value="blog-cover">Blog Cover</option>
                <option value="testimonial-avatar">Testimonial Avatar</option>
                <option value="site-asset">Site Asset</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Bucket</label>
              <select 
                value={bucket} 
                onChange={e => setBucket(e.target.value as StorageBucket)}
                className="w-full text-sm border-gray-300 rounded-lg py-2 bg-gray-50"
              >
                <option value="destination-images">destination-images</option>
                <option value="package-images">package-images</option>
                <option value="blog-images">blog-images</option>
                <option value="testimonial-images">testimonial-images</option>
                <option value="site-assets">site-assets</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {(templateType === "state-hero" || templateType.includes("destination")) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State Slug</label>
                <input type="text" placeholder="e.g. uttar-pradesh" value={stateSlug} onChange={e => setStateSlug(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}
            
            {templateType.includes("destination") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Slug</label>
                <input type="text" placeholder="e.g. varanasi-tour" value={destSlug} onChange={e => setDestSlug(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}

            {templateType === "package-hero" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Slug</label>
                <input type="text" placeholder="e.g. kedarnath-yatra-5-days" value={packageSlug} onChange={e => setPackageSlug(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}

            {templateType === "blog-cover" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blog Post Slug</label>
                <input type="text" placeholder="e.g. best-time-to-visit" value={blogSlug} onChange={e => setBlogSlug(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}

            {templateType === "testimonial-avatar" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Row Object UUID</label>
                <input type="text" placeholder="e.g. 1cf2-49x0..." value={uuid} onChange={e => setUuid(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}

            {(templateType === "destination-gallery" || templateType === "site-asset") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                <input type="text" placeholder="e.g. gallery-1 or footer-logo" value={assetName} onChange={e => setAssetName(e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md py-2 px-3" />
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-3 rounded-md border border-gray-200 mt-4">
            <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Determined Upload Path:</span>
            <code className="text-sm text-gray-800 break-all select-all font-mono">{generatedPath.replace('.webp', '')}.[ext]</code>
          </div>
        </div>

        {/* Right Col: Picker & Uploader */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-800 border-b pb-2">2. Provide Asset</h3>
            
            <label className={`block border-2 ${previewUrl ? 'border-solid border-gray-200' : 'border-dashed border-gray-300'} rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden group`}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/webp,image/jpeg,image/png" className="hidden" />
              
              {previewUrl ? (
                <div className="space-y-4 relative z-10">
                  <img src={previewUrl} alt="Preview" className="mx-auto max-h-48 rounded object-contain shadow-sm bg-white" />
                  <p className="text-xs font-medium text-gray-500 bg-white/90 inline-block px-2 py-1 rounded">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Click to browse or drag file here</p>
                    <p className="text-xs text-gray-500 mt-1">.WEBP, .JPG, .PNG up to 5MB</p>
                  </div>
                </div>
              )}
            </label>

            {uploadError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                <XCircle size={16} />
                <p>{uploadError}</p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all flex justify-center items-center gap-2 ${
                !file ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 shadow-sm"
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading to CDN...
                </>
              ) : (
                <>
                  <UploadCloud size={18} />
                  Commit to Storage
                </>
              )}
            </button>
          </div>

          {/* Success Flight Card */}
          {successPath && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-3">
                <CheckCircle size={20} />
                Upload Successful!
              </div>
              
              <div className="space-y-4">
                <div className="bg-white border text-sm border-emerald-100 rounded p-3 flex items-center justify-between shadow-sm">
                  <span className="font-mono text-gray-600 truncate mr-3 flex-1">{successPath}</span>
                  <button onClick={() => handleCopy(successPath)} className="text-gray-400 hover:text-emerald-600 shrink-0 flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded border text-xs">
                    {copied ? <Check size={14} className="text-emerald-500"/> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy Path"}
                  </button>
                </div>
                
                <p className="text-xs text-emerald-700">Paste the above path into the <code>image_url</code> field of your database row.</p>
                
                <div className="pt-2 border-t border-emerald-200/50">
                   <a 
                    href={getPublicImageUrl(successBucket, successPath)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs font-medium text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <ImageIcon size={14} /> Open Public CDN URL Preview
                  </a>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
