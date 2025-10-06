export function formatDateToPtBR(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}
