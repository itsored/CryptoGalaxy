"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { Mail, MessageCircle, Send } from "lucide-react"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { cryptoGalaxyXUrl, type ContactMessage } from "@/lib/cryptogalaxy-data"
import { submitContactMessage } from "@/lib/cryptogalaxy-api"

type ContactForm = {
  name: string
  email: string
  message: string
}

const faqs = [
  {
    question: "How to get involved?",
    answer: "Join our community form, attend an event, and follow our updates on social channels.",
  },
  {
    question: "Do I need crypto experience before joining?",
    answer: "No. Our sessions are beginner-friendly and open to participants at any level.",
  },
  {
    question: "Can CryptoGalaxy host events at my university?",
    answer: "Yes. Use our contact form or events suggestion form and share your campus details.",
  },
]

const socials = [
  { label: "X", href: cryptoGalaxyXUrl },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  message: "",
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso))
}

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM)
  const [history, setHistory] = useState<ContactMessage[]>([])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Name, email, and message are all required.",
        variant: "destructive",
      })
      return
    }

    if (!EMAIL_REGEX.test(form.email.trim())) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    try {
      const entry = await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })

      const next: ContactMessage[] = [
        {
          id: entry.id,
          name: entry.name,
          email: form.email.trim(),
          message: entry.message,
          createdAt: entry.createdAt,
        },
        ...history,
      ]

      setHistory(next)
      setForm(EMPTY_FORM)

      toast({
        title: "Message sent",
        description: "Thanks for reaching out. We usually respond within 24-48 hours.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Message failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  const latestMessage = history[0]

  return (
    <div className="container mx-auto space-y-12 px-4 pb-20">
      <ParallaxHero
        eyebrow="Contact CryptoGalaxy"
        title="Reach the Community Team"
        subtitle="Ask questions, collaborate on events, or partner with us on blockchain initiatives."
      />

      <div className="section-reveal grid gap-6 lg:grid-cols-2">
        <Card className="galaxy-card section-reveal stagger-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Mail className="h-5 w-5 text-violet-300" />
              Contact Form
            </CardTitle>
            <CardDescription className="text-slate-300">We usually respond within 24-48 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-slate-200">
                  Name
                </Label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your name"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-slate-200">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  placeholder="Tell us what you need help with..."
                  className="min-h-28 border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <Button type="submit" className="btn-glow bg-violet-500 text-white hover:bg-violet-400">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>

            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
              Total messages sent this session: <span className="font-semibold text-violet-200">{history.length}</span>
              {latestMessage ? <div className="mt-1 text-slate-400">Latest: {formatDateTime(latestMessage.createdAt)}</div> : null}
            </div>
          </CardContent>
        </Card>

        <Card className="galaxy-card section-reveal stagger-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageCircle className="h-5 w-5 text-violet-300" />
              X Profile
            </CardTitle>
            <CardDescription className="text-slate-300">Connect with CryptoGalaxy on X.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 transition duration-200 hover:-translate-y-[1px] hover:border-violet-400/60 hover:text-violet-200"
              >
                {social.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="galaxy-card section-reveal stagger-3">
        <CardHeader>
          <CardTitle className="text-white">FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-white/10">
                <AccordionTrigger className="text-left text-slate-100">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
