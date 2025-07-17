'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopBar from '@/components/layouts/studentTopBar'
import {
  Filter,
  Grid,
  List,
} from 'lucide-react'

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

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/courses/all')
        if (!res.ok) throw new Error('Failed to fetch courses')
        const data = await res.json()
        setCourses(data)
      } catch {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Filter courses by category (or show all)
  const filteredCourses = filterCategory === 'all'
    ? courses
    : courses.filter(course => course.category === filterCategory)

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(courses.map(c => c.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="Course"
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar */}
        <StudentTopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Courses</h1>

          {/* Filters and View Mode */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Loading & Error */}
          {loading && <p className="text-slate-600">Loading courses...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && filteredCourses.length === 0 && (
            <p className="text-slate-600">No courses found in this category.</p>
          )}

          {/* Courses Grid or List */}
          {!loading && !error && filteredCourses.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredCourses.map(course => (
                <Link key={course.id} href={`/student-dashboard/course/${course.id}`} passHref legacyBehavior>
                  <a>
                    <Card
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden cursor-pointer"
                    >
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative h-48">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm uppercase font-semibold">
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
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
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
