import GoogleLogo from './icons/GoogleLogo'
import GithubLogo from './icons/GithubLogo'
import AppleLogo from './icons/AppleLogo'

const PROVIDERS = [
  { label: 'Continue with Google', Icon: GoogleLogo },
  { label: 'Continue with GitHub', Icon: GithubLogo },
  { label: 'Continue with Apple', Icon: AppleLogo },
]

/** Pure presentation: the row of third-party auth buttons shared by login/signup. */
export default function SocialAuthButtons() {
  return (
    <div className="flex w-full flex-col gap-4">
      {PROVIDERS.map(({ label, Icon }) => (
        <button
          key={label}
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-6 py-3"
        >
          <Icon className="size-5 shrink-0 text-ink" />
          <span className="text-[15px] font-semibold text-ink">{label}</span>
        </button>
      ))}
    </div>
  )
}
