'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopBar from '@/components/layouts/studentTopBar'
import { Filter, Grid, List } from 'lucide-react'

type Course = {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  createdAt: string
  updatedAt: string
  instructor: {
    name: string
  }
}

export default function EnrolledCoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    async function fetchEnrolledCourses() {
      try {
        const res = await fetch('/api/enrolled-courses')
        if (!res.ok) throw new Error('Failed to fetch enrolled courses')
        const data = await res.json()
        setCourses(data)
      } catch {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }
    fetchEnrolledCourses()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="Enrolled Courses"
      />

      <div className="flex-1 flex flex-col lg:ml-64">
        <StudentTopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">My Enrolled Courses</h1>

          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {loading && <p className="text-slate-600">Loading enrolled courses...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && courses.length === 0 && <p>No courses enrolled yet.</p>}

          {!loading && courses.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {courses.map(course => (
                <Link key={course.id} href={`/student-dashboard/course/${course.id}`} passHref legacyBehavior>
                  <a>
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer">
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative h-48">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4">
                              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm uppercase font-semibold">
                                {course.category}
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{course.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{course.description}</p>
                            <p className="text-sm text-slate-500">Instructor: {course.instructor.name}</p>
                          </CardContent>
                        </>
                      ) : (
                        <CardContent className="p-6 flex items-center space-x-4">
                          <img src={course.thumbnail} alt={course.title} className="w-20 h-20 object-cover rounded-lg" />
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                            <p className="text-sm text-slate-600 mb-2">{course.description}</p>
                            <p className="text-sm text-slate-500">Instructor: {course.instructor.name}</p>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
