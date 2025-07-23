import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateRoutineFromGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = await response.text()

  // Try to extract JSON block from AI response
  const match = text.match(/```json\s*([\s\S]*?)\s*```/)
  if (match) {
    try {
      const json = match[1]
      return JSON.parse(json.trim())
    } catch (err) {
      console.warn('Failed to parse JSON from Gemini response:', err)
    }
  }

  // fallback: return raw text (for manual parsing)
  return text.trim()
}
