import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

type CommunityJoinDoc = {
  id: string
  name: string
  email: string
  interests: string
  createdAt: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COLLECTION = "community_joins"

export async function GET() {
  try {
    const db = await getDb()
    const count = await db.collection<CommunityJoinDoc>(COLLECTION).countDocuments()
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Failed to fetch community join count:", error)
    return NextResponse.json({ error: "Failed to fetch join count." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const name = typeof payload?.name === "string" ? payload.name.trim() : ""
    const email = typeof payload?.email === "string" ? payload.email.trim() : ""
    const interests = typeof payload?.interests === "string" ? payload.interests.trim() : ""

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const submission: CommunityJoinDoc = {
      id: `community-join-${randomUUID()}`,
      name,
      email,
      interests,
      createdAt: new Date().toISOString(),
    }

    const db = await getDb()
    await db.collection<CommunityJoinDoc>(COLLECTION).insertOne(submission)

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
  } catch (error) {
    console.error("Failed to save community join:", error)
    return NextResponse.json({ error: "Failed to submit join request." }, { status: 500 })
  }
}
