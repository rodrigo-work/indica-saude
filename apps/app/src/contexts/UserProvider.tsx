'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import type { Profile } from '@/types/profile'

type UserContextValue = {
  user: Profile | null
  setUser: (u: Profile | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({
  children,
  initialUser
}: {
  children: ReactNode
  initialUser: Profile | null
}) {
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (!user) {
      const timer = setTimeout(() => {
        fetch('/auth/me')
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data) setUser(data)
          })
          .catch(() => {})
      }, 9000)

      setIsLoading(false)

      return () => clearTimeout(timer)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used inside a UserProvider')
  return ctx
}
