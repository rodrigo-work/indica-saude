/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
/** biome-ignore-all lint/correctness/noUnusedVariables: Needed */
import { cookies, headers } from 'next/headers'

export async function fetchApi(path: string): Promise<any> {
  const reqHeaders = await headers()
  const host = reqHeaders.get('host')
  const isLocalhost = !host || host.includes('localhost')
  const cookieStore = await cookies()
  const response = await fetch(
    `${isLocalhost ? 'http://localhost:5001' : 'https://saas-microservices-dashboard.vercel.app'}${path}`,
    {
      headers: {
        Authorization: `Bearer ${cookieStore.get('access_token')?.value}`
        // Cookie: `id_token=${cookieStore.get('saas_microservices_authed_user')?.value}`
      }
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json() as Promise<any>
}
