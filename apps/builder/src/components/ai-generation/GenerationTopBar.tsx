interface GenerationTopBarProps {
  variant: 'dark' | 'light'
  userName?: string
}

/**
 * Minimal chrome for the Module 04 wizard: logo + current-user pill only, no
 * search or sidebar. Swapped in place of AppLayout's Navbar/Sidebar because
 * this flow is a full-bleed, focused experience per the Figma spec.
 */
export default function GenerationTopBar({ variant, userName = 'Alex Rivera' }: GenerationTopBarProps) {
  const isDark = variant === 'dark'
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <header
      className={`flex h-20 w-full shrink-0 items-center justify-between border-b px-6 sm:px-10 ${
        isDark ? 'border-white/10 bg-[#0d0d1a]' : 'border-border bg-surface'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="h-9 w-[52px] shrink-0 rounded-[10px] bg-primary" />
        <p
          className={`whitespace-nowrap text-[22px] font-extrabold ${isDark ? 'text-white' : 'text-ink'}`}
        >
          AppBuilder
        </p>
      </div>
      <div
        className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 ${
          isDark ? 'border-white/20' : 'border-border'
        }`}
      >
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-ink'}`}>{userName}</span>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
          {initials}
        </div>
      </div>
    </header>
  )
}
