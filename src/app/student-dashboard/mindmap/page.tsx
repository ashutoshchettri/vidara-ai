'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Eye,
  GitBranch,
  Brain,
  Zap,
} from 'lucide-react';
import StudentSidebar from '@/components/layouts/studentSidebar';
import StudentTopbar from '@/components/layouts/studentTopBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MindmapTree from '@/components/mindmap/mindmapTree';

export default function MindmapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Mindmap');

  const [mindmaps, setMindmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openForm, setOpenForm] = useState(false);
  const [topic, setTopic] = useState('');
  const [course, setCourse] = useState('');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  const [viewingMindmap, setViewingMindmap] = useState<any | null>(null);

  const fetchMindmaps = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/mindmaps');
      if (!res.ok) throw new Error('Failed to fetch mindmaps');
      const data = await res.json();
      setMindmaps(data);
    } catch (e) {
      setError('Error loading mindmaps');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMindmaps();
  }, []);

  const handleGenerateMindmap = async () => {
    if (!topic.trim()) {
      setGenError('Please enter a topic.');
      return;
    }
    setGenerating(true);
    setGenError('');

    try {
      const res = await fetch('/api/mindmaps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, course }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchMindmaps();
        setOpenForm(false);
        setTopic('');
        setCourse('');
      } else {
        console.error('Mindmap generation error:', data);
        setGenError('Failed to generate mindmap');
      }
    } catch (err) {
      console.error('Request failed:', err);
      setGenError('Failed to generate mindmap');
    } finally {
      setGenerating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'enhancement':
        return <Zap className="w-4 h-4 text-yellow-600" />;
      case 'connection':
        return <GitBranch className="w-4 h-4 text-blue-600" />;
      default:
        return <Brain className="w-4 h-4 text-purple-600" />;
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
        <StudentTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Mind Maps</h1>
              <p className="text-slate-600">
                Visualize your learning with AI-enhanced mind mapping tools.
              </p>
            </div>
            <Button
              onClick={() => setOpenForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Mindmap
            </Button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading mindmaps...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : mindmaps.length === 0 ? (
            <div className="text-center text-slate-600 mt-16">
              <p className="text-lg font-medium">No mindmaps yet.</p>
              <p className="text-sm mt-2">Create a new one using the button above.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mindmaps.map((mindmap) => (
                    <Card
                      key={mindmap.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden group"
                    >
                      <div className="relative h-32">
                        <img
                          src={
                            mindmap.thumbnail ||
                            'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
                          }
                          alt={mindmap.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-80" />
                        <div className="absolute top-3 right-3">
                          <Badge className={getStatusColor(mindmap.status)}>
                            {mindmap.status}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            className="bg-white/90 text-slate-900 hover:bg-white"
                            onClick={() => setViewingMindmap(mindmap)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">{mindmap.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{mindmap.course || '—'}</p>
                        <div className="text-xs text-slate-500">
                          {new Date(mindmap.lastModified).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Generate Mindmap Modal */}
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Mindmap with AI</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Topic</Label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. React Component Lifecycle"
                  />
                </div>
                <div>
                  <Label>Course (optional)</Label>
                  <Input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    placeholder="e.g. React Fundamentals"
                  />
                </div>
                {genError && <p className="text-red-600 text-sm">{genError}</p>}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenForm(false)} disabled={generating}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateMindmap} disabled={generating} className="ml-2">
                  {generating ? 'Generating...' : 'Generate'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View Mindmap Modal */}
          <Dialog open={!!viewingMindmap} onOpenChange={() => setViewingMindmap(null)}>
            <DialogContent className="max-w-4xl h-[600px] overflow-hidden">
              <DialogHeader>
                <DialogTitle>{viewingMindmap?.title || 'Mindmap View'}</DialogTitle>
              </DialogHeader>
              <div className="h-[500px] w-full overflow-hidden">
                {viewingMindmap && <MindmapTree data={viewingMindmap.jsonData} />}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewingMindmap(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
