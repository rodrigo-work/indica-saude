import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { settings } from '@/constants/data'
import { env } from '@/env'

export async function getUserFromToken() {
  const token = (await cookies()).get('id_token')?.value
  // if (!token) return null

  // mock decode (simula retorno do Cognito)

  const admin = {
    id: 'Admin User',
    email: 'user@example.com',
    role: 'admin' // "indicator" | "professional" | "admin"
  }

  const indicator = {
    id: '2a58d134-7ebe-42fb-9182-03991d44ca94',
    name: 'Indicator 1',
    email: 'user@example.com',
    role: 'INDICATOR' // "INDICATOR" | "PROFESSIONAL" | "ADMIN"
  }

  const professional = {
    id: '16d35e3f-6257-4877-b1a0-f52562077650',
    name: 'Professional 1',
    email: 'user@example.com',
    role: 'professional' // "indicator" | "professional" | "admin"
  }

  return admin
}

export async function getUserFromServer() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(settings.cookies.id_token)?.value

  if (!sessionToken) return null

  // Exemplo de chamada para API protegida
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/auth/session`, {
    headers: {
      Cookie: `token=${sessionToken}`
    },
    cache: 'no-store' // para não cachear a resposta
  })

  if (!res.ok) return null

  const data = await res.json()
  return data.user
}

// lib/auth.ts

type Profile = {
  id: string
  name: string
  email: string
  role: string
  picture?: string
}

// const JWT_SECRET = process.env.JWT_SECRET

// if (!JWT_SECRET) throw new Error('JWT_SECRET not set')

const secret = new TextEncoder().encode(env.JWT_SECRET)

export async function getUserFromCookie(): Promise<Profile | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(settings.cookies.id_token)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret)

    // payload deve ter o formato de Profile
    return payload as Profile
  } catch (err) {
    console.error('Erro ao verificar JWT:', err)
    return null
  }
}
