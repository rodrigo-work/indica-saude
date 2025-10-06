'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type UserContextType = {
  user: User | null
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const res = await fetch('/api/me', {
          credentials: 'include' // importante para enviar cookie
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setUser(data)
        }
      } catch (err) {
        // biome-ignore lint/suspicious/noConsole: Needed
        console.error('Erro ao buscar usuário:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
}

// Hook para usar o contexto
export const useUser = () => useContext(UserContext)
