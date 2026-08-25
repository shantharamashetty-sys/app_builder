export interface WorkflowStep {
  id: string
  type: string
  config: Record<string, unknown>
}

export interface Workflow {
  id: string
  projectId: string
  name: string
  trigger: string
  steps: WorkflowStep[]
}
