import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CinematicVariant = "sunrise" | "map" | "adventure" | "trust" | "journal" | "none";

interface CinematicSectionProps extends HTMLAttributes<HTMLElement> {
  variant?: CinematicVariant;
  containerClass?: string;
}

export const CinematicSection = ({ 
  className, 
  containerClass,
  variant = "none", 
  children, 
  ...props 
}: CinematicSectionProps) => {
  
  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        variant === "map" && "bg-[#FCFAFA]",
        variant === "adventure" && "bg-[#FDFCF8]",
        variant === "journal" && "bg-[#FBF7EF]",
        className
      )} 
      {...props}
    >
      {/* Decorative Background Layers */}
      
      {variant === "sunrise" && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none z-0" 
            style={{ 
              background: 'radial-gradient(circle at 15% 30%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(circle at 85% 70%, rgba(14,165,233,0.06) 0%, transparent 50%)' 
            }}
          />
          <svg 
            className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.04] text-amber-900 z-0" 
            viewBox="0 0 1000 400" 
            preserveAspectRatio="xMidYMid slice" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-100,50 C200,250 500,-50 1100,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6"/>
          </svg>
        </>
      )}

      {variant === "map" && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-100 z-0" 
          style={{ 
            backgroundImage: 'repeating-radial-gradient(circle at top right, transparent 0, transparent 60px, rgba(15,23,42,0.02) 61px, transparent 62px), repeating-radial-gradient(circle at bottom left, transparent 0, transparent 80px, rgba(15,23,42,0.015) 81px, transparent 82px)' 
          }}
        />
      )}

      {variant === "adventure" && (
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            background: 'radial-gradient(100% 100% at 50% 0%, rgba(16,185,129,0.03) 0%, transparent 100%)'
          }}
        />
      )}

      {variant === "trust" && (
        <div 
          className="absolute inset-0 pointer-events-none z-0" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.03) 0%, transparent 70%)'
          }}
        />
      )}

      {variant === "journal" && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.06]">
          {/* Decorative Stamp 1 */}
          <div className="absolute top-12 right-[10%] w-40 h-40 rounded-full border-[3px] border-amber-900 border-dashed flex items-center justify-center rotate-12">
            <div className="w-32 h-32 rounded-full border border-amber-900 flex items-center justify-center">
              <span className="font-display font-bold text-amber-900 uppercase tracking-widest text-sm text-center">Incredible<br/>India</span>
            </div>
          </div>
          {/* Decorative Stamp 2 */}
          <div className="absolute bottom-20 left-[5%] w-48 h-28 border-[4px] border-slate-900 flex items-center justify-center -rotate-6">
            <div className="w-[180px] h-[100px] border border-slate-900 flex items-center justify-center">
               <span className="font-display font-bold text-slate-900 uppercase tracking-wider text-xl">Custom<br/>Trips</span>
            </div>
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className={cn("container-page relative z-10", containerClass)}>
        {children}
      </div>
    </section>
  );
};
