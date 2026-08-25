interface WizardFooterProps {
  onBack: () => void
  onContinue: () => void
  backDisabled?: boolean
  continueDisabled?: boolean
  continueLabel?: string
  isSubmitting?: boolean
}

/** Pure presentation: the Back/Continue bar pinned to the bottom of every wizard page. */
export default function WizardFooter({
  onBack,
  onContinue,
  backDisabled,
  continueDisabled,
  continueLabel = 'Continue',
  isSubmitting,
}: WizardFooterProps) {
  return (
    <footer className="flex h-[88px] w-full shrink-0 items-center justify-between border-t border-border bg-surface px-6 sm:px-10">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className="rounded-xl border border-border px-6 py-3 text-[15px] font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        disabled={continueDisabled || isSubmitting}
        className="rounded-xl bg-primary px-8 py-3 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : continueLabel}
      </button>
    </footer>
  )
}
