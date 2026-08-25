import { Check } from 'lucide-react'
import Logo from './Logo'

const FEATURES = [
  'Intuitive drag-and-drop builder',
  'Direct deployment to iOS & Android',
  'Real-time AI logic generation',
]

interface AuthHeroPanelProps {
  headline: string
}

/**
 * Pure presentation: the purple marketing panel shared by login/signup/
 * forgot-password. Hidden below `lg` so the form is never squeezed next to
 * it on small screens. `lg:sticky` pins it to exactly 100vh regardless of
 * how tall the form column next to it gets, instead of stretching to match
 * a sibling that can grow taller than the viewport.
 */
export default function AuthHeroPanel({ headline }: AuthHeroPanelProps) {
  return (
    <div className="hidden min-w-0 flex-1 flex-col justify-between bg-primary p-10 lg:sticky lg:top-0 lg:flex lg:h-screen xl:p-16">
      <Logo className="h-20 w-auto shrink-0" />

      <div className="flex flex-col gap-8">
        <p className="text-[48px] leading-[1.15] font-bold text-white xl:text-[56px]">{headline}</p>
        <div className="flex flex-col gap-5">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-xl bg-white">
                <Check className="size-3.5 text-primary" />
              </div>
              <p className="text-lg text-white">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="shrink-0 text-sm text-white/70">© 2026 AppBuilder Studio. All rights reserved.</p>
    </div>
  )
}
