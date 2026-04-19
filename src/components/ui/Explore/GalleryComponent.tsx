import React, { useState } from "react";
import { ImageRecord } from "@/types/models";
import { SmartImage } from "../SmartImage";

interface GalleryProps {
  images: ImageRecord[];
  destinationName: string;
}

export const GalleryComponent: React.FC<GalleryProps> = ({ images, destinationName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-component">
      {/* Main image */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '8px' }}>
        <SmartImage
          src={images[activeIndex].url}
          alt={images[activeIndex].alt || destinationName}
          style={{ width: '100%', height: '100%' }}
          location={destinationName}
        />
        <button
          onClick={() => setLightboxOpen(true)}
          style={{
            position: 'absolute', bottom: '12px', right: '12px',
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px', color: 'white', padding: '6px 12px',
            fontSize: '12px', cursor: 'pointer', backdropFilter: 'blur(4px)'
          }}
        >
          ⛶ View Full
        </button>
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button onClick={() => setActiveIndex(i => (i - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white',
                cursor: 'pointer', fontSize: '16px' }}>‹</button>
            <button onClick={() => setActiveIndex(i => (i + 1) % images.length)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white',
                cursor: 'pointer', fontSize: '16px' }}>›</button>
          </>
        )}
        {/* Image credit */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          fontSize: '10px', color: 'rgba(255,255,255,0.5)'
        }}>
          {images[activeIndex].credit}
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: '72px', height: '52px', flexShrink: 0,
              borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
              border: activeIndex === i ? '2px solid #F59E0B' : '2px solid transparent',
              transition: 'border-color 0.2s ease', opacity: activeIndex === i ? 1 : 0.6
            }}
          >
            <SmartImage
              src={img.thumbnail_url || img.url}
              alt={img.alt || destinationName}
              style={{ width: '100%', height: '100%' }}
              location=""
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt || destinationName}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: 'white', width: '40px', height: '40px',
              borderRadius: '50%', cursor: 'pointer', fontSize: '18px'
            }}
          >✕</button>
        </div>
      )}
    </div>
  );
};
