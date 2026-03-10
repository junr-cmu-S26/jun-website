import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Comment } from '@/lib/models'

export async function GET() {
  try {
    await dbConnect()
    const comments = await Comment.find({})
      .sort({ pinned: -1, createdAt: -1 })
      .limit(20)
    return NextResponse.json({ success: true, data: comments })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json({ success: false, error: 'Name and message are required' }, { status: 400 })
    }

    const comment = await Comment.create({ name: name.trim(), message: message.trim() })
    return NextResponse.json({ success: true, data: comment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create comment' }, { status: 500 })
  }
}
