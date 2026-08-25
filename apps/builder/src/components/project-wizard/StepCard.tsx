import type { ReactNode } from 'react'

interface StepCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

/** Pure presentation: the white rounded card every wizard step's content sits in. */
export default function StepCard({ title, subtitle, children }: StepCardProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-10 rounded-[20px] border-2 border-border bg-surface p-6 sm:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-ink sm:text-[28px]">{title}</p>
        {subtitle && <p className="text-[15px] text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
