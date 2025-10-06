import { type NextRequest, NextResponse } from 'next/server'
import { MOCK_AI_RESPONSES } from '@/data'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 1) MOCK
  if (MOCK_AI_RESPONSES[message]) {
    return NextResponse.json({
      text: MOCK_AI_RESPONSES[message],
      source: 'mock'
    })
  }

  // Default response when no mock is found
  return NextResponse.json(
    {
      text: 'No mock response found for this message',
      source: 'default'
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    }
  )
}
