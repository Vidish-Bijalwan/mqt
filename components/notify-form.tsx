"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Send, CheckCircle } from "lucide-react"

export function NotifyForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-md transition-all duration-1000",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      {isSubmitted ? (
        <div className="flex items-center justify-center gap-3 rounded-xl border border-[var(--himalayan-ice)]/20 bg-[var(--himalayan-dark)]/60 p-6 backdrop-blur-md">
          <CheckCircle className="h-6 w-6 text-emerald-400" />
          <p className="text-[var(--himalayan-snow)]">
            {"Thank you! We'll notify you when we launch."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="mb-4 text-center text-sm text-[var(--himalayan-ice)]/80">
            Be the first to explore. Get notified when we launch.
          </p>
          <div className="relative flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 flex-1 rounded-xl border-[var(--himalayan-blue)] bg-[var(--himalayan-dark)]/60 px-4 text-[var(--himalayan-snow)] placeholder:text-[var(--himalayan-ice)]/50 backdrop-blur-md transition-all focus:border-[var(--himalayan-sky)] focus:ring-2 focus:ring-[var(--himalayan-sky)]/20"
            />
            <Button
              type="submit"
              className="h-12 rounded-xl bg-gradient-to-r from-[var(--himalayan-sky)] to-[var(--himalayan-ice)] px-6 font-semibold text-[var(--himalayan-deep)] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--himalayan-sky)]/30"
            >
              <Send className="mr-2 h-4 w-4" />
              Notify Me
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
