export async function fetchAIResponse(message: string, model: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, model })
  })

  if (!response.ok) {
    throw new Error('Failed to fetch AI response')
  }

  const data = await response.json()
  return data.content // Supondo que a API retorne { content: "..." }
}
