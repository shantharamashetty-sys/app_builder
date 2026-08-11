import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthHeroPanel from '../../components/AuthHeroPanel'
import SocialAuthButtons from '../../components/SocialAuthButtons'
import Logo from '../../components/Logo'
import { useAuth } from '../../hooks/useAuth'

const inputClasses =
  'h-[52px] w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted transition-colors focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30'

export default function LoginView() {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

      <div className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="flex w-full max-w-[440px] flex-col gap-6">
          <div className="flex items-center gap-2.5 lg:hidden">
            <Logo variant="icon" className="size-7 text-primary" />
            <p className="text-lg font-bold text-ink">AppBuilder Studio</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[32px] font-bold text-ink">Welcome back</p>
            <p className="text-base text-muted">Enter your credentials to access AppBuilder Studio</p>
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
                className={inputClasses}
              />
            </label>
            <label className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-semibold text-ink">Password</span>
                <Link
                  to="/forgot-password"
                  className="text-[13px] font-semibold text-primary hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  className={`${inputClasses} pr-12`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex w-full flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="h-[52px] w-full rounded-xl bg-primary px-4 text-base font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60"
            >
              {isLoading ? 'Logging in...' : 'Log in to Studio'}
            </button>

            <div className="flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold text-muted">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <SocialAuthButtons />
          </div>

          <p className="w-full text-center text-sm text-muted">
            {`Don't have an account? `}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
