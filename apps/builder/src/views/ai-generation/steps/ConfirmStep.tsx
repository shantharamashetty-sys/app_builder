import { CheckCircle2, Eye, WandSparkles } from 'lucide-react'
import type { GenerationSummary } from '../../../models/AppGeneration'
import GenerationSummaryStats from '../../../components/ai-generation/GenerationSummaryStats'

interface ConfirmStepProps {
  summary: GenerationSummary
  onDone: () => void
}

export default function ConfirmStep({ summary, onDone }: ConfirmStepProps) {
  return (
    <div className="flex w-full flex-1 items-center justify-center bg-canvas p-6 sm:p-10">
      <div className="flex w-full max-w-[820px] flex-col items-center gap-6 rounded-[20px] border-2 border-border bg-surface p-8 sm:p-12">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-tint">
          <CheckCircle2 className="size-8 text-success" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-2xl font-bold text-ink">Your App is Ready!</p>
          <p className="text-sm text-muted">
            Generated in {summary.elapsedSeconds} seconds — fully structured and ready to customize
          </p>
        </div>

        <GenerationSummaryStats
          screensCount={summary.screensCount}
          componentsCount={summary.componentsCount}
          dataModelsCount={summary.dataModelsCount}
        />

        <div className="w-full border-t border-border" />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary bg-primary-tint p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                <WandSparkles className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Open in Builder</p>
                <p className="text-xs text-muted">Customize your app visually</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onDone}
              className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Open Builder
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-canvas">
                <Eye className="size-5 text-ink" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Preview App</p>
                <p className="text-xs text-muted">See a live preview</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onDone}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-ink"
            >
              View Preview
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-muted">
          <button type="button">Share</button>
          <button type="button">Download ZIP</button>
          <button type="button" onClick={onDone}>
            Save to Dashboard
          </button>
        </div>
        <p className="text-xs text-muted">Powered by AppBuilder AI</p>
      </div>
    </div>
  )
}
