'use client'

import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  FileText,
  Calendar,
  GitBranch,
  HelpCircle,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Brain,
  ChevronRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type Course = {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  instructor?: {
    name: string
    email: string
  }
}

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [error, setError] = useState('')

  const pathname = usePathname()

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
    { name: 'Courses', icon: BookOpen, href: '/student-dashboard/course' },
    { name: 'Assignments', icon: FileText, href: '/student-dashboard/assignments' },
    { name: 'Routines', icon: Calendar, href: '/student-dashboard/routines' },
    { name: 'Mindmap', icon: GitBranch, href: '/student-dashboard/mindmap' },
    { name: 'Quiz', icon: HelpCircle, href: '/student-dashboard/quiz' },
  ]

  useEffect(() => {
    fetch('/api/courses/all')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => setError('Failed to fetch courses'))
  }, [])

  useEffect(() => {
    async function protectRoute() {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      if (!session?.user) {
        window.location.href = '/sign-in'
      }
    }
    protectRoute()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (res.ok) {
        window.location.href = '/sign-in'
      } else {
        console.error('Logout failed')
      }
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-slate-200/50">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Vidara
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-200/50">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, assignments..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Profile and Notifications */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-slate-900">Sarah Chen</p>
                  <p className="text-xs text-slate-500">Computer Science</p>
                </div>
                <Avatar className="w-10 h-10 border-2 border-blue-200">
                  <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    SC
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content comes here, you've already added it before */}
        {/* Example welcome text */}
        <main className="p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-slate-600 mb-4">
            Your AI learning companion has prepared today's personalized study plan.
          </p>
          {/* ...rest of your dashboard content */}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
