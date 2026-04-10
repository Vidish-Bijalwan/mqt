"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FadedTextProps {
  text: string
  className?: string
  delay?: number
}

export function FadedText({ text, className, delay = 0 }: FadedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      className={cn(
        "inline-block transition-all duration-1000 ease-out",
        isVisible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-sm",
        className
      )}
    >
      {text}
    </span>
  )
}

interface AnimatedLettersProps {
  text: string
  className?: string
  baseDelay?: number
  letterDelay?: number
}

export function AnimatedLetters({
  text,
  className,
  baseDelay = 0,
  letterDelay = 50,
}: AnimatedLettersProps) {
  return (
    <span className={cn("inline-flex flex-wrap justify-center", className)}>
      {text.split("").map((letter, index) => (
        <FadedText
          key={index}
          text={letter === " " ? "\u00A0" : letter}
          delay={baseDelay + index * letterDelay}
        />
      ))}
    </span>
  )
}
