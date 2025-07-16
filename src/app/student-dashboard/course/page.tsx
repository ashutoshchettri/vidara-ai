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
  Play,
  Clock,
  Users,
  Star,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CoursesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Courses');
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
    { name: 'Courses', icon: BookOpen, href: '/student-dashboard/courses' },
    { name: 'Assignments', icon: FileText, href: '/student-dashboard/assignments' },
    { name: 'Routines', icon: Calendar, href: '/student-dashboard/routines' },
    { name: 'Mindmap', icon: GitBranch, href: '/student-dashboard/mindmap' },
    { name: 'Quiz', icon: HelpCircle, href: '/student-dashboard/quiz' },
  ];

  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      duration: "8 weeks",
      students: 1234,
      rating: 4.8,
      status: "active",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Master the fundamentals of React including components, state, and props."
    },
    {
      id: 2,
      title: "JavaScript Advanced Concepts",
      instructor: "Prof. Michael Chen",
      progress: 45,
      duration: "10 weeks",
      students: 892,
      rating: 4.9,
      status: "active",
      image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Deep dive into advanced JavaScript concepts and modern ES6+ features."
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      instructor: "Dr. Emily Rodriguez",
      progress: 100,
      duration: "12 weeks",
      students: 2156,
      rating: 4.7,
      status: "completed",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Comprehensive course on data structures and algorithmic problem solving."
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      instructor: "James Wilson",
      progress: 0,
      duration: "6 weeks",
      students: 567,
      rating: 4.6,
      status: "upcoming",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Build scalable backend applications with Node.js and Express."
    },
    {
      id: 5,
      title: "Database Design & SQL",
      instructor: "Dr. Lisa Park",
      progress: 30,
      duration: "8 weeks",
      students: 743,
      rating: 4.8,
      status: "active",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Learn database design principles and master SQL queries."
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      instructor: "Anna Thompson",
      progress: 60,
      duration: "7 weeks",
      students: 1089,
      rating: 4.9,
      status: "active",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Master the principles of user interface and user experience design."
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (filterStatus === 'all') return true;
    return course.status === filterStatus;
  });

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
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
                  placeholder="Search courses..."
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

        {/* Courses Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Courses</h1>
            <p className="text-slate-600">
              Continue your learning journey with AI-personalized course recommendations.
            </p>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Courses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Courses Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden">
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative h-48">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </div>
                      {course.status === 'active' && (
                        <Button 
                          size="sm" 
                          className="absolute bottom-4 right-4 bg-white/90 text-slate-900 hover:bg-white"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Continue
                        </Button>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{course.description}</p>
                        <p className="text-sm text-slate-500">by {course.instructor}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {course.rating}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{course.description}</p>
                        <p className="text-sm text-slate-500 mb-3">by {course.instructor}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.students.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {course.rating}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">{course.progress}%</div>
                              <div className="w-24 bg-slate-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                            {course.status === 'active' && (
                              <Button size="sm">
                                <Play className="w-4 h-4 mr-1" />
                                Continue
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
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