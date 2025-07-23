'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react' // NextAuth hook
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Pause,
  Play,
  Trash2,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import StudentSidebar from '@/components/layouts/studentSidebar'
import StudentTopbar from '@/components/layouts/studentTopBar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Routine = {
  id: string
  title: string
  description: string
  time: string
  duration: string
  status: string
  color: string
  tasks: string[]
}

export default function RoutinesPage() {
  const { data: session } = useSession()
  const studentId = session?.user?.id // Assuming your session user object has an `id` field

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow' | 'week'>('today')
  const [routines, setRoutines] = useState<Routine[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const [openForm, setOpenForm] = useState(false)
  const [goal, setGoal] = useState('')
  const [hoursAvailable, setHoursAvailable] = useState('')
  const [topicInput, setTopicInput] = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [error, setError] = useState('')

  const fetchRoutines = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/routines')
      if (!res.ok) throw new Error('Failed to load routines')
      const data = await res.json()
      setRoutines(data)
    } catch {
      setError('Unable to fetch routines')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoutines()
  }, [])

  const handleAddTopic = () => {
    const trimmed = topicInput.trim()
    if (trimmed && !topics.includes(trimmed)) {
      setTopics([...topics, trimmed])
      setTopicInput('')
    }
  }

  const handleRemoveTopic = (t: string) => {
    setTopics(topics.filter((topic) => topic !== t))
  }

  const handleGenerateRoutine = async () => {
    if (!goal || !hoursAvailable || topics.length === 0) {
      setError('Please fill all fields.')
      return
    }
    if (!studentId) {
      setError('User not authenticated.')
      return
    }

    setGenerating(true)
    setError('')

    try {
      const res = await fetch('/api/routines/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          hoursAvailable,
          topics,
          studentId,
        }),
      })

      const data = await res.json()
      if (data?.routines) {
        await fetchRoutines()
        setOpenForm(false)
      } else {
        setError('AI failed to generate routines.')
      }
    } catch {
      setError('Error generating routines.')
    } finally {
      setGenerating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'upcoming': return 'bg-orange-100 text-orange-700'
      case 'paused': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />
      case 'completed': return <Clock className="w-4 h-4" />
      case 'upcoming': return <Clock className="w-4 h-4" />
      case 'paused': return <Pause className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem="Routines"
      />

      <div className="flex-1 flex flex-col lg:ml-64">
        <StudentTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Study Routines</h1>
              <p className="text-slate-600">Organize your learning schedule with AI-generated routines.</p>
            </div>
            <Button
              onClick={() => setOpenForm(true)}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate with AI
            </Button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading routines...</p>
          ) : routines.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600 mb-4">No routines found</p>
              <Button onClick={() => setOpenForm(true)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Routine
              </Button>
            </div>
          ) : (
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Today's Schedule
                  </span>
                  <div className="flex gap-2">
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
                  <div key={routine.id} className="flex items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <div className={`w-4 h-4 ${routine.color} rounded-full mr-4`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-lg font-semibold text-slate-900">{routine.title}</h4>
                        <Badge className={getStatusColor(routine.status)}>
                          {getStatusIcon(routine.status)}
                          <span className="ml-1 capitalize">{routine.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{routine.description}</p>
                      <div className="flex gap-6 text-sm text-slate-500">
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
                    <div className="ml-4 flex gap-2">
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Pause className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Generate Routine Modal */}
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Study Routine</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Goal</Label>
                  <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Learn Full-Stack Development" />
                </div>
                <div>
                  <Label>Hours Available</Label>
                  <Input
                    type="number"
                    value={hoursAvailable}
                    onChange={(e) => setHoursAvailable(e.target.value)}
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <Label>Topics</Label>
                  <div className="flex gap-2">
                    <Input
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      placeholder="e.g. React"
                    />
                    <Button type="button" onClick={handleAddTopic}>Add</Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <Badge key={topic} className="px-3 py-1">
                        {topic}
                        <button onClick={() => handleRemoveTopic(topic)} className="ml-2 text-xs">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>
              <DialogFooter>
                <Button onClick={handleGenerateRoutine} disabled={generating}>
                  {generating ? 'Generating...' : 'Create with AI'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
