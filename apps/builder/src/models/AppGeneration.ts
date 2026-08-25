export type BackendOption =
  | 'supabase'
  | 'firebase'
  | 'postgresql'
  | 'mysql'
  | 'mongodb'
  | 'appwrite'
  | 'node-express'
  | 'nestjs'
  | 'dotnet'
  | 'django'
  | 'laravel'
  | 'hasura'
  | 'aws-amplify'

export type RequirementTag =
  | 'auth'
  | 'roles'
  | 'realtime'
  | 'fileStorage'
  | 'payments'
  | 'notifications'
  | 'search'
  | 'workflowAutomation'
  | 'offlineSync'
  | 'highScale'

export type RequirementCategory = 'core-features' | 'user-roles' | 'data-models' | 'integrations'

export interface RequirementBreakdownGroup {
  id: string
  category: RequirementCategory
  label: string
  items: string[]
}

export interface RequirementAnalysis {
  id: string
  promptText: string
  summaryQuote: string
  breakdown: RequirementBreakdownGroup[]
  detectedTags: RequirementTag[]
}

export interface BackendRecommendation {
  option: BackendOption
  name: string
  score: number
  reasons: string[]
  tradeoffs: string[]
}

export interface BackendRecommendationResult {
  ranked: BackendRecommendation[]
}

export type GenerationLayerId = 'architecture' | 'database' | 'components' | 'api'

export type GenerationLayerStatus = 'pending' | 'in-progress' | 'complete'

export interface GenerationLayer {
  id: GenerationLayerId
  label: string
  status: GenerationLayerStatus
  progress: number
}

export type GenerationLogLevel = 'info' | 'success' | 'warning' | 'command'

export interface GenerationLogEntry {
  id: string
  level: GenerationLogLevel
  message: string
}

export interface GenerationProgressSnapshot {
  layers: GenerationLayer[]
  overallProgress: number
  currentActivity: string
  log: GenerationLogEntry[]
  isComplete: boolean
}

export interface ArchitecturePageNode {
  id: string
  label: string
  iconName: string
  components: string[]
}

export interface DataModelField {
  name: string
  type: string
  constraint?: string
}

export interface DataModelRelationship {
  toModel: string
  kind: 'one-to-one' | 'one-to-many' | 'many-to-many'
  label: string
}

export interface DataModel {
  id: string
  name: string
  fields: DataModelField[]
  relationships: DataModelRelationship[]
}

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiEndpoint {
  id: string
  method: ApiMethod
  path: string
  description: string
  authRequired: boolean
}

export interface GeneratedComponentEntry {
  id: string
  name: string
  usedIn: string
}

export interface GeneratedArchitecture {
  pages: ArchitecturePageNode[]
  dataModels: DataModel[]
  apiEndpoints: ApiEndpoint[]
  components: GeneratedComponentEntry[]
}

export type ScreenWireframeVariant = 'stats-grid' | 'list' | 'calendar' | 'form' | 'settings'

export interface GeneratedScreen {
  id: string
  name: string
  description: string
  wireframeVariant: ScreenWireframeVariant
}

export type AppGenerationStep =
  | 'prompt'
  | 'understanding'
  | 'progress'
  | 'architecture'
  | 'screens'
  | 'confirm'

export type ArchitectureTab = 'architecture' | 'database' | 'api' | 'components'

export interface GenerationSummary {
  screensCount: number
  componentsCount: number
  dataModelsCount: number
  elapsedSeconds: number
}
