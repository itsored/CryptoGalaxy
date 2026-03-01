import { Flag, Rocket } from "lucide-react"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const focusAreas = ["Events", "Community Building", "Partnerships"]

const milestones = [
  { year: "2023", title: "CryptoGalaxy Launched", detail: "Started with small Web3 meetups in Nairobi." },
  { year: "2024", title: "Participated in OKX Campus Tour", detail: "Hosted university sessions and onboarding events." },
  { year: "2025", title: "Expanded Workshop Network", detail: "Ran multi-campus blockchain workshops across Kenya." },
  { year: "2026", title: "Regional Web3 Partnerships", detail: "Collaborating with Africa-focused builders and communities." },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 pb-20">
      <ParallaxHero
        eyebrow="About CryptoGalaxy"
        title="Building Africa's Web3 Community Galaxy"
        subtitle="A Kenyan-based crypto community connecting students, professionals, and builders through practical blockchain events."
      />

      <div className="section-reveal grid gap-6 lg:grid-cols-1">
        <Card className="galaxy-card section-reveal stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Flag className="h-5 w-5 text-violet-300" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            CryptoGalaxy exists to grow Web3 participation in Africa through practical, community-driven activities.
            We connect people to Bitcoin, blockchain, and decentralized technology through workshops, events, and
            collaboration.
          </CardContent>
        </Card>
      </div>

      <Card className="galaxy-card section-reveal stagger-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Rocket className="h-5 w-5 text-violet-300" />
            Key Focus Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {focusAreas.map((item) => (
            <Badge key={item} className="bg-violet-500/20 text-violet-100 hover:bg-violet-500/30">
              {item}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card className="galaxy-card section-reveal stagger-3">
        <CardHeader>
          <CardTitle className="text-white">Community Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {milestones.map((milestone, idx) => (
              <li
                key={milestone.year + milestone.title}
                className={`section-reveal stagger-${(idx % 4) + 1} relative rounded-lg border border-white/10 bg-slate-950/60 p-4`}
              >
                <p className="text-xs uppercase tracking-wide text-violet-300">{milestone.year}</p>
                <p className="mt-1 font-medium text-white">{milestone.title}</p>
                <p className="mt-1 text-sm text-slate-300">{milestone.detail}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
