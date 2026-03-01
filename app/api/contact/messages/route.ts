import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { type ContactMessage } from "@/lib/cryptogalaxy-data"
import { getDb } from "@/lib/mongodb"

type ContactMessageDoc = ContactMessage

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COLLECTION = "contact_messages"

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const name = typeof payload?.name === "string" ? payload.name.trim() : ""
    const email = typeof payload?.email === "string" ? payload.email.trim() : ""
    const message = typeof payload?.message === "string" ? payload.message.trim() : ""

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const entry: ContactMessageDoc = {
      id: `contact-message-${randomUUID()}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    }

    const db = await getDb()
    await db.collection<ContactMessageDoc>(COLLECTION).insertOne(entry)

    return NextResponse.json(
      {
        entry: {
          id: entry.id,
          name: entry.name,
          message: entry.message,
          createdAt: entry.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Failed to save contact message:", error)
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
