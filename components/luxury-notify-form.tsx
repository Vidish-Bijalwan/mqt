"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Send, CheckCircle, Sparkles } from "lucide-react"

interface LuxuryNotifyFormProps {
  visible: boolean
}

export function LuxuryNotifyForm({ visible }: LuxuryNotifyFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-lg transition-all duration-1000 delay-600",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      {isSubmitted ? (
        <div className="relative overflow-hidden rounded-2xl border border-[var(--himalayan-gold)]/30 bg-gradient-to-r from-[var(--himalayan-dark)]/80 via-[var(--himalayan-dark)]/60 to-[var(--himalayan-dark)]/80 p-8 backdrop-blur-xl">
          {/* Success glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-emerald-500/10 to-emerald-500/5" />
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-emerald-500/20 p-3">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-[var(--himalayan-snow)]">
                Welcome aboard!
              </p>
              <p className="mt-1 text-sm text-[var(--himalayan-ice)]/70">
                {"We'll notify you the moment we launch."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CTA Text */}
          <div className="flex items-center justify-center gap-2 text-center">
            <Sparkles className="h-4 w-4 text-[var(--himalayan-gold)]/70" />
            <p className="text-sm tracking-wide text-[var(--himalayan-ice)]/70">
              Be the first to experience luxury travel redefined
            </p>
            <Sparkles className="h-4 w-4 text-[var(--himalayan-gold)]/70" />
          </div>

          {/* Glassmorphism Input Container */}
          <div 
            className={cn(
              "relative overflow-hidden rounded-2xl transition-all duration-500",
              isFocused 
                ? "shadow-[0_0_40px_rgba(212,175,55,0.15)]" 
                : "shadow-[0_0_20px_rgba(125,211,252,0.05)]"
            )}
          >
            {/* Border gradient */}
            <div 
              className={cn(
                "absolute inset-0 rounded-2xl p-px transition-opacity duration-500",
                isFocused ? "opacity-100" : "opacity-50"
              )}
              style={{
                background: isFocused 
                  ? 'linear-gradient(135deg, var(--himalayan-gold), var(--himalayan-sky), var(--himalayan-gold))'
                  : 'linear-gradient(135deg, rgba(125,211,252,0.3), rgba(30,73,118,0.5), rgba(125,211,252,0.3))'
              }}
            >
              <div className="h-full w-full rounded-2xl bg-[var(--himalayan-dark)]/90" />
            </div>
            
            {/* Inner content */}
            <div className="relative flex flex-col gap-3 p-4 md:flex-row md:gap-3 md:p-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                className="h-14 flex-1 rounded-xl bg-transparent px-5 text-[var(--himalayan-snow)] placeholder:text-[var(--himalayan-ice)]/40 focus:outline-none md:h-12"
              />
              <button
                type="submit"
                className="group relative h-14 overflow-hidden rounded-xl px-8 font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:h-12"
              >
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--himalayan-gold)] via-[#f5d67a] to-[var(--himalayan-gold)] transition-all" />
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" 
                  style={{
                    animation: 'shimmer 2s infinite',
                    backgroundSize: '200% 100%'
                  }}
                />
                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2 text-[var(--himalayan-deep)]">
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="tracking-wide">Notify Me</span>
                </span>
              </button>
            </div>
          </div>

          {/* Privacy note */}
          <p className="text-center text-xs text-[var(--himalayan-ice)]/40">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  )
}
