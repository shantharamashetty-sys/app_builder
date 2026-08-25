import { useNavigate } from 'react-router-dom'
import { useAppGeneration } from '../../hooks/useAppGeneration'
import GenerationTopBar from '../../components/ai-generation/GenerationTopBar'
import PromptStep from './steps/PromptStep'
import UnderstandingStep from './steps/UnderstandingStep'
import ProgressStep from './steps/ProgressStep'
import ArchitectureStep from './steps/ArchitectureStep'
import ScreensStep from './steps/ScreensStep'
import ConfirmStep from './steps/ConfirmStep'

const DARK_STEPS = new Set(['prompt', 'understanding', 'progress'])

/**
 * Module 04's registered top-level view — a full-bleed wizard with its own
 * minimal top bar instead of AppLayout's Navbar/Sidebar. Owns the single
 * useAppGeneration() call and hands each step only the slice of state it
 * needs; step components stay presentational.
 */
export default function AiAppGenerationView() {
  const navigate = useNavigate()
  const generation = useAppGeneration()
  const isDark = DARK_STEPS.has(generation.step)

  return (
    <div className={`flex min-h-screen w-full flex-col ${isDark ? 'bg-[#0d0d1a]' : 'bg-canvas'}`}>
      <GenerationTopBar variant={isDark ? 'dark' : 'light'} />

      {generation.step === 'prompt' && (
        <PromptStep
          promptText={generation.promptText}
          setPromptText={generation.setPromptText}
          applySuggestion={generation.applySuggestion}
          submitPrompt={generation.submitPrompt}
          isAnalyzing={generation.isAnalyzing}
          error={generation.error}
        />
      )}

      {generation.step === 'understanding' && generation.analysis && (
        <UnderstandingStep
          analysis={generation.analysis}
          onContinue={generation.continueToGeneration}
        />
      )}

      {generation.step === 'progress' && (
        <ProgressStep progressSnapshot={generation.progressSnapshot} />
      )}

      {generation.step === 'architecture' &&
        generation.architecture &&
        generation.recommendation && (
          <ArchitectureStep
            architecture={generation.architecture}
            recommendation={generation.recommendation}
            chosenBackend={generation.chosenBackend}
            onChangeBackend={generation.setChosenBackend}
            activeTab={generation.activeArchitectureTab}
            onTabChange={generation.setActiveArchitectureTab}
            onAccept={generation.acceptArchitecture}
          />
        )}

      {generation.step === 'screens' && (
        <ScreensStep
          screens={generation.screens}
          selectedScreenId={generation.selectedScreenId}
          setSelectedScreenId={generation.setSelectedScreenId}
          acceptedScreenIds={generation.acceptedScreenIds}
          acceptScreen={generation.acceptScreen}
          acceptAllScreens={generation.acceptAllScreens}
        />
      )}

      {generation.step === 'confirm' && generation.summary && (
        <ConfirmStep summary={generation.summary} onDone={() => navigate('/dashboard')} />
      )}
    </div>
  )
}
