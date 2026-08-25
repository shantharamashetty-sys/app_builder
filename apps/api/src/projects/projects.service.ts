import { Injectable, NotFoundException } from '@nestjs/common'
import type { Project } from '@app-builder/shared-types'
import type { CreateProjectDto } from './dto/create-project.dto'
import type { UpdateProjectDto } from './dto/update-project.dto'

// In-memory mock data — same shape and pattern as
// apps/builder/src/services/projectService.ts. Swapping this for a real
// Postgres-backed repository (via ProjectEntity) only touches this file.
let projects: Project[] = [
  {
    id: 'proj_1',
    name: 'SaaS Dashboard v2',
    description: 'Analytics dashboard for a B2B SaaS product.',
    status: 'published',
    accentColor: '#ffedd5',
    ownerId: 'user_1',
    updatedAt: '2026-07-20T09:30:00.000Z',
  },
]

@Injectable()
export class ProjectsService {
  async findAll(): Promise<Project[]> {
    return [...projects]
  }

  async findOne(id: string): Promise<Project> {
    const project = projects.find((p) => p.id === id)
    if (!project) {
      throw new NotFoundException(`Project not found: ${id}`)
    }
    return project
  }

  async create(input: CreateProjectDto): Promise<Project> {
    const project: Project = {
      id: `proj_${Date.now()}`,
      name: input.name,
      description: input.description ?? '',
      status: 'draft',
      accentColor: input.accentColor ?? '#ececf1',
      ownerId: input.ownerId,
      updatedAt: new Date().toISOString(),
    }
    projects = [project, ...projects]
    return project
  }

  async update(id: string, updates: UpdateProjectDto): Promise<Project> {
    const existing = await this.findOne(id)
    const updated: Project = { ...existing, ...updates, updatedAt: new Date().toISOString() }
    projects = projects.map((p) => (p.id === id ? updated : p))
    return updated
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    projects = projects.filter((p) => p.id !== id)
  }
}
