import { SignInForm } from '@/components/auth/sign-in-form'
import { Card, CardContent } from '@/components/ui/card'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-3xl font-bold lowercase">
            <span className="text-white">fite</span>
            <span className="text-green-400">match</span>
          </p>
          <h1 className="mt-4 text-2xl font-semibold">Dashboard access</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in with an administrative account.
          </p>
        </div>

        <Card>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
