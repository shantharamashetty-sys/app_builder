import type { ProjectStatus } from '@app-builder/shared-types'

export class UpdateProjectDto {
  name?: string
  description?: string
  status?: ProjectStatus
  accentColor?: string
}
