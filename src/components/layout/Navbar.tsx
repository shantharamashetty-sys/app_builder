import { Search, Bell } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="flex h-[72px] w-full shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <div className="flex shrink-0 items-center gap-4">
        <div className="h-9 w-[52px] rounded-[10px] bg-primary" />
        <p className="whitespace-nowrap text-[22px] font-extrabold text-ink">AppBuilder</p>
      </div>

      <div className="flex h-11 w-[480px] items-center gap-3 rounded-xl border border-border bg-canvas px-4">
        <Search className="size-[18px] shrink-0 text-muted" />
        <input
          type="text"
          placeholder="Search projects, components, or help..."
          className="w-full bg-transparent text-sm text-muted placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface"
        >
          <Bell className="size-[18px] text-ink" />
        </button>
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">
          CS
        </div>
      </div>
    </header>
  )
}
