interface OverallProgressRingProps {
  percent: number
  label: string
  sublabel: string
  ringColorVar?: string
  trackColorVar?: string
  variant?: 'light' | 'dark'
}

/**
 * Conic-gradient donut, parameterized so both the light Dashboard
 * (Deployment Status) and the dark Module 04 progress screen can share one
 * implementation instead of two copies of the same CSS trick.
 */
export default function OverallProgressRing({
  percent,
  label,
  sublabel,
  ringColorVar = 'var(--color-success)',
  trackColorVar = 'var(--color-border)',
  variant = 'light',
}: OverallProgressRingProps) {
  const isDark = variant === 'dark'

  return (
    <div
      className="relative flex size-[120px] shrink-0 items-center justify-center rounded-full"
      style={{ background: `conic-gradient(${ringColorVar} ${percent}%, ${trackColorVar} 0)` }}
    >
      <div
        className={`flex size-[96px] flex-col items-center justify-center gap-0.5 rounded-full ${
          isDark ? 'bg-[#0d0d1a]' : 'bg-surface'
        }`}
      >
        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-ink'}`}>{label}</p>
        <p className={`text-[10px] font-semibold uppercase ${isDark ? 'text-white/50' : 'text-muted'}`}>
          {sublabel}
        </p>
      </div>
    </div>
  )
}
