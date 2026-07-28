import type { GenerationLayer, GenerationProgressSnapshot } from '../../../models/AppGeneration'
import GenerationLayerRow from '../../../components/ai-generation/GenerationLayerRow'
import GenerationLogPanel from '../../../components/ai-generation/GenerationLogPanel'
import OverallProgressRing from '../../../components/OverallProgressRing'

const EMPTY_LAYERS: GenerationLayer[] = [
  { id: 'architecture', label: 'Architecture', status: 'pending', progress: 0 },
  { id: 'database', label: 'Database Schema', status: 'pending', progress: 0 },
  { id: 'components', label: 'UI Components', status: 'pending', progress: 0 },
  { id: 'api', label: 'API Routes', status: 'pending', progress: 0 },
]

interface ProgressStepProps {
  progressSnapshot: GenerationProgressSnapshot | null
}

export default function ProgressStep({ progressSnapshot }: ProgressStepProps) {
  const layers = progressSnapshot?.layers ?? EMPTY_LAYERS
  const overallProgress = progressSnapshot?.overallProgress ?? 0
  const currentActivity = progressSnapshot?.currentActivity ?? 'Warming up the generator...'
  const log = progressSnapshot?.log ?? []

  return (
    <div className="flex w-full flex-1 justify-center p-6 sm:p-16">
      <div className="grid w-full max-w-[1100px] grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-[#0f0f1e] p-8">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold text-white">Generating your app</p>
            <p className="text-sm text-white/50">Building 4 layers in parallel</p>
          </div>

          <div className="flex flex-col gap-6">
            {layers.map((layer) => (
              <GenerationLayerRow key={layer.id} layer={layer} />
            ))}
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5">
            <OverallProgressRing
              percent={overallProgress}
              label={`${overallProgress}%`}
              sublabel=""
              variant="dark"
            />
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-bold tracking-wide text-primary uppercase">
                Overall Progress
              </p>
              <p className="text-sm text-white/60">{currentActivity}</p>
            </div>
          </div>
        </div>

        <div className="min-h-[360px]">
          <GenerationLogPanel log={log} />
        </div>
      </div>
    </div>
  )
}
