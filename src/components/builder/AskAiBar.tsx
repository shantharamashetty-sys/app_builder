import { useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'

interface AskAiBarProps {
  onSubmit?: (prompt: string) => void
}

export default function AskAiBar({ onSubmit }: AskAiBarProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (trimmed) onSubmit?.(trimmed)
    setValue('')
  }

  return (
    <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-surface px-4 py-2.5 shadow-lg">
      <Sparkles className="size-4 shrink-0 text-primary" />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleSubmit()
        }}
        placeholder="Ask AI to add, edit, or rearrange anything on this page..."
        className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
      />
      <button
        type="button"
        aria-label="Send"
        onClick={handleSubmit}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
      >
        <ArrowUp className="size-4" />
      </button>
    </div>
  )
}
