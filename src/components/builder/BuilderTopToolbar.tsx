import { ChevronDown, Minus, Monitor, Plus, Redo2, Smartphone, Tablet, Undo2, User } from 'lucide-react'
import type { DeviceMode, Page } from '../../models'

interface BuilderTopToolbarProps {
  projectName: string
  pages: Page[]
  activePageId: string
  onSelectPage: (pageId: string) => void
  deviceMode: DeviceMode
  onDeviceModeChange: (mode: DeviceMode) => void
  zoomPercent: number
  onZoomIn: () => void
  onZoomOut: () => void
}

const deviceOptions: { mode: DeviceMode; icon: typeof Monitor; label: string }[] = [
  { mode: 'desktop', icon: Monitor, label: 'Desktop preview' },
  { mode: 'tablet', icon: Tablet, label: 'Tablet preview' },
  { mode: 'mobile', icon: Smartphone, label: 'Mobile preview' },
]

export default function BuilderTopToolbar({
  projectName,
  pages,
  activePageId,
  onSelectPage,
  deviceMode,
  onDeviceModeChange,
  zoomPercent,
  onZoomIn,
  onZoomOut,
}: BuilderTopToolbarProps) {
  return (
    <header className="flex h-[52px] w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#0d0d1a] px-4">
      <div className="flex shrink-0 items-center gap-6">
        <div className="flex shrink-0 cursor-default items-center gap-2">
          <p className="whitespace-nowrap text-sm font-semibold text-white">{projectName}</p>
          <ChevronDown className="size-3.5 text-white/60" />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {pages.map((page) => {
            const isActive = page.id === activePageId
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => onSelectPage(page.id)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] ${
                  isActive
                    ? 'bg-primary font-semibold text-white'
                    : 'bg-white/5 font-medium text-white/70 hover:bg-white/10'
                }`}
              >
                {page.name}
              </button>
            )
          })}
          <div className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-white/40">
            <Plus className="size-3.5" />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-5">
        <div className="flex shrink-0 items-center gap-2 text-white/60">
          <Undo2 className="size-[18px]" />
          <Redo2 className="size-[18px]" />
        </div>
        <div className="h-5 w-px shrink-0 bg-white/15" />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={onZoomOut}
            className="flex size-[18px] items-center justify-center text-white/60 hover:text-white"
          >
            <Minus className="size-3.5" />
          </button>
          <p className="whitespace-nowrap font-mono text-xs font-semibold text-white">{zoomPercent}%</p>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={onZoomIn}
            className="flex size-[18px] items-center justify-center text-white/60 hover:text-white"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
        <div className="h-5 w-px shrink-0 bg-white/15" />
        <div className="flex shrink-0 items-center gap-3">
          {deviceOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              type="button"
              aria-label={label}
              onClick={() => onDeviceModeChange(mode)}
              className={deviceMode === mode ? 'text-primary' : 'text-white/50 hover:text-white/80'}
            >
              <Icon className="size-[18px]" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-[13px] font-semibold text-white">
          Preview
        </div>
        <div className="rounded-lg bg-primary px-3 py-1.5 text-[13px] font-semibold text-white">Publish</div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <User className="size-4 text-white/70" />
        </div>
      </div>
    </header>
  )
}
