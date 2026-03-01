import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPinned,
  Orbit,
  Radio,
} from "lucide-react"
import { PastEventsArchive, type PastEventGalleryItem } from "@/components/cryptogalaxy/past-events-archive"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { XPostEmbed } from "@/components/cryptogalaxy/x-post-embed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cryptoGalaxyLumaUrl, cryptoGalaxyThreadSamples, cryptoGalaxyXHandle, cryptoGalaxyXUrl } from "@/lib/cryptogalaxy-data"

const signalMetrics = [
  { label: "Active Members", value: "2K+", detail: "Across Kenya" },
  { label: "Campus Workshops", value: "28", detail: "In the last 12 months" },
  { label: "Cities Reached", value: "12", detail: "Community nodes nationwide" },
]

const upcomingEvents = [
  {
    title: "Web3 Workshop at University of Nairobi",
    date: "March 18, 2026",
    tag: "Campus",
    description: "Hands-on workshop on wallets, DeFi basics, and on-chain safety for student builders.",
  },
  {
    title: "Blockchain Career Day - Nairobi",
    date: "April 2, 2026",
    tag: "Networking",
    description: "Meet founders, developers, and ecosystem teams building in blockchain and Web3.",
  },
  {
    title: "Crypto Security Bootcamp",
    date: "April 20, 2026",
    tag: "Security",
    description: "Get practical wallet security, scam detection, and self-custody best practices.",
  },
]

function buildEventImages(folder: string, count: number, ext = "jpg") {
  return Array.from({ length: count }, (_, idx) => `/cryptogalxyimages/${folder}/img-${String(idx + 1).padStart(2, "0")}.${ext}`)
}

const pastEventHighlights: PastEventGalleryItem[] = [
  {
    title: "Arbitrum Nairobi Happy Hour",
    location: "Nairobi",
    year: "2024",
    cover: "/cryptogalxyimages/arbitrum-nairobi-happy-hour/img-01.jpg",
    images: buildEventImages("arbitrum-nairobi-happy-hour", 3),
  },
  {
    title: "Arbitrum Zetech Meetup",
    location: "Ruiru",
    year: "2024",
    cover: "/cryptogalxyimages/arbitrum-zetech-meetup/img-01.jpg",
    images: buildEventImages("arbitrum-zetech-meetup", 3),
  },
  {
    title: "Base x Web3Club Meetup",
    location: "Nairobi",
    year: "2024",
    cover: "/cryptogalxyimages/base-x-web3club-meetup/img-01.jpg",
    images: buildEventImages("base-x-web3club-meetup", 3),
  },
  {
    title: "ENS Mombasa Meetup",
    location: "Mombasa",
    year: "2024",
    cover: "/cryptogalxyimages/ens-mombasa-meetup/img-01.jpg",
    images: buildEventImages("ens-mombasa-meetup", 3),
  },
  {
    title: "Kenyatta University Arbitrum Ideathon",
    location: "KU",
    year: "2024",
    cover: "/cryptogalxyimages/kenyatta-university-arbitrum-ideathon/img-01.jpg",
    images: buildEventImages("kenyatta-university-arbitrum-ideathon", 3),
  },
  {
    title: "Nakuru ENS Meetup",
    location: "Nakuru",
    year: "2024",
    cover: "/cryptogalxyimages/nakuru-ens-meetup/img-01.jpeg",
    images: buildEventImages("nakuru-ens-meetup", 2, "jpeg"),
  },
  {
    title: "Sarit Arbitrum Workshop",
    location: "Nairobi",
    year: "2024",
    cover: "/cryptogalxyimages/sarit-arbitrum-workshop/img-01.jpg",
    images: buildEventImages("sarit-arbitrum-workshop", 2),
  },
  {
    title: "Solana Kisumu Meetup",
    location: "Kisumu",
    year: "2024",
    cover: "/cryptogalxyimages/solana-kisumu-meetup/img-01.jpg",
    images: buildEventImages("solana-kisumu-meetup", 2),
  },
  {
    title: "Solana Nairobi Meetup",
    location: "Nairobi",
    year: "2023",
    cover: "/cryptogalxyimages/solana-nairobi-meet-up-2023/img-01.jpg",
    images: buildEventImages("solana-nairobi-meet-up-2023", 3),
  },
  {
    title: "Solana Ruiru Meetup",
    location: "Ruiru",
    year: "2024",
    cover: "/cryptogalxyimages/solana-ruiru-meetup/img-01.jpg",
    images: buildEventImages("solana-ruiru-meetup", 2),
  },
  {
    title: "TUK Arbitrum Campus Tour",
    location: "Nairobi",
    year: "2024",
    cover: "/cryptogalxyimages/tuk-arbitrum-campus-tour/img-01.jpg",
    images: buildEventImages("tuk-arbitrum-campus-tour", 2),
  },
  {
    title: "Zetech Campus Tour",
    location: "Ruiru",
    year: "2024",
    cover: "/cryptogalxyimages/zetech-campus-tour/img-01.jpg",
    images: buildEventImages("zetech-campus-tour", 3),
  },
]

