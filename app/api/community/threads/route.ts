import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { forumThreadsSeed, type ForumThread } from "@/lib/cryptogalaxy-data"
import { getDb } from "@/lib/mongodb"

type ForumThreadDoc = ForumThread

const COLLECTION = "community_threads"

export async function GET() {
  try {
    const db = await getDb()
    const collection = db.collection<ForumThreadDoc>(COLLECTION)

    const count = await collection.countDocuments()
    if (count === 0) {
      await collection.insertMany(forumThreadsSeed)
    }

    const threads = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ threads })
  } catch (error) {
    console.error("Failed to fetch forum threads:", error)
    return NextResponse.json({ error: "Failed to fetch threads." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const author = typeof payload?.author === "string" ? payload.author.trim() : ""
    const message = typeof payload?.message === "string" ? payload.message.trim() : ""

    if (!author || !message) {
      return NextResponse.json({ error: "Author and message are required." }, { status: 400 })
    }

    const thread: ForumThreadDoc = {
      id: `forum-thread-${randomUUID()}`,
      author,
      message,
      createdAt: new Date().toISOString(),
      replies: [],
    }

    const db = await getDb()
    await db.collection<ForumThreadDoc>(COLLECTION).insertOne(thread)

    return NextResponse.json({ thread }, { status: 201 })
  } catch (error) {
    console.error("Failed to create forum thread:", error)
    return NextResponse.json({ error: "Failed to create thread." }, { status: 500 })
  }
}
