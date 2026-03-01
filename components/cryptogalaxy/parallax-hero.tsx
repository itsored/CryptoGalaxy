"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ParallaxHeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
}

export function ParallaxHero({ eyebrow, title, subtitle, ctaLabel, ctaHref }: ParallaxHeroProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.18)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="hero-shell section-reveal relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-indigo-950/60 px-6 py-20 text-center shadow-[0_0_80px_rgba(76,29,149,0.35)] sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(67,56,202,0.3),transparent_35%)]" />
      <div className="pointer-events-none absolute -left-16 top-10 h-36 w-36 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-35" style={{ transform: `translateY(${offset * 0.35}px)` }}>
        <div className="mx-auto h-full w-full max-w-4xl bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.2),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl" style={{ transform: `translateY(${offset * 0.15}px)` }}>
        {eyebrow ? (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-violet-200/90">{eyebrow}</p>
        ) : null}
        <h1 className="text-galaxy text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">{subtitle}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-xs text-violet-100">
            Bitcoin
          </span>
          <span className="rounded-full border border-indigo-300/30 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-100">
            Blockchain
          </span>
          <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-100">
            Web3 Events
          </span>
        </div>
        {ctaLabel && ctaHref ? (
          <Button asChild className="btn-glow mt-8 bg-violet-500 text-white hover:bg-violet-400">
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        ) : null}
      </div>
    </section>
  )
}
