import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const notes = await prisma.quickNote.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: notes })
  } catch (error) {
    console.error('Notes GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, priority } = body

    if (!text || !text.trim()) {
      return NextResponse.json({ success: false, error: 'Note text cannot be empty' }, { status: 400 })
    }

    const note = await prisma.quickNote.create({
      data: {
        text: text.trim(),
        priority: priority || 'normal',
      },
    })

    return NextResponse.json({ success: true, data: note }, { status: 201 })
  } catch (error) {
    console.error('Notes POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create note' }, { status: 500 })
  }
}
