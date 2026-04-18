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

  // Total failure — show coloured gradient or branded placeholder
  const showGradient = failedCount >= 2 || (!imgSrc || imgSrc === '/placeholder.svg');

  const Wrapper = containerClassName
    ? ({ children }: { children: React.ReactNode }) => (
        <div className={`overflow-hidden ${containerClassName}`}>
          {children}
        </div>
      )
    : React.Fragment;

  if (showGradient) {
    const gradient = fallbackColor
      ? buildGradient(fallbackColor)
      : 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 60%, #0a1e38 100%)';

    return (
      <Wrapper>
        <div
          className={`flex flex-col items-center justify-center ${className}`}
          style={{ background: gradient, width: '100%', height: '100%', minHeight: 80 }}
          aria-label={alt}
          role="img"
        >
          {/* Subtle MQT watermark */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'sans-serif',
              userSelect: 'none',
            }}
          >
            MyQuickTrippers
          </span>
        </div>
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
            background: 'linear-gradient(90deg, #1E293B 25%, #293548 50%, #1E293B 75%)',
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
