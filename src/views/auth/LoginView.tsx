import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthHeroPanel from '../../components/AuthHeroPanel'
import SocialAuthButtons from '../../components/SocialAuthButtons'
import { useAuth } from '../../hooks/useAuth'

export default function LoginView() {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      await login({ email, password })
      navigate('/')
    } catch {
      // error state is already surfaced by useAuth
    }
  }

  return (
    <div className="flex min-h-screen w-full items-stretch bg-canvas">
      <AuthHeroPanel headline="Build apps at the speed of thought" />

      <div className="flex min-w-0 flex-1 items-center justify-center p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[440px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-bold text-ink">Welcome back</p>
            <p className="text-base text-muted">Enter your credentials to access your studio</p>
          </div>

          <div className="flex w-full flex-col gap-6">
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
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-semibold text-ink">Password</span>
                <Link to="/forgot-password" className="text-[13px] font-semibold text-primary">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
              />
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex w-full flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-primary px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-60"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <SocialAuthButtons />
          </div>

          <p className="w-full text-center text-sm text-muted">
            {`Don't have an account? `}
            <Link to="/signup" className="font-semibold text-primary">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
