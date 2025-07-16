'use client';

import { useState } from 'react';
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
  Clock,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoutinesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Routines');
  const [selectedDay, setSelectedDay] = useState('today');

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
    { name: 'Courses', icon: BookOpen, href: '/student-dashboard/course' },
    { name: 'Assignments', icon: FileText, href: '/student-dashboard/assignments' },
    { name: 'Routines', icon: Calendar, href: '/student-dashboard/routines' },
    { name: 'Mindmap', icon: GitBranch, href: '/student-dashboard/mindmap' },
    { name: 'Quiz', icon: HelpCircle, href: '/student-dashboard/quiz' },
  ];

  const routines = [
    {
      id: 1,
      title: "Morning Study Session",
      description: "Focus on React fundamentals and practice coding",
      time: "09:00 AM",
      duration: "2 hours",
      status: "active",
      color: "bg-blue-500",
      tasks: [
        "Review React components",
        "Complete coding exercises",
        "Watch tutorial videos"
      ]
    },
    {
      id: 2,
      title: "JavaScript Practice",
      description: "Work on advanced JavaScript concepts",
      time: "02:00 PM",
      duration: "1.5 hours",
      status: "completed",
      color: "bg-green-500",
      tasks: [
        "ES6+ features practice",
        "Async/await exercises",
        "Code review"
      ]
    },
    {
      id: 3,
      title: "Algorithm Study",
      description: "Data structures and algorithms practice",
      time: "07:00 PM",
      duration: "1 hour",
      status: "upcoming",
      color: "bg-purple-500",
      tasks: [
        "Binary search implementation",
        "Time complexity analysis",
        "Practice problems"
      ]
    },
    {
      id: 4,
      title: "Assignment Work",
      description: "Complete pending assignments",
      time: "08:30 PM",
      duration: "1 hour",
      status: "upcoming",
      color: "bg-orange-500",
      tasks: [
        "React component assignment",
        "Database design project",
        "Code documentation"
      ]
    }
  ];

  const weeklySchedule = {
    Monday: [
      { time: "09:00", title: "React Fundamentals", duration: "2h", color: "bg-blue-500" },
      { time: "14:00", title: "JavaScript Practice", duration: "1.5h", color: "bg-green-500" },
      { time: "19:00", title: "Algorithm Study", duration: "1h", color: "bg-purple-500" }
    ],
    Tuesday: [
      { time: "10:00", title: "Database Design", duration: "2h", color: "bg-indigo-500" },
      { time: "15:00", title: "Node.js Backend", duration: "1.5h", color: "bg-yellow-500" },
      { time: "20:00", title: "Assignment Work", duration: "1h", color: "bg-orange-500" }
    ],
    Wednesday: [
      { time: "09:00", title: "UI/UX Design", duration: "2h", color: "bg-pink-500" },
      { time: "14:00", title: "React Advanced", duration: "1.5h", color: "bg-blue-500" },
      { time: "19:00", title: "Code Review", duration: "1h", color: "bg-gray-500" }
    ],
    Thursday: [
      { time: "10:00", title: "JavaScript Advanced", duration: "2h", color: "bg-green-500" },
      { time: "15:00", title: "Algorithm Practice", duration: "1.5h", color: "bg-purple-500" },
      { time: "20:00", title: "Project Work", duration: "1h", color: "bg-red-500" }
    ],
    Friday: [
      { time: "09:00", title: "Full Stack Review", duration: "2h", color: "bg-teal-500" },
      { time: "14:00", title: "Testing & Debugging", duration: "1.5h", color: "bg-cyan-500" },
      { time: "19:00", title: "Weekend Planning", duration: "30m", color: "bg-slate-500" }
    ]
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-orange-100 text-orange-700';
      case 'paused': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'completed': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-4 border-b border-slate-200/50">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Vidara
            </span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                  activeItem === item.name
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  activeItem === item.name ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                }`} />
                <span className="font-medium">{item.name}</span>
                {activeItem === item.name && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </a>
            ))}
          </nav>

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
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search routines..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

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

        {/* Routines Content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Routines</h1>
              <p className="text-slate-600">
                Organize your learning schedule with AI-optimized study routines.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              New Routine
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Routines */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      Today's Schedule
                    </div>
                    <div className="flex items-center space-x-2">
                      {['today', 'tomorrow', 'week'].map((period) => (
                        <Button
                          key={period}
                          variant={selectedDay === period ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedDay(period)}
                          className="capitalize"
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {routines.map((routine) => (
                    <div key={routine.id} className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className={`w-4 h-4 ${routine.color} rounded-full mr-4`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">{routine.title}</h4>
                          <Badge className={getStatusColor(routine.status)}>
                            {getStatusIcon(routine.status)}
                            <span className="ml-1 capitalize">{routine.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{routine.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {routine.time}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {routine.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {routine.status === 'active' ? (
                          <Button size="sm" variant="outline">
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : routine.status === 'upcoming' ? (
                          <Button size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Today's Progress</h3>
                    <div className="text-4xl font-bold mb-2">75%</div>
                    <p className="text-blue-100 text-sm">3 of 4 routines completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Study Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">🔥 7</div>
                    <p className="text-sm text-slate-600">Days in a row</p>
                    <p className="text-xs text-slate-500 mt-2">Keep it up! You're doing great.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Next Up</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3" />
                      <div>
                        <p className="text-sm font-medium">Algorithm Study</p>
                        <p className="text-xs text-slate-500">in 2 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3" />
                      <div>
                        <p className="text-sm font-medium">Assignment Work</p>
                        <p className="text-xs text-slate-500">in 3.5 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Weekly Schedule */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(weeklySchedule).map(([day, schedule]) => (
                  <div key={day} className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-center pb-2 border-b border-slate-200">
                      {day}
                    </h4>
                    <div className="space-y-2">
                      {schedule.map((item, index) => (
                        <div key={index} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center mb-1">
                            <div className={`w-2 h-2 ${item.color} rounded-full mr-2`} />
                            <span className="text-xs font-medium text-slate-600">{item.time}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}