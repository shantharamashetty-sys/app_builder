export type ProjectStatus = 'draft' | 'published' | 'archived'

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  accentColor: string
  ownerId: string
  updatedAt: string
}

export interface CreateProjectInput {
  name: string
  description?: string
  accentColor?: string
  ownerId: string
}

export interface UpdateProjectInput {
  name?: string
  description?: string
  status?: ProjectStatus
  accentColor?: string
}
