import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 })

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })

  return response
}
