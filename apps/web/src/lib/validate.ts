// lib/validate.ts
import type { ZodSchema } from 'zod'
import { HttpError } from './errors'

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new HttpError('Invalid data received', 400)
  }
  return result.data
}
