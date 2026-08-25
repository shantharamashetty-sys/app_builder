// Parallels DataModel/DataModelField/DataModelRelationship in apps/builder's
// AppGeneration.ts model — flagged here, not merged yet. That type describes what
// the AI-generation *view* renders today; this one is the portable schema shape a
// backend pipeline would produce and version.

export interface DataFieldSchema {
  name: string
  type: string
  constraint?: string
}

export interface DataRelationshipSchema {
  toModel: string
  kind: 'one-to-one' | 'one-to-many' | 'many-to-many'
  label: string
}

export interface DataSchema {
  id: string
  name: string
  fields: DataFieldSchema[]
  relationships: DataRelationshipSchema[]
}
