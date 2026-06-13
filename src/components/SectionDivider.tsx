/**
 * Decorative handcrafted elements.
 * Pure CSS/SVG — no extra section height, just visual richness
 * to enhance the handcrafted paper texture background.
 */

/** Floating gradient orbs that sit behind content — adds depth */
export const FloatingOrbs = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    aria-hidden="true"
  >
    {/* Warm amber glow — top left */}
    <div className="absolute -top-24 -left-16 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-amber-400/5 blur-[100px] animate-float" />
    {/* Cool blue glow — bottom right */}
    <div
      className="absolute -bottom-20 -right-12 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-blue-500/5 blur-[90px]"
      style={{ animationDelay: "1.4s" }}
    />
    {/* Subtle green accent — center */}
    <div
      className="absolute top-1/2 left-1/3 w-[180px] h-[180px] rounded-full bg-emerald-500/5 blur-[80px]"
      style={{ animationDelay: "2.8s" }}
    />
  </div>
);

/** Hand-drawn abstract swoosh or underline */
export const HanddrawnSwoosh = ({ className = "" }: { className?: string }) => (
  <svg
    className={`pointer-events-none absolute opacity-20 text-amber-700 ${className}`}
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 25 C 50 5, 150 5, 195 20 C 120 30, 60 30, 10 35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/** Minimalist decorative dots block */
export const DotPattern = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] ${className}`}
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

/** Compass rose watermark */
export const CompassWatermark = ({ className = "" }: { className?: string }) => (
  <svg
    className={`pointer-events-none absolute opacity-[0.03] text-slate-900 ${className}`}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
  </svg>
);
