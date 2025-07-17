'use client';

import { useState } from 'react';
import Sidebar from '@/components/layouts/studentSidebar';
import Topbar from '@/components/layouts/studentTopBar';
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Pause,
  Play,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StudentSidebar from '@/components/layouts/studentSidebar';
import StudentTopbar from '@/components/layouts/studentTopBar';

export default function RoutinesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Routines');
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow' | 'week'>('today');

  const routines = [
    {
      id: 1,
      title: "Morning Study Session",
      description: "Focus on React fundamentals and practice coding",
      time: "09:00 AM",
      duration: "2 hours",
      status: "active",
      color: "bg-blue-500",
      tasks: ["Review React components", "Complete coding exercises", "Watch tutorial videos"],
    },
    {
      id: 2,
      title: "JavaScript Practice",
      description: "Work on advanced JavaScript concepts",
      time: "02:00 PM",
      duration: "1.5 hours",
      status: "completed",
      color: "bg-green-500",
      tasks: ["ES6+ features practice", "Async/await exercises", "Code review"],
    },
    {
      id: 3,
      title: "Algorithm Study",
      description: "Data structures and algorithms practice",
      time: "07:00 PM",
      duration: "1 hour",
      status: "upcoming",
      color: "bg-purple-500",
      tasks: ["Binary search implementation", "Time complexity analysis", "Practice problems"],
    },
  ];

  const weeklySchedule = {
    Monday: [
      { time: "09:00", title: "React Fundamentals", duration: "2h", color: "bg-blue-500" },
      { time: "14:00", title: "JavaScript Practice", duration: "1.5h", color: "bg-green-500" },
    ],
    Tuesday: [
      { time: "10:00", title: "Database Design", duration: "2h", color: "bg-indigo-500" },
    ],
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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar */}
        <StudentTopbar sidebarOpen={true} setSidebarOpen={() => {}} />

        {/* Page content */}
        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Routines</h1>
              <p className="text-slate-600">Organize your learning schedule with AI-optimized study routines.</p>
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
                          onClick={() => setSelectedDay(period as typeof selectedDay)}
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
                        <Button size="sm" variant="outline">
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
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
                  <div key={day}>
                    <h4 className="font-semibold text-slate-900 text-center mb-2">{day}</h4>
                    <div className="space-y-2">
                      {schedule.map((item, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
    </div>
  );
}
