import { env } from 'node:process'
import { prisma } from '@workspace/database'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'
import { settings } from '@/constants/data'

const secret = new TextEncoder().encode(env.JWT_SECRET)

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  // const token = cookieStore.get(settings.cookies.id_token)?.value
  const token = req.cookies.get('id_token')?.value
  console.log('token', token)
  //
  if (!token) {
    return NextResponse.json({ error: 'Token not found' }, { status: 403 })
  }

  try {
    const { payload } = await jwtVerify(token, secret)

    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (_error) {
    return NextResponse.json(
      {
        error: 'Token inválido'
      },
      {
        status: 401
      }
    )
  }
}
