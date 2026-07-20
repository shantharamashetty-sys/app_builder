import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  Smartphone,
  Copy,
  Box,
  Database,
  Settings,
  type LucideIcon,
} from 'lucide-react'

interface NavItem {
  label: string
  icon: LucideIcon
  /** Omitted until the corresponding module gets a route. */
  path?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutGrid, path: '/' },
  { label: 'My Apps', icon: Smartphone },
  { label: 'Templates', icon: Copy },
  { label: 'Components', icon: Box },
  { label: 'Data Sources', icon: Database },
  { label: 'Settings', icon: Settings },
]

const baseItemClasses = 'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm'
const inactiveClasses = 'font-medium text-ink'
const activeClasses = 'bg-primary-tint font-semibold text-primary'

export default function Sidebar() {
  return (
    <nav className="flex h-full w-[280px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border bg-surface p-6">
      {NAV_ITEMS.map(({ label, icon: Icon, path }) =>
        path ? (
          <NavLink
            key={label}
            to={path}
            end
            className={({ isActive }) =>
              `${baseItemClasses} ${isActive ? activeClasses : `${inactiveClasses} hover:bg-canvas`}`
            }
          >
            <Icon className="size-[18px] shrink-0" />
            {label}
          </NavLink>
        ) : (
          <div key={label} className={`${baseItemClasses} ${inactiveClasses} opacity-50`}>
            <Icon className="size-[18px] shrink-0" />
            {label}
          </div>
        ),
      )}
    </nav>
  )
}
