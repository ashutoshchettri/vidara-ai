'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  courseId: string
  enrolled: boolean
}

export default function EnrollButton({ courseId, enrolled }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleEnroll = async () => {
    setLoading(true)
    const res = await fetch('/api/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setLoading(false)
    if (res.ok) {
      router.refresh() // Refresh to show "Enrolled"
    } else {
      alert('Error enrolling in course.')
    }
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={enrolled || loading}
    >
      {enrolled ? 'Already Enrolled' : loading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  )
}
