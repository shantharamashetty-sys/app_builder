import { Bell } from 'lucide-react'
import Logo from '../Logo'

/**
 * Pure presentation: the wizard's own minimal navbar (logo mark + bell +
 * avatar), swapped in place of AppLayout's Navbar/Sidebar since Module 03
 * is a full-bleed flow per the Figma spec, same treatment as Module 02/04.
 */
export default function WizardTopBar() {
  return (
    <header className="flex h-[72px] w-full shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <Logo variant="mark" className="h-[30px] w-auto" />
      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-10 items-center justify-center rounded-xl border border-border"
        >
          <Bell className="size-5 text-ink" />
        </button>
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          AR
        </div>
      </div>
    </header>
  )
}
