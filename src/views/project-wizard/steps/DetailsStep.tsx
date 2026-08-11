import { Globe, Lock } from 'lucide-react'
import type { ProjectWizardDraft } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

interface DetailsStepProps {
  draft: ProjectWizardDraft
  setName: (name: string) => void
  setSlug: (slug: string) => void
  setDescription: (description: string) => void
  setVisibility: (visibility: ProjectWizardDraft['visibility']) => void
}

export default function DetailsStep({
  draft,
  setName,
  setSlug,
  setDescription,
  setVisibility,
}: DetailsStepProps) {
  return (
    <StepCard title="Project Details" subtitle="Give your project a name and description">
      <div className="flex flex-col gap-8">
        <label className="flex w-full flex-col gap-2">
          <span className="text-sm font-semibold text-ink">
            Project Name<span className="text-red-500"> *</span>
          </span>
          <input
            type="text"
            required
            value={draft.name}
            onChange={(event) => setName(event.target.value)}
            placeholder="My Awesome App"
            className="h-[51px] w-full rounded-xl border border-border bg-surface px-4 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </label>

        <div className="flex w-full flex-col gap-2">
          <span className="text-sm font-semibold text-ink">Slug</span>
          <div className="flex h-[50px] w-full items-center gap-2 rounded-xl border border-border bg-surface px-4">
            <Lock className="size-4 shrink-0 text-muted" />
            <input
              type="text"
              value={draft.slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="my-awesome-app"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
          <p className="text-[13px] text-muted">The unique URL part for your application</p>
        </div>

        <label className="flex w-full flex-col gap-2">
          <span className="text-sm font-semibold text-ink">Description</span>
          <textarea
            value={draft.description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a brief summary of what your app does..."
            rows={4}
            className="w-full resize-none rounded-xl border border-border bg-surface p-4 text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </label>

        <div className="flex w-full flex-col gap-3">
          <span className="text-sm font-semibold text-ink">Visibility</span>
          <div className="flex flex-col gap-4 sm:flex-row">
            {(
              [
                {
                  id: 'public' as const,
                  icon: Globe,
                  title: 'Public',
                  description: 'Visible to everyone in the showcase community.',
                },
                {
                  id: 'private' as const,
                  icon: Lock,
                  title: 'Private',
                  description: 'Only visible to team members in your studio.',
                },
              ]
            ).map(({ id, icon: Icon, title, description }) => (
              <button
                key={id}
                type="button"
                onClick={() => setVisibility(id)}
                className={`flex flex-1 items-start gap-4 rounded-2xl border-2 p-5 text-left ${
                  draft.visibility === id ? 'border-primary bg-primary-tint' : 'border-border bg-surface'
                }`}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-tint">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-[15px] font-bold text-ink">{title}</p>
                  <p className="text-sm text-muted">{description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  )
}
