/**
 * Result Type Pattern
 * Functional error handling sem usar try/catch explícito
 */

export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E; statusCode?: number }

/**
 * Cria um Result de sucesso
 */
export function Ok<T>(data: T): Result<T> {
  return { success: true, data }
}

/**
 * Cria um Result de erro
 */
export function Err<E = Error>(error: E, statusCode?: number): Result<never, E> {
  return { success: false, error, statusCode }
}

/**
 * Verifica se Result é sucesso
 */
export function isOk<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success === true
}

/**
 * Verifica se Result é erro
 */
export function isErr<T, E>(result: Result<T, E>): result is { success: false; error: E; statusCode?: number } {
  return result.success === false
}

/**
 * Unwrap Result - retorna data ou lança erro
 * Use com cuidado, prefira pattern matching
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isOk(result)) {
    return result.data
  }
  throw result.error
}

/**
 * Unwrap Result com fallback
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (isOk(result)) {
    return result.data
  }
  return defaultValue
}

