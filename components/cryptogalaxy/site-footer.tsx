"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { cryptoGalaxyXUrl } from "@/lib/cryptogalaxy-data"

const socialLinks = [
  { label: "X", href: cryptoGalaxyXUrl },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SiteFooter() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!EMAIL_REGEX.test(email.trim())) {
      toast({
        title: "Invalid email",
        description: "Enter a valid email address to subscribe.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Subscribed",
      description: "You have been added to the CryptoGalaxy newsletter list.",
    })
    setEmail("")
  }

  return (
    <footer className="section-reveal relative z-10 border-t border-white/10 bg-slate-950/80">
      <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <Image
            src="/cryptogalaxy-logo-cropped.jpg"
            alt="CryptoGalaxy logo"
            width={340}
            height={220}
            className="h-14 w-auto rounded-md opacity-95"
          />
          <p className="text-sm text-slate-300">
            A Kenyan-based crypto community focused on education, workshops, and Web3 events across Africa.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-200">Social</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-slate-200 transition duration-200 hover:-translate-y-[1px] hover:border-violet-400/60 hover:text-violet-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-200">Newsletter</p>
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubscribe}>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
            />
            <Button type="submit" className="btn-glow w-full bg-violet-500 text-white hover:bg-violet-400 sm:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} CryptoGalaxy. All rights reserved.
      </div>
    </footer>
  )
}
