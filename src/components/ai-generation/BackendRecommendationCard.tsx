import { useState } from 'react'
import { Check, ChevronDown, Sparkles } from 'lucide-react'
import type { BackendOption, BackendRecommendationResult } from '../../models/AppGeneration'

interface BackendRecommendationCardProps {
  recommendation: BackendRecommendationResult
  chosenBackend: BackendOption | null
  onChange: (option: BackendOption) => void
}

export default function BackendRecommendationCard({
  recommendation,
  chosenBackend,
  onChange,
}: BackendRecommendationCardProps) {
  const [showAllOptions, setShowAllOptions] = useState(false)
  const chosen =
    recommendation.ranked.find((r) => r.option === chosenBackend) ?? recommendation.ranked[0]
  const isTopPick = chosen?.option === recommendation.ranked[0]?.option

  if (!chosen) return null

  return (
    <div className="flex w-full flex-col gap-4 rounded-[20px] border-2 border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-xs font-bold tracking-wide text-primary uppercase">
              {isTopPick ? 'AI-Recommended Backend' : 'Selected Backend'}
            </p>
          </div>
          <p className="text-xl font-bold text-ink">{chosen.name}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-2xl font-bold text-primary">{chosen.score}</p>
          <p className="text-xs text-muted">fit score</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {chosen.reasons.map((reason) => (
          <p key={reason} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-success" />
            {reason}
          </p>
        ))}
        {chosen.tradeoffs.map((tradeoff) => (
          <p key={tradeoff} className="flex items-start gap-2 text-sm text-muted">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted" />
            {tradeoff}
          </p>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowAllOptions((current) => !current)}
        className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-2 text-sm font-semibold text-ink"
      >
        Change backend
        <ChevronDown className={`size-4 transition-transform ${showAllOptions ? 'rotate-180' : ''}`} />
      </button>

      {showAllOptions && (
        <div className="flex w-full flex-col gap-2">
          {recommendation.ranked.map((option) => (
            <button
              key={option.option}
              type="button"
              onClick={() => {
                onChange(option.option)
                setShowAllOptions(false)
              }}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left ${
                option.option === chosenBackend
                  ? 'border-primary bg-primary-tint'
                  : 'border-border hover:bg-canvas'
              }`}
            >
              <span className="text-sm font-medium text-ink">{option.name}</span>
              <span className="text-sm font-semibold text-muted">{option.score}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
