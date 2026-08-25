import { Sparkles } from 'lucide-react'

interface SuggestionChipProps {
  label: string
  onClick: () => void
}

export default function SuggestionChip({ label, onClick }: SuggestionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-2 rounded-[10px] border border-white/15 bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-white hover:border-primary"
    >
      <Sparkles className="size-3.5 shrink-0 text-primary" />
      {label}
    </button>
  )
}
