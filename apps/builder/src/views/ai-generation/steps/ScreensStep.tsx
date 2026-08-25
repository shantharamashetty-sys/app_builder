import type { GeneratedScreen } from '../../../models/AppGeneration'
import ScreenThumbnailList from '../../../components/ai-generation/ScreenThumbnailList'
import ScreenWireframePreview from '../../../components/ai-generation/ScreenWireframePreview'

interface ScreensStepProps {
  screens: GeneratedScreen[]
  selectedScreenId: string | null
  setSelectedScreenId: (id: string) => void
  acceptedScreenIds: Set<string>
  acceptScreen: (id: string) => void
  acceptAllScreens: () => void
}

export default function ScreensStep({
  screens,
  selectedScreenId,
  setSelectedScreenId,
  acceptedScreenIds,
  acceptScreen,
  acceptAllScreens,
}: ScreensStepProps) {
  const selectedScreen = screens.find((screen) => screen.id === selectedScreenId) ?? screens[0]

  return (
    <div className="flex w-full flex-1 flex-col bg-canvas">
      <div className="flex w-full items-center justify-between border-b border-border bg-surface px-6 py-4 sm:px-10">
        <p className="text-sm text-muted">
          Project <span className="mx-1">›</span> <span className="font-semibold text-ink">Generated Screens</span>
        </p>
        <button
          type="button"
          onClick={acceptAllScreens}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          Accept All
        </button>
      </div>

      <div className="flex w-full flex-1 justify-center p-6 sm:p-10">
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
          <ScreenThumbnailList
            screens={screens}
            selectedScreenId={selectedScreen?.id ?? null}
            acceptedScreenIds={acceptedScreenIds}
            onSelect={setSelectedScreenId}
          />

          <div className="flex flex-col gap-6 rounded-[20px] border-2 border-border bg-surface p-6 sm:p-8">
            {selectedScreen && <ScreenWireframePreview screen={selectedScreen} />}
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-semibold text-ink">Previewing: {selectedScreen?.name}</p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <button
                  type="button"
                  className="rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-ink"
                >
                  Customize Screen
                </button>
                <button
                  type="button"
                  onClick={() => selectedScreen && acceptScreen(selectedScreen.id)}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Accept & Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
