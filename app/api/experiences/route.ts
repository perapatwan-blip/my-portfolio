import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: experiences })
  } catch (error) {
    console.error('Experiences GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { roleTh, roleEn, companyTh, companyEn, tag, duration, bulletsTh, bulletsEn, skills } = body

    if (!roleTh || !companyTh) {
      return NextResponse.json({ success: false, error: 'Role and Company are required' }, { status: 400 })
    }

    const experience = await prisma.experience.create({
      data: {
        roleTh,
        roleEn: roleEn || roleTh,
        companyTh,
        companyEn: companyEn || companyTh,
        tag: tag || 'Practical Experience',
        duration: duration || '2026',
        bulletsTh: bulletsTh || '',
        bulletsEn: bulletsEn || bulletsTh || '',
        skills: skills || 'Web Development',
      },
    })

    return NextResponse.json({ success: true, data: experience }, { status: 201 })
  } catch (error) {
    console.error('Experiences POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create experience' }, { status: 500 })
  }
}
