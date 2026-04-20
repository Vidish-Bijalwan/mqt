import React, { useState, useEffect } from 'react';

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
  alt: string;
  /**
   * className applied to the wrapper div. Use this ONLY to set
   * display/positioning when the caller already owns the size context.
   * The wrapper is `contents` by default so it disappears from layout.
   */
  containerClassName?: string;
  lazy?: boolean;
  /**
   * Hex colour used to generate a themed gradient placeholder when both
   * `src` and `fallbackSrc` fail. Matches the `colorHex` field in
   * festivals.ts and other data files.
   */
  fallbackColor?: string;
}

/** Build a CSS gradient string from a brand hex colour */
function buildGradient(hex: string): string {
  // Darken slightly for the gradient end by mixing with black
  return `linear-gradient(135deg, ${hex}ee 0%, ${hex}99 50%, ${hex}44 100%)`;
}

export function ImgWithFallback({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  lazy = true,
  fallbackColor,
  ...props
}: ImgWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || '/placeholder.svg');
  const [failedCount, setFailedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleError = () => {
    if (failedCount === 0 && fallbackSrc && fallbackSrc !== imgSrc && fallbackSrc !== '/placeholder.svg') {
      setImgSrc(fallbackSrc);
      setFailedCount(1);
    } else if (failedCount <= 1) {
      // Signal total failure — use colour gradient
      setImgSrc('');
      setFailedCount(2);
    }
  };

  useEffect(() => {
    setImgSrc(src || '/placeholder.svg');
    setFailedCount(0);
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        handleError();
      }
    }
  }, [imgSrc]);

  const handleLoad = () => setIsLoaded(true);

  const Wrapper = containerClassName
    ? ({ children }: { children: React.ReactNode }) => (
        <div className={`overflow-hidden ${containerClassName}`}>
          {children}
        </div>
      )
    : React.Fragment;

  // Total failure — show placeholder SVG
  const showPlaceholder = failedCount >= 2 || (!imgSrc || imgSrc === '/placeholder.svg');

  if (showPlaceholder) {
    return (
      <Wrapper>
        <img
          src="/images/placeholder.svg"
          alt={alt}
          className={`${className} opacity-100`}
          style={{ objectFit: 'contain', background: '#F1F5F9' }}
          aria-label={alt}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Shimmer skeleton while loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #f3f4f6 25%, #e9ecef 50%, #f3f4f6 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear',
          }}
        />
      )}
      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'async' : 'auto'}
        {...props}
      />
    </Wrapper>
  );
}
