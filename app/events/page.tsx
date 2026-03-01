"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { CalendarRange, Filter } from "lucide-react"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { getEventSuggestions, submitEventSuggestion } from "@/lib/cryptogalaxy-api"
import { cryptoGalaxyEvents, type PublicEventSuggestion } from "@/lib/cryptogalaxy-data"
import { getRegisteredEventIds, saveRegisteredEventIds } from "@/lib/cryptogalaxy-storage"

type EventFilter = "upcoming" | "past"

type SuggestionForm = {
  name: string
  email: string
  title: string
  idea: string
  preferredDate: string
}

const DEFAULT_FORM: SuggestionForm = {
  name: "",
  email: "",
  title: "",
  idea: "",
  preferredDate: "",
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getStartOfToday() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

function isUpcoming(dateIso: string) {
  const today = getStartOfToday()
  const eventDate = new Date(`${dateIso}T00:00:00`)
  return eventDate >= today
}

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat("en-KE", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateIso}T00:00:00`))
}

function formatDateTime(dateIso: string) {
  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateIso))
}

export default function EventsPage() {
  const { toast } = useToast()
  const [filter, setFilter] = useState<EventFilter>("upcoming")
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<PublicEventSuggestion[]>([])
  const [form, setForm] = useState<SuggestionForm>(DEFAULT_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof SuggestionForm, string>>>({})

  useEffect(() => {
    setRegisteredEventIds(getRegisteredEventIds())

    let active = true

    getEventSuggestions()
      .then((items) => {
        if (!active) return
        setSuggestions(items)
      })
      .catch((error) => {
        console.error(error)
        if (!active) return
        toast({
          title: "Could not load suggestions",
          description: "Please refresh and try again.",
          variant: "destructive",
        })
      })

    return () => {
      active = false
    }
  }, [toast])

  const filteredEvents = useMemo(() => {
    const today = getStartOfToday()

    return cryptoGalaxyEvents
      .filter((event) => {
        const eventDate = new Date(`${event.date}T00:00:00`)
        return filter === "upcoming" ? eventDate >= today : eventDate < today
      })
      .sort((a, b) => {
        const aDate = new Date(`${a.date}T00:00:00`).getTime()
        const bDate = new Date(`${b.date}T00:00:00`).getTime()
        return filter === "upcoming" ? aDate - bDate : bDate - aDate
      })
  }, [filter])

  const latestSuggestions = useMemo(
    () => suggestions.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 3),
    [suggestions],
  )

  function toggleRegistration(eventId: string, eventTitle: string) {
    const currentlyRegistered = registeredEventIds.includes(eventId)
    const next = currentlyRegistered
      ? registeredEventIds.filter((id) => id !== eventId)
      : [...registeredEventIds, eventId]

    setRegisteredEventIds(next)
    saveRegisteredEventIds(next)

    toast({
      title: currentlyRegistered ? "Registration removed" : "You are registered",
      description: currentlyRegistered
        ? `You are no longer registered for ${eventTitle}.`
        : `${eventTitle} has been added to your event list.`,
    })
  }

  function validateForm(input: SuggestionForm) {
    const nextErrors: Partial<Record<keyof SuggestionForm, string>> = {}

    if (!input.name.trim()) nextErrors.name = "Name is required"
    if (!input.email.trim()) nextErrors.email = "Email is required"
    else if (!EMAIL_REGEX.test(input.email.trim())) nextErrors.email = "Enter a valid email"

    if (!input.title.trim()) nextErrors.title = "Event title is required"
    if (!input.idea.trim()) nextErrors.idea = "Please share your event idea"

    return nextErrors
  }

  async function handleSuggestionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast({
        title: "Please fix the form",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      })
      return
    }

    try {
      const entry = await submitEventSuggestion({
        name: form.name.trim(),
        email: form.email.trim(),
        title: form.title.trim(),
        idea: form.idea.trim(),
        preferredDate: form.preferredDate || undefined,
      })

      setSuggestions((prev) => [entry, ...prev])
      setForm(DEFAULT_FORM)
      setErrors({})

      toast({
        title: "Suggestion submitted",
        description: "Thanks. We will review your idea and get back to you.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto space-y-12 px-4 pb-20">
      <ParallaxHero
        eyebrow="CryptoGalaxy Events"
        title="Workshops, Meetups, and Web3 Experiences"
        subtitle="Discover blockchain events across universities and communities in Kenya."
      />

      <section className="section-reveal space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
            <CalendarRange className="h-5 w-5 text-violet-300" />
            Events
          </h2>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 p-1">
            <Filter className="ml-2 h-4 w-4 text-slate-400" />
            <Button
              size="sm"
              variant={filter === "upcoming" ? "default" : "ghost"}
              onClick={() => setFilter("upcoming")}
              className={filter === "upcoming" ? "bg-violet-500 text-white hover:bg-violet-400" : "text-slate-300"}
            >
              Upcoming
            </Button>
            <Button
              size="sm"
              variant={filter === "past" ? "default" : "ghost"}
              onClick={() => setFilter("past")}
              className={filter === "past" ? "bg-violet-500 text-white hover:bg-violet-400" : "text-slate-300"}
            >
              Past
            </Button>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="galaxy-card">
            <CardContent className="p-6 text-sm text-slate-300">No events in this category yet.</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((eventItem, idx) => {
              const upcoming = isUpcoming(eventItem.date)
              const registered = registeredEventIds.includes(eventItem.id)

              return (
                <Card key={eventItem.id} className={`galaxy-card section-reveal stagger-${(idx % 4) + 1}`}>
                  <CardHeader>
                    <CardTitle className="text-white">{eventItem.title}</CardTitle>
                    <CardDescription className="text-violet-200">{formatDate(eventItem.date)}</CardDescription>
                    <CardDescription className="text-slate-400">{eventItem.venue}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-300">{eventItem.description}</p>
                    <Button
                      onClick={() => toggleRegistration(eventItem.id, eventItem.title)}
                      className={
                        registered
                          ? "w-full border border-violet-300/40 bg-violet-500/20 text-violet-100 hover:bg-violet-500/30"
                          : "btn-glow w-full bg-violet-500 text-white hover:bg-violet-400"
                      }
                    >
                      {upcoming ? (registered ? "Registered" : "Register") : registered ? "Saved" : "Save Event"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      <section className="section-reveal">
        <Card className="galaxy-card">
          <CardHeader>
            <CardTitle className="text-white">Suggest an Event</CardTitle>
            <CardDescription className="text-slate-300">
              Want CryptoGalaxy at your campus or community hub? Share your idea with us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSuggestionSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="event-suggestion-name" className="text-slate-200">
                  Name
                </Label>
                <Input
                  id="event-suggestion-name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your name"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
                {errors.name ? <p className="text-xs text-rose-300">{errors.name}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-suggestion-email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="event-suggestion-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
                {errors.email ? <p className="text-xs text-rose-300">{errors.email}</p> : null}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="event-suggestion-title" className="text-slate-200">
                  Event Title
                </Label>
                <Input
                  id="event-suggestion-title"
                  value={form.title}
                  onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Example: Intro to Smart Contracts"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
                {errors.title ? <p className="text-xs text-rose-300">{errors.title}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-suggestion-date" className="text-slate-200">
                  Preferred Date (Optional)
                </Label>
                <Input
                  id="event-suggestion-date"
                  type="date"
                  value={form.preferredDate}
                  onChange={(event) => setForm((prev) => ({ ...prev, preferredDate: event.target.value }))}
                  className="border-white/20 bg-white/5 text-white"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="event-suggestion-idea" className="text-slate-200">
                  Event Idea
                </Label>
                <Textarea
                  id="event-suggestion-idea"
                  value={form.idea}
                  onChange={(event) => setForm((prev) => ({ ...prev, idea: event.target.value }))}
                  placeholder="Describe the workshop, meetup, or university event you would like us to host."
                  className="min-h-28 border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
                {errors.idea ? <p className="text-xs text-rose-300">{errors.idea}</p> : null}
              </div>

              <Button type="submit" className="btn-glow bg-violet-500 text-white hover:bg-violet-400 md:col-span-2 md:w-fit">
                Submit Suggestion
              </Button>
            </form>

            {latestSuggestions.length > 0 ? (
              <div className="space-y-3 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-violet-200">Recent Suggestions</p>
                <div className="grid gap-3">
                  {latestSuggestions.map((item) => (
                    <div key={item.id} className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.name} • {formatDateTime(item.createdAt)}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{item.idea}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
