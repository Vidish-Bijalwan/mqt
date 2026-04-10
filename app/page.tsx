"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatedParticles } from "@/components/animated-particles"
import { FloatingIcons } from "@/components/floating-icons"
import { LuxuryNotifyForm } from "@/components/luxury-notify-form"
import { cn } from "@/lib/utils"
import { Instagram, Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react"

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [backdropVisible, setBackdropVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const backdropTimer = setTimeout(() => setBackdropVisible(true), 300)
    const contentTimer = setTimeout(() => setContentVisible(true), 800)
    return () => {
      clearTimeout(backdropTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--himalayan-deep)]">
      {/* Background Image with Premium Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/himalayan-mountains.jpg"
          alt="Majestic Himalayan mountains"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--himalayan-deep)] via-[var(--himalayan-deep)]/40 to-[var(--himalayan-deep)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--himalayan-deep)]/60 via-transparent to-[var(--himalayan-deep)]/60" />
        <div className="absolute inset-0 bg-[var(--himalayan-blue)]/5 mix-blend-color" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,13,24,0.7)_100%)]" />
      </div>

      {/* Giant Backdrop Text - "LAUNCHING SOON" */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className={cn(
            "select-none transition-all duration-[2000ms] ease-out",
            backdropVisible 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          )}
        >
          {/* First line - LAUNCHING */}
          <div className="relative">
            <h1 
              className="font-serif text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold tracking-[0.2em] text-transparent leading-none"
              style={{
                WebkitTextStroke: '1px rgba(125, 211, 252, 0.15)',
              }}
            >
              <span className="bg-gradient-to-b from-[var(--himalayan-ice)]/20 via-[var(--himalayan-ice)]/8 to-transparent bg-clip-text">
                LAUNCHING
              </span>
            </h1>
            {/* Shimmer effect */}
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[3000ms] ease-in-out",
                backdropVisible ? "translate-x-full" : "-translate-x-full"
              )}
              style={{ 
                maskImage: 'linear-gradient(to bottom, black, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
              }}
            />
          </div>
          {/* Second line - SOON */}
          <div className="relative -mt-4 md:-mt-8">
            <h1 
              className="font-serif text-[18vw] md:text-[15vw] lg:text-[14vw] font-bold tracking-[0.3em] text-transparent leading-none"
              style={{
                WebkitTextStroke: '2px rgba(212, 175, 55, 0.12)',
              }}
            >
              <span className="bg-gradient-to-b from-[var(--himalayan-gold)]/15 via-[var(--himalayan-gold)]/5 to-transparent bg-clip-text">
                SOON
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Animated Particles - Snow effect */}
      <AnimatedParticles />

      {/* Floating Travel Icons */}
      <FloatingIcons />

      {/* Main Content Container */}
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center px-6 py-12">
        
        {/* Logo Section - Premium presentation with blend effect */}
        <div
          className={cn(
            "group relative mb-8 transition-all duration-1000 ease-out md:mb-12",
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          {/* Animated glow ring behind logo */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full opacity-50 blur-3xl transition-all duration-700 group-hover:opacity-70 group-hover:scale-110"
            style={{
              background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(30,73,118,0.4) 40%, transparent 70%)'
            }}
          />
          
          {/* Logo container with lighten blend mode to hide black bg */}
          <div className="relative mx-auto h-40 w-80 md:h-52 md:w-[26rem] lg:h-60 lg:w-[30rem] transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Gradient backdrop matching site colors */}
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10,22,40,0.95) 0%, rgba(5,13,24,0.9) 60%, transparent 100%)'
              }}
            />
            
            {/* Logo with screen blend to eliminate black background */}
            <div className="relative h-full w-full mix-blend-screen">
              <Image
                src="/images/logo.png"
                alt="My Quick Trippers Logo"
                fill
                priority
                className="object-contain p-2"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.2))'
                }}
              />
            </div>
            
            {/* Soft edge fade overlay */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 50%, rgba(5,13,24,1) 100%)'
              }}
            />
            
            {/* Subtle animated border on hover */}
            <div className="absolute inset-0 rounded-2xl border border-[var(--himalayan-gold)]/0 transition-all duration-700 group-hover:border-[var(--himalayan-gold)]/15" />
          </div>
        </div>

        {/* Golden Divider */}
        <div
          className={cn(
            "mb-8 flex items-center gap-4 transition-all duration-1000 delay-200",
            contentVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-50"
          )}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--himalayan-gold)]/60 md:w-20" />
          <div className="h-2 w-2 rotate-45 bg-[var(--himalayan-gold)]/80" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--himalayan-gold)]/60 md:w-20" />
        </div>

        {/* Tagline Section */}
        <div
          className={cn(
            "mb-6 text-center transition-all duration-1000 delay-300 md:mb-10",
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <h2 className="font-serif text-2xl font-light tracking-wide md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-[var(--himalayan-gold)] via-[#f5d67a] to-[var(--himalayan-gold)] bg-clip-text text-transparent">
              Precision Planning.
            </span>
            {" "}
            <span className="text-[var(--himalayan-snow)]">
              The Perfect Escape.
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p
          className={cn(
            "mb-10 max-w-2xl text-center text-base leading-relaxed text-[var(--himalayan-ice)]/70 transition-all duration-1000 delay-500 md:mb-14 md:text-lg",
            contentVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          Embark on extraordinary journeys to the world&apos;s most breathtaking destinations. 
          Curated experiences designed for discerning travelers seeking adventure and luxury.
        </p>

        {/* Luxury Email Form */}
        <LuxuryNotifyForm visible={contentVisible} />

        {/* Social Links with Premium Styling */}
        <div
          className={cn(
            "mt-14 flex items-center justify-center gap-3 transition-all duration-1000 delay-700 md:gap-4",
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          {[
            { Icon: Instagram, href: "#", label: "Instagram" },
            { Icon: Facebook, href: "#", label: "Facebook" },
            { Icon: Twitter, href: "#", label: "Twitter" },
            { Icon: Linkedin, href: "#", label: "LinkedIn" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="group relative overflow-hidden rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 rounded-full border border-[var(--himalayan-ice)]/10 bg-[var(--himalayan-dark)]/30 backdrop-blur-md transition-all group-hover:border-[var(--himalayan-gold)]/30 group-hover:bg-[var(--himalayan-dark)]/50" />
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-full bg-[var(--himalayan-gold)]/0 transition-all group-hover:bg-[var(--himalayan-gold)]/10" />
              <Icon className="relative h-5 w-5 text-[var(--himalayan-ice)]/60 transition-colors group-hover:text-[var(--himalayan-gold)]" />
            </a>
          ))}
        </div>

        {/* Contact Information */}
        <div
          className={cn(
            "mt-10 flex flex-col items-center gap-4 text-sm transition-all duration-1000 delay-1000 md:flex-row md:gap-8",
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <a 
            href="mailto:info@myquicktrippers.com" 
            className="flex items-center gap-2 text-[var(--himalayan-ice)]/50 transition-colors hover:text-[var(--himalayan-gold)]"
          >
            <Mail className="h-4 w-4" />
            <span>info@myquicktrippers.com</span>
          </a>
          <div className="hidden h-4 w-px bg-[var(--himalayan-ice)]/20 md:block" />
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-2 text-[var(--himalayan-ice)]/50 transition-colors hover:text-[var(--himalayan-gold)]"
          >
            <Phone className="h-4 w-4" />
            <span>+1 (234) 567-890</span>
          </a>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-[var(--himalayan-deep)] via-[var(--himalayan-deep)]/50 to-transparent pointer-events-none" />

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 z-20 text-center">
        <p className="text-xs tracking-wider text-[var(--himalayan-ice)]/30">
          © 2026 MY QUICK TRIPPERS. ALL RIGHTS RESERVED.
        </p>
      </footer>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </main>
  )
}
