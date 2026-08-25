// Net-new: no frontend equivalent exists yet. Backs the `organizations` and
// `project_members` tables in infrastructure/database/schema.sql.

export type MemberRole = 'owner' | 'editor' | 'viewer'

export interface Organization {
  id: string
  name: string
  ownerId: string
  createdAt: string
}

export interface ProjectMember {
  id: string
  projectId: string
  userId: string
  role: MemberRole
}
