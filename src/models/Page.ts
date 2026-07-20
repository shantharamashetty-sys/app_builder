import type { Widget } from './Widget'

export interface Page {
  id: string
  projectId: string
  name: string
  path: string
  widgets: Widget[]
}
