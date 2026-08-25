import { Calendar, KanbanSquare, LayoutGrid, Settings, Users, type LucideIcon } from 'lucide-react'
import type { ArchitecturePageNode } from '../../models/AppGeneration'

const PAGE_ICON: Record<string, LucideIcon> = {
  LayoutGrid,
  KanbanSquare,
  Calendar,
  Users,
  Settings,
}

interface ArchitectureTreeProps {
  pages: ArchitecturePageNode[]
}

export default function ArchitectureTree({ pages }: ArchitectureTreeProps) {
  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white">App Root</div>
      <div className="h-8 w-px bg-border" />
      <div className="flex w-full border-t border-border">
        {pages.map((page) => {
          const Icon = PAGE_ICON[page.iconName] ?? LayoutGrid
          return (
            <div key={page.id} className="flex flex-1 flex-col items-center gap-3 pt-6">
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary-tint px-3 py-1.5">
                <Icon className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-ink">{page.label}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {page.components.map((component) => (
                  <span
                    key={component}
                    className="rounded-md bg-canvas px-2 py-1 text-center text-[11px] font-medium text-primary"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
