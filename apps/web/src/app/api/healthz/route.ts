import cors from '@/lib/cors'

export const runtime = 'edge'

export async function GET(request: Request) {
  const data = {
    status: 'ok',
    timestamp: new Date().toISOString()
  }

  return cors(
    request,
    new Response(JSON.stringify(data), {
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
