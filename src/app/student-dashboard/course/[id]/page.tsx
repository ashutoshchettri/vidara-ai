import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import EnrollButton from './EnrollButton'
import {
  BookOpen,
  CheckCircle,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/sign-in')

  const { id: courseId } = await params

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  })

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
          <p className="text-slate-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/student-dashboard/course">Browse Courses</a>
          </Button>
        </Card>
      </div>
    )
  }

  let enrolled = false
  if (session.user.role === 'STUDENT') {
    const studentId = session.user.id
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-10 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Tags */}
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{course.category}</Badge>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Intermediate</Badge>
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Updated recently</Badge>
        </div>

        {/* Title & Description */}
        <h1 className="text-4xl font-bold text-slate-900">{course.title}</h1>
        <p className="text-lg text-slate-700">{course.description}</p>

        {/* Instructor */}
        <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-md p-4 rounded-xl border">
          <Avatar className="w-12 h-12 border">
            <AvatarFallback className="bg-blue-500 text-white">
              {course.instructor?.name?.charAt(0) ?? 'I'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-slate-500">Instructor</p>
            <p className="font-semibold text-slate-900">{course.instructor.name}</p>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img src={course.thumbnail} alt={course.title} className="w-full h-150 object-cover" />
        </div>

        {/* Course Curriculum */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Course Content
            </h3>
            <div className="space-y-3">
              {Array.isArray(course.curriculum) &&
                course.curriculum.map((module: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                          module.completed ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                      >
                        {module.completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <span className="text-white font-medium text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{module.title}</h4>
                        <p className="text-sm text-slate-600">
                          {module.lessons} lessons • {module.duration}
                        </p>
                      </div>
                    </div>

                    {/* Optional outcomes per module */}
                    {module.outcomes && Array.isArray(module.outcomes) && (
                      <ul className="list-disc ml-12 mt-2 text-sm text-slate-700 space-y-1">
                        {module.outcomes.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Enroll Button */}
        {session.user.role === 'STUDENT' && (
          <div className="text-center">
            <EnrollButton courseId={course.id} enrolled={enrolled} />
          </div>
        )}
      </div>
    </div>
  )
}
