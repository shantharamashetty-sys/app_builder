export type UserRole = 'owner' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
}

export interface LoginInput {
  email: string
  password: string
}

export interface SignupInput {
  name: string
  email: string
  password: string
}
