import type { UserRole } from '@app-builder/shared-types'

export class UpdateUserDto {
  name?: string
  email?: string
  avatarUrl?: string
  role?: UserRole
}
