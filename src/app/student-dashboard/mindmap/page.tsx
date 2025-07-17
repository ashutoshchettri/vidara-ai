'use client';

import { useState } from 'react';
import { Plus, Share, Download, Edit, Trash2, Eye, GitBranch, Brain, Zap } from 'lucide-react';
import StudentSidebar from '@/components/layouts/studentSidebar';
import StudentTopbar from '@/components/layouts/studentTopBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MindmapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Mindmap');

  const mindmaps = [
    {
      id: 1,
      title: "React Component Lifecycle",
      course: "React Fundamentals",
      lastModified: "2 hours ago",
      nodes: 24,
      connections: 18,
      color: "from-blue-500 to-blue-600",
      status: "active",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features",
      course: "JavaScript Advanced",
      lastModified: "1 day ago",
      nodes: 32,
      connections: 28,
      color: "from-green-500 to-green-600",
      status: "completed",
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Data Structures Overview",
      course: "Data Structures & Algorithms",
      lastModified: "3 days ago",
      nodes: 45,
      connections: 38,
      color: "from-purple-500 to-purple-600",
      status: "completed",
      thumbnail: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Node.js Architecture",
      course: "Node.js Backend",
      lastModified: "5 days ago",
      nodes: 18,
      connections: 15,
      color: "from-orange-500 to-orange-600",
      status: "draft",
      thumbnail: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "Database Relationships",
      course: "Database Design",
      lastModified: "1 week ago",
      nodes: 28,
      connections: 22,
      color: "from-indigo-500 to-indigo-600",
      status: "active",
      thumbnail: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      title: "UI Design Principles",
      course: "UI/UX Design",
      lastModified: "1 week ago",
      nodes: 22,
      connections: 19,
      color: "from-pink-500 to-pink-600",
      status: "active",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const aiSuggestions = [
    {
      title: "Add Error Handling",
      description: "Consider adding error handling patterns to your React mindmap",
      type: "enhancement",
      mindmapId: 1
    },
    {
      title: "Connect Async Concepts",
      description: "Link promises and async/await in your JavaScript mindmap",
      type: "connection",
      mindmapId: 2
    },
    {
      title: "Expand Algorithm Complexity",
      description: "Add time and space complexity analysis to data structures",
      type: "expansion",
      mindmapId: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'enhancement': return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'connection': return <GitBranch className="w-4 h-4 text-blue-600" />;
      case 'expansion': return <Plus className="w-4 h-4 text-green-600" />;
      default: return <Brain className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
      />

      <div className="lg:ml-64">
        <StudentTopbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Mind Maps</h1>
              <p className="text-slate-600">
                Visualize your learning with AI-enhanced mind mapping tools.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Mindmap
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mindmaps.map((mindmap) => (
                  <Card key={mindmap.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden group">
                    <div className="relative h-32">
                      <img 
                        src={mindmap.thumbnail} 
                        alt={mindmap.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${mindmap.color} opacity-80`} />
                      <div className="absolute top-3 right-3">
                        <Badge className={getStatusColor(mindmap.status)}>
                          {mindmap.status}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{mindmap.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{mindmap.course}</p>
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <span>{mindmap.nodes} nodes</span>
                          <span>{mindmap.connections} links</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{mindmap.lastModified}</span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="p-1">
                            <Share className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-1">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="p-1 text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Suggestions Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getSuggestionIcon(suggestion.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-slate-600 mt-1">{suggestion.description}</p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
