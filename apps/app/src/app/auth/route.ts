import cors from '@/lib/cors'

export const runtime = 'edge'

export async function GET(request: Request) {
  const links = [
    '/auth/login',
    '/auth/logout',
    '/auth/callback',
    '/auth/me',
    '/auth/user',
    '/auth/session'
  ]

  return cors(
    request,
    new Response(JSON.stringify(links), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    })
  )
}

export function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204
    })
  )
}
