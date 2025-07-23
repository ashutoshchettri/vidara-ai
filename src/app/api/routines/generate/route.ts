import { NextRequest, NextResponse } from 'next/server'
import { generateRoutineFromGemini } from '@/lib/gemini'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { goal, hoursAvailable, topics, studentId } = await req.json()

    if (!goal || !hoursAvailable || !topics || !studentId) {
      return NextResponse.json({ error: 'Missing fields in request' }, { status: 400 })
    }

    const prompt = `
You are an expert study planner. Based on the following input, return ONLY a JSON array of 3 study sessions with these fields:

- title (string)
- description (string)
- time (string)
- duration (string)
- tasks (array of 3 strings)

Input:
Goal: ${goal}
Time available: ${hoursAvailable} hours per day
Topics: ${topics.join(', ')}

Respond with only the JSON block inside a \`\`\`json code block like below:

\`\`\`json
[
  {
    "title": "Learn React Basics",
    "description": "Understand JSX and components.",
    "time": "9:00 AM",
    "duration": "1 hour",
    "tasks": ["Intro to JSX", "Functional components", "Build a small app"]
  },
  ...
]
\`\`\`
    `.trim()

    const aiResponse = await generateRoutineFromGemini(prompt)

    let generatedRoutines = []

    if (Array.isArray(aiResponse)) {
      generatedRoutines = aiResponse
    } else if (typeof aiResponse === 'string') {
      generatedRoutines = parseRoutineFromAI(aiResponse)
    } else {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 })
    }

    // Add extra fields before saving
    const enrichedRoutines = generatedRoutines.map((r: any) => ({
      ...r,
      status: 'upcoming',
      color: 'bg-blue-500',
      studentId: studentId,
    }))

    // Save to DB
    await prisma.routine.createMany({
      data: enrichedRoutines,
    })

    return NextResponse.json({ routines: enrichedRoutines })
  } catch (err: any) {
    console.error('Routine generation error:', err)
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}

// Your existing parseRoutineFromAI function unchanged...


// Fallback parser for plain text responses from Gemini
function parseRoutineFromAI(aiText: string) {
  const jsonBlockMatch = aiText.match(/```json\s*([\s\S]+?)\s*```/)
  if (!jsonBlockMatch) {
    throw new Error('No valid JSON block found in Gemini response.')
  }

  try {
    const json = jsonBlockMatch[1]
    return JSON.parse(json)
  } catch {
    throw new Error('Failed to parse JSON from Gemini output.')
  }
}
