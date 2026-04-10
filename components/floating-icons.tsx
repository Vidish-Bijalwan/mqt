"use client"

import { useEffect, useState } from "react"
import { Plane, MapPin, Compass, Mountain, Globe, Camera, Map, Palmtree } from "lucide-react"

const icons = [
  { Icon: Plane, delay: 0, size: "lg" },
  { Icon: MapPin, delay: 1, size: "md" },
  { Icon: Compass, delay: 2, size: "lg" },
  { Icon: Mountain, delay: 3, size: "xl" },
  { Icon: Globe, delay: 4, size: "md" },
  { Icon: Camera, delay: 5, size: "sm" },
  { Icon: Map, delay: 6, size: "md" },
  { Icon: Palmtree, delay: 7, size: "lg" },
]

interface FloatingIconProps {
  Icon: React.ElementType
  delay: number
  index: number
  size: string
}

function FloatingIcon({ Icon, delay, index, size }: FloatingIconProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay * 150)
    return () => clearTimeout(timer)
  }, [delay])

  const positions = [
    "left-[3%] top-[12%]",
    "right-[6%] top-[18%]",
    "left-[8%] bottom-[35%]",
    "right-[4%] bottom-[25%]",
    "left-[12%] top-[55%]",
    "right-[10%] top-[50%]",
    "left-[6%] top-[75%]",
    "right-[8%] top-[70%]",
  ]

  const sizeClasses: Record<string, string> = {
    sm: "h-6 w-6 md:h-8 md:w-8",
    md: "h-8 w-8 md:h-10 md:w-10",
    lg: "h-10 w-10 md:h-14 md:w-14",
    xl: "h-12 w-12 md:h-16 md:w-16",
  }

  return (
    <div
      className={`absolute ${positions[index]} transition-all duration-1000 ${
        mounted ? "opacity-20 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={
        mounted
          ? {
              animationName: "float",
              animationDuration: `${5 + index * 0.7}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${delay * 0.3}s`,
            }
          : undefined
      }
    >
      <div className="relative">
        {/* Subtle glow behind icon */}
        <div className="absolute inset-0 blur-xl bg-[var(--himalayan-ice)]/20 rounded-full scale-150 opacity-50" />
        <Icon 
          className={`relative ${sizeClasses[size]} text-[var(--himalayan-ice)]/60 drop-shadow-[0_0_8px_rgba(125,211,252,0.3)]`} 
          strokeWidth={1} 
        />
      </div>
    </div>
  )
}

export function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[8] hidden overflow-hidden lg:block">
      {icons.map(({ Icon, delay, size }, index) => (
        <FloatingIcon key={index} Icon={Icon} delay={delay} index={index} size={size} />
      ))}
    </div>
  )
}
