import type { ComponentSchema } from './component-schema'

export interface ScreenSchema {
  id: string
  name: string
  route: string
  components: ComponentSchema[]
}
