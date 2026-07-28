import { Check, MonitorSmartphone } from 'lucide-react'
import type { GeneratedScreen } from '../../models/AppGeneration'

interface ScreenThumbnailListProps {
  screens: GeneratedScreen[]
  selectedScreenId: string | null
  acceptedScreenIds: Set<string>
  onSelect: (id: string) => void
}

export default function ScreenThumbnailList({
  screens,
  selectedScreenId,
  acceptedScreenIds,
  onSelect,
}: ScreenThumbnailListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {screens.map((screen) => {
        const isSelected = screen.id === selectedScreenId
        const isAccepted = acceptedScreenIds.has(screen.id)
        return (
          <button
            key={screen.id}
            type="button"
            onClick={() => onSelect(screen.id)}
            className={`flex w-full flex-col gap-2 rounded-xl border-2 p-2 text-left ${
              isSelected ? 'border-primary' : 'border-transparent'
            }`}
          >
            <div className="relative flex h-20 w-full items-center justify-center rounded-lg bg-primary/80">
              <MonitorSmartphone className="size-6 text-white/70" />
              {isAccepted && (
                <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-success text-white">
                  <Check className="size-3" />
                </span>
              )}
            </div>
            <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-ink'}`}>
              {screen.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
