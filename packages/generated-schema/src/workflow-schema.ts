// Parallel to, not merged with, Workflow/WorkflowStep in @app-builder/shared-types:
// this is the AI-generation-time proposal, the other is the runtime/builder-time
// representation once a human has accepted and edited it.

export interface WorkflowStepSchema {
  id: string
  type: string
  config: Record<string, unknown>
}

export interface WorkflowSchema {
  id: string
  trigger: string
  steps: WorkflowStepSchema[]
}
