import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
  alt: string;
  /**
   * className applied to the wrapper <span>. Use this ONLY to set
   * display/positioning when the caller already owns the size context.
   * The wrapper is `contents` by default so it disappears from layout.
   */
  containerClassName?: string;
  lazy?: boolean;
}

export function ImgWithFallback({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  lazy = true,
  ...props
}: ImgWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => setIsLoaded(true);

  const showPlaceholder =
    !imgSrc ||
    imgSrc === '/placeholder.svg' ||
    (hasError && (imgSrc === '/placeholder.svg' || !imgSrc));

  // If containerClassName is supplied, the caller wants a sized wrapper
  // (e.g. "absolute inset-0" or "w-full h-full"). We honour it exactly,
  // without injecting our own `relative` which would fight against it.
  const Wrapper = containerClassName
    ? ({ children }: { children: React.ReactNode }) => (
        <div className={`overflow-hidden bg-gray-100 ${containerClassName}`}>
          {children}
        </div>
      )
    : React.Fragment;

  return (
    <Wrapper>
      {/* Shimmer skeleton while loading */}
      {!isLoaded && !showPlaceholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {showPlaceholder ? (
        <div
          className={`flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-amber-50 w-full h-full ${className}`}
        >
          <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur shadow-sm flex items-center justify-center mb-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300">
            MyQuickTrippers
          </span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onError={handleError}
          onLoad={handleLoad}
          loading={lazy ? 'lazy' : 'eager'}
          decoding={lazy ? 'async' : 'auto'}
          {...props}
        />
      )}
    </Wrapper>
  );
}
