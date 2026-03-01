import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { type EventSuggestion, type PublicEventSuggestion } from "@/lib/cryptogalaxy-data"
import { getDb } from "@/lib/mongodb"

type EventSuggestionDoc = EventSuggestion

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COLLECTION = "event_suggestions"

function toPublicSuggestion(item: EventSuggestionDoc): PublicEventSuggestion {
  return {
    id: item.id,
    name: item.name,
    title: item.title,
    idea: item.idea,
    preferredDate: item.preferredDate,
    createdAt: item.createdAt,
  }
}

export async function GET() {
  try {
    const db = await getDb()
    const suggestions = await db
      .collection<EventSuggestionDoc>(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json({
      suggestions: suggestions.map(toPublicSuggestion),
    })
  } catch (error) {
    console.error("Failed to fetch event suggestions:", error)
    return NextResponse.json({ error: "Failed to fetch suggestions." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const name = typeof payload?.name === "string" ? payload.name.trim() : ""
    const email = typeof payload?.email === "string" ? payload.email.trim() : ""
    const title = typeof payload?.title === "string" ? payload.title.trim() : ""
    const idea = typeof payload?.idea === "string" ? payload.idea.trim() : ""
    const preferredDateRaw = typeof payload?.preferredDate === "string" ? payload.preferredDate.trim() : ""
    const preferredDate = preferredDateRaw || undefined

    if (!name || !email || !title || !idea) {
      return NextResponse.json({ error: "Name, email, title, and idea are required." }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const entry: EventSuggestionDoc = {
      id: `event-suggestion-${randomUUID()}`,
      name,
      email,
      title,
      idea,
      preferredDate,
      createdAt: new Date().toISOString(),
    }

    const db = await getDb()
    await db.collection<EventSuggestionDoc>(COLLECTION).insertOne(entry)

    return NextResponse.json({ suggestion: toPublicSuggestion(entry) }, { status: 201 })
  } catch (error) {
    console.error("Failed to save event suggestion:", error)
    return NextResponse.json({ error: "Failed to submit suggestion." }, { status: 500 })
  }
}
