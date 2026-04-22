import { useState, useRef, useCallback } from "react";
import { pipeline, env } from "@xenova/transformers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Image as ImageIcon, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

env.allowLocalModels = false;

const DESTINATION_KEYWORDS: Record<string, string[]> = {
  ladakh: ["high altitude", "barren landscape", "monastery", "mountain pass", "cold desert"],
  kashmir: ["paradise", "dal lake", "chinar trees", "snow-capped peaks", "shikaras"],
  manali: ["himalayan valley", "pine forests", "snow peaks", "river rafting", "adventure"],
  goa: ["tropical beach", "golden sand", "palm trees", "portuguese heritage", "turquoise sea"],
  kerala: ["backwaters", "lush green", "houseboat", "coconut palms", "tropical"],
  rajasthan: ["golden desert", "ancient fort", "royal palace", "camel", "vibrant culture"],
  varanasi: ["sacred ghats", "holy river", "ancient city", "spiritual", "temple"],
  andaman: ["coral reef", "crystal clear water", "tropical island", "pristine beach", "marine life"],
};

function enrichCaption(rawCaption: string, filename = "", destination = "") {
  const lower = (filename + " " + destination).toLowerCase();
  for (const [place, keywords] of Object.entries(DESTINATION_KEYWORDS)) {
    if (lower.includes(place)) {
      const loc = place.charAt(0).toUpperCase() + place.slice(1);
      const extra = keywords.slice(0, 2).join(" and ");
      return rawCaption + " - " + extra + " scene in " + loc + ", India";
    }
  }
  return destination ? rawCaption + " at " + destination + ", India" : rawCaption;
}

type Status = "idle" | "loading" | "ready" | "processing";

export default function AltTextGenerator() {
  const [status, setStatus] = useState<Status>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [results, setResults] = useState<{ filename: string; url: string; rawCaption: string; altText: string }[]>([]);
  const [destination, setDestination] = useState("");
  const [dragging, setDragging] = useState(false);

  const captionerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadModel() {
    if (captionerRef.current) return;
    setStatus("loading");
    try {
      captionerRef.current = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning",
        {
          progress_callback: (p: any) => {
            if (p.status === "progress") setLoadProgress(Math.round(p.progress || 0));
          },
        }
      );
      setStatus("ready");
      toast.success("AI Vision Model loaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load WebAssembly model");
      setStatus("idle");
    }
  }

  const processImage = useCallback(async (file: File) => {
    if (!captionerRef.current) await loadModel();
    const url = URL.createObjectURL(file);
    const output = await captionerRef.current(url);
    const rawCaption = output?.[0]?.generated_text || "travel destination";
    const enriched = enrichCaption(rawCaption, file.name, destination);
    return { filename: file.name, url, rawCaption, altText: enriched };
  }, [destination]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setStatus("processing");
    toast.info("Processing " + files.length + " images...");
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const result = await processImage(file);
      setResults((prev) => [...prev, result]);
    }
    setStatus("ready");
    toast.success("Processing complete");
  };

  function exportJSON() {
    const metadata: Record<string, string> = {};
    results.forEach(({ filename, altText }) => { metadata[filename] = altText; });
    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-metadata.json";
    a.click();
    toast.success("Downloaded image-metadata.json");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">AI Alt-Text Generator</h2>
        <p className="text-muted-foreground">
          Vision AI analyzes your images and generates SEO-rich alt text that runs entirely offline in your browser.
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Destination hint (e.g. Ladakh, Goa) — injects regional SEO keywords"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="max-w-md"
        />
        {status === "idle" && (
          <Button onClick={loadModel} className="gap-2">
            <ImageIcon className="w-4 h-4" /> Load AI Model
          </Button>
        )}
      </div>

      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-200",
          dragging ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {status === "loading" ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-lg font-medium text-foreground">Loading Vision Model: {loadProgress}%</p>
            <p className="text-sm text-muted-foreground">One-time download — cached in browser forever after.</p>
          </div>
        ) : status === "processing" ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-lg font-medium text-foreground">Running Neural Analysis...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Click or Drop images here</p>
              <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WEBP — 100% private, no server upload.</p>
            </div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <p className="font-semibold">{results.length} Images Analyzed</p>
            <Button variant="default" onClick={exportJSON} className="gap-2">
              <Download className="w-4 h-4" /> Export Metadata JSON
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((r, i) => (
              <div key={i} className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] w-full relative group">
                  <img src={r.url} alt={r.altText} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                    <p className="text-xs text-white break-all font-mono">{r.filename}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">SEO ALT TEXT</label>
                    <textarea
                      className="w-full text-sm border-0 bg-muted/50 rounded-lg p-3 outline-none focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
                      value={r.altText}
                      onChange={(e) => {
                        const updated = [...results];
                        updated[i].altText = e.target.value;
                        setResults(updated);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
