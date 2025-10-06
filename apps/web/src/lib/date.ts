export function formatDateToPtBR(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export const formatDateLong = (dateString: string) => {
  const [year, month, day]: any = dateString.split('-').map(Number)
  const localDate = new Date(year, month - 1, day)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(localDate)
}
