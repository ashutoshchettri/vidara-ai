'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function StudentTopbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (val: boolean) => void
}) {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    async function getSession() {
      const res = await fetch('/api/auth/session')
      const session = await res.json()
      if (session?.user) {
        setUser({
          name: session.user.name || 'Student',
          role: session.user.role || 'Student',
        })
      }
    }
    getSession()
  }, [])

  return (
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
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Profile Info with Avatar only */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.name ?? 'Student'}</p>
            <p className="text-xs text-slate-500">{user?.role ?? 'Student'}</p>
          </div>
          <Avatar className="w-10 h-10 border border-blue-300">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
              {user?.name?.[0] ?? 'S'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
