type JsonLdProps = {
  code?: string
}

export const JsonTeste = (req: Request) => {
  return new Response(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'John Doe'
    })
  )
}
