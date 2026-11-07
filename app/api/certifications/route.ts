import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const certs = await prisma.certification.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: certs })
  } catch (error) {
    console.error('Certifications GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch certifications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { titleTh, titleEn, issuerTh, issuerEn, issueDate, credentialId, pdfUrl, verifyUrl } = body

    if (!titleTh || !issuerTh) {
      return NextResponse.json({ success: false, error: 'Title and Issuer are required' }, { status: 400 })
    }

    const cert = await prisma.certification.create({
      data: {
        titleTh,
        titleEn: titleEn || titleTh,
        issuerTh,
        issuerEn: issuerEn || issuerTh,
        issueDate: issueDate || '2026',
        credentialId: credentialId || '',
        pdfUrl: pdfUrl || '',
        verifyUrl: verifyUrl || '',
      },
    })

    return NextResponse.json({ success: true, data: cert }, { status: 201 })
  } catch (error) {
    console.error('Certifications POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create certification' }, { status: 500 })
  }
}
