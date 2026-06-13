import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * A centralized library of cinematic travel-themed backgrounds
 * to ensure consistency and avoid clutter in main layout files.
 */

// 1. Warm Sunrise Gradient + Dotted Routes (For Travel Style Section)
export const SunriseGradient = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative overflow-hidden w-full", className)} {...props}>
    {/* Base gentle gradient */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-40 z-0" 
      style={{ background: 'radial-gradient(circle at 10% 20%, rgba(245,158,11,0.06) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(14,165,233,0.04) 0%, transparent 35%)' }}
    />
    
    {/* Extremely subtle dotted curved route line acting as a watermark */}
    <svg 
      className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03] text-amber-900 z-0" 
      viewBox="0 0 1000 400" 
      preserveAspectRatio="xMidYMid slice" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M-100,50 C200,250 500,-50 1100,200" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeDasharray="6 6"
      />
      <path 
        d="M-50,300 C300,100 600,450 1200,100" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="4 8"
      />
    </svg>

    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

// 2. Topographic Map + Grid (For Destinations)
export const TopographicMap = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative overflow-hidden w-full", className)} {...props}>
    {/* Map Grid pattern */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
      style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: '#334155' }}
    />
    
    {/* Oversized faint India outline/abstract shape acting as a watermark */}
    <svg 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-[0.015] text-slate-800 z-0" 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0 L60 20 L80 25 L70 45 L90 70 L65 85 L50 100 L35 85 L10 70 L30 45 L20 25 L40 20 Z" fill="currentColor" />
    </svg>
    
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

// 3. Forest/Lagoon Glow (For Featured Packages)
export const ForestGlow = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative overflow-hidden w-full bg-[#FDFCF8]", className)} {...props}>
    {/* Soft immersive glows */}
    <div 
      className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full pointer-events-none opacity-[0.025] blur-[100px] bg-emerald-600 z-0" 
    />
    <div 
      className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[70%] rounded-full pointer-events-none opacity-[0.02] blur-[120px] bg-blue-600 z-0" 
    />
    
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);

// 4. Passport Stamps / Travel Journal Vibe (For Blog)
export const PassportStamps = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative overflow-hidden w-full bg-[#FAF7EF]", className)} {...props}>
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.04]">
      {/* Decorative Stamp 1 */}
      <div className="absolute top-12 right-[15%] w-32 h-32 rounded-full border-[3px] border-amber-900 border-dashed flex items-center justify-center rotate-12">
        <span className="font-display font-bold text-amber-900 uppercase tracking-widest text-sm text-center">Incredible<br/>India</span>
      </div>
      
      {/* Decorative Stamp 2 */}
      <div className="absolute bottom-20 left-[10%] w-40 h-24 border-[4px] border-slate-900 flex items-center justify-center -rotate-6">
        <span className="font-display font-bold text-slate-900 uppercase tracking-wider text-lg">Custom<br/>Trips</span>
      </div>
    </div>
    
    <div className="relative z-10 w-full h-full">{children}</div>
  </div>
);
