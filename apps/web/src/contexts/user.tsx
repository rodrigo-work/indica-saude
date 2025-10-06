'use client'

import type React from 'react'
import { createContext, useContext } from 'react'

type Profile = {
  id: string
  name: string
  email: string
  role: string
  picture?: string
}

export const UserContext = createContext<Profile | undefined>(undefined)

export const UserProvider = ({
  children,
  cookieIDP
}: {
  children: React.ReactNode
  cookieIDP: string
}) => {
  let profileData: Profile | undefined

  try {
    const tokenPart = cookieIDP?.split('.')[1]

    if (!tokenPart) {
      // console.error('Token not found')
      throw new Error('Token not found')
    }

    const decodedStr = Buffer.from(tokenPart, 'base64').toString('utf8')

    if (!decodedStr) throw new Error('Token vazio após base64 decode')

    const decoded: Profile = JSON.parse(decodedStr)

    profileData = decoded
  } catch (error) {
    console.error('Error parsing IDP cookie', error)
    profileData = undefined
  }

  return <UserContext.Provider value={profileData}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
