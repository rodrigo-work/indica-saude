import { redirect } from 'next/navigation'

export { cn } from '@workspace/ui/lib/utils'

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generates page numbers for pagination with ellipsis
 * @param currentPage - Current page number (1-based)
 * @param totalPages - Total number of pages
 * @returns Array of page numbers and ellipsis strings
 *
 * Examples:
 * - Small dataset (≤5 pages): [1, 2, 3, 4, 5]
 * - Near beginning: [1, 2, 3, 4, '...', 10]
 * - In middle: [1, '...', 4, 5, 6, '...', 10]
 * - Near end: [1, '...', 7, 8, 9, 10]
 */

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
export function getPageNumbers(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5 // Maximum number of page buttons to show
  const rangeWithDots = []

  if (totalPages <= maxVisiblePages) {
    // If total pages is 5 or less, show all pages
    for (let i = 1; i <= totalPages; i++) {
      rangeWithDots.push(i)
    }
  } else {
    // Always show first page
    rangeWithDots.push(1)

    if (currentPage <= 3) {
      // Near the beginning: [1] [2] [3] [4] ... [10]
      for (let i = 2; i <= 4; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    } else if (currentPage >= totalPages - 2) {
      // Near the end: [1] ... [7] [8] [9] [10]
      rangeWithDots.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        rangeWithDots.push(i)
      }
    } else {
      // In the middle: [1] ... [4] [5] [6] ... [10]
      rangeWithDots.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        rangeWithDots.push(i)
      }
      rangeWithDots.push('...', totalPages)
    }
  }

  return rangeWithDots
}

export async function logout(setUser: (user: null) => void) {
  // await fetch('/auth/logout', { method: '' })
  setUser(null)
  redirect('/auth/logout')
}

export const formatCurrency = (value: number | string | null) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value as number | string as unknown as number)
}

export const formatDateBR = (date: Date) => {
  if (date === null) {
    return ''
  }
  return new Date(date).toLocaleDateString('pt-BR')
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)

  // Usamos os métodos UTC para evitar mudança de fuso horário
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}

export function timestampToHour(timestamp: number): string {
  // aceita segundos ou milissegundos
  const isSeconds = timestamp.toString().length === 10
  const date = new Date(isSeconds ? timestamp * 1000 : timestamp)

  return date.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Exemplo:
// console.log(timestampToHour(1730751600));     // "09:00"
// console.log(timestampToHour(1730751600000));  // "09:00"
