import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let social = await prisma.socialConfig.findUnique({
      where: { id: 'default' },
    })

    if (!social) {
      social = await prisma.socialConfig.create({
        data: {
          id: 'default',
          logoLink: '#overview',
          igUrl: 'https://instagram.com/p.perapat_',
          igLabel: '@p.perapat_',
          fbUrl: 'https://www.facebook.com/anuwat.rungsin',
          fbLabel: 'Perapat Wanna',
          lineUrl: 'https://line.me/ti/p/~0631568992',
          lineLabel: '0631568992',
          githubUrl: 'https://github.com/perapat-w',
          linkedinUrl: 'https://linkedin.com/in/perapat-wanna',
          phone: '063-156-8992',
          email: 'perapat.wan@spu.ac.th',
        },
      })
    }

    return NextResponse.json({ success: true, data: social })
  } catch (error) {
    console.error('Social GET error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch social config' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const social = await prisma.socialConfig.upsert({
      where: { id: 'default' },
      update: {
        logoLink: body.logoLink,
        igUrl: body.igUrl,
        igLabel: body.igLabel,
        fbUrl: body.fbUrl,
        fbLabel: body.fbLabel,
        lineUrl: body.lineUrl,
        lineLabel: body.lineLabel,
        githubUrl: body.githubUrl,
        linkedinUrl: body.linkedinUrl,
        phone: body.phone,
        email: body.email,
      },
      create: {
        id: 'default',
        logoLink: body.logoLink || '#overview',
        igUrl: body.igUrl || 'https://instagram.com/p.perapat_',
        igLabel: body.igLabel || '@p.perapat_',
        fbUrl: body.fbUrl || 'https://www.facebook.com/anuwat.rungsin',
        fbLabel: body.fbLabel || 'Perapat Wanna',
        lineUrl: body.lineUrl || 'https://line.me/ti/p/~0631568992',
        lineLabel: body.lineLabel || '0631568992',
        githubUrl: body.githubUrl || 'https://github.com/perapat-w',
        linkedinUrl: body.linkedinUrl || 'https://linkedin.com/in/perapat-wanna',
        phone: body.phone || '063-156-8992',
        email: body.email || 'perapat.wan@spu.ac.th',
      },
    })

    return NextResponse.json({ success: true, data: social })
  } catch (error) {
    console.error('Social POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update social config' }, { status: 500 })
  }
}
