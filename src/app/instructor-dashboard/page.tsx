'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, BookOpen, Clock, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

import InstructorSidebar from '@/components/layouts/instructorSidebar';
import InstructorTopbar from '@/components/layouts/instructorTopbar';

export default function InstructorDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [dashboardData, setDashboardData] = useState({
    courses: [],
    totalCourses: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, loading: true, error: null }));
        const coursesResponse = await fetch('/api/courses');
        if (!coursesResponse.ok) throw new Error('Failed to fetch courses');
        const courses = await coursesResponse.json();

        setDashboardData({
          courses,
          totalCourses: courses.length,
          loading: false,
          error: null,
        });
      } catch (err) {
        setDashboardData(prev => ({ ...prev, error: err.message || 'An error occurred', loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) router.push('/sign-in');
      else console.error('Logout failed');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  if (dashboardData.loading) return <div className="p-6 text-center text-slate-600">Loading dashboard...</div>;
  if (dashboardData.error) return <div className="p-6 text-center text-red-600">Error: {dashboardData.error}</div>;

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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Instructor Dashboard</h1>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalCourses}</div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-blue-500" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboardData.courses.length > 0 ? (
                <ul className="space-y-4">
                  {dashboardData.courses.slice(0, 3).map((course) => (
                    <li key={course.id || course.title} className="text-sm text-slate-600">
                      {course.title || 'Untitled Course'} - {course.category || 'Uncategorized'}
                    </li>
                  ))}
                  {dashboardData.courses.length > 3 && (
                    <p className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                      <Link href="/instructor-dashboard/courses">View All Courses</Link>
                    </p>
                  )}
                </ul>
              ) : (
                <p className="text-slate-600 text-center">No courses created yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="text-blue-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/instructor-dashboard/create-course" passHref>
                <Button className="h-16 bg-blue-100 text-blue-700 hover:bg-blue-200 w-full block text-center">Create Course</Button>
              </Link>
              <Link href="/instructor-dashboard/courses" passHref>
                <Button className="h-16 bg-green-100 text-green-700 hover:bg-green-200 w-full block text-center">View Courses</Button>
              </Link>
              <Link href="/instructor-dashboard/students" passHref>
                <Button className="h-16 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 w-full block text-center">Manage Students</Button>
              </Link>
              <Link href="/instructor-dashboard/analytics" passHref>
                <Button className="h-16 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 w-full block text-center">View Analytics</Button>
              </Link>
            </CardContent>
          </Card>
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

// Assuming Button is a custom component
const Button = ({ className, children, ...props }) => (
  <button className={`rounded-lg font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
);