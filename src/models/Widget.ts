export type WidgetType =
  | 'button'
  | 'text'
  | 'image'
  | 'input'
  | 'container'

export interface Widget {
  id: string
  type: WidgetType
  props: Record<string, unknown>
  children?: Widget[]
}
