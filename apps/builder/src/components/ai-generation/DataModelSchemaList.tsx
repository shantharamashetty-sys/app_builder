import type { DataModel } from '../../models/AppGeneration'

interface DataModelSchemaListProps {
  dataModels: DataModel[]
}

export default function DataModelSchemaList({ dataModels }: DataModelSchemaListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {dataModels.map((model) => (
        <div key={model.id} className="flex flex-col gap-3 rounded-xl border border-border p-4">
          <p className="text-sm font-bold text-ink">{model.name}</p>
          <div className="flex flex-col gap-1">
            {model.fields.map((field) => (
              <div key={field.name} className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-ink">{field.name}</span>
                <span className="font-mono text-muted">
                  {field.type}
                  {field.constraint ? ` · ${field.constraint}` : ''}
                </span>
              </div>
            ))}
          </div>
          {model.relationships.length > 0 && (
            <div className="flex flex-col gap-1 border-t border-border pt-2">
              {model.relationships.map((rel) => (
                <p key={`${rel.toModel}-${rel.label}`} className="text-xs text-muted">
                  → <span className="font-semibold text-primary">{rel.toModel}</span> ({rel.kind}) —{' '}
                  {rel.label}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
