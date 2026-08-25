import { Check } from 'lucide-react'

interface WizardStepperProps {
  labels: string[]
  currentIndex: number
}

/** Pure presentation: the 7-step progress bar shared by every wizard page. */
export default function WizardStepper({ labels, currentIndex }: WizardStepperProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 py-8">
      {labels.map((label, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isDone = isCompleted || isCurrent

        return (
          <div key={label} className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-2xl ${
                  isDone ? 'bg-primary' : 'border border-border bg-surface'
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4 text-white" />
                ) : (
                  <span className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-muted'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={`text-sm whitespace-nowrap ${isDone ? 'font-bold text-ink' : 'font-medium text-muted'}`}>
                {label}
              </span>
            </div>
            {index < labels.length - 1 && <div className="h-0.5 w-10 shrink-0 bg-border" />}
          </div>
        )
      })}
    </div>
  )
}
