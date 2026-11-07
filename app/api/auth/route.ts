import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()
    const validPin = process.env.ADMIN_PIN || 'spu2026'

    if (pin === validPin) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        message: 'Admin access granted',
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          error: 'รหัสผ่าน PIN ไม่ถูกต้อง (Invalid PIN)',
        },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
