import type { UserRole } from '@app-builder/shared-types'

export class CreateUserDto {
  name!: string
  email!: string
  avatarUrl?: string
  role!: UserRole
}
