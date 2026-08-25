import { WandSparkles } from 'lucide-react'
import SuggestionChip from '../../../components/ai-generation/SuggestionChip'

const SUGGESTIONS: { label: string; prompt: string }[] = [
  {
    label: 'E-commerce Store',
    prompt: 'An e-commerce store with a product catalog, cart, checkout, and Stripe payments.',
  },
  {
    label: 'SaaS Dashboard',
    prompt: 'A SaaS analytics dashboard with team roles, admin permissions, and usage reporting.',
  },
  {
    label: 'Social Platform',
    prompt:
      'A social platform with real-time chat, live notifications, and user profiles with photo uploads.',
  },
  {
    label: 'Blog + CMS',
    prompt: 'A blog and CMS with an admin panel, content search, and scheduled publishing workflows.',
  },
  {
    label: 'Internal Tool',
    prompt:
      'An internal tool for enterprise teams handling thousands of users with strict compliance and audit needs.',
  },
]

interface PromptStepProps {
  promptText: string
  setPromptText: (text: string) => void
  applySuggestion: (text: string) => void
  submitPrompt: () => Promise<void>
  isAnalyzing: boolean
  error: string | null
}

export default function PromptStep({
  promptText,
  setPromptText,
  applySuggestion,
  submitPrompt,
  isAnalyzing,
  error,
}: PromptStepProps) {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden p-6 sm:p-16">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="hidden rounded-xl border border-white/15 bg-[#0f172a]/70 p-5 font-mono text-xs text-white/40 opacity-40 lg:absolute lg:top-[150px] lg:left-20 lg:block">
        <p>{'const app = createBuilder({'}</p>
        <p>{"  features: ['auth', 'cms'],"}</p>
        <p>{"  theme: 'immersive-dark'"}</p>
        <p>{'});'}</p>
      </div>
      <div className="hidden rounded-xl border border-white/15 bg-[#0f172a]/70 p-5 font-mono text-xs text-white/40 opacity-40 lg:absolute lg:right-20 lg:bottom-20 lg:block">
        <p>{'{'}</p>
        <p>{'  "model": "gpt-4-pro",'}</p>
        <p>{'  "context": "M3-GENERATOR",'}</p>
        <p>{'  "status": "ready"'}</p>
        <p>{'}'}</p>
      </div>

      <div className="relative z-10 flex w-full max-w-[860px] flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-bold tracking-wide text-primary uppercase">
            Module 04: AI Engine
          </p>
          <p className="text-4xl font-extrabold text-white sm:text-[56px] sm:leading-[1.1]">
            What do you want to build?
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-[24px] border-2 border-primary bg-[#1a1a2e] p-6 shadow-[0_0_20px_rgba(91,75,224,0.2)] sm:p-8">
          <textarea
            value={promptText}
            onChange={(event) => setPromptText(event.target.value)}
            placeholder="Describe your app... e.g. A project management tool for remote teams with task boards, time tracking, and team chat"
            rows={4}
            className="w-full resize-none bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none"
          />
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-semibold tracking-wide text-white/50 uppercase">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SUGGESTIONS.map((suggestion) => (
                <SuggestionChip
                  key={suggestion.label}
                  label={suggestion.label}
                  onClick={() => applySuggestion(suggestion.prompt)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => void submitPrompt()}
            disabled={!promptText.trim() || isAnalyzing}
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundImage: 'linear-gradient(100deg, #5b4be0 25%, #7c3aed 75%)',
            }}
          >
            <WandSparkles className="size-5" />
            {isAnalyzing ? 'Analyzing...' : 'Generate My App ✦'}
          </button>
          {error ? (
            <p className="text-sm text-red-400">{error}</p>
          ) : (
            <p className="text-[13px] text-white/50">~30 seconds · Powered by AppBuilder AI</p>
          )}
        </div>
      </div>
    </div>
  )
}
