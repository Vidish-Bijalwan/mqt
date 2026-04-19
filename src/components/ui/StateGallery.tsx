import React, { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ImageOff, Upload } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string;
}

interface StateGalleryProps {
  stateName: string;
  images: GalleryImage[];
  stateColor?: string;
}

const ImageTile: React.FC<{
  image: GalleryImage;
  index: number;
  onClick: (idx: number) => void;
  tall?: boolean;
}> = ({ image, index, onClick, tall }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${tall ? "row-span-2" : ""}`}
      style={{ aspectRatio: tall ? "3/4" : "4/3" }}
      onClick={() => onClick(index)}
    >
      {/* Shimmer while loading */}
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
      )}

      {errored ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400 gap-2">
          <ImageOff className="w-8 h-8" />
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={image.url}
          alt={image.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setErrored(true); }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
        {image.alt}
      </div>
    </div>
  );
};

export const StateGallery: React.FC<StateGalleryProps> = ({ stateName, images, stateColor }) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visibleImages = images.filter(img => img.url && !img.url.includes("dummy_image"));
  const displayImages = visibleImages.slice(0, 12);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prevImage = useCallback(() => {
    setLightboxIdx(idx => idx !== null ? (idx - 1 + displayImages.length) % displayImages.length : null);
  }, [displayImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIdx(idx => idx !== null ? (idx + 1) % displayImages.length : null);
  }, [displayImages.length]);

  // Keyboard nav
  React.useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, prevImage, nextImage, closeLightbox]);

  if (displayImages.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-widest mb-1"
              style={{ color: stateColor || "#2563EB" }}
            >
              Photo Gallery
            </p>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Journey Through{" "}
              <span className="italic" style={{ color: stateColor || "#2563EB" }}>
                {stateName}
              </span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Authentic imagery from India's tourism archives
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <Upload className="w-4 h-4" />
            <span>{displayImages.length} official photos</span>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayImages.map((img, idx) => (
            <ImageTile
              key={idx}
              image={img}
              index={idx}
              onClick={openLightbox}
              tall={idx === 0 || idx === 5}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIdx + 1} / {displayImages.length}
          </div>

          {/* Previous */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={displayImages[lightboxIdx].url}
              alt={displayImages[lightboxIdx].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-3 text-white/50 text-sm text-center">
              {displayImages[lightboxIdx].alt}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-4 pb-1">
            {displayImages.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightboxIdx(idx); }}
                className={`shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all ${idx === lightboxIdx ? "border-white scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
