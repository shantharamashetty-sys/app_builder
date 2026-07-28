import type { GeneratedComponentEntry } from '../../models/AppGeneration'

interface ComponentInventoryListProps {
  components: GeneratedComponentEntry[]
}

export default function ComponentInventoryList({ components }: ComponentInventoryListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((component) => (
        <div
          key={component.id}
          className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5"
        >
          <span className="text-sm font-medium text-ink">{component.name}</span>
          <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-muted">
            {component.usedIn}
          </span>
        </div>
      ))}
    </div>
  )
}
