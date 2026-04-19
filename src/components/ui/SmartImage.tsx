import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackType?: 'beach' | 'mountain' | 'temple' | 'forest' | 'desert' | 'wildlife' | 'city' | 'pilgrimage' | 'lake' | 'destination' | string;
  location?: string;
  onLoad?: () => void;
  // Legacy props compatibility
  aspectRatio?: string;
  fallbackSrc?: string;
  fallbackColor?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({ 
  src, alt, className, style, 
  fallbackType = 'destination',
  location = '',
  onLoad 
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const gradients: Record<string, string> = {
    beach: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #0891B2 100%)',
    mountain: 'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
    temple: 'linear-gradient(135deg, #92400E 0%, #D97706 50%, #F59E0B 100%)',
    forest: 'linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)',
    desert: 'linear-gradient(135deg, #78350F 0%, #D97706 50%, #FDE68A 100%)',
    wildlife: 'linear-gradient(135deg, #14532D 0%, #15803D 50%, #4ADE80 100%)',
    city: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 50%, #6366F1 100%)',
    pilgrimage: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #F97316 100%)',
    lake: 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #38BDF8 100%)',
    destination: 'linear-gradient(135deg, #e8f0fe 0%, #d1dff7 100%)'
  };

  if (status === 'error') {
    return (
      <div
        className={cn("flex flex-col items-center justify-center p-4", className)}
        style={{
          ...style,
          background: gradients[fallbackType] || gradients.destination,
        }}
        role="img"
        aria-label={alt}
      >
        <span style={{ fontSize: '32px', opacity: 0.6 }}>
          {fallbackType === 'beach' ? '🏖' 
         : fallbackType === 'mountain' ? '⛰' 
         : fallbackType === 'temple' ? '🛕'
         : fallbackType === 'wildlife' ? '🐯'
         : fallbackType === 'city' ? '🏙'
         : fallbackType === 'pilgrimage' ? '🙏'
         : '🗺'}
        </span>
        {location && (
          <span style={{ 
            fontSize: '12px', color: 'rgba(255,255,255,0.7)', 
            fontWeight: 500, textAlign: 'center',
            marginTop: '8px'
          }}>
            {location}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {status === 'loading' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #f3f4f6 25%, #e9ecef 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%',
          animation: 'imageShimmer 1.5s infinite linear'
        }} />
      )}
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover transition-opacity duration-500 ease-in")}
        style={{ opacity: status === 'loaded' ? 1 : 0 }}
        loading="lazy"
        onLoad={() => { setStatus('loaded'); onLoad?.(); }}
        onError={() => setStatus('error')}
      />
    </div>
  );
};
