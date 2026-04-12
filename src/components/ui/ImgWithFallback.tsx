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

  const showPlaceholder = imgSrc === '/placeholder.svg' || (hasError && !imgSrc);

  return (
    <div className={`relative overflow-hidden bg-gray-50 ${containerClassName}`}>
      <AnimatePresence mode="wait">
        {!isLoaded && !showPlaceholder && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-200 animate-pulse object-cover w-full h-full"
          />
        )}
      </AnimatePresence>

      {showPlaceholder ? (
        <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-amber-50 ${className}`}>
           <div className="w-12 h-12 rounded-full bg-white/60 backdrop-blur shadow-sm flex items-center justify-center mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
               <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
             </svg>
           </div>
           <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">MyQuickTrippers</span>
        </div>
      ) : (
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
      )}
    </div>
  );
}
