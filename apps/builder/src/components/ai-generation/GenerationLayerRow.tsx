import { Circle, Diamond, Grid2x2, Square, type LucideIcon } from 'lucide-react'
import type { GenerationLayer } from '../../models/AppGeneration'

const LAYER_ICON: Record<GenerationLayer['id'], LucideIcon> = {
  architecture: Circle,
  database: Diamond,
  components: Square,
  api: Grid2x2,
}

const STATUS_LABEL: Record<GenerationLayer['status'], string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  complete: 'Done',
}

const STATUS_BADGE_CLASS: Record<GenerationLayer['status'], string> = {
  pending: 'bg-white/10 text-white/50',
  'in-progress': 'bg-primary/20 text-primary',
  complete: 'bg-success/20 text-success',
}

const STATUS_BAR_CLASS: Record<GenerationLayer['status'], string> = {
  pending: 'bg-white/20',
  'in-progress': 'bg-primary',
  complete: 'bg-success',
}

interface GenerationLayerRowProps {
  layer: GenerationLayer
}

export default function GenerationLayerRow({ layer }: GenerationLayerRowProps) {
  const Icon = LAYER_ICON[layer.id]

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          <Icon className="size-4 text-white/60" />
          {layer.label}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE_CLASS[layer.status]}`}
        >
          {STATUS_LABEL[layer.status]}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${STATUS_BAR_CLASS[layer.status]}`}
          style={{ width: `${layer.progress}%` }}
        />
      </div>
    </div>
  )
}
