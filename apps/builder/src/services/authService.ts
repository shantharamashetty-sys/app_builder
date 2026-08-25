import type { LoginInput, SignupInput, User } from '../models/User'
import { mockDelay } from './mockDelay'

/**
 * All data access for auth goes through this module, same contract as
 * projectService: every function returns a Promise so hooks/views never
 * need to change when this is rewired to a real auth backend.
 */

let users: User[] = [
  { id: 'user_1', name: 'Alex Rivera', email: 'alex@company.com', role: 'owner' },
]

export async function login(input: LoginInput): Promise<User> {
  const user = users.find((existing) => existing.email === input.email)
  if (!user) {
    throw new Error('Invalid email or password.')
  }
  return mockDelay(user)
}

export async function signup(input: SignupInput): Promise<User> {
  if (users.some((existing) => existing.email === input.email)) {
    throw new Error('An account with this email already exists.')
  }
  const user: User = {
    id: `user_${users.length + 1}`,
    name: input.name,
    email: input.email,
    role: 'owner',
  }
  users = [...users, user]
  return mockDelay(user)
}

export async function requestPasswordReset(email: string): Promise<void> {
  void email
  return mockDelay(undefined)
}

export async function logout(): Promise<void> {
  return mockDelay(undefined, 150)
}
