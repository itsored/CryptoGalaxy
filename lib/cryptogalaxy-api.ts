import type { ForumThread, PublicEventSuggestion } from "@/lib/cryptogalaxy-data"

type CommunityJoinPayload = {
  name: string
  email: string
  interests: string
}

type ForumThreadPayload = {
  author: string
  message: string
}

type ForumReplyPayload = {
  author: string
  message: string
}

type EventSuggestionPayload = {
  name: string
  email: string
  title: string
  idea: string
  preferredDate?: string
}

type ContactMessagePayload = {
  name: string
  email: string
  message: string
}

type ContactEntryResponse = {
  id: string
  name: string
  message: string
  createdAt: string
}

async function requestJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)

  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" && payload !== null && "error" in payload && typeof payload.error === "string"
        ? payload.error
        : "Request failed."

    throw new Error(errorMessage)
  }

  return payload as T
}

export async function getCommunityJoinCount() {
  const data = await requestJson<{ count: number }>("/api/community/joins", {
    method: "GET",
    cache: "no-store",
  })

  return data.count
}

export async function submitCommunityJoin(payload: CommunityJoinPayload) {
  await requestJson<{ success: boolean }>("/api/community/joins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
}

export async function getForumThreads() {
  const data = await requestJson<{ threads: ForumThread[] }>("/api/community/threads", {
    method: "GET",
    cache: "no-store",
  })

  return data.threads
}

export async function submitForumThread(payload: ForumThreadPayload) {
  const data = await requestJson<{ thread: ForumThread }>("/api/community/threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.thread
}

export async function submitForumReply(threadId: string, payload: ForumReplyPayload) {
  const data = await requestJson<{ thread: ForumThread }>(`/api/community/threads/${threadId}/replies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.thread
}

export async function getEventSuggestions() {
  const data = await requestJson<{ suggestions: PublicEventSuggestion[] }>("/api/events/suggestions", {
    method: "GET",
    cache: "no-store",
  })

  return data.suggestions
}

export async function submitEventSuggestion(payload: EventSuggestionPayload) {
  const data = await requestJson<{ suggestion: PublicEventSuggestion }>("/api/events/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.suggestion
}

export async function submitContactMessage(payload: ContactMessagePayload) {
  const data = await requestJson<{ entry: ContactEntryResponse }>("/api/contact/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return data.entry
}
