import { useNavigate } from 'react-router-dom'
import { useProjectWizard } from '../../hooks/useProjectWizard'
import WizardTopBar from '../../components/project-wizard/WizardTopBar'
import WizardStepper from '../../components/project-wizard/WizardStepper'
import WizardFooter from '../../components/project-wizard/WizardFooter'
import DetailsStep from './steps/DetailsStep'
import PlatformStep from './steps/PlatformStep'
import CategoryStep from './steps/CategoryStep'
import StartingPointStep from './steps/StartingPointStep'
import ThemeStep from './steps/ThemeStep'
import BackendStep from './steps/BackendStep'
import ReviewStep from './steps/ReviewStep'

const STEP_LABELS = ['Details', 'Platform', 'Category', 'AI / Template', 'Theme', 'Backend', 'Review']

/**
 * Module 03's registered top-level view — a full-bleed 7-step wizard with
 * its own minimal top bar, same treatment as Module 02/04. Owns the single
 * useProjectWizard() call and hands each step only the slice it needs.
 */
export default function ProjectWizardView() {
  const navigate = useNavigate()
  const wizard = useProjectWizard()

  async function handleContinue() {
    if (wizard.step !== 'review') {
      wizard.goNext()
      return
    }
    try {
      await wizard.submit()
      navigate('/dashboard')
    } catch {
      // error state is already surfaced by useProjectWizard
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <WizardTopBar />

      <div className="flex w-full flex-1 flex-col px-6 sm:px-10">
        <WizardStepper labels={STEP_LABELS} currentIndex={wizard.stepIndex} />

        {wizard.isLoadingOptions || !wizard.options ? (
          <p className="flex-1 py-10 text-center text-sm text-muted">Loading...</p>
        ) : (
          <>
            {wizard.step === 'details' && (
              <DetailsStep
                draft={wizard.draft}
                setName={wizard.setName}
                setSlug={wizard.setSlug}
                setDescription={wizard.setDescription}
                setVisibility={wizard.setVisibility}
              />
            )}

            {wizard.step === 'platform' && (
              <PlatformStep
                platforms={wizard.options.platforms}
                platform={wizard.draft.platform}
                setPlatform={wizard.setPlatform}
                crossPlatform={wizard.draft.crossPlatform}
                setCrossPlatform={wizard.setCrossPlatform}
              />
            )}

            {wizard.step === 'category' && (
              <CategoryStep
                categories={wizard.options.categories}
                category={wizard.draft.category}
                setCategory={wizard.setCategory}
              />
            )}

            {wizard.step === 'starting-point' && (
              <StartingPointStep
                startingPoint={wizard.draft.startingPoint}
                setStartingPoint={wizard.setStartingPoint}
                aiPrompt={wizard.draft.aiPrompt}
                setAiPrompt={wizard.setAiPrompt}
              />
            )}

            {wizard.step === 'theme' && (
              <ThemeStep
                themes={wizard.options.themes}
                themeId={wizard.draft.themeId}
                setThemeId={wizard.setThemeId}
              />
            )}

            {wizard.step === 'backend' && (
              <BackendStep
                databases={wizard.options.databases}
                authMethods={wizard.options.authMethods}
                databaseId={wizard.draft.databaseId}
                setDatabaseId={wizard.setDatabaseId}
                authId={wizard.draft.authId}
                setAuthId={wizard.setAuthId}
              />
            )}

            {wizard.step === 'review' && (
              <ReviewStep draft={wizard.draft} options={wizard.options} onEdit={wizard.goToStep} />
            )}
          </>
        )}

        {wizard.error && <p className="pb-4 text-center text-sm text-red-600">{wizard.error}</p>}
      </div>

      <WizardFooter
        onBack={wizard.goBack}
        onContinue={() => void handleContinue()}
        backDisabled={wizard.stepIndex === 0}
        continueDisabled={!wizard.canContinue}
        continueLabel={wizard.step === 'review' ? 'Create Project' : 'Continue'}
        isSubmitting={wizard.isSubmitting}
      />
    </div>
  )
}
