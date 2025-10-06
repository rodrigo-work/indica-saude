/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import { env } from '@/env'

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/${url}`, options)

  // if (!response.ok) {
  //   throw new Error('Failed to fetch API')
  // }

  return response
}

export const getUsersFakeLogin = async () => {
  const response = await fetchAPI('api/me', {
    credentials: 'include'
  })

  return await response.json()
}

export const handleLogin = async (formData: FormData) => {
  const loginRequest = {
    email: formData.get('email'),
    password: '123123' // formData.get('password')
  }

  const response = await fetchAPI('auth/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginRequest)
  })

  return await response.json()
}
