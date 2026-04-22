// src/components/SemanticSearch.tsx
// AI-powered semantic search using Hugging Face Transformers.js
// The WebAssembly model is loaded LAZILY only on first user interaction — no
// initial-page-load cost. After first load the browser caches it indefinitely.

import { useState, useRef, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, X, Sparkles } from "lucide-react";
import { tourPackages, TourPackage } from "@/data/packages";

// ─── Build a rich searchable text string for each package ─────────────────
function buildPackageText(pkg: TourPackage): string {
  return [
    pkg.title,
    pkg.destination,
    pkg.state,
    pkg.overview ?? "",
    pkg.highlights?.join(" ") ?? "",
    pkg.tags?.join(" ") ?? "",
    pkg.categories?.join(" ") ?? "",
    pkg.season ?? "",
    `${pkg.duration?.days ?? 0} days ${pkg.duration?.nights ?? 0} nights`,
    `₹${pkg.price}`,
  ]
    .filter(Boolean)
    .join(". ");
}

// ─── Cosine Similarity ────────────────────────────────────────────────────
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

type Status = "idle" | "loading" | "ready" | "searching";

interface SearchResult {
  pkg: TourPackage;
  score: number;
}

export default function SemanticSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  const embedderRef = useRef<any>(null);
  const packageVectorsRef = useRef<{ pkg: TourPackage; vector: number[] }[]>([]);

  // Load model lazily on first interaction
  const initModel = useCallback(async () => {
    if (embedderRef.current) return;
    setStatus("loading");
    try {
      // Dynamic import so Transformers.js never touches the initial bundle
      const { pipeline, env } = await import("@xenova/transformers");
      (env as any).allowLocalModels = false;

      const embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
        {
          progress_callback: (p: any) => {
            if (p.status === "progress") setLoadProgress(Math.round(p.progress ?? 0));
          },
        }
      );
      embedderRef.current = embedder;

      // Pre-embed all packages (cached in memory)
      const vectors: { pkg: TourPackage; vector: number[] }[] = [];
      for (const pkg of tourPackages) {
        const out = await embedder(buildPackageText(pkg), { pooling: "mean", normalize: true });
        vectors.push({ pkg, vector: Array.from(out.data as Float32Array) });
      }
      packageVectorsRef.current = vectors;
      setStatus("ready");
    } catch (e) {
      console.error("Semantic search model failed to load:", e);
      setStatus("idle");
    }
  }, []);

  const handleFocus = () => {
    setOpen(true);
    if (status === "idle") initModel();
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim() || !embedderRef.current) return;
    setStatus("searching");

    const out = await embedderRef.current(query, { pooling: "mean", normalize: true });
    const queryVec = Array.from(out.data as Float32Array);

    const scored = packageVectorsRef.current
      .map(({ pkg, vector }) => ({ pkg, score: cosineSimilarity(queryVec, vector) }))
      .sort((a, b) => b.score - a.score)
      .filter(r => r.score > 0.35)
      .slice(0, 4);

    setResults(scored);
    setStatus("ready");
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") { setOpen(false); setResults([]); }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const statusHint = () => {
    if (status === "loading") return `Loading AI model... ${loadProgress}%`;
    if (status === "searching") return "Searching...";
    if (status === "ready" && results.length === 0 && query.trim())
      return "No strong matches — try 'himalayan adventure' or 'peaceful pilgrimage'";
    return "Try: 'quiet place for elderly parents' · 'snow trip in December'";
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Search Input */}
      <div
        className={`relative flex items-center gap-2 bg-white border-2 rounded-2xl px-4 py-3 shadow-lg shadow-black/5 transition-all duration-300 ${
          open ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-primary/50"
        }`}
      >
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <input
          className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-muted-foreground text-foreground"
          placeholder="Describe your dream trip — AI finds the perfect package"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => { if (!results.length) setOpen(false); }, 200)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button onClick={handleClear} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={status === "loading" || status === "searching" || !query.trim()}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-xl disabled:opacity-50 transition-opacity hover:opacity-90"
        >
          {status === "searching" || status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Status Hint */}
      {open && (
        <p className="text-xs text-muted-foreground text-center mt-2 transition-all duration-200">
          {statusHint()}
        </p>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {results.map(({ pkg, score }) => (
            <Link
              key={pkg.id}
              to={`/packages/${pkg.categories[0] ?? "all"}/${pkg.slug}`}
              className="group flex gap-3 items-start border rounded-xl p-4 bg-white hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => { setOpen(false); setResults([]); setQuery(""); }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-muted">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 flex-1">
                    {pkg.title}
                  </p>
                  <span className="text-[11px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                    {Math.round(score * 100)}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">📍 {pkg.destination}</p>
                {pkg.price > 0 && (
                  <p className="text-xs font-semibold text-primary mt-1">
                    ₹{pkg.price.toLocaleString("en-IN")}
                    <span className="font-normal text-muted-foreground">/person</span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
