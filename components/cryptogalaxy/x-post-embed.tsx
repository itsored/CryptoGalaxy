"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useIsMobile } from "@/components/ui/use-mobile"
import { cn } from "@/lib/utils"

type XPostEmbedProps = {
  url: string
  className?: string
  height?: number
  mobileHeight?: number
}

function extractPostId(url: string) {
  const match = url.match(/status\/(\d+)/i)
  return match?.[1] ?? null
}

export function XPostEmbed({ url, className, height = 520, mobileHeight = 380 }: XPostEmbedProps) {
  const isMobile = useIsMobile()
  const postId = useMemo(() => extractPostId(url), [url])

  if (!postId) {
    return (
      <div className={cn("rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300", className)}>
        Invalid X post URL.
      </div>
    )
  }

  const embedSrc = `https://platform.twitter.com/embed/Tweet.html?dnt=true&id=${postId}&theme=dark&lang=en`
  const embedHeight = isMobile ? mobileHeight : height

  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/10 bg-slate-950/70", className)}>
      <iframe
        title={`X post ${postId}`}
        src={embedSrc}
        width="100%"
        height={embedHeight}
        loading="lazy"
        className="w-full border-0"
      />
      <div className="border-t border-white/10 px-3 py-2">
        <Link href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-300 hover:text-violet-200">
          Open on X
        </Link>
      </div>
    </div>
  )
}
