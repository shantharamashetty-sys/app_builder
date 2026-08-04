import { Move, Sparkle, Rocket, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'

interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

const FEATURES: Feature[] = [
  {
    title: 'Build Visually',
    description:
      'Drag and drop fully functional UI components directly onto your active design viewport.',
    icon: Move,
  },
  {
    title: 'AI-Powered',
    description:
      'Generate data relationships and custom page flow elements with smart contextual assistance.',
    icon: Sparkle,
  },
  {
    title: 'Deploy Instantly',
    description:
      'Publish your native visual applications directly to cloud environments, ready for public testing.',
    icon: Rocket,
  },
]

export default function WelcomeView() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-canvas p-6">
      <div className="flex w-full max-w-[960px] flex-col items-center gap-10 sm:gap-12">
        <div className="flex flex-col items-center gap-4">
          <Logo className="h-[90px] w-auto sm:h-[120px]" />
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-3xl font-extrabold text-ink sm:text-[40px]">
              Welcome to AppBuilder
            </p>
            <p className="text-lg text-muted">Let&apos;s get you set up in just a few steps</p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-[20px] border border-border bg-surface p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary-tint">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold text-ink">{title}</p>
                <p className="text-sm leading-[22px] text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full max-w-[320px] flex-col items-center gap-5">
          <Link
            to="/"
            className="w-full rounded-xl bg-primary px-8 py-3 text-center text-base font-semibold text-white"
          >
            Get Started
          </Link>
          <Link to="/" className="text-[15px] font-semibold text-muted">
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  )
}
