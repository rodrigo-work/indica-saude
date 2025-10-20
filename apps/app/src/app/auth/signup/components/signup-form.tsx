'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from '@workspace/ui/components/field'
import { Input } from '@workspace/ui/components/input'
import { Spinner } from '@workspace/ui/components/spinner'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { IdentdyProviderForm } from '../../login/components/identity-provider'

const formSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, 'Password must be at least 6 characters.')
})

export function SignUpForm({ className, ...props }: React.ComponentProps<'form'>) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'me+is+indicator@rodrigo3d.com',
      password: '123123'
    }
  })

  async function onSubmit(value: z.infer<typeof formSchema>) {
    setLoading(true)

    const parsedValues = {
      email: value.email,
      password: value.password
    }

    try {
      const res = await fetch('/auth/login/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedValues)
      })

      const data = await res.json()

      toast('You submitted the following values:', {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2'
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)'
        } as React.CSSProperties
      })

      if (!res.ok) {
        throw new Error(data.error)
        // setError(data?.error || 'Login failed')
      } else {
        console.log(data)
        //  redirect('/dashboard', RedirectType.push)
        router.push('/dashboard')
        // window.location.href = '/protected'
      }
    } catch (_error) {
      // setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full sm:max-w-md gap-6">
      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="w-full">
          <Field>
            <FieldDescription className="flex flex-col text-center">
              <span className="text-2xl font-bold">Sign Up</span>
              <span className="text-muted-foreground">
                Back to login?{' '}
                <Link className="underline underline-offset-4" href="/auth/login">
                  Login
                </Link>
              </span>
            </FieldDescription>
          </Field>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="email">Password</FieldLabel>
                  <Link
                    className="ml-auto font-normal underline text-sm underline-offset-4 hover:text-primary"
                    href="/auth/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  id="password"
                  placeholder=""
                  type="password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" placeholder="m@example.com" required type="email" />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link className="ml-auto text-sm underline-offset-4 hover:underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" required type="password" />
        </Field> */}
          <Button form="form-rhf-demo" type="submit">
            {loading && <Spinner />} Login
          </Button>
        </FieldGroup>
        <IdentdyProviderForm />
      </form>
    </div>
  )
}