const orbitNodes = [
  { label: "Nairobi", top: "8%", left: "44%" },
  { label: "Kisumu", top: "34%", left: "12%" },
  { label: "Mombasa", top: "68%", left: "68%" },
  { label: "Eldoret", top: "58%", left: "20%" },
  { label: "Nakuru", top: "30%", left: "72%" },
]

const firstGlanceShots = [
  {
    title: "Arbitrum Nairobi Happy Hour",
    src: "/cryptogalxyimages/arbitrum-nairobi-happy-hour/img-01.jpg",
  },
  {
    title: "Kenyatta University Ideathon",
    src: "/cryptogalxyimages/kenyatta-university-arbitrum-ideathon/img-01.jpg",
  },
  {
    title: "ENS Mombasa Meetup",
    src: "/cryptogalxyimages/ens-mombasa-meetup/img-01.jpg",
  },
  {
    title: "Base x Web3Club Meetup",
    src: "/cryptogalxyimages/base-x-web3club-meetup/img-01.jpg",
  },
  {
    title: "TUK Campus Tour",
    src: "/cryptogalxyimages/tuk-arbitrum-campus-tour/img-01.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="container mx-auto space-y-16 px-4 pb-20">
      <ParallaxHero
        eyebrow="CryptoGalaxy Community"
        title="Exploring the Crypto Cosmos"
        subtitle="Decoding Bitcoin & Beyond"
        ctaLabel="Join the Galaxy"
        ctaHref="/community"
      />

      <section className="section-reveal relative z-20 -mt-10 space-y-4 sm:-mt-12">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-violet-200">Past Event Moments</p>
          <Button asChild variant="outline" size="sm" className="border-white/20 bg-black/30 text-slate-100 hover:bg-white/10">
            <Link href="/events">Open Gallery</Link>
          </Button>
        </div>

        <div className="grid auto-rows-[120px] grid-cols-2 gap-3 md:auto-rows-[160px] md:grid-cols-4">
          {firstGlanceShots.map((shot, idx) => (
            <Link
              key={shot.title}
              href="/events"
              className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/70 ${
                idx === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="line-clamp-2 text-xs font-medium text-white sm:text-sm">{shot.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-reveal grid gap-4 md:grid-cols-3">
        {signalMetrics.map((metric, idx) => (
          <Card key={metric.label} className={`galaxy-card section-reveal stagger-${idx + 1} overflow-hidden`}>
            <CardHeader className="relative">
              <div className="pointer-events-none absolute -right-12 -top-16 h-28 w-28 rounded-full bg-violet-400/20 blur-2xl" />
              <CardDescription className="text-slate-300">{metric.label}</CardDescription>
              <CardTitle className="text-3xl text-white">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-violet-200">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="section-reveal">
        <Card className="hero-shell overflow-hidden border-white/10 bg-gradient-to-br from-violet-950/60 via-slate-950 to-indigo-950/60">
          <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            <div className="space-y-4">
              <Badge className="w-fit border border-violet-300/30 bg-violet-500/15 text-violet-100">Galaxy Network Map</Badge>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">From Nairobi to the Chain</h2>
              <p className="text-slate-300">
                CryptoGalaxy connects campuses, creators, and communities through workshops, meetups, and practical
                Web3 projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="border border-indigo-300/30 bg-indigo-500/15 text-indigo-100">Workshops</Badge>
                <Badge className="border border-fuchsia-300/30 bg-fuchsia-500/15 text-fuchsia-100">Events</Badge>
                <Badge className="border border-violet-300/30 bg-violet-500/15 text-violet-100">Community</Badge>
              </div>
              <Button asChild className="btn-glow w-fit bg-violet-500 text-white hover:bg-violet-400">
                <Link href="/about">
                  Explore Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative min-h-[300px]">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/30" />
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/25" />
              <div className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/25" />
              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-[spin_24s_linear_infinite]" />

              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-300/50 bg-violet-500/20">
                <Orbit className="h-7 w-7 text-violet-100" />
              </div>

              {orbitNodes.map((node, idx) => (
                <div key={node.label} className="absolute" style={{ top: node.top, left: node.left }}>
                  <div className={`section-reveal stagger-${(idx % 6) + 1} rounded-full border border-white/20 bg-slate-900/90 px-3 py-1 text-xs text-slate-100`}>
                    {node.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="section-reveal space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <CalendarDays className="h-5 w-5 text-violet-300" />
            Upcoming Events
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
              <Link href="/events">View All Events</Link>
            </Button>
            <Button asChild className="btn-glow bg-violet-500 text-white hover:bg-violet-400">
              <Link href={cryptoGalaxyLumaUrl} target="_blank" rel="noopener noreferrer">
                Event Hub on Luma
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {upcomingEvents.map((event, idx) => (
            <Card key={event.title} className={`galaxy-card section-reveal stagger-${idx + 1} overflow-hidden`}>
              <CardHeader className="space-y-3">
                <Badge className="w-fit border border-violet-300/25 bg-violet-500/15 text-violet-100">{event.tag}</Badge>
                <CardTitle className="text-white">{event.title}</CardTitle>
                <CardDescription className="text-violet-200">{event.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-300">{event.description}</p>
                <Button asChild variant="outline" className="w-full border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
                  <Link href={cryptoGalaxyLumaUrl} target="_blank" rel="noopener noreferrer">
                    View on Luma
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <PastEventsArchive events={pastEventHighlights} />

      <section className="section-reveal space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <Radio className="h-5 w-5 text-violet-300" />
            Recent X Posts
          </h2>
          <Button asChild variant="outline" className="btn-glow border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
            <Link href={cryptoGalaxyXUrl} target="_blank" rel="noopener noreferrer">
              Visit X
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cryptoGalaxyThreadSamples.map((thread, idx) => (
            <Card key={thread.id} className={`galaxy-card section-reveal stagger-${(idx % 3) + 1} border-white/10 bg-slate-950/60`}>
              <CardHeader>
                <CardTitle className="text-white">{thread.title}</CardTitle>
                <CardDescription className="text-slate-300">{thread.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <XPostEmbed url={thread.url} height={430} mobileHeight={350} />
                <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
                  <Link href={thread.url} target="_blank" rel="noopener noreferrer">
                    Open Thread on X
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-reveal">
        <Card className="hero-shell overflow-hidden border-white/10 bg-gradient-to-r from-violet-950/70 via-indigo-950/60 to-slate-950">
          <CardContent className="flex flex-col items-center justify-between gap-6 p-8 text-center md:flex-row md:text-left">
            <div className="space-y-3">
              <p className="flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-violet-200 md:justify-start">
                <MapPinned className="h-4 w-4" />
                Kenyan Web3 Community
              </p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Build With the Next Generation of African Crypto Talent</h3>
              <p className="max-w-2xl text-sm text-slate-300">
                Join events and connect with builders shaping the future of blockchain in Kenya.
              </p>
            </div>
            <Button asChild className="btn-glow bg-violet-500 text-white hover:bg-violet-400">
              <Link href="/community">
                Join the Galaxy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
