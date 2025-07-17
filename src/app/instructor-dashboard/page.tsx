'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Sparkles, FileText as FileTextIcon, FileText, Image, Tag, AlertCircle, CheckCircle, LayoutDashboard, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import InstructorSidebar from '@/components/layouts/instructorSidebar';
import InstructorTopbar from '@/components/layouts/instructorTopbar';

export default function InstructorDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/instructor-dashboard' },
    { name: 'My Courses', icon: BookOpen, href: '/instructor-dashboard/courses' },
  ];

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, thumbnail, category }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create course');
      }

      setSuccess('Course created successfully!');
      setTitle('');
      setDescription('');
      setThumbnail('');
      setCategory('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <InstructorSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeItem={activeItem}
      />

      <div className="lg:ml-64">
        <InstructorTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Create a New Course</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Share your knowledge with students worldwide. Create engaging courses that inspire and educate.
              </p>
            </div>

            {/* Create Course Form */}
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="flex items-center justify-center text-2xl font-bold text-slate-900">
                  <Sparkles className="w-6 h-6 mr-2 text-blue-600" />
                  Course Details
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Fill in the information below to create your course
                </p>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Course Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-700 font-medium flex items-center">
                      <FileTextIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Course Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g., Complete React Development Course"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Course Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-slate-700 font-medium flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Course Description
                    </Label>
                    <textarea
                      id="description"
                      placeholder="Describe what students will learn in this course..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Thumbnail URL */}
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-slate-700 font-medium flex items-center">
                      <Image className="w-4 h-4 mr-2 text-blue-600" />
                      Thumbnail Image URL
                    </Label>
                    <Input
                      id="thumbnail"
                      type="url"
                      placeholder="https://example.com/course-thumbnail.jpg"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      required
                      className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {thumbnail && (
                      <div className="mt-3">
                        <p className="text-sm text-slate-600 mb-2">Preview:</p>
                        <img 
                          src={thumbnail} 
                          alt="Course thumbnail preview" 
                          className="w-32 h-20 object-cover rounded-lg border border-slate-200"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-700 font-medium flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-blue-600" />
                      Category
                    </Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full h-12 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Error and Success Messages */}
                  {error && (
                    <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <p className="text-green-700">{success}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Course...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Plus className="w-5 h-5" />
                        <span>Create Course</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
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
