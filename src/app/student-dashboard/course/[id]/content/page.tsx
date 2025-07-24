'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

type Lesson = {
  title: string
  type: 'video' | 'pdf'
  url: string
}

type Module = {
  moduleTitle: string
  lessons: Lesson[]
}

export default function CourseContentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id: courseId } = useParams()
  const [content, setContent] = useState<Module[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/sign-in')
  }, [status, router])

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`/api/courses/${courseId}/content`)
      if (res.ok) {
        const data = await res.json()
        setContent(data.content || [])
      }
    }

    if (status === 'authenticated') fetchContent()
  }, [courseId, status])

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Course Content</h1>

      {content.map((module, i) => (
        <Card key={i}>
          <CardContent className="space-y-2 p-6">
            <h2 className="text-xl font-semibold text-blue-800">{module.moduleTitle}</h2>
            <ul className="space-y-3">
              {module.lessons.map((lesson, j) => (
                <li key={j} className="border p-3 rounded-md bg-slate-50">
                  <p className="font-medium">{lesson.title}</p>
                  {lesson.type === 'video' ? (
                    <video src={lesson.url} controls className="w-full mt-2 rounded" />
                  ) : (
                    <a
                      href={lesson.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline mt-2 block"
                    >
                      View PDF
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
