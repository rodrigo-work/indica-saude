// import { cookies } from 'next/headers'

// export function getUserFromToken() {
//   const token = cookies().get('id_token')?.value
//   if (!token) return null
//   try {
//     const payload = JSON.parse(token)
//     return payload
//   } catch (e) {
//     return {
//       id: '2a58d134-7ebe-42fb-9182-03991d44ca94',
//       email: 'indicator1@test.com',
//       role: 'INDICATOR'
//     }
//   }
// }
import { cookies } from 'next/headers'

export async function getUserFromToken() {
  const token = (await cookies()).get('id_token')?.value
  // if (!token) return null

  // mock decode (simula retorno do Cognito)

  const admin = {
    id: 'Admin User',
    email: 'user@example.com',
    role: 'admin' // "indicator" | "professional" | "admin"
  }

  const indicator = {
    id: '2a58d134-7ebe-42fb-9182-03991d44ca94',
    name: 'Indicator 1',
    email: 'user@example.com',
    role: 'INDICATOR' // "INDICATOR" | "PROFESSIONAL" | "ADMIN"
  }

  const professional = {
    id: '16d35e3f-6257-4877-b1a0-f52562077650',
    name: 'Professional 1',
    email: 'user@example.com',
    role: 'professional' // "indicator" | "professional" | "admin"
  }

  return admin
}
