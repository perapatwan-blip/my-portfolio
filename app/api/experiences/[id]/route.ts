import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        roleTh: body.roleTh,
        roleEn: body.roleEn,
        companyTh: body.companyTh,
        companyEn: body.companyEn,
        tag: body.tag,
        duration: body.duration,
        bulletsTh: body.bulletsTh,
        bulletsEn: body.bulletsEn,
        skills: body.skills,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Experience PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.experience.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Experience deleted' })
  } catch (error) {
    console.error('Experience DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete experience' }, { status: 500 })
  }
}
