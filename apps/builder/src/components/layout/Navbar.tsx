import { useState } from 'react'
import { Search, Bell, Menu, LogOut } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
  onLogout: () => void
}

export default function Navbar({ onMenuClick, onLogout }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="flex h-[72px] w-full shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4 sm:px-6">
      <div className="flex min-w-0 shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border lg:hidden"
        >
          <Menu className="size-[18px] text-ink" />
        </button>
        <div className="h-9 w-[52px] shrink-0 rounded-[10px] bg-primary" />
        <p className="hidden whitespace-nowrap text-[22px] font-extrabold text-ink sm:block">
          AppBuilder
        </p>
      </div>

      <div className="hidden h-11 max-w-[480px] flex-1 items-center gap-3 rounded-xl border border-border bg-canvas px-4 md:flex">
        <Search className="size-[18px] shrink-0 text-muted" />
        <input
          type="text"
          placeholder="Search projects, components, or help..."
          className="w-full bg-transparent text-sm text-muted placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Search"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface md:hidden"
        >
          <Search className="size-[18px] text-ink" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface"
        >
          <Bell className="size-[18px] text-ink" />
        </button>
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
            onClick={() => setIsProfileOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
          >
            CS
          </button>
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false)
                    onLogout()
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-ink hover:bg-canvas"
                >
                  <LogOut className="size-4 shrink-0" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
