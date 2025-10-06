export const runtime = 'edge'

export async function GET(_request: Request) {
  const data = {
    status: 'ok',
    timestamp: new Date().toISOString()
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  })
}
