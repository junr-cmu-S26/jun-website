import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Question } from '@/lib/models'

export async function GET() {
  try {
    await dbConnect()
    const questions = await Question.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(10)
    return NextResponse.json({ success: true, data: questions })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()
    const { name, question } = body

    if (!name || !question) {
      return NextResponse.json({ success: false, error: 'Name and question are required' }, { status: 400 })
    }

    const q = await Question.create({ name: name.trim(), question: question.trim() })
    return NextResponse.json({ success: true, data: q }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to submit question' }, { status: 500 })
  }
}
