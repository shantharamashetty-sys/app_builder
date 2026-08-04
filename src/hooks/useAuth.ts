import { useCallback, useState } from 'react'
import type { LoginInput, SignupInput, User } from '../models/User'
import * as authService from '../services/authService'

interface UseAuthResult {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (input: LoginInput) => Promise<User>
  signup: (input: SignupInput) => Promise<User>
  requestPasswordReset: (email: string) => Promise<void>
}

function messageFor(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback
}

/**
 * Controller for the auth domain: owns loading/error state and mediates
 * between authService and any view that needs to log in, sign up, or reset
 * a password. Views should never import authService directly.
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (input: LoginInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await authService.login(input)
      setUser(result)
      return result
    } catch (err) {
      setError(messageFor(err, 'Failed to log in.'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (input: SignupInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await authService.signup(input)
      setUser(result)
      return result
    } catch (err) {
      setError(messageFor(err, 'Failed to create account.'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const requestPasswordReset = useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.requestPasswordReset(email)
    } catch (err) {
      setError(messageFor(err, 'Failed to send reset link.'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { user, isLoading, error, login, signup, requestPasswordReset }
}
