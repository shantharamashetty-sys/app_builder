import type {
  ArchitectureTab,
  BackendOption,
  BackendRecommendationResult,
  GeneratedArchitecture,
} from '../../../models/AppGeneration'
import ArchitectureTree from '../../../components/ai-generation/ArchitectureTree'
import BackendRecommendationCard from '../../../components/ai-generation/BackendRecommendationCard'
import DataModelSchemaList from '../../../components/ai-generation/DataModelSchemaList'
import ApiEndpointList from '../../../components/ai-generation/ApiEndpointList'
import ComponentInventoryList from '../../../components/ai-generation/ComponentInventoryList'

const TABS: { id: ArchitectureTab; label: string }[] = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'database', label: 'Database' },
  { id: 'api', label: 'API' },
  { id: 'components', label: 'Components' },
]

interface ArchitectureStepProps {
  architecture: GeneratedArchitecture
  recommendation: BackendRecommendationResult
  chosenBackend: BackendOption | null
  onChangeBackend: (option: BackendOption) => void
  activeTab: ArchitectureTab
  onTabChange: (tab: ArchitectureTab) => void
  onAccept: () => void
}

export default function ArchitectureStep({
  architecture,
  recommendation,
  chosenBackend,
  onChangeBackend,
  activeTab,
  onTabChange,
  onAccept,
}: ArchitectureStepProps) {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex w-full gap-6 border-b border-border bg-surface px-6 sm:px-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`border-b-2 py-4 text-sm font-semibold ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-1 justify-center bg-canvas p-6 sm:p-10">
        <div className="flex w-full max-w-[1000px] flex-col gap-6">
          <div className="flex w-full flex-col gap-6 rounded-[20px] border-2 border-border bg-surface p-6 sm:p-10">
            {activeTab === 'architecture' && (
              <div className="flex flex-col gap-8">
                <BackendRecommendationCard
                  recommendation={recommendation}
                  chosenBackend={chosenBackend}
                  onChange={onChangeBackend}
                />
                <ArchitectureTree pages={architecture.pages} />
              </div>
            )}
            {activeTab === 'database' && <DataModelSchemaList dataModels={architecture.dataModels} />}
            {activeTab === 'api' && <ApiEndpointList endpoints={architecture.apiEndpoints} />}
            {activeTab === 'components' && (
              <ComponentInventoryList components={architecture.components} />
            )}
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-sm text-muted">
              Pages: <span className="font-bold text-ink">{architecture.pages.length}</span> ·
              Components: <span className="font-bold text-ink">{architecture.components.length}</span> ·
              Models: <span className="font-bold text-ink">{architecture.dataModels.length}</span>
            </p>
            <button
              type="button"
              onClick={onAccept}
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white sm:w-auto"
            >
              Accept Architecture
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
