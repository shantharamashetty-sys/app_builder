import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthHeroPanel from '../../components/AuthHeroPanel'
import SocialAuthButtons from '../../components/SocialAuthButtons'
import { useAuth } from '../../hooks/useAuth'

export default function SignupView() {
  const { signup, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setValidationError(null)
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }
    try {
      await signup({ name, email, password })
      navigate('/welcome')
    } catch {
      // error state is already surfaced by useAuth
    }
  }

  return (
    <div className="flex min-h-screen w-full items-stretch bg-canvas">
      <AuthHeroPanel headline="Create your account to start building" />

      <div className="flex min-w-0 flex-1 items-center justify-center p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-bold text-ink">Get started today</p>
            <p className="text-base text-muted">Build and launch your next high-quality app</p>
          </div>

          <div className="flex w-full flex-col gap-5">
            <label className="flex w-full flex-col gap-2">
              <span className="text-sm font-semibold text-ink">Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Alex Rivera"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </label>
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
            <label className="flex w-full flex-col gap-2">
              <span className="text-sm font-semibold text-ink">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              <span className="text-sm font-semibold text-ink">Confirm Password</span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••••••"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </label>
          </div>

          {(validationError ?? error) && (
            <p className="text-sm text-red-600">{validationError ?? error}</p>
          )}

          <div className="flex w-full flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
            <SocialAuthButtons />
          </div>

          <p className="w-full text-center text-sm text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
