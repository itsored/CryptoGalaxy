"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import Link from "next/link"
import { ExternalLink, MessageCircleMore } from "lucide-react"
import { ParallaxHero } from "@/components/cryptogalaxy/parallax-hero"
import { XPostEmbed } from "@/components/cryptogalaxy/x-post-embed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  getCommunityJoinCount,
  getForumThreads,
  submitCommunityJoin,
  submitForumReply,
  submitForumThread,
} from "@/lib/cryptogalaxy-api"
import {
  cryptoGalaxyThreadSamples,
  cryptoGalaxyXHandle,
  cryptoGalaxyXUrl,
  type ForumThread,
} from "@/lib/cryptogalaxy-data"

type JoinForm = {
  name: string
  email: string
  interests: string
}

type ThreadForm = {
  author: string
  message: string
}

type ReplyDraft = {
  author: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_JOIN_FORM: JoinForm = {
  name: "",
  email: "",
  interests: "",
}

const EMPTY_THREAD_FORM: ThreadForm = {
  author: "",
  message: "",
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso))
}

export default function CommunityPage() {
  const { toast } = useToast()
  const [joinForm, setJoinForm] = useState<JoinForm>(EMPTY_JOIN_FORM)
  const [threadForm, setThreadForm] = useState<ThreadForm>(EMPTY_THREAD_FORM)
  const [joinCount, setJoinCount] = useState(0)
  const [threads, setThreads] = useState<ForumThread[]>([])
  const [replyDrafts, setReplyDrafts] = useState<Record<string, ReplyDraft>>({})

  useEffect(() => {
    let active = true

    Promise.all([getCommunityJoinCount(), getForumThreads()])
      .then(([count, threadItems]) => {
        if (!active) return
        setJoinCount(count)
        setThreads(threadItems)
      })
      .catch((error) => {
        console.error(error)
        if (!active) return
        toast({
          title: "Could not load community data",
          description: "Please refresh and try again.",
          variant: "destructive",
        })
      })

    return () => {
      active = false
    }
  }, [toast])

  const memberCount = useMemo(() => 2000 + joinCount, [joinCount])

  const sortedThreads = useMemo(
    () => threads.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [threads],
  )

  async function handleJoinSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!joinForm.name.trim() || !joinForm.email.trim()) {
      toast({
        title: "Missing fields",
        description: "Name and email are required.",
        variant: "destructive",
      })
      return
    }

    if (!EMAIL_REGEX.test(joinForm.email.trim())) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      })
      return
    }

    try {
      await submitCommunityJoin({
        name: joinForm.name.trim(),
        email: joinForm.email.trim(),
        interests: joinForm.interests.trim(),
      })

      setJoinCount((prev) => prev + 1)
      setJoinForm(EMPTY_JOIN_FORM)

      toast({
        title: "Welcome to CryptoGalaxy",
        description: "Your request has been received. We will reach out soon.",
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

  async function handleThreadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!threadForm.author.trim() || !threadForm.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Author and thread message are required.",
        variant: "destructive",
      })
      return
    }

    try {
      const thread = await submitForumThread({
        author: threadForm.author.trim(),
        message: threadForm.message.trim(),
      })

      setThreads((prev) => [thread, ...prev])
      setThreadForm(EMPTY_THREAD_FORM)

      toast({
        title: "Thread posted",
        description: "Your discussion thread is now live.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Thread failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  async function handleReplySubmit(event: FormEvent<HTMLFormElement>, threadId: string) {
    event.preventDefault()

    const draft = replyDrafts[threadId]
    if (!draft?.author?.trim() || !draft?.message?.trim()) {
      toast({
        title: "Missing fields",
        description: "Reply author and message are required.",
        variant: "destructive",
      })
      return
    }

    try {
      const updatedThread = await submitForumReply(threadId, {
        author: draft.author.trim(),
        message: draft.message.trim(),
      })

      setThreads((prev) => prev.map((thread) => (thread.id === updatedThread.id ? updatedThread : thread)))
      setReplyDrafts((prev) => ({ ...prev, [threadId]: { author: "", message: "" } }))

      toast({
        title: "Reply added",
        description: "Your comment was posted.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Reply failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto space-y-12 px-4 pb-20">
      <ParallaxHero
        eyebrow="CryptoGalaxy Community"
        title="Join the Builders Network"
        subtitle="Connect with members across Kenya who are collaborating and building in Web3."
      />

      <section className="section-reveal grid gap-6 lg:grid-cols-2">
        <Card className="galaxy-card section-reveal stagger-1">
          <CardHeader>
            <CardTitle className="text-white">Join Us</CardTitle>
            <CardDescription className="text-slate-300">
              Share your details and become part of the CryptoGalaxy network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleJoinSubmit}>
              <div className="space-y-2">
                <Label htmlFor="community-name" className="text-slate-200">
                  Name
                </Label>
                <Input
                  id="community-name"
                  value={joinForm.name}
                  onChange={(event) => setJoinForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Your full name"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="community-email" className="text-slate-200">
                  Email
                </Label>
                <Input
                  id="community-email"
                  type="email"
                  value={joinForm.email}
                  onChange={(event) => setJoinForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@example.com"
                  className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="community-interests" className="text-slate-200">
                  Interests (Optional)
                </Label>
                <Textarea
                  id="community-interests"
                  value={joinForm.interests}
                  onChange={(event) => setJoinForm((prev) => ({ ...prev, interests: event.target.value }))}
                  placeholder="Bitcoin, smart contracts, trading safety, developer tooling..."
                  className="min-h-24 border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                />
              </div>
              <Button type="submit" className="btn-glow bg-violet-500 text-white hover:bg-violet-400">
                Submit
              </Button>
            </form>

            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300">
              Community size: <span className="font-semibold text-violet-200">{memberCount}+</span>
            </div>
          </CardContent>
        </Card>

        <Card className="galaxy-dashed-card section-reveal stagger-2">
          <CardHeader>
            <CardTitle className="text-white">Live X Feed</CardTitle>
            <CardDescription className="text-slate-300">
              Track CryptoGalaxy updates, event recaps, and threads directly in-app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <XPostEmbed url={cryptoGalaxyThreadSamples[0].url} height={420} mobileHeight={340} />
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
              <Link href={cryptoGalaxyXUrl} target="_blank" rel="noopener noreferrer">
                Open X Feed
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="section-reveal space-y-5">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
          <MessageCircleMore className="h-5 w-5 text-violet-300" />
          Discussion Forum
        </h2>

        <Card className="galaxy-card">
          <CardHeader>
            <CardTitle className="text-white">Start a Discussion</CardTitle>
            <CardDescription className="text-slate-300">Share a question or idea with the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 md:grid-cols-[220px_1fr_auto]" onSubmit={handleThreadSubmit}>
              <Input
                value={threadForm.author}
                onChange={(event) => setThreadForm((prev) => ({ ...prev, author: event.target.value }))}
                placeholder="Your name"
                className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
              />
              <Input
                value={threadForm.message}
                onChange={(event) => setThreadForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="What do you want to discuss?"
                className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
              />
              <Button type="submit" className="btn-glow bg-violet-500 text-white hover:bg-violet-400">
                Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {sortedThreads.map((thread, idx) => {
            const draft = replyDrafts[thread.id] ?? { author: "", message: "" }

            return (
              <Card key={thread.id} className={`galaxy-card section-reveal stagger-${(idx % 4) + 1}`}>
                <CardHeader>
                  <CardTitle className="text-base text-white">{thread.author}</CardTitle>
                  <CardDescription className="text-slate-300">{thread.message}</CardDescription>
                  <CardDescription className="text-xs text-violet-200">{formatDateTime(thread.createdAt)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {thread.replies.map((reply) => (
                    <div key={reply.id} className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-violet-200">{reply.author}</p>
                        <p className="text-[11px] text-slate-400">{formatDateTime(reply.createdAt)}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{reply.message}</p>
                    </div>
                  ))}

                  <form className="grid gap-2 md:grid-cols-[200px_1fr_auto]" onSubmit={(event) => handleReplySubmit(event, thread.id)}>
                    <Input
                      value={draft.author}
                      onChange={(event) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [thread.id]: { ...draft, author: event.target.value },
                        }))
                      }
                      placeholder="Reply as"
                      className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    />
                    <Input
                      value={draft.message}
                      onChange={(event) =>
                        setReplyDrafts((prev) => ({
                          ...prev,
                          [thread.id]: { ...draft, message: event.target.value },
                        }))
                      }
                      placeholder="Write a reply"
                      className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    />
                    <Button type="submit" variant="outline" className="border-white/20 bg-transparent text-slate-100 hover:bg-white/10">
                      Reply
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
