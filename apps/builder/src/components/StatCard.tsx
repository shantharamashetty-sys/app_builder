import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  delta: string
  deltaColorClassName: string
  tintClassName: string
  icon: LucideIcon
}

/** Pure presentation: a single dashboard metric tile, fed by props. */
export default function StatCard({
  label,
  value,
  delta,
  deltaColorClassName,
  tintClassName,
  icon: Icon,
}: StatCardProps) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col gap-4 rounded-[20px] border-2 border-border p-6 ${tintClassName}`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-sm font-semibold whitespace-nowrap text-muted uppercase">{label}</p>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface">
          <Icon className="size-[18px] text-ink" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-[32px] font-bold text-ink">{value}</p>
        <div className="flex items-center gap-1 text-xs">
          <span className={`font-semibold ${deltaColorClassName}`}>{delta}</span>
          <span className="text-muted">vs last month</span>
        </div>
      </div>
    </div>
  )
}
