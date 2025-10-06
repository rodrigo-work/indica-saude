import { database } from '@/lib/database'
import { delay } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cookieHeader = request.headers.get('cookie')

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  await delay(1000)

  try {
    const data = await database.referral.findMany({
      // where,
      include: {
        indicator: true,
        professional: true
      }
    })

    return (
      // request,
      new Response(JSON.stringify({ data: data }), {
        status: 200,
        headers: {
          'content-type': 'application/json'
        }
      })
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message ?? 'Internal Server Error' }), {
      status: 500,
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}
