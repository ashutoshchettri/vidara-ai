'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Video,
  Settings,
  Filter,
  Grid,
  List,
  Plus,
  Edit,
  Eye,
  Trash2,
  Star,
  Clock,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import InstructorSidebar from '@/components/layouts/instructorSidebar';
import InstructorTopbar from '@/components/layouts/instructorTopbar';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  instructor: {
    name: string;
  };
}

export default function InstructorCoursesPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('My Courses');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    'Programming',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'UI/UX Design',
    'Database',
    'DevOps',
    'Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete course');
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredCourses = courses.filter((c) =>
    filterCategory === 'all' ? true : c.category === filterCategory
  );

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        router.push('/sign-in');
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <InstructorSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
      />

      <div className="lg:ml-64">
        <InstructorTopbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">My Courses</h1>
              <p className="text-slate-600">Manage your courses and track performance.</p>
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              onClick={() => router.push('/instructor-dashboard')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-12 text-slate-600">Loading courses...</p>
          ) : error ? (
            <div className="text-red-600 text-center py-12">{error}</div>
          ) : filteredCourses.length === 0 ? (
            <p className="text-center py-12 text-slate-600">No courses found.</p>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredCourses.map((course) => (
                <Card key={course.id} className="bg-white/80 backdrop-blur-sm shadow-md">
                  <CardContent className="p-4 space-y-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-slate-600">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>{formatDate(course.createdAt)}</span>
                      <Badge>{course.category}</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                        onClick={() => deleteCourse(course.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
