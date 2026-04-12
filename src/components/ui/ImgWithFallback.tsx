import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc: string;
  alt: string;
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
    // Reset state if primary src changes
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

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-muted ${containerClassName}`}>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-muted animate-pulse object-cover w-full h-full"
          />
        )}
      </AnimatePresence>

      <motion.img
        src={imgSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? 'lazy' : 'eager'}
        decoding={lazy ? 'async' : 'auto'}
        {...props}
      />
    </div>
  );
}
