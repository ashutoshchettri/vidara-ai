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
  CheckCircle,
  XCircle,
  Award,
  Target,
  BarChart3,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Quiz');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/student-dashboard' },
    { name: 'Courses', icon: BookOpen, href: '/student-dashboard/course' },
    { name: 'Assignments', icon: FileText, href: '/student-dashboard/assignments' },
    { name: 'Routines', icon: Calendar, href: '/student-dashboard/routines' },
    { name: 'Mindmap', icon: GitBranch, href: '/student-dashboard/mindmap' },
    { name: 'Quiz', icon: HelpCircle, href: '/student-dashboard/quiz' },
  ];

  const quizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals",
      course: "React Fundamentals",
      questions: 15,
      duration: "20 min",
      difficulty: "Medium",
      status: "available",
      bestScore: null,
      attempts: 0,
      color: "from-blue-500 to-blue-600",
      description: "Test your knowledge of useState, useEffect, and custom hooks"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      course: "JavaScript Advanced",
      questions: 20,
      duration: "25 min",
      difficulty: "Hard",
      status: "completed",
      bestScore: 88,
      attempts: 2,
      color: "from-green-500 to-green-600",
      description: "Arrow functions, destructuring, async/await, and more"
    },
    {
      id: 3,
      title: "Data Structures Basics",
      course: "Data Structures",
      questions: 12,
      duration: "15 min",
      difficulty: "Easy",
      status: "completed",
      bestScore: 95,
      attempts: 1,
      color: "from-purple-500 to-purple-600",
      description: "Arrays, linked lists, stacks, and queues fundamentals"
    },
    {
      id: 4,
      title: "Node.js Core Concepts",
      course: "Node.js Backend",
      questions: 18,
      duration: "30 min",
      difficulty: "Medium",
      status: "locked",
      bestScore: null,
      attempts: 0,
      color: "from-orange-500 to-orange-600",
      description: "Event loop, modules, file system, and HTTP server basics"
    },
    {
      id: 5,
      title: "SQL Query Optimization",
      course: "Database Design",
      questions: 10,
      duration: "15 min",
      difficulty: "Hard",
      status: "available",
      bestScore: 72,
      attempts: 1,
      color: "from-indigo-500 to-indigo-600",
      description: "Indexes, joins, subqueries, and performance tuning"
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      course: "UI/UX Design",
      questions: 14,
      duration: "20 min",
      difficulty: "Easy",
      status: "available",
      bestScore: null,
      attempts: 0,
      color: "from-pink-500 to-pink-600",
      description: "Color theory, typography, layout, and user experience basics"
    }
  ];

  const recentResults = [
    {
      quiz: "JavaScript ES6+ Features",
      score: 88,
      date: "2 hours ago",
      improvement: "+12%"
    },
    {
      quiz: "Data Structures Basics",
      score: 95,
      date: "1 day ago",
      improvement: "New"
    },
    {
      quiz: "SQL Query Optimization",
      score: 72,
      date: "3 days ago",
      improvement: "+8%"
    }
  ];

  const aiRecommendations = [
    {
      title: "Focus on React Hooks",
      description: "Based on your progress, practice more with useEffect and custom hooks",
      priority: "high",
      quiz: "React Hooks Fundamentals"
    },
    {
      title: "Strengthen JavaScript Basics",
      description: "Review arrow functions and destructuring before advanced topics",
      priority: "medium",
      quiz: "JavaScript ES6+ Features"
    },
    {
      title: "Algorithm Practice",
      description: "Your data structures knowledge is strong, try algorithm challenges",
      priority: "low",
      quiz: "Data Structures Basics"
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    if (selectedCategory === 'all') return true;
    return quiz.status === selectedCategory;
  });

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'locked': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Hard': return 'bg-red-100 text-red-700';
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
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
                  placeholder="Search quizzes..."
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

        {/* Quiz Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Quizzes</h1>
            <p className="text-slate-600">
              Test your understanding with AI-generated quizzes tailored to your learning progress.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Quizzes</p>
                    <p className="text-3xl font-bold">{quizzes.length}</p>
                  </div>
                  <HelpCircle className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Completed</p>
                    <p className="text-3xl font-bold">{quizzes.filter(q => q.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Average Score</p>
                    <p className="text-3xl font-bold">85%</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Study Streak</p>
                    <p className="text-3xl font-bold">7</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Quizzes List */}
            <div className="lg:col-span-3">
              {/* Filter */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm text-slate-600">Filter:</span>
                {['all', 'available', 'completed', 'locked'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-slate-900">{quiz.title}</h3>
                            <Badge className={getStatusColor(quiz.status)}>
                              {quiz.status}
                            </Badge>
                            <Badge className={getDifficultyColor(quiz.difficulty)}>
                              {quiz.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{quiz.course}</p>
                          <p className="text-slate-700 mb-4">{quiz.description}</p>
                          
                          <div className="flex items-center space-x-6 text-sm text-slate-600">
                            <div className="flex items-center">
                              <HelpCircle className="w-4 h-4 mr-1" />
                              {quiz.questions} questions
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {quiz.duration}
                            </div>
                            {quiz.bestScore && (
                              <div className="flex items-center">
                                <Target className="w-4 h-4 mr-1" />
                                Best: <span className={`ml-1 font-medium ${getScoreColor(quiz.bestScore)}`}>{quiz.bestScore}%</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              {quiz.attempts} attempts
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {quiz.status === 'available' ? (
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                              <Play className="w-4 h-4 mr-1" />
                              Start Quiz
                            </Button>
                          ) : quiz.status === 'completed' ? (
                            <Button variant="outline">
                              <Play className="w-4 h-4 mr-1" />
                              Retake
                            </Button>
                          ) : (
                            <Button variant="outline" disabled>
                              <XCircle className="w-4 h-4 mr-1" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Recommendations */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-slate-900 text-sm">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Take Quiz
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Results */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{result.quiz}</p>
                        <p className="text-xs text-slate-500">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getScoreColor(result.score)}`}>{result.score}%</p>
                        <p className="text-xs text-green-600">{result.improvement}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Chart */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <BarChart3 className="w-8 h-8 mx-auto mb-3 text-indigo-200" />
                    <h3 className="font-semibold mb-2">Performance Trend</h3>
                    <div className="text-3xl font-bold mb-2">📈</div>
                    <p className="text-indigo-100 text-sm">
                      Your scores are improving!<br />
                      +15% this week
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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