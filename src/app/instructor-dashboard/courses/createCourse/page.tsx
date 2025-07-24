'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Sparkles, FileText as FileTextIcon, FileText,
  Image, Tag, AlertCircle, CheckCircle,
  LayoutDashboard, BookOpen
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import InstructorSidebar from '@/components/layouts/instructorSidebar';
import InstructorTopbar from '@/components/layouts/instructorTopbar';

export default function InstructorDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [curriculum, setCurriculum] = useState([{ title: '', videoUrl: '', pdfUrl: '', description: '' }]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Programming', 'Web Development', 'Data Science', 'Mobile Development',
    'UI/UX Design', 'Database', 'DevOps', 'Machine Learning',
    'Cybersecurity', 'Cloud Computing'
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let finalThumbnail = thumbnail;

      if (uploadedFile) {
        const formData = new FormData();
        formData.append('file', uploadedFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        finalThumbnail = uploadData.url;
      }

      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          thumbnail: finalThumbnail,
          category,
          curriculum,
        }),
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
      setUploadedFile(null);
      setCurriculum([{ title: '', videoUrl: '', pdfUrl: '', description: '' }]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Create a New Course</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Share your knowledge with students worldwide. Create engaging courses that inspire and educate.
              </p>
            </div>

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

                  <div className="space-y-2">
                    <Label className="flex items-center font-medium text-slate-700">
                      <FileTextIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Course Title
                    </Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Advanced React Course"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center font-medium text-slate-700">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Description
                    </Label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What will students learn?"
                      required
                      rows={4}
                      className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-slate-700 font-medium flex items-center">
                      <Image className="w-4 h-4 mr-2 text-blue-600" />
                      Thumbnail (URL or Upload)
                    </Label>
                    <Input
                      type="url"
                      placeholder="https://example.com/thumbnail.jpg"
                      value={thumbnail}
                      onChange={(e) => {
                        setThumbnail(e.target.value);
                        setUploadedFile(null);
                      }}
                      className="h-12 border-slate-200"
                    />
                    <div className="text-center text-slate-600 text-sm">or</div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFile(file);
                          setThumbnail('');
                        }
                      }}
                      className="h-12 border-slate-200"
                    />
                    {thumbnail ? (
                      <img src={thumbnail} alt="Preview" className="w-32 h-20 object-cover mt-2 rounded-md" />
                    ) : uploadedFile ? (
                      <img src={URL.createObjectURL(uploadedFile)} alt="Preview" className="w-32 h-20 object-cover mt-2 rounded-md" />
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center font-medium text-slate-700">
                      <Tag className="w-4 h-4 mr-2 text-blue-600" />
                      Category
                    </Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full h-12 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">Course Curriculum</h3>
                    {curriculum.map((item, index) => (
                      <div key={index} className="border border-slate-200 p-4 rounded-md bg-white shadow-sm space-y-3">
                        <div>
                          <Label>Topic Title</Label>
                          <Input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const copy = [...curriculum];
                              copy[index].title = e.target.value;
                              setCurriculum(copy);
                            }}
                            required
                          />
                        </div>
                        <div>
                          <Label>Video URL (optional)</Label>
                          <Input
                            type="url"
                            value={item.videoUrl}
                            onChange={(e) => {
                              const copy = [...curriculum];
                              copy[index].videoUrl = e.target.value;
                              setCurriculum(copy);
                            }}
                          />
                        </div>
                        <div>
                          <Label>PDF/Resource URL (optional)</Label>
                          <Input
                            type="url"
                            value={item.pdfUrl}
                            onChange={(e) => {
                              const copy = [...curriculum];
                              copy[index].pdfUrl = e.target.value;
                              setCurriculum(copy);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Topic Description</Label>
                          <textarea
                            value={item.description}
                            onChange={(e) => {
                              const copy = [...curriculum];
                              copy[index].description = e.target.value;
                              setCurriculum(copy);
                            }}
                            rows={3}
                            placeholder="Write a brief explanation about this topic..."
                            className="w-full p-2 border border-slate-200 rounded-md focus:ring focus:ring-blue-200"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => setCurriculum(curriculum.filter((_, i) => i !== index))}
                        >
                          Remove Topic
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurriculum([...curriculum, { title: '', videoUrl: '', pdfUrl: '', description: '' }])}
                    >
                      + Add New Topic
                    </Button>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> {success}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg"
                  >
                    {loading ? 'Creating...' : (
                      <div className="flex items-center gap-2">
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
    </div>
  );
}