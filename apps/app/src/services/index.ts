/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import { cookies, headers } from 'next/headers'
import { env } from '@/env'

export async function fetchApi(path: string): Promise<any> {
  const reqHeaders = await headers()
  const host = reqHeaders.get('host')
  const isLocalhost = !host || host.includes('localhost')
  const cookieStore = await cookies()

  const response = await fetch(
    `${isLocalhost ? `${env.NEXT_PUBLIC_API_URL}` : `${env.NEXT_PUBLIC_API_URL}`}${path}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('access_token')?.value}`,
        Cookie: `id_token=${cookieStore.get('saas_microservices_authed_user')?.value}`
      }
    }
  )

  if (!response.ok) {
    console.error('Network response was not ok', response)
    throw new Error('Network response was not ok')
  }

  return response.json() as Promise<any>
}
