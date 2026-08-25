import { Check, Monitor, Smartphone, Globe, type LucideIcon } from 'lucide-react'
import type { PlatformOption, ProjectWizardDraft } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

const PLATFORM_ICONS: Record<ProjectWizardDraft['platform'], LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
}

interface PlatformStepProps {
  platforms: PlatformOption[]
  platform: ProjectWizardDraft['platform']
  setPlatform: (platform: ProjectWizardDraft['platform']) => void
  crossPlatform: boolean
  setCrossPlatform: (crossPlatform: boolean) => void
}

export default function PlatformStep({
  platforms,
  platform,
  setPlatform,
  crossPlatform,
  setCrossPlatform,
}: PlatformStepProps) {
  return (
    <StepCard title="Choose Your Platform">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          {platforms.map((option) => {
            const Icon = PLATFORM_ICONS[option.id]
            const isSelected = platform === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPlatform(option.id)}
                className={`relative flex flex-1 flex-col items-center gap-5 rounded-[20px] border-2 p-8 text-center ${
                  isSelected ? 'border-primary bg-surface' : 'border-border bg-surface'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 flex size-6 items-center justify-center rounded-xl bg-primary">
                    <Check className="size-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`flex size-16 items-center justify-center rounded-2xl ${
                    isSelected ? 'bg-primary-tint' : 'bg-canvas'
                  }`}
                >
                  <Icon className="size-8 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold text-ink">{option.name}</p>
                  <p className="text-sm text-muted">{option.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex w-full items-center justify-between gap-4 border-t border-border pt-8">
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-bold text-ink">Cross-platform</p>
            <p className="text-sm text-muted">Build for multiple platforms using the same logic?</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={crossPlatform}
            onClick={() => setCrossPlatform(!crossPlatform)}
            className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
              crossPlatform ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`size-4 rounded-full bg-white transition-transform ${
                crossPlatform ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </StepCard>
  )
}
