import React from 'react';

/**
 * SidePillars — Premium Indian Heritage Architectural Frame
 *
 * Design Goals:
 * - Absolute positioned (scrolls naturally with page content, no fixed/sticky)
 * - Flush to outer gutter edges, never overlapping content
 * - Grayscale + warm sepia blend so it harmonizes with the navy navbar & warm page background
 * - Top/bottom CSS mask fades for seamless integration with Hero and Footer
 * - Opacity at 60% — clearly visible but never competing with content
 */
const SidePillars = () => {
  const pillarStyle: React.CSSProperties = {
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
  };

  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Left Frame — flush to page left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[50px] xl:w-[65px]"
        style={pillarStyle}
      >
        <img
          src="/temple-pillar.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'grayscale(40%) sepia(20%) contrast(0.9) brightness(0.95)',
            opacity: 0.60,
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Right Frame — flush to page right edge, mirrored */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[50px] xl:w-[65px]"
        style={pillarStyle}
      >
        <img
          src="/temple-pillar.png"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'grayscale(40%) sepia(20%) contrast(0.9) brightness(0.95)',
            opacity: 0.60,
            mixBlendMode: 'multiply',
            transform: 'scaleX(-1)',
          }}
        />
      </div>

    </div>
  );
};

export default SidePillars;
