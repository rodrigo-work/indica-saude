import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const nextUrl = req.nextUrl

  if (nextUrl.searchParams.has('dev')) {
    const data = {
      development: true,
      description: 'Implementar auto config do CMS para ambiente de desenvolvimento'
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  const data = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Indica Saude - CMS</title>
      <link href="/cms.yml" type="text/yaml" rel="cms-config-url">
    </head>
    <body>
      <!-- Include the script that builds the page and powers Decap CMS -->
      <script src="https://unpkg.com/decap-cms@3.8.4/dist/decap-cms.js"></script>
    </body>
    </html>
  `

  return new Response(data, {
    status: 200,
    headers: {
      'content-type': 'text/html'
    }
  })
}
