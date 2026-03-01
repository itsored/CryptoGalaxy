"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export type PastEventGalleryItem = {
  title: string
  location: string
  year: string
  cover: string
  images: string[]
}

export function PastEventsArchive({ events }: { events: PastEventGalleryItem[] }) {
  const [activeEvent, setActiveEvent] = useState<PastEventGalleryItem | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeImage = useMemo(() => {
    if (!activeEvent) return null
    return activeEvent.images[activeIndex] ?? null
  }, [activeEvent, activeIndex])

  function openEventGallery(event: PastEventGalleryItem) {
    setActiveEvent(event)
    setActiveIndex(0)
  }

  function closeGallery() {
    setActiveEvent(null)
    setActiveIndex(0)
  }

  function goPrev() {
    if (!activeEvent) return
    setActiveIndex((prev) => (prev - 1 + activeEvent.images.length) % activeEvent.images.length)
  }

  function goNext() {
    if (!activeEvent) return
    setActiveIndex((prev) => (prev + 1) % activeEvent.images.length)
  }

  return (
    <section className="section-reveal space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <ImageIcon className="h-5 w-5 text-violet-300" />
          Past Events Archive
        </h2>
        <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
          <Link href="/events">Explore Events</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event, idx) => (
          <button
            key={event.title}
            type="button"
            onClick={() => openEventGallery(event)}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Card className={`galaxy-card section-reveal stagger-${(idx % 6) + 1} group overflow-hidden`}>
              <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
                <Image
                  src={event.cover}
                  alt={`${event.title} event photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <Badge className="border border-violet-300/35 bg-violet-500/20 text-violet-100">{event.location}</Badge>
                  <span className="rounded-full border border-white/25 bg-black/45 px-2 py-1 text-slate-100">{event.images.length} photos</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white">{event.title}</CardTitle>
                <CardDescription className="text-slate-300">{event.year} community meetup archive</CardDescription>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>

      <Dialog open={!!activeEvent} onOpenChange={(open) => (!open ? closeGallery() : null)}>
        <DialogContent className="max-w-5xl border-white/20 bg-slate-950/95 text-slate-100">
          {activeEvent && activeImage ? (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-white">{activeEvent.title}</DialogTitle>
                <DialogDescription className="text-slate-300">
                  {activeEvent.location} • {activeEvent.year} • {activeEvent.images.length} photos
                </DialogDescription>
              </DialogHeader>

              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={activeImage}
                    alt={`${activeEvent.title} gallery image ${activeIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {activeEvent.images.length > 1 ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 border-white/20 bg-black/50 text-slate-100 hover:bg-black/70"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 border-white/20 bg-black/50 text-slate-100 hover:bg-black/70"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Image {activeIndex + 1} of {activeEvent.images.length}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                {activeEvent.images.map((imagePath, idx) => (
                  <button
                    key={imagePath}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-md border ${
                      idx === activeIndex ? "border-violet-300" : "border-white/15"
                    }`}
                  >
                    <Image
                      src={imagePath}
                      alt={`${activeEvent.title} thumbnail ${idx + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
