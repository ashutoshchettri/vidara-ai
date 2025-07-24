import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/getAuthUser'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await getAuthUser()

  if (!user || user.role !== 'STUDENT') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: user.id,
        courseId: params.id,
      },
    },
  })

  if (!enrollment) {
    return NextResponse.json({ message: 'Not Enrolled' }, { status: 403 })
  }

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    select: { content: true },
  })

  return NextResponse.json(course)
}
