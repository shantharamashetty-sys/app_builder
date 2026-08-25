import { useState } from 'react'
import { ChevronDown, ChevronUp, Palette } from 'lucide-react'
import type { ThemeOption } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

interface ThemeStepProps {
  themes: ThemeOption[]
  themeId: string
  setThemeId: (themeId: string) => void
}

export default function ThemeStep({ themes, themeId, setThemeId }: ThemeStepProps) {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(true)
  const selectedTheme = themes.find((theme) => theme.id === themeId) ?? themes[0]

  return (
    <StepCard title="Choose a Theme" subtitle="Select the visual style for your app">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              className={`flex items-center gap-2.5 rounded-xl border-2 px-4 py-2.5 ${
                themeId === theme.id ? 'border-primary bg-primary-tint' : 'border-border bg-surface'
              }`}
            >
              <span
                className="size-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <span className="text-sm font-semibold text-ink">{theme.name}</span>
            </button>
          ))}
        </div>

        {selectedTheme && (
          <div
            className="flex h-[130px] w-full items-center gap-3 rounded-xl p-3"
            style={{ backgroundColor: selectedTheme.secondaryColor }}
          >
            <div className="h-full w-10 rounded-lg" style={{ backgroundColor: selectedTheme.primaryColor }} />
            <div className="flex h-full flex-1 flex-col gap-3">
              <div className="h-10 w-full rounded-lg opacity-90" style={{ backgroundColor: selectedTheme.primaryColor }} />
              <div className="flex h-full flex-1 gap-3">
                <div className="h-full flex-1 rounded-lg bg-white/10" />
                <div className="h-full flex-1 rounded-lg" style={{ backgroundColor: selectedTheme.accentColor }} />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-5 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setIsCustomizeOpen((current) => !current)}
            className="flex w-full items-center justify-between"
          >
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <Palette className="size-5 text-muted" />
              Customize Colors
            </span>
            {isCustomizeOpen ? (
              <ChevronUp className="size-5 text-muted" />
            ) : (
              <ChevronDown className="size-5 text-muted" />
            )}
          </button>

          {isCustomizeOpen && selectedTheme && (
            <div className="flex flex-wrap gap-8">
              {(
                [
                  { label: 'Primary', value: selectedTheme.primaryColor },
                  { label: 'Secondary', value: selectedTheme.secondaryColor },
                  { label: 'Accent', value: selectedTheme.accentColor },
                ] as const
              ).map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-2">
                  <p className="text-[13px] text-muted">{label}</p>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-8 shrink-0 rounded-lg border border-border"
                      style={{ backgroundColor: value }}
                    />
                    <span className="text-sm font-medium text-ink uppercase">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StepCard>
  )
}
