import type { GeneratedScreen, ScreenWireframeVariant } from '../../models/AppGeneration'

function WireframeBody({ variant }: { variant: ScreenWireframeVariant }) {
  if (variant === 'stats-grid') {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-canvas" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 w-full rounded bg-canvas" style={{ width: `${90 - i * 15}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'calendar') {
    return (
      <div className="grid w-full grid-cols-7 gap-1.5">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="aspect-square rounded bg-canvas" />
        ))}
      </div>
    )
  }

  if (variant === 'form' || variant === 'settings') {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="h-16 w-16 rounded-full bg-canvas" />
        {Array.from({ length: variant === 'settings' ? 4 : 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="h-2.5 w-24 rounded bg-canvas" />
            <div className="h-9 w-full rounded-lg bg-canvas" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 w-full rounded-lg bg-canvas" />
      ))}
    </div>
  )
}

interface ScreenWireframePreviewProps {
  screen: GeneratedScreen
}

export default function ScreenWireframePreview({ screen }: ScreenWireframePreviewProps) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border border-border">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-border bg-canvas px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-success" />
        <div className="ml-3 h-5 flex-1 rounded bg-white" />
      </div>
      <div className="flex w-full flex-col gap-4 p-6">
        <WireframeBody variant={screen.wireframeVariant} />
      </div>
    </div>
  )
}
