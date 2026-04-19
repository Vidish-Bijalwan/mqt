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
  fallbackSrc,
  onLoad 
}) => {
  // stage: 'primary' → try src; 'fallback' → try fallbackSrc; 'gradient' → show emoji gradient
  const [stage, setStage] = useState<'primary' | 'fallback' | 'gradient'>('primary');
  const [loaded, setLoaded] = useState(false);

  const gradients: Record<string, string> = {
    beach:       'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #0891B2 100%)',
    mountain:    'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
    temple:      'linear-gradient(135deg, #92400E 0%, #D97706 50%, #F59E0B 100%)',
    forest:      'linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)',
    desert:      'linear-gradient(135deg, #78350F 0%, #D97706 50%, #FDE68A 100%)',
    wildlife:    'linear-gradient(135deg, #14532D 0%, #15803D 50%, #4ADE80 100%)',
    city:        'linear-gradient(135deg, #1E1B4B 0%, #3730A3 50%, #6366F1 100%)',
    pilgrimage:  'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #F97316 100%)',
    lake:        'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #38BDF8 100%)',
    hill_station:'linear-gradient(135deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
    heritage:    'linear-gradient(135deg, #92400E 0%, #D97706 50%, #F59E0B 100%)',
    adventure:   'linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)',
    destination: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
  };

  const currentSrc = stage === 'primary' ? src : (fallbackSrc ?? '');

  const handleError = () => {
    if (stage === 'primary' && fallbackSrc && fallbackSrc !== src) {
      // Try the fallback tourism image before giving up
      setStage('fallback');
      setLoaded(false);
    } else {
      setStage('gradient');
    }
  };

  if (stage === 'gradient') {
    return (
      <div
        className={cn("flex flex-col items-center justify-center p-4", className)}
        style={{ ...style, background: gradients[fallbackType] || gradients.destination }}
        role="img"
        aria-label={alt}
      >
        <span style={{ fontSize: '32px', opacity: 0.6 }}>
          {fallbackType === 'beach'       ? '🏖'
         : fallbackType === 'mountain'   ? '⛰'
         : fallbackType === 'temple'     ? '🛕'
         : fallbackType === 'wildlife'   ? '🐯'
         : fallbackType === 'city'       ? '🏙'
         : fallbackType === 'pilgrimage' ? '🙏'
         : fallbackType === 'hill_station'? '⛰'
         : fallbackType === 'heritage'   ? '🏛'
         : fallbackType === 'adventure'  ? '🧗'
         : '🗺'}
        </span>
        {location && (
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, textAlign: 'center', marginTop: '8px' }}>
            {location}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #f3f4f6 25%, #e9ecef 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%',
          animation: 'imageShimmer 1.5s infinite linear'
        }} />
      )}
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className={cn("w-full h-full object-cover transition-opacity duration-500 ease-in")}
        style={{ opacity: loaded ? 1 : 0 }}
        loading="lazy"
        onLoad={() => { setLoaded(true); onLoad?.(); }}
        onError={handleError}
      />
    </div>
  );
};
