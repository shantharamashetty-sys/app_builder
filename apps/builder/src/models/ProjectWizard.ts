export type ProjectPlatform = 'web' | 'mobile' | 'desktop'
export type ProjectCategory = 'dashboard' | 'ecommerce' | 'blog' | 'saas' | 'social' | 'custom'
export type ProjectStartingPoint = 'ai' | 'template' | 'blank'
export type ProjectVisibility = 'public' | 'private'

export interface PlatformOption {
  id: ProjectPlatform
  name: string
  description: string
}

export interface CategoryOption {
  id: ProjectCategory
  name: string
}

export interface ThemeOption {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

export interface BackendDatabaseOption {
  id: string
  name: string
  description: string
  recommended?: boolean
}

export interface BackendAuthOption {
  id: string
  name: string
  description: string
}

export interface ProjectWizardOptions {
  platforms: PlatformOption[]
  categories: CategoryOption[]
  themes: ThemeOption[]
  databases: BackendDatabaseOption[]
  authMethods: BackendAuthOption[]
}

export interface ProjectWizardDraft {
  name: string
  slug: string
  isSlugEdited: boolean
  description: string
  visibility: ProjectVisibility
  platform: ProjectPlatform
  crossPlatform: boolean
  category: ProjectCategory
  startingPoint: ProjectStartingPoint
  aiPrompt: string
  themeId: string
  databaseId: string
  authId: string
}
