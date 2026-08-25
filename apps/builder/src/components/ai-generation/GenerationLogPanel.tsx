import type { GenerationLogEntry } from '../../models/AppGeneration'

const LEVEL_CLASS: Record<GenerationLogEntry['level'], string> = {
  success: 'text-success',
  warning: 'text-amber-400',
  command: 'text-white',
  info: 'text-white/50',
}

interface GenerationLogPanelProps {
  log: GenerationLogEntry[]
}

export default function GenerationLogPanel({ log }: GenerationLogPanelProps) {
  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-[#0b0b16]">
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-amber-500/70" />
        <span className="size-2.5 rounded-full bg-success/70" />
        <span className="ml-2 text-xs font-semibold text-white/50 uppercase">Generation_Log</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-4 font-mono text-[13px]">
        {log.length === 0 && <p className="text-white/30">Waiting for the generator to start...</p>}
        {log.map((entry) => (
          <p key={entry.id} className={LEVEL_CLASS[entry.level]}>
            {entry.message}
          </p>
        ))}
        <span className="mt-1 inline-block h-4 w-2 animate-pulse bg-primary" />
      </div>
    </div>
  )
}
