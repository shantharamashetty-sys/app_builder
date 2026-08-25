export type WidgetType =
  | 'container'
  | 'grid'
  | 'stack'
  | 'row'
  | 'button'
  | 'input'
  | 'text'
  | 'image'
  | 'card'
  | 'table'
  | 'list'
  | 'bar-chart'
  | 'line-chart'
  | 'pie-chart'
  | 'stat-card'

export interface WidgetPosition {
  x: number
  y: number
  width: number
  height: number
}

export interface Widget {
  id: string
  type: WidgetType
  name: string
  position: WidgetPosition
  props: Record<string, unknown>
  children?: Widget[]
}
