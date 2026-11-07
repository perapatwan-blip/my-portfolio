import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.quickNote.delete({
      where: { id },
    })
    return NextResponse.json({ success: true, message: 'Note deleted' })
  } catch (error) {
    console.error('Note DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 })
  }
}
