// /api/mindmaps/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateRoutineFromGemini } from '@/lib/gemini'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

async function getStudentId(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return null;
  }
  return session.user.id;
}

export async function POST(req: NextRequest) {
  try {
    const { topic, course } = await req.json()
    if (!topic) {
      return NextResponse.json({ error: 'Missing topic' }, { status: 400 })
    }

    const studentId = await getStudentId(req)
    if (!studentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const prompt = `
You are an expert at creating mindmaps. Given the topic below, return ONLY a JSON representing the mindmap with this structure:

{
  "topic": "root topic",
  "branches": [
    {
      "topic": "subtopic 1",
      "branches": [
        { "topic": "detail 1", "branches": [] },
        { "topic": "detail 2", "branches": [] }
      ]
    },
    {
      "topic": "subtopic 2",
      "branches": []
    }
  ]
}

Topic: ${topic}

Respond ONLY with the JSON inside a \`\`\`json code block.
`

    const aiResponse = await generateRoutineFromGemini(prompt);

    let mindmapData;

    if (typeof aiResponse === 'string') {
      const jsonMatch = aiResponse.match(/```json([\s\S]*?)```/);
      const mindmapJsonText = jsonMatch ? jsonMatch[1].trim() : aiResponse.trim();
      try {
        mindmapData = JSON.parse(mindmapJsonText);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON from AI', details: (e instanceof Error ? e.message : String(e)) }, { status: 500 });
      }
    } else if (typeof aiResponse === 'object' && aiResponse !== null) {
      mindmapData = aiResponse;
    } else {
      return NextResponse.json({ error: 'Unexpected AI response format' }, { status: 500 });
    }

    // Calculate nodes and connections counts (you can customize this)
    interface MindmapNode {
      topic: string
      branches: MindmapNode[]
    }

    function countNodes(node: MindmapNode): number {
      return 1 + node.branches.reduce((acc, b) => acc + countNodes(b), 0)
    }
    interface MindmapNode {
      topic: string
      branches: MindmapNode[]
    }

    function countConnections(node: MindmapNode): number {
      return node.branches.length + node.branches.reduce((acc, b) => acc + countConnections(b), 0)
    }

    const nodesCount = countNodes(mindmapData)
    const connectionsCount = countConnections(mindmapData)

    // Save to DB
   const newMindmap = await prisma.mindmap.create({
  data: {
    title: topic,
    course: course || '',
    lastModified: new Date(),
    nodes: nodesCount,
    connections: connectionsCount,
    status: 'active',
    thumbnail: '',
    jsonData: mindmapData,
    studentId,
  }
})

return NextResponse.json(newMindmap);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
