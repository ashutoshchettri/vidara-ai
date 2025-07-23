import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { courseId } = await req.json()

  if (!courseId) {
    return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
  }

  try {
    const alreadyEnrolled = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: session.user.id!,
          courseId,
        },
      },
    })

    if (alreadyEnrolled) {
      return NextResponse.json({ message: 'Already enrolled' }, { status: 200 })
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: session.user.id!,
        courseId,
      },
    })

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
