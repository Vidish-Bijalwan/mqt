import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ImgWithFallback } from "@/components/ui/ImgWithFallback";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  title?: string;
  showTitle?: boolean;
}

const GalleryGrid = ({ images, title = "Photo Gallery", showTitle = true }: GalleryGridProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { track } = useAnalytics();

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    track("gallery_open", { index: i, alt: images[i].alt });
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i === 0 ? images.length - 1 : i - 1) : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i === images.length - 1 ? 0 : i + 1) : null));

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {showTitle && (
          <div className="text-center mb-10">
            <h2 className="section-heading">{title}</h2>
          </div>
        )}

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                i === 0 ? "md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "4/5" : "4/3" }}
              onClick={() => openLightbox(i)}
            >
              <ImgWithFallback
                src={img.src}
                fallbackSrc="/placeholder.svg"
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[80vh] relative">
            <ImgWithFallback
              src={images[lightboxIndex].src}
              fallbackSrc="/placeholder.svg"
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-center text-white/60 text-sm mt-3">{images[lightboxIndex].alt}</p>
            <p className="text-center text-white/40 text-xs">{lightboxIndex + 1} / {images.length}</p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
