// Shaped deliberately close to `Widget` in @app-builder/shared-types — a builder
// widget tree and a generated component tree are conceptually the same node shape.
// Kept as a separate type for now rather than merged: this one is the AI-generation-
// time representation (produced by a pipeline, not yet placed on a canvas).

export interface ComponentSchema {
  id: string
  type: string
  props: Record<string, unknown>
  children?: ComponentSchema[]
}
