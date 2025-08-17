import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/getAuthUser'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthUser("STUDENT") // ✅ explicitly require student role
    const userId = session.user.id

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: userId,
          courseId: params.id,
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json({ message: 'Not Enrolled' }, { status: 403 })
    }

    const course = await prisma.course.findUnique({
      where: { id: params.id },
      select: { curriculum: true }, // ✅ curriculum, not content
    })

    if (!course) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ curriculum: course.curriculum })
  } catch (error) {
    console.error('Error fetching course content:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
