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
  AlertCircle,
  CheckCircle,
  Upload,
  Download,
  Eye,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssignmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Assignments');
  const [filterStatus, setFilterStatus] = useState('all');

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
    { name: 'Courses', icon: BookOpen, href: '/student-dashboard/course' },
    { name: 'Assignments', icon: FileText, href: '/student-dashboard/assignments' },
    { name: 'Routines', icon: Calendar, href: '/student-dashboard/routines' },
    { name: 'Mindmap', icon: GitBranch, href: '/student-dashboard/mindmap' },
    { name: 'Quiz', icon: HelpCircle, href: '/student-dashboard/quiz' },
  ];

  const assignments = [
    {
      id: 1,
      title: "React Component Architecture",
      course: "React Fundamentals",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high",
      description: "Build a complex React application demonstrating component composition and state management.",
      points: 100,
      submitted: false,
      timeLeft: "2 days"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      course: "JavaScript Advanced",
      dueDate: "2024-01-28",
      status: "in-progress",
      priority: "medium",
      description: "Implement modern JavaScript features including async/await, destructuring, and modules.",
      points: 85,
      submitted: false,
      timeLeft: "5 days"
    },
    {
      id: 3,
      title: "Binary Search Tree Implementation",
      course: "Data Structures",
      dueDate: "2024-01-20",
      status: "submitted",
      priority: "high",
      description: "Implement a complete binary search tree with insertion, deletion, and traversal methods.",
      points: 120,
      submitted: true,
      grade: 95,
      timeLeft: "Submitted"
    },
    {
      id: 4,
      title: "REST API Development",
      course: "Node.js Backend",
      dueDate: "2024-02-02",
      status: "pending",
      priority: "medium",
      description: "Create a RESTful API with authentication, CRUD operations, and error handling.",
      points: 110,
      submitted: false,
      timeLeft: "10 days"
    },
    {
      id: 5,
      title: "Database Schema Design",
      course: "Database Design",
      dueDate: "2024-01-30",
      status: "overdue",
      priority: "high",
      description: "Design a normalized database schema for an e-commerce application.",
      points: 90,
      submitted: false,
      timeLeft: "Overdue"
    },
    {
      id: 6,
      title: "User Interface Mockups",
      course: "UI/UX Design",
      dueDate: "2024-01-22",
      status: "graded",
      priority: "low",
      description: "Create high-fidelity mockups for a mobile application interface.",
      points: 75,
      submitted: true,
      grade: 88,
      timeLeft: "Graded"
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus === 'all') return true;
    return assignment.status === filterStatus;
  });

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'submitted': return 'bg-green-100 text-green-700';
      case 'graded': return 'bg-purple-100 text-purple-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <FileText className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
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
                  placeholder="Search assignments..."
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

        {/* Assignments Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Assignments</h1>
            <p className="text-slate-600">
              Manage your assignments and track submission deadlines.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total</p>
                    <p className="text-3xl font-bold">{assignments.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pending</p>
                    <p className="text-3xl font-bold">{assignments.filter(a => a.status === 'pending').length}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Submitted</p>
                    <p className="text-3xl font-bold">{assignments.filter(a => a.submitted).length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Overdue</p>
                    <p className="text-3xl font-bold">{assignments.filter(a => a.status === 'overdue').length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Assignments</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                        <Badge className={getStatusColor(assignment.status)}>
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1 capitalize">{assignment.status.replace('-', ' ')}</span>
                        </Badge>
                        <Badge className={getPriorityColor(assignment.priority)}>
                          {assignment.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{assignment.course}</p>
                      <p className="text-slate-700 mb-3">{assignment.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {assignment.timeLeft}
                        </div>
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {assignment.points} points
                        </div>
                        {assignment.grade && (
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                            Grade: {assignment.grade}%
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {assignment.status === 'pending' || assignment.status === 'in-progress' ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm">
                            <Upload className="w-4 h-4 mr-1" />
                            Submit
                          </Button>
                        </>
                      ) : assignment.status === 'submitted' || assignment.status === 'graded' ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Overdue
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {assignment.status === 'overdue' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                        <span className="text-sm text-red-700">
                          This assignment is overdue. Please submit as soon as possible.
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
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