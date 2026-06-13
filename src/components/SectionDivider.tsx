/**
 * Decorative section dividers and background accents.
 * Pure CSS/SVG — no extra section height, just visual richness
 * between homepage sections to fill "dead" white space.
 */

/** Organic wave separator — sits between two sections */
export const WaveDivider = ({
  flip = false,
  color = "#f8fafc", // slate-50
  className = "",
}: {
  flip?: boolean;
  color?: string;
  className?: string;
}) => (
  <div
    className={`w-full overflow-hidden leading-[0] pointer-events-none ${
      flip ? "rotate-180" : ""
    } ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full h-[40px] sm:h-[56px] md:h-[72px] block"
    >
      <path
        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  </div>
);

/** Floating gradient orbs that sit behind content — adds depth without layout shift */
export const FloatingOrbs = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Warm amber glow — top left */}
    <div className="absolute -top-24 -left-16 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-amber-200/15 blur-[100px] animate-float" />
    {/* Cool blue glow — bottom right */}
    <div
      className="absolute -bottom-20 -right-12 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-blue-200/12 blur-[90px]"
      style={{ animationDelay: "1.4s" }}
    />
    {/* Subtle green accent — center */}
    <div
      className="absolute top-1/2 left-1/3 w-[180px] h-[180px] rounded-full bg-emerald-200/8 blur-[80px]"
      style={{ animationDelay: "2.8s" }}
    />
  </div>
);

/** Dotted grid pattern — subtle "handcrafted notebook" texture */
export const DotPattern = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] ${className}`}
    aria-hidden="true"
  >
    <svg width="100%" height="100%">
      <defs>
        <pattern
          id="dot-pattern"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  </div>
);

/** Subtle diagonal lines — gives a premium "artisan" feel */
export const DiagonalLines = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025] ${className}`}
    aria-hidden="true"
  >
    <svg width="100%" height="100%">
      <defs>
        <pattern
          id="diag-lines"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="40"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag-lines)" />
    </svg>
  </div>
);

export default WaveDivider;
