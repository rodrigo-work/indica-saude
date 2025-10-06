import { prisma } from '@workspace/database'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  const response = NextResponse.json(users)

  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  return response
}
