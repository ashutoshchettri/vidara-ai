'use client'

import { useState, useEffect } from 'react'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopbar from '@/components/layouts/studentTopBar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy, Zap, Lightbulb } from 'lucide-react'
import Link from 'next/link' // Import Link for navigation

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    studyPlan: { count: 0, message: 'Loading...' },
    enrolledCourses: { count: 0, message: 'Loading...' },
    progress: { percentage: 0, message: 'Loading...' },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        const [routinesRes, enrolledCoursesRes] = await Promise.all([
          fetch('/api/routines'),
          fetch('/api/enrolled-courses'),
        ])

        if (!routinesRes.ok || !enrolledCoursesRes.ok) throw new Error('Failed to fetch data')

        const routines = await routinesRes.json()
        const enrolledCourses = await enrolledCoursesRes.json()

        // Process Study Plan from routines (count total routines)
        const routinesCount = routines.length
        const studyMessage = routinesCount > 0
          ? `${routinesCount} routine${routinesCount === 1 ? '' : 's'} scheduled.`
          : 'No routines scheduled.'

        // Process Enrolled Courses
        const coursesCount = enrolledCourses.length
        const coursesMessage = coursesCount > 0
          ? 'courses enrolled.'
          : 'No courses enrolled yet.'

        // Process Progress Overview from enrolledCourses (assume completed status)
        const totalCourses = enrolledCourses.length
        const completedCourses = enrolledCourses.filter(course => course.completed).length
        const progressPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0
        const progressMessage = totalCourses > 0 ? 'of your enrolled courses' : 'No courses enrolled.'

        setDashboardData({
          studyPlan: { count: routinesCount, message: studyMessage },
          enrolledCourses: { count: coursesCount, message: coursesMessage },
          progress: { percentage: progressPercentage, message: progressMessage },
        })
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) return <div className="p-6 text-center text-slate-600">Loading dashboard...</div>
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="Dashboard"
      />
      <div className="lg:ml-64">
        <StudentTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Study Plan Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-blue-500" />
                  Today’s Study Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{dashboardData.studyPlan.message}</p>
              </CardContent>
            </Card>

            {/* Enrolled Courses Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="text-green-600" />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {dashboardData.enrolledCourses.count} {dashboardData.enrolledCourses.message}
                </p>
              </CardContent>
            </Card>

            {/* Progress Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="text-green-600" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  You’ve completed {dashboardData.progress.percentage}% {dashboardData.progress.message}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Learning Tips Section */}
          <Card className="mt-6 col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-yellow-500" />
                Learning Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">• Break your study sessions into 25-minute chunks with 5-minute breaks (Pomodoro Technique).</p>
              <p className="text-slate-600">• Review your notes daily to reinforce learning.</p>
              <p className="text-slate-600">• Stay hydrated and take short walks to boost focus.</p>
            </CardContent>
          </Card>

          {/* Quick Actions Section with Navigation */}
          <Card className="mt-6 col-span-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-blue-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/student-dashboard/course" passHref>
                <Button className="h-16 bg-blue-100 text-blue-700 hover:bg-blue-200 w-full block text-center">Start a Course</Button>
              </Link>
              <Link href="/student-dashboard/routines" passHref>
                <Button className="h-16 bg-green-100 text-green-700 hover:bg-green-200 w-full block text-center">View Routine</Button>
              </Link>
              <Link href="/student-dashboard/quiz" passHref>
                <Button className="h-16 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 w-full block text-center">Take Quiz</Button>
              </Link>
              <Link href="/student-dashboard/mindmap" passHref>
                <Button className="h-16 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 w-full block text-center">Create mindmap</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

// Assuming Button is a custom component
const Button = ({ className, children, ...props }) => (
  <button className={`rounded-lg font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
)