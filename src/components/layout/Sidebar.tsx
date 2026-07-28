import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  Smartphone,
  Copy,
  Box,
  Database,
  Settings,
  X,
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

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Below `lg`, renders as a slide-in drawer with a backdrop, toggled by
 * Navbar's hamburger button. At `lg` and up it sits statically in the flex
 * row next to main content, always visible.
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <nav
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border bg-surface p-6 transition-transform duration-200 ease-out lg:static lg:z-auto lg:h-auto lg:self-stretch lg:translate-x-0 lg:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mb-2 flex size-9 shrink-0 items-center justify-center self-end rounded-lg text-muted lg:hidden"
        >
          <X className="size-5" />
        </button>
        {NAV_ITEMS.map(({ label, icon: Icon, path }) =>
          path ? (
            <NavLink
              key={label}
              to={path}
              end
              onClick={onClose}
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
    </>
  )
}
