/** biome-ignore-all lint/suspicious/noExplicitAny: Needed */
import { env } from '@/env'
import { database } from '@/lib/database'

const fetchAPI = async (url: string, options: any) => {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/${url}`, options)

  // if (!response.ok) {
  //   throw new Error('Failed to fetch API')
  // }

  return response
}

export const getAllReferrals = async () => {
  const response = await fetchAPI('api/referrals', {})

  return await response.json()
}

export const latestScheduledReferrals = async () => {
  return await database.referral.findMany({
    // where: {
    //   status: 'SCHEDULED' // Status agendado
    // },
    // orderBy: {
    //   scheduledDate: 'desc' // Ordenar pela data agendada mais recente
    // },
    // take: 3 // Pegar os últimos 6
    // select: {
    //   id: true,
    //   patientName: true,
    //   patientEmail: true,
    //   // patientPhone: true,
    //   // scheduledDate: true,
    //   // scheduledTime: true,
    //   professional: {
    //     select: {
    //       name: true
    //     }
    //   },
    //   indicator: {
    //     select: {
    //       name: true
    //     }
    //   }
    // }
  })
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
