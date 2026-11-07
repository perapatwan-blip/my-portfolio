import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const updated = await prisma.certification.update({
      where: { id },
      data: {
        titleTh: body.titleTh,
        titleEn: body.titleEn,
        issuerTh: body.issuerTh,
        issuerEn: body.issuerEn,
        issueDate: body.issueDate,
        credentialId: body.credentialId,
        pdfUrl: body.pdfUrl,
        verifyUrl: body.verifyUrl,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Certification PUT error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update certification' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.certification.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Certification deleted' })
  } catch (error) {
    console.error('Certification DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete certification' }, { status: 500 })
  }
}
