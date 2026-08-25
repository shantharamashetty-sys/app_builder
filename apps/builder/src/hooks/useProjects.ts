import { useCallback, useEffect, useState } from 'react'
import type { CreateProjectInput, Project } from '../models/Project'
import * as projectService from '../services/projectService'

interface UseProjectsResult {
  projects: Project[]
  isLoading: boolean
  error: string | null
  createProject: (input: CreateProjectInput) => Promise<void>
  refetch: () => Promise<void>
}

/**
 * Controller for the Project domain: owns loading/error state and mediates
 * between projectService and any view that needs project data. Views should
 * never import projectService directly — they go through this hook.
 */
export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await projectService.getProjects()
      setProjects(result)
    } catch {
      setError('Failed to load projects.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  const createProject = useCallback(
    async (input: CreateProjectInput) => {
      await projectService.createProject(input)
      await fetchProjects()
    },
    [fetchProjects],
  )

  return { projects, isLoading, error, createProject, refetch: fetchProjects }
}
