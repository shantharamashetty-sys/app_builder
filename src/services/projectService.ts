import type { CreateProjectInput, Project, UpdateProjectInput } from '../models/Project'
import { mockDelay } from './mockDelay'

/**
 * All data access for Project goes through this module. Every function
 * returns a Promise so views/hooks never need to change when this is
 * rewired from the in-memory array below to real HTTP calls — only the
 * function bodies here would change (e.g. `fetch(`${API_BASE_URL}/projects`)`).
 */

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
  {
    id: 'proj_2',
    name: 'Task Manager Pro',
    description: 'Kanban-style task and sprint tracker.',
    status: 'draft',
    accentColor: '#dbeafe',
    ownerId: 'user_1',
    updatedAt: '2026-07-19T09:30:00.000Z',
  },
  {
    id: 'proj_3',
    name: 'E-commerce Storefront',
    description: 'Storefront with cart and checkout flow.',
    status: 'published',
    accentColor: '#dcfce7',
    ownerId: 'user_1',
    updatedAt: '2026-07-17T18:15:00.000Z',
  },
  {
    id: 'proj_4',
    name: 'Marketing Landing Page',
    description: 'Single-page site for a product launch.',
    status: 'archived',
    accentColor: '#f3e8ff',
    ownerId: 'user_1',
    updatedAt: '2026-07-08T11:00:00.000Z',
  },
]

export async function getProjects(): Promise<Project[]> {
  return mockDelay([...projects])
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return mockDelay(projects.find((project) => project.id === id))
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
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
  return mockDelay(project)
}

export async function updateProject(id: string, updates: UpdateProjectInput): Promise<Project> {
  const existing = projects.find((project) => project.id === id)
  if (!existing) {
    throw new Error(`Project not found: ${id}`)
  }
  const updated: Project = { ...existing, ...updates, updatedAt: new Date().toISOString() }
  projects = projects.map((project) => (project.id === id ? updated : project))
  return mockDelay(updated)
}

export async function deleteProject(id: string): Promise<void> {
  projects = projects.filter((project) => project.id !== id)
  return mockDelay(undefined)
}
