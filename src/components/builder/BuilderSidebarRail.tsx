import { Database, LayoutGrid, Layers, Settings, type LucideIcon } from 'lucide-react'

export type BuilderRailTab = 'widgets' | 'layers'

interface BuilderSidebarRailProps {
  activeTab: BuilderRailTab
  onTabChange: (tab: BuilderRailTab) => void
}

const RAIL_TABS: { tab: BuilderRailTab; icon: LucideIcon; label: string }[] = [
  { tab: 'widgets', icon: LayoutGrid, label: 'Widgets' },
  { tab: 'layers', icon: Layers, label: 'Layers' },
]

export default function BuilderSidebarRail({ activeTab, onTabChange }: BuilderSidebarRailProps) {
  return (
    <nav className="flex h-full w-16 shrink-0 flex-col items-center gap-2 border-r border-white/10 bg-[#0d0d1a] py-4">
      {RAIL_TABS.map(({ tab, icon: Icon, label }) => {
        const isActive = tab === activeTab
        return (
          <button
            key={tab}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => onTabChange(tab)}
            className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
              isActive ? 'bg-primary text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <Icon className="size-[18px]" />
          </button>
        )
      })}
      {/* Database and Settings panels don't exist yet — rendered for visual parity with the
          design's 4-icon rail, but intentionally not clickable. */}
      <div className="flex size-10 cursor-default items-center justify-center rounded-xl text-white/30">
        <Database className="size-[18px]" />
      </div>
      <div className="flex size-10 cursor-default items-center justify-center rounded-xl text-white/30">
        <Settings className="size-[18px]" />
      </div>
    </nav>
  )
}
