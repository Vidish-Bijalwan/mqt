import { ReactNode, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollableRowProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

export function ScrollableRow({ children, className = "", innerClassName = "" }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.7; // scroll 70% of view
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Allow time for smooth scroll to finish, then update checks
      setTimeout(updateScrollState, 400);
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 z-10 p-1.5 sm:p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
      
      {/* Fade masks for visual boundaries on desktop */}
      {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-surface to-transparent pointer-events-none z-[5]" />}
      {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-surface to-transparent pointer-events-none z-[5]" />}
      
      <div 
        ref={scrollRef} 
        onScroll={updateScrollState}
        className={`flex overflow-x-auto scrollbar-hide scroll-smooth relative z-0 ${innerClassName}`}
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 z-10 p-1.5 sm:p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-primary transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
}
