import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const updated = await prisma.project.update({
      where: { id },
      data: {
        titleTh: body.titleTh,
        titleEn: body.titleEn,
        category: body.category,
        tags: body.tags,
        descriptionTh: body.descriptionTh,
        descriptionEn: body.descriptionEn,
        imageUrl: body.imageUrl,
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        featured: body.featured,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Project PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    console.error('Project DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 })
  }
}
