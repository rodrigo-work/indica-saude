import { LoginForm } from '@workspace/auth/src/components/login-form'

type LoginPageProps = {}

export default function LoginPage(props: LoginPageProps) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <LoginForm />
    </div>
  )
}
