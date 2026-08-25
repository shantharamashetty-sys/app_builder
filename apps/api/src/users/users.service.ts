import { Injectable, NotFoundException } from '@nestjs/common'
import type { User } from '@app-builder/shared-types'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'

// In-memory mock data, mirroring the pattern already used by
// apps/builder/src/services/*.ts — swapping this for a real Postgres-backed
// repository (via UserEntity) only touches this file, once TypeOrmModule is wired.
let users: User[] = [
  {
    id: 'user_1',
    name: 'Alex Rivera',
    email: 'alex@appbuilder.dev',
    role: 'owner',
  },
]

@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return [...users]
  }

  async findOne(id: string): Promise<User> {
    const user = users.find((u) => u.id === id)
    if (!user) {
      throw new NotFoundException(`User not found: ${id}`)
    }
    return user
  }

  async create(input: CreateUserDto): Promise<User> {
    const user: User = {
      id: `user_${Date.now()}`,
      name: input.name,
      email: input.email,
      avatarUrl: input.avatarUrl,
      role: input.role,
    }
    users = [...users, user]
    return user
  }

  async update(id: string, updates: UpdateUserDto): Promise<User> {
    const existing = await this.findOne(id)
    const updated: User = { ...existing, ...updates }
    users = users.map((u) => (u.id === id ? updated : u))
    return updated
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    users = users.filter((u) => u.id !== id)
  }
}
