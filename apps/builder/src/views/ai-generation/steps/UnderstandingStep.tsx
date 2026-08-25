import { useEffect, useState } from 'react'
import { BrainCircuit } from 'lucide-react'
import type { RequirementAnalysis } from '../../../models/AppGeneration'
import RequirementBreakdownList from '../../../components/ai-generation/RequirementBreakdownList'

interface UnderstandingStepProps {
  analysis: RequirementAnalysis
  onContinue: () => void
}

export default function UnderstandingStep({ analysis, onContinue }: UnderstandingStepProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(false)
    const timeoutId = setTimeout(() => setIsReady(true), 1200)
    return () => clearTimeout(timeoutId)
  }, [analysis.id])

  return (
    <div className="flex w-full flex-1 items-center justify-center p-6 sm:p-16">
      <div className="flex w-full max-w-[640px] flex-col gap-8 rounded-2xl border border-primary/40 bg-[#0f0f1e] p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary">
            <BrainCircuit className="size-8 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">AI is analyzing your idea...</p>
        </div>

        <p className="rounded-xl bg-white/5 p-4 text-sm text-white/70 italic">
          "{analysis.summaryQuote}"
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold text-white">Breaking it down:</p>
          <RequirementBreakdownList groups={analysis.breakdown} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-white/50">
            <span
              className={`size-2 rounded-full bg-primary ${isReady ? '' : 'animate-pulse'}`}
            />
            {isReady ? 'Architecture ready' : 'Generating architecture...'}
          </p>
          <button
            type="button"
            onClick={onContinue}
            disabled={!isReady}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
