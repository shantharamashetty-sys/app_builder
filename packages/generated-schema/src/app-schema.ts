import type { ScreenSchema } from './screen-schema'
import type { WorkflowSchema } from './workflow-schema'
import type { DataSchema } from './data-schema'
import type { ThemeSchema } from './theme-schema'

// The App Schema: the versioned, inspectable artifact an AI generation pipeline
// produces from a prompt. Code/UI is rendered from this, never generated directly
// from the prompt — see the "App Schema philosophy" section in CLAUDE.md. Each
// snapshot of this shape maps to one row in app_versions
// (infrastructure/database/schema.sql).
export interface AppSchema {
  id: string
  projectId: string
  version: number
  screens: ScreenSchema[]
  theme: ThemeSchema
  dataSources: DataSchema[]
  workflows: WorkflowSchema[]
}
