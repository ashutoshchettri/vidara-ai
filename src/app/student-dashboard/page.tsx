'use client'

import { useState, useEffect } from 'react'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopbar from '@/components/layouts/studentTopBar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy, Zap } from 'lucide-react'

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
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </main>
      </div>
    </div>
  )
}