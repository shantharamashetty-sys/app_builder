export type UserRole = 'owner' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: UserRole
}
