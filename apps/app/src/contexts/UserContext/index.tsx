'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import type { Profile } from '@/types/profile'

type UserContextValue = {
  user: Profile | null
  setUser: (user: Profile | null) => void
}

export const UserContext = createContext<UserContextValue | undefined>(undefined)

export const UserProvider = ({
  children,
  initialUser
}: {
  children: ReactNode
  initialUser: Profile | null | any
}) => {
  const [user, setUser] = useState<Profile | null>(initialUser)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/auth/me')
        if (res.ok) {
          const { user: data } = await res.json()
          setUser(data)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  // Optional: revalidar se `initialUser` estiver nulo
  // useEffect(() => {
  //   if (!user) {
  //     fetch('/auth/me')
  //       .then((res) => (res.ok ? res.json() : null))
  //       .then((data) => {
  //         if (data) setUser(data)
  //       })
  //       .catch(() => {})
  //   }
  // }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
