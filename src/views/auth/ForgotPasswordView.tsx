import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AuthHeroPanel from '../../components/AuthHeroPanel'
import { useAuth } from '../../hooks/useAuth'

export default function ForgotPasswordView() {
  const { requestPasswordReset, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      await requestPasswordReset(email)
      setIsSent(true)
    } catch {
      // error state is already surfaced by useAuth
    }
  }

  return (
    <div className="flex min-h-screen w-full items-stretch bg-canvas">
      <AuthHeroPanel headline="No stress, let's recover your account" />

      <div className="flex min-w-0 flex-1 items-center justify-center p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-bold text-ink">Reset your password</p>
            <p className="text-base text-muted">
              Enter your email address below and we&apos;ll send you a link to reset your
              credentials.
            </p>
          </div>

          <label className="flex w-full flex-col gap-2">
            <span className="text-sm font-semibold text-ink">Email Address</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </label>

          {isSent && (
            <p className="text-sm text-success">Check your inbox for a reset link.</p>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex w-full flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <Link to="/login" className="text-[15px] font-semibold text-primary">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
