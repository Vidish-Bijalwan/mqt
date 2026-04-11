import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import type { MediaBucket } from "@/services/adminMediaService";

interface MediaInputProps {
  value: string;
  onChange: (url: string) => void;
  defaultBucket?: MediaBucket;
  placeholder?: string;
  className?: string;
}

export function MediaInput({ value, onChange, defaultBucket = "site-assets", placeholder, className }: MediaInputProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder} 
          className={`flex-1 ${className || "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"}`}
        />
        <button 
          type="button" 
          onClick={() => setPickerOpen(true)}
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 flex items-center gap-2 border border-transparent shadow-sm flex-shrink-0"
        >
          <ImagePlus size={16} /> <span className="hidden sm:inline">Browse</span>
        </button>
      </div>

      <MediaPicker 
        open={pickerOpen} 
        onOpenChange={setPickerOpen} 
        onSelect={(url) => {
          // You could strip the public host if you want relative paths, but full URL is fine.
          // Since the next.js site currently renders images, full public URL path is actually safer.
          onChange(url);
        }} 
        defaultBucket={defaultBucket} 
      />
    </>
  );
}
