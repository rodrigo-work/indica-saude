'use client'

import { Button } from '@workspace/ui/components/button'
import { Field, FieldGroup } from '@workspace/ui/components/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@workspace/ui/components/select'
import { Spinner } from '@workspace/ui/components/spinner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { delay } from '@/lib/utils'
import { handleLogin } from './actions'

type User = {
  id: string
  name: string
  email: string
  role: string
}

export function LoginForm({ users }: { users: User[] }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  async function formAction(formData: FormData) {
    setLoading(true)

    await delay(2000)

    try {
      setLoading(true)
      const response = await handleLogin(formData)

      if (!response.success) {
        setError(response.message)
        return
      }

      // redirect(env.NEXT_PUBLIC_APP_URL)

      window.location.href = '/'
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 border-2 border-amber-800">
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <Select onValueChange={(value) => setEmail(value)} required>
              <SelectTrigger id="email">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.length > 0 &&
                  users.map((user) => (
                    <SelectItem key={user.email} value={user.email}>
                      {user.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {/* Este input oculto garante que o FormData irá capturar o valor */}
            <input name="email" type="hidden" value={email} />
          </Field>

          <Field>
            <Button type="submit">{loading && <Spinner />}Login</Button>
          </Field>
        </FieldGroup>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
