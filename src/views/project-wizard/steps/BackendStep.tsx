import { ExternalLink, Info } from 'lucide-react'
import type { BackendAuthOption, BackendDatabaseOption } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

const INTEGRATION_TAGS = [
  { label: 'REST API', hasLink: true },
  { label: 'GraphQL', hasLink: false },
  { label: 'Webhooks', hasLink: true },
  { label: 'Stripe', hasLink: false },
  { label: 'SendGrid', hasLink: true },
]

interface BackendStepProps {
  databases: BackendDatabaseOption[]
  authMethods: BackendAuthOption[]
  databaseId: string
  setDatabaseId: (databaseId: string) => void
  authId: string
  setAuthId: (authId: string) => void
}

export default function BackendStep({
  databases,
  authMethods,
  databaseId,
  setDatabaseId,
  authId,
  setAuthId,
}: BackendStepProps) {
  return (
    <StepCard title="Select Your Backend" subtitle="Choose your database and authentication methods">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-ink">Database</p>
            {databases.map((option) => {
              const isSelected = databaseId === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDatabaseId(option.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left ${
                    isSelected ? 'border-primary bg-primary-tint' : 'border-border bg-surface'
                  }`}
                >
                  <div className="size-10 shrink-0 rounded-lg bg-border" />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-bold text-ink">{option.name}</p>
                      {option.recommended && (
                        <span className="rounded bg-success px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-muted">{option.description}</p>
                  </div>
                  <span
                    className={`flex size-[18px] shrink-0 items-center justify-center rounded-lg border-[5px] ${
                      isSelected ? 'border-primary bg-white' : 'border-border bg-white'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-ink">Authentication</p>
            {authMethods.map((option) => {
              const isSelected = authId === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAuthId(option.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left ${
                    isSelected ? 'border-primary bg-primary-tint' : 'border-border bg-surface'
                  }`}
                >
                  <div className="size-10 shrink-0 rounded-lg bg-border" />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-[15px] font-bold text-ink">{option.name}</p>
                    <p className="text-[13px] text-muted">{option.description}</p>
                  </div>
                  <span
                    className={`flex size-[18px] shrink-0 items-center justify-center rounded-lg border-[5px] ${
                      isSelected ? 'border-primary bg-white' : 'border-border bg-white'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6">
          <p className="text-sm font-semibold text-ink">APIs &amp; Integrations</p>
          <div className="flex flex-wrap gap-3">
            {INTEGRATION_TAGS.map(({ label, hasLink }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-canvas px-4 py-2 text-sm font-medium text-ink"
              >
                {label}
                {hasLink && <ExternalLink className="size-3.5 text-muted" />}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[13px] text-muted">
          <Info className="size-4 shrink-0" />
          You can change these settings later in project settings.
        </div>
      </div>
    </StepCard>
  )
}
