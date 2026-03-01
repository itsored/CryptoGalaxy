"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ExternalLink, Search } from "lucide-react"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { XPostEmbed } from "@/components/cryptogalaxy/x-post-embed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cryptoGalaxyThreadSamples, cryptoGalaxyXHandle, cryptoGalaxyXUrl } from "@/lib/cryptogalaxy-data"

export default function ResourcesPage() {
  const [query, setQuery] = useState("")

  const filteredThreads = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) return cryptoGalaxyThreadSamples

    return cryptoGalaxyThreadSamples.filter((item) =>
      `${item.title} ${item.excerpt} ${item.url}`.toLowerCase().includes(normalized),
    )
  }, [query])

  return (
    <div className="container mx-auto space-y-12 px-4 pb-20">
      <ParallaxHero
        eyebrow="CryptoGalaxy Resources"
        title="Previous Threads Archive"
        subtitle="Sample thread embeds from CryptoGalaxy on X."
      />

      <section className="section-reveal space-y-5">
        <div className="space-y-2">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search threads..."
              className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-slate-400"
            />
          </div>
          <p className="text-xs text-slate-400">{filteredThreads.length} thread{filteredThreads.length === 1 ? "" : "s"} found</p>
        </div>

        {filteredThreads.length === 0 ? (
          <Card className="galaxy-card">
            <CardContent className="flex items-center justify-between gap-3 p-6">
              <p className="text-sm text-slate-300">No threads match this search.</p>
              <Button variant="outline" className="border-white/20 bg-transparent text-slate-200" onClick={() => setQuery("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 xl:grid-cols-2">
            {filteredThreads.map((thread, idx) => (
              <Card key={thread.id} className={`galaxy-card section-reveal stagger-${(idx % 4) + 1}`}>
                <CardHeader>
                  <CardTitle className="text-white">{thread.title}</CardTitle>
                  <CardDescription className="text-slate-300">{thread.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <XPostEmbed url={thread.url} height={520} mobileHeight={360} />
                  <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
                    <Link href={thread.url} target="_blank" rel="noopener noreferrer">
                      Open Thread on X
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="section-reveal">
        <Card className="galaxy-dashed-card">
          <CardHeader>
            <CardTitle className="text-white">CryptoGalaxy on X</CardTitle>
            <CardDescription className="text-slate-300">Follow @{cryptoGalaxyXHandle} for more threads and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
              <Link href={cryptoGalaxyXUrl} target="_blank" rel="noopener noreferrer">
                Open X Profile
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
