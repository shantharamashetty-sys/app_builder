import type { ReactNode } from 'react'
import { Pencil } from 'lucide-react'
import type { ProjectWizardDraft, ProjectWizardOptions } from '../../../models/ProjectWizard'
import type { WizardStep } from '../../../hooks/useProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

const STARTING_POINT_LABEL: Record<ProjectWizardDraft['startingPoint'], string> = {
  ai: 'AI Generated',
  template: 'From Template',
  blank: 'Blank Canvas',
}

interface ReviewSectionProps {
  title: string
  onEdit: () => void
  children: ReactNode
}

function ReviewSection({ title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-bold text-ink">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <Pencil className="size-3.5" />
          Edit
        </button>
      </div>
      {children}
    </div>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-lg bg-primary-tint px-3 py-1.5 text-sm font-semibold text-primary">{children}</span>
  )
}

interface ReviewStepProps {
  draft: ProjectWizardDraft
  options: ProjectWizardOptions | null
  onEdit: (step: WizardStep) => void
}

export default function ReviewStep({ draft, options, onEdit }: ReviewStepProps) {
  const platformName = options?.platforms.find((option) => option.id === draft.platform)?.name ?? draft.platform
  const categoryName = options?.categories.find((option) => option.id === draft.category)?.name ?? draft.category
  const theme = options?.themes.find((option) => option.id === draft.themeId)
  const database = options?.databases.find((option) => option.id === draft.databaseId)
  const auth = options?.authMethods.find((option) => option.id === draft.authId)

  return (
    <StepCard title="Review & Create" subtitle="Check your project summary before we start the build">
      <div className="flex flex-col gap-6">
        <ReviewSection title="Project Details" onEdit={() => onEdit('details')}>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-ink">{draft.name || 'Untitled Project'}</p>
            <Badge>{draft.visibility === 'private' ? 'Private' : 'Public'}</Badge>
          </div>
        </ReviewSection>

        <ReviewSection title="Platform" onEdit={() => onEdit('platform')}>
          <Badge>{platformName}</Badge>
        </ReviewSection>

        <ReviewSection title="Category" onEdit={() => onEdit('category')}>
          <Badge>{categoryName}</Badge>
        </ReviewSection>

        <ReviewSection title="Starting Point" onEdit={() => onEdit('starting-point')}>
          <div className="flex flex-col gap-2">
            <Badge>{STARTING_POINT_LABEL[draft.startingPoint]}</Badge>
            {draft.startingPoint === 'ai' && draft.aiPrompt && (
              <p className="text-sm text-muted italic">&ldquo;{draft.aiPrompt}&rdquo;</p>
            )}
          </div>
        </ReviewSection>

        {theme && (
          <ReviewSection title="Theme" onEdit={() => onEdit('theme')}>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold text-ink">{theme.name}</p>
              <div className="flex gap-2">
                {[theme.primaryColor, theme.secondaryColor, theme.accentColor].map((color) => (
                  <span
                    key={color}
                    className="size-6 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </ReviewSection>
        )}

        <ReviewSection title="Backend" onEdit={() => onEdit('backend')}>
          <div className="flex flex-wrap gap-2">
            {database && <Badge>{database.name}</Badge>}
            {auth && <Badge>{auth.name}</Badge>}
          </div>
        </ReviewSection>
      </div>
    </StepCard>
  )
}
