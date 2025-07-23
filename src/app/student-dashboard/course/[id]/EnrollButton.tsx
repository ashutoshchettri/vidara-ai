'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
  courseId: string
  enrolled: boolean
}

export default function EnrollButton({ courseId, enrolled }: Props) {
  const [isEnrolled, setIsEnrolled] = useState(enrolled)
  const [loading, setLoading] = useState(false)

  const handleEnroll = async () => {
    setLoading(true)
    const res = await fetch('/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    })

    const data = await res.json()

    if (res.ok) {
      setIsEnrolled(true)
    } else {
      alert(data.error || 'Enrollment failed')
    }

    setLoading(false)
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading || isEnrolled}
      className="mt-4"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isEnrolled ? 'Enrolled' : 'Enroll Now'}
    </Button>
  )
}
