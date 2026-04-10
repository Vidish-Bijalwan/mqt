"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.2 - 0.05,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }

        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        // Mix of ice blue and subtle gold particles
        const isGold = Math.random() > 0.85
        ctx.fillStyle = isGold 
          ? `rgba(212, 175, 55, ${particle.opacity * 0.6})`
          : `rgba(125, 211, 252, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  )
}
