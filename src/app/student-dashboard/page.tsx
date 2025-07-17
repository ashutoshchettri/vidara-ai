'use client'

import { useState } from 'react'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopbar from '@/components/layouts/studentTopBar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trophy, TimerReset, Zap } from 'lucide-react'

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
              <p className="text-slate-600">Complete 2 quizzes and review 1 lecture.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TimerReset className="text-orange-500" />
                Assignments Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">2 assignments are due this week.</p>
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
              <p className="text-slate-600">You’ve completed 65% of your enrolled courses.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
