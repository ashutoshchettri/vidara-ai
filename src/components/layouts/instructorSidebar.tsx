'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  GitBranch,
  HelpCircle,
  LogOut,
  Brain,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StudentSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeItem: string
}

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/instructor-dashboard' },
  { name: 'Course', icon: BookOpen, href: '/instructor-dashboard/courses' },
]

export default function InstructorSidebar({ sidebarOpen, setSidebarOpen, activeItem }: StudentSidebarProps) {
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) window.location.href = '/sign-in'
      else console.error('Logout failed')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <>
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
              const isActive = activeItem === item.name
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={() => setSidebarOpen(false)} // close sidebar on mobile after click
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
    </>
  )
}
