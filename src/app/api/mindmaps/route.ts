// /api/mindmaps/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

async function getStudentId(req: Request) {
  const session = await getServerSession(authOptions);
  return session?.user?.id;
}

export async function GET(req: Request) {
  const studentId = await getStudentId(req)
  if (!studentId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const mindmaps = await prisma.mindmap.findMany({
    where: { studentId },
    orderBy: { lastModified: 'desc' },
  })

  return NextResponse.json(mindmaps)
}
