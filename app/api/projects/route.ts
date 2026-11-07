import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category && category !== 'all' ? { category } : {}
    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Projects GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      titleTh,
      titleEn,
      category,
      tags,
      descriptionTh,
      descriptionEn,
      imageUrl,
      demoUrl,
      githubUrl,
      featured,
    } = body

    if (!titleTh || !titleEn || !category) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        titleTh,
        titleEn,
        category,
        tags: tags || 'Next.js, TypeScript',
        descriptionTh: descriptionTh || '',
        descriptionEn: descriptionEn || '',
        imageUrl: imageUrl || '',
        demoUrl: demoUrl || '',
        githubUrl: githubUrl || '',
        featured: featured ?? true,
      },
    })

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Projects POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 })
  }
}
