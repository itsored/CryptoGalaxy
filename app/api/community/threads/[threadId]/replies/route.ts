import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { type ForumReply, type ForumThread } from "@/lib/cryptogalaxy-data"
import { getDb } from "@/lib/mongodb"

type ForumThreadDoc = ForumThread

const COLLECTION = "community_threads"

export async function POST(request: Request, context: { params: { threadId: string } }) {
  try {
    const threadId = context.params.threadId
    if (!threadId) {
      return NextResponse.json({ error: "Thread id is required." }, { status: 400 })
    }

    const payload = await request.json()

    const author = typeof payload?.author === "string" ? payload.author.trim() : ""
    const message = typeof payload?.message === "string" ? payload.message.trim() : ""

    if (!author || !message) {
      return NextResponse.json({ error: "Reply author and message are required." }, { status: 400 })
    }

    const reply: ForumReply = {
      id: `forum-reply-${randomUUID()}`,
      author,
      message,
      createdAt: new Date().toISOString(),
    }

    const db = await getDb()
    const collection = db.collection<ForumThreadDoc>(COLLECTION)

    const updateResult = await collection.updateOne({ id: threadId }, { $push: { replies: reply } })
    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Thread not found." }, { status: 404 })
    }

    const updatedThread = await collection.findOne({ id: threadId }, { projection: { _id: 0 } })
    return NextResponse.json({ thread: updatedThread })
  } catch (error) {
    console.error("Failed to create forum reply:", error)
    return NextResponse.json({ error: "Failed to submit reply." }, { status: 500 })
  }
}
