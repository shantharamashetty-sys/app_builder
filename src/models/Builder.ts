import type { Page } from './Page'
import type { WidgetType } from './Widget'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export type WidgetLibraryCategory = 'layout' | 'ui' | 'data' | 'charts'

export interface WidgetLibraryItem {
  id: string
  type: WidgetType
  name: string
  description: string
  category: WidgetLibraryCategory
}

export interface BuilderDocument {
  projectId: string
  projectName: string
  pages: Page[]
  activePageId: string
}
