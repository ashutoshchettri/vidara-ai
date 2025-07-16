import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import EnrollButton from './EnrollButton'

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/sign-in')

  const courseId = params.id

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  })

  if (!course) {
    return <p className="text-center mt-10">Course not found.</p>
  }

  let enrolled = false

  if (session.user.role === 'STUDENT') {
  const studentId = session.user.id

  if (!studentId) {
    throw new Error('Student ID missing from session.')
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
  })

  enrolled = !!enrollment
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-muted-foreground text-sm mb-4">Category: {course.category}</p>
      <p className="mb-6">{course.description}</p>
      <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor?.name}</p>

      {session.user.role === 'STUDENT' && (
        <EnrollButton courseId={course.id} enrolled={enrolled} />
      )}
    </div>
  )
}

