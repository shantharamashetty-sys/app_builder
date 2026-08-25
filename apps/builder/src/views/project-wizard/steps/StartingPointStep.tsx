import { ChevronDown, ChevronUp, File, Info, Layout, Sparkles, type LucideIcon } from 'lucide-react'
import type { ProjectWizardDraft } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

const MAX_PROMPT_LENGTH = 500

const OPTIONS: {
  id: ProjectWizardDraft['startingPoint']
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    id: 'ai',
    icon: Sparkles,
    title: 'Generate with AI',
    description: 'Describe your app and let AI build the structure',
  },
  {
    id: 'template',
    icon: Layout,
    title: 'Browse Templates',
    description: 'Pick from our curated template library',
  },
  {
    id: 'blank',
    icon: File,
    title: 'Blank Canvas',
    description: 'Build from scratch with full control',
  },
]

interface StartingPointStepProps {
  startingPoint: ProjectWizardDraft['startingPoint']
  setStartingPoint: (startingPoint: ProjectWizardDraft['startingPoint']) => void
  aiPrompt: string
  setAiPrompt: (aiPrompt: string) => void
}

export default function StartingPointStep({
  startingPoint,
  setStartingPoint,
  aiPrompt,
  setAiPrompt,
}: StartingPointStepProps) {
  return (
    <StepCard title="How do you want to start?">
      <div className="flex flex-col gap-4">
        {OPTIONS.map((option) => {
          const isOpen = startingPoint === option.id
          const Icon = option.icon
          return (
            <div
              key={option.id}
              className={`flex flex-col rounded-2xl border-2 ${isOpen ? 'border-primary' : 'border-border'}`}
            >
              <button
                type="button"
                onClick={() => setStartingPoint(option.id)}
                className="flex w-full items-center gap-6 p-6 text-left"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-tint">
                  <Icon className="size-6 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-lg font-bold text-ink">{option.title}</p>
                  <p className="text-sm text-muted">{option.description}</p>
                </div>
                {isOpen ? (
                  <ChevronUp className="size-5 shrink-0 text-muted" />
                ) : (
                  <ChevronDown className="size-5 shrink-0 text-muted" />
                )}
              </button>

              {isOpen && option.id === 'ai' && (
                <div className="flex flex-col gap-3 px-6 pb-6">
                  <div className="rounded-xl border border-border bg-canvas p-4">
                    <textarea
                      value={aiPrompt}
                      onChange={(event) => setAiPrompt(event.target.value.slice(0, MAX_PROMPT_LENGTH))}
                      placeholder="A fitness tracking dashboard that connects to wearable devices..."
                      rows={4}
                      className="w-full resize-none bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] text-muted">
                      {aiPrompt.length} / {MAX_PROMPT_LENGTH} characters
                    </p>
                    <div className="flex items-center gap-1.5 text-[13px] text-muted">
                      <Info className="size-3.5" />
                      Be specific for better results
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-fit rounded-xl bg-primary-tint px-6 py-2.5 text-[15px] font-semibold text-primary"
                  >
                    Generate Preview
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </StepCard>
  )
}
